<!--
In diesem File wird die Ansicht zum Schlaf-Fenster initialisiert.
Die Morgeneinträge werden aus der Datenbank ausgelesen und die Schlafeffizienz berechnet.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
-->
<template>
    <v-container id="container">
        <!-- das Schlaf-Fenster wird angezeigt, wenn es bereits eines in der Datenbank gibt -->
        <div v-if="data">
            <v-card dark>
                <v-card-text class="headline mb-1">
                    <div class="text-center">
                        Dein Schlaffenster heute: <br/><br/>
                        {{ from }} Uhr bis {{ to }} Uhr
                    </div>
                </v-card-text>
            </v-card>
            <card-tips
                :key="information.title"
                :title="information.title"
                :textExpanded="information.textExpanded"
            />
        </div>
        <!-- gibt es noch kein Schlaf-Fenster in der Datenbank, gibt es ein Formular um eines auszuwählen  -->
        <div v-else>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-card dark>
                    <p class="text-center mt-6 headline">Erfasse bitte dein bevorzugtes Schlaffenster:</p>
                    <p class="text-center">Das Schlaffenster muss mindestens 5h betragen</p>
                    <card-clock
                        :label="'Von'"
                        :id="'from'"
                        :disabled="false"
                        @changedClock="onChangedClock($event, 'from')"
                    ></card-clock>
                    <card-clock
                        :label="'Bis'"
                        :id="'to'"
                        :disabled="false"
                        @changedClock="onChangedClock($event, 'to')"
                    ></card-clock>
                    <p class="text-center headline">Wähle deinen Chronotypen:</p>
                    <v-radio-group v-model="chronotype" class="ml-2">
                        <v-radio
                            v-for="chronotype in chronotypes"
                            :label="chronotype.label"
                            :key="chronotype.label"
                            :value="chronotype.value"
                        ></v-radio>
                    </v-radio-group>
                </v-card>
            </v-form>
            <v-layout row child-flex justify-center align-center wrap id="layoutButtons">
                <v-spacer></v-spacer>
                <v-btn color="yellow darken-2" @click="submit()">Speichern</v-btn>
                <v-spacer></v-spacer>
            </v-layout>
        </div>
    </v-container>
</template>

<script>
import db from "../fb";
import { auth } from "../fb";
import moment from 'moment';
import CardClock from "../components/CardClock.vue";
import CardTips from "@/components/CardTips.vue";

export default {
    components: {
        CardClock,
        CardTips
    },
    data() {
        return {
            // Variabel in welcher die Daten gespeichert werden, die als Informationen zu der 
            // Berechnung des Schlaf-Fensters dargestellt werden
            information: {
                title: "Wie wird mein Schlaffenster berechnet?",
                textExpanded: "Für das Schlaffenster werden deine Morgeneinträge der letzten drei Tage" +
                            " genommen und die Schlafeffizienz daraus berechnet. Die Schlafeffizienz" +
                            " wird berechnet, in dem die Schlafenszeit durch die gesamte Zeit, die" +
                            " im Bett verbracht wurde, geteilt wird." +
                            " Ist die Schlafeffizienz über 85%, so wird das Schlaffenster um 30min verlängert" +
                            " Ist die Schlafeffizienz unter 85%, so wird das Schlaffenster um 30min verkürzt"
            },
            chronotype: "",
            valid: true,
            data: false,
            from: 0,
            to: 0,
            efficiency: 1,
            timestamp: 0,
            // Objekt, welches in die Datenbank gespeichert wird
            sleepingWindow: {
                from: null,
                to: null,
                chronotype: null,
                efficiency: null,
                timestamp: new Date(),
                uid: null
            },
            // Variabel für die Radio-Buttons zum Chronotyp
            chronotypes: [
                {
                    label: "Lerche (lieber früh aufstehen)",
                    value: "lerche"
                },
                {
                    label: "Eule (lieber spät ins Bett)",
                    value: "eule"
                }
            ]
        }
    },
    created() {
        // die Daten aus der Collection SleepingWindow, welche als UserID die des eingeloggten
        // Users hinterlegt haben, werden geladen
        var window = db
            .collection("SleepingWindow")
            .where("uid", "==", auth.currentUser.uid)
            .get();

        let me = this;
        // Die DB Abfrage ist asynchron, es muss also auf die vollendung des Query
        // gewartet werden, bevor mit den Daten weitergearbeitet wird.
        window.then(values => {
            let docID;
            if(values.size > 0) {
                // values beinhaltet die return-values der im promise ausgeführten Funktionen.
                // in diesem Fall ein Array der Einträge.
                this.data = true;
                // es wird über die Einträge der Datenbank geloopt
                values.forEach(function(doc) {
                    // die Daten der Datenbank werden in Variabeln gespeichert
                    me.from = doc.data().from;
                    me.to = doc.data().to;
                    me.chronotype = doc.data().chronotype;
                    me.efficiency = doc.data().efficiency;
                    me.timestamp = doc.data().timestamp;
                    docID = doc.id;
                })
                
                // das heutige Datum wird in eine Variabel gespeichert
                // ist der timestamp des Datenbankeintrags nicht von heute, so wird das Promise
                // enoughSleepEfficiency aufgerufen
                // Gibt dieses Promise als Resultat true zurück, so wird die Funktion
                // changeDBValues aufgerufen
                let today = new Date();
                let timestampOnDB = new Date();
                timestampOnDB.setTime(this.timestamp.seconds * 1000);
                if(timestampOnDB.setHours(0,0,0,0) < today.setHours(0,0,0,0)) {
                    this.enoughSleepEfficiency().then(value => {
                        if(value) {
                            this.changeDBValues(docID);
                        }
                    })
                }
            // gibt es noch keine Daten zum Schlaf-Fenster in der Datenbank, so wird die Variabel
            // data auf false gesetzt
            } else {
                this.data = false;
            }

        })
  },
  methods: {
      // es wird berechnet, ob die Schlafeffizienz genug hoch ist. Wird von dieser Funktion
      // true zurückgegeben, so wird die Datenbank angepasst
    enoughSleepEfficiency() {
        var changeDB = false;
        var computeEfficiency = false;
        var entries = [];
        var threeDaysAgo = new Date(moment(new Date()).subtract(3, 'days'));
        
        // die Daten aus der Collection EntryMorning, welche als UserID die des eingeloggten
        // Users hinterlegt haben, sowie der Timestamp nicht älter als drei Tage ist, werden geladen
        var p1 = db
            .collection("EntryMorning")
            .where("uid", "==", auth.currentUser.uid)
            .where("timestamp", ">=", threeDaysAgo)
            .get();

        // Die DB Abfrage ist asynchron, es muss also auf die vollendung des Query
        // gewartet werden, bevor mit den Daten weitergearbeitet wird
        // Dieses Promise wird zurückgegeben
        return p1.then(values => {
            // values beinhaltet die return-values der im promise ausgeführten Funktionen.
            // in diesem Fall ein Array der Einträge.
            values.forEach(function(doc) {
                // gibt es Einträge in dem Array, so wird computeEfficiency auf true gesetzt
                if(values.size > 0) {
                    entries.push(doc);
                    computeEfficiency = true;
                }
            })
            // wurde computeEfficiency auf true gesetzt, so wird folgender Code ausgeführt
            if(computeEfficiency) {
                // die Funktion computeEfficiency wird aufgerufen
                this.computeEfficiency(entries);
                // ist die Schlafeffizienz unter 85%, so wird ein kürzeres Schlaf-Fenster berechnet
                // dazu wird die Funktion computeShorterWindow aufgerufen
                if(this.efficiency < 0.85) {
                    this.computeShorterWindow();
                    changeDB = true;
                } else {
                    // ist die Schlafeffizienz über 85%, so wird ein längeres Schlaf-Fenster berechnet
                    // dazu wird die Funktion computeLongerWindow aufgerufen
                    this.computeLongerWindow();
                    changeDB = true;
                }
            }
            return changeDB;
        })
    },
    // In dieser Funktion wird die Schlafeffizient berechnet
    computeEfficiency(entries) {
        var sleepEfficiency = [];
        // es wird über das Array entries geloopt
        entries.forEach(entry => {
            let bedTime = moment(entry.data().bedTime, "HH:mm");
            if(new Date(moment(bedTime)).getHours() > 12 || new Date(moment(bedTime)).getHours() == 0) {
                bedTime = new Date(moment(bedTime).subtract(1, "day"));
            }
            let standUpTime = moment(entry.data().standUpTime, "HH:mm");
            // die Dauer im Bett wird mit der Zeit, zu der ins Bett gegangen wurde, bis zu der Zeit
            // zu der aufgestanden wurde, berechnet
            let durationInBed = moment.duration(standUpTime.diff(bedTime));
            let timeInBed = parseInt(durationInBed.asHours()) * 60 + parseInt(durationInBed.asMinutes()%60);

            let lightsOut = moment(entry.data().lightsOut, "HH:mm");
            if(new Date(moment(lightsOut)).getHours() > 12 || new Date(moment(lightsOut)).getHours() == 0) {
                lightsOut = new Date(moment(lightsOut).subtract(1, "day"));
            }
            let wakeUpTime = moment(entry.data().wakeUpTime, "HH:mm");
            // die Dauer in der geschlafen wurde, wird mit der Zeit, zu der das Licht gelöscht wurde, 
            // bis zu der Zeit, zu der aufgewacht wurde, berechnet
            let durationAsleep = moment.duration(wakeUpTime.diff(lightsOut));
            let timeAsleep = parseInt(durationAsleep.asHours()) * 60 + parseInt(durationAsleep.asMinutes()%60);
            // die Dauer in der geschlafen wurde, wird mit der Einschlafzeit und
            // der Zeit in der der User wach war subtrahiert
            timeAsleep -= entry.data().fallAsleepTime + entry.data().durationAwake;
            // die Schlafeffizienz wird mit der Division von Schlafenszeit durch Zeit im Bett berechnet
            // das Array sleepEfficiency wird mit dieser Schlafeffizienz befüllt
            sleepEfficiency.push(timeAsleep/timeInBed);
        })
        let e = 0;
        // die Werte im sleepEfficiency Array werden zusammengerechnet
        for(let i = 0; i < sleepEfficiency.length; i++) {
            e += sleepEfficiency[i];
        }
        // die Werte des sleepEfficiency Array werden durch die Anzahl Werte gerechnet
        // diese berechnete Effizienz wird abgespeichert
        if(sleepEfficiency.length > 0) {
            e /= sleepEfficiency.length;
            this.efficiency = e;
        }
    },
    // In dieser Funktion wird ein kürzeres Schlaf-Fenster berechnet, wenn die Schlafeffizienz
    // unter 85% liegt
    computeShorterWindow() {
        let dateEule = moment(this.from.split(":")[0] + ":" + this.from.split(":")[1], "HH:mm");
        let dateLerche = moment(this.to.split(":")[0] + ":" + this.to.split(":")[1], "HH:mm");
        // ist der Chronotyp des Users Eule, so wird das Schlaffenster am Abend um 30 Minuten verlängert
        if(this.chronotype == "eule") {
            let newDate = new Date(moment(dateEule).add(30, 'minutes'));
            if(newDate.getHours() > 12 || newDate.getHours() == 0) {
                newDate = new Date(moment(newDate).subtract(1, "day"));
            }
            let duration = moment.duration(dateLerche.diff(newDate));
             // es wird überprüft, dass die Dauer mindestens 5h beträgt
            if(parseInt(duration.asHours()) >= 5) {
                let hours = ("0" + newDate.getHours()).slice(-2);
                let minutes = (newDate.getMinutes() + "0").slice(0, 2);
                let newFrom = hours + ":" + minutes;
                this.from = newFrom;
            }
        // ist der Chronotyp des Users Lerche, so wird das Schlaffenster am Morgen um 30 Minuten verkürzt
        } else if(this.chronotype == "lerche") {
            let subtract30Minutes = new Date(moment(dateLerche).subtract(30, 'minutes'));
            let newDate = moment(subtract30Minutes.getHours() + ":" + subtract30Minutes.getMinutes(), "HH:mm");
            if(new Date(moment(dateEule)).getHours() > 12 || new Date(moment(dateEule)).getHours() == 0) {
                dateEule = new Date(moment(dateEule).subtract(1, "day"));
            }
            let duration = moment.duration(newDate.diff(dateEule));
             // es wird überprüft, dass die Dauer mindestens 5h beträgt
            if(parseInt(duration.asHours()) >= 5) {
                let newTo = newDate.format("HH:mm");
                this.to = newTo;
            }
        }
    },
    // In dieser Funktion wird ein längeres Schlaf-Fenster berechnet, wenn die Schlafeffizienz
    // über 85% liegt
    computeLongerWindow() {
        let dateEule = moment(this.from.split(":")[0] + ":" + this.from.split(":")[1], "HH:mm");
        let dateLerche = moment(this.to.split(":")[0] + ":" + this.to.split(":")[1], "HH:mm");
        // ist der Chronotyp des Users Eule, so wird das Schlaffenster am Morgen um 30 Minuten verlängert
        if(this.chronotype == "eule") {
            let add30Minutes = new Date(moment(dateLerche).add(30, 'minutes'));
            let newDate = moment(add30Minutes.getHours() + ":" + add30Minutes.getMinutes(), "HH:mm");
            if(new Date(moment(dateEule)).getHours() > 12 || new Date(moment(dateEule)).getHours() == 0) {
                dateEule = new Date(moment(dateEule).subtract(1, "day"));
            }
            let duration = moment.duration(newDate.diff(dateEule));
            // es wird überprüft, dass die Dauer mindestens 5h beträgt
            if(parseInt(duration.asHours()) >= 5) {
                let newTo = newDate.format("HH:mm");
                this.to = newTo;
            }
        // ist der Chronotyp des Users Lerche, so wird das Schlaffenster am Abend um 30 Minuten verkürzt
        } else if(this.chronotype == "lerche") {
            let newDate = new Date(moment(dateEule).subtract(30, 'minutes'));
            if(newDate.getHours() > 12 || newDate.getHours() == 0) {
                newDate = new Date(moment(newDate).subtract(1, "day"));
            }
            let duration = moment.duration(dateLerche.diff(newDate));
            // es wird überprüft, dass die Dauer mindestens 5h beträgt
            if(parseInt(duration.asHours()) >= 5) {
                let hours = ("0" + newDate.getHours()).slice(-2);
                let minutes = (newDate.getMinutes() + "0").slice(0, 2);
                let newFrom = hours + ":" + minutes;
                this.from = newFrom;
            }
        }
    },
    // In dieser Funktion wird die Datenbank angepasst
    changeDBValues(id) {
        db.collection("SleepingWindow").doc(id).set({
            from: this.from,
            to: this.to,
            uid: auth.currentUser.uid,
            chronotype: this.chronotype,
            efficiency: this.efficiency,
            timestamp: this.sleepingWindow.timestamp
        })
    },
    // Hatte der User noch kein Schlaf-Fenster, so erscheint ein Formular, um dieses zu Erfassen
    // Wird bei dem Formular auf Speichern geklickt, so werden die Angaben in die Datenbank gespeichert
    submit() {
        // die Felder im Objekt sleepingWindow werden ausgefüllt, um das Objekt in die Datenbank
        // zu speichern
        this.sleepingWindow.uid = auth.currentUser.uid;
        this.sleepingWindow.chronotype = this.chronotype;
        this.sleepingWindow.efficiency = this.efficiency;
        if (this.$refs.form.validate()) {
            // die Daten werden in die Datenbank gespeichert und der User wird auf Dashboard geleitet
            db.collection("SleepingWindow").add(this.sleepingWindow);
            this.$router.push("/dashboard");
        } else {
            this.$vuetify.goTo(0);
        }
    },
    // Wird das Formular-Feld Uhr verändert, so wird der Wert in das Objekt sleepingWindow
    // an der Stelle from oder to gespeichert
    onChangedClock(changedClock, id) {
        if(id == 'from') {
            this.sleepingWindow.from = changedClock.value;
        } else if(id == 'to') {
            this.sleepingWindow.to = changedClock.value;
        }
    }
  }
}
</script>

<style scoped>
#layoutButtons {
  padding: 10px;
}
#container {
  padding-bottom: 80px;
}
</style>