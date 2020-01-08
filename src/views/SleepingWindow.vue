<template>
    <v-container>
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
            sleepingWindow: {
                from: null,
                to: null,
                chronotype: null,
                efficiency: null,
                timestamp: new Date(),
                uid: null
            },
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
        var window = db
            .collection("SleepingWindow")
            .where("uid", "==", auth.currentUser.uid)
            .get();

        let me = this;
        window.then(values => {
            let docID;
            if(values.size > 0) {
                this.data = true;
                values.forEach(function(doc) {
                    me.from = doc.data().from;
                    me.to = doc.data().to;
                    me.chronotype = doc.data().chronotype;
                    me.efficiency = doc.data().efficiency;
                    me.timestamp = doc.data().timestamp;
                    docID = doc.id;
                })
                
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
            } else {
                this.data = false;
            }

        })
  },
  methods: {
    enoughSleepEfficiency() {
        var changeDB = false;
        var computeEfficiency = false;
        var entries = [];
        var threeDaysAgo = new Date(moment(new Date()).subtract(3, 'days'));
        var p1 = db
            .collection("EntryMorning")
            .where("uid", "==", auth.currentUser.uid)
            .where("timestamp", ">=", threeDaysAgo)
            .get();
        return p1.then(values => {
            values.forEach(function(doc) {
                if(values.size > 0) {
                    entries.push(doc);
                    computeEfficiency = true;
                }
            })
            if(computeEfficiency) {
                this.computeEfficiency(entries);
                if(this.efficiency < 0.85) {
                    this.computeShorterWindow();
                    changeDB = true;
                } else {
                    this.computeLongerWindow();
                    changeDB = true;
                }
            }
            return changeDB;
        })
    },
    computeEfficiency(entries) {
        var sleepEfficiency = [];
        entries.forEach(entry => {
            let bedTime = moment(entry.data().bedTime, "HH:mm");
            if(new Date(moment(bedTime)).getHours() > 12 || new Date(moment(bedTime)).getHours() == 0) {
                bedTime = new Date(moment(bedTime).subtract(1, "day"));
            }
            let standUpTime = moment(entry.data().standUpTime, "HH:mm");
            let durationInBed = moment.duration(standUpTime.diff(bedTime));
            let timeInBed = parseInt(durationInBed.asHours()) * 60 + parseInt(durationInBed.asMinutes()%60);

            let lightsOut = moment(entry.data().lightsOut, "HH:mm");
            if(new Date(moment(lightsOut)).getHours() > 12 || new Date(moment(lightsOut)).getHours() == 0) {
                lightsOut = new Date(moment(lightsOut).subtract(1, "day"));
            }
            let wakeUpTime = moment(entry.data().wakeUpTime, "HH:mm");
            let durationAsleep = moment.duration(wakeUpTime.diff(lightsOut));
            let timeAsleep = parseInt(durationAsleep.asHours()) * 60 + parseInt(durationAsleep.asMinutes()%60);
            timeAsleep -= entry.data().fallAsleepTime + entry.data().durationAwake;
            sleepEfficiency.push(timeAsleep/timeInBed);
        })
        let e = 0;
        for(let i = 0; i < sleepEfficiency.length; i++) {
            e += sleepEfficiency[i];
        }
        if(sleepEfficiency.length > 0) {
            e /= sleepEfficiency.length;
            this.efficiency = e;
        }
    },
    computeShorterWindow() {
        let dateEule = moment(this.from.split(":")[0] + ":" + this.from.split(":")[1], "HH:mm");
        let dateLerche = moment(this.to.split(":")[0] + ":" + this.to.split(":")[1], "HH:mm");
        if(this.chronotype == "eule") {
            let newDate = new Date(moment(dateEule).add(30, 'minutes'));
            if(newDate.getHours() > 12 || newDate.getHours() == 0) {
                newDate = new Date(moment(newDate).subtract(1, "day"));
            }
            let duration = moment.duration(dateLerche.diff(newDate));
            if(parseInt(duration.asHours()) >= 5) {
                let hours = ("0" + newDate.getHours()).slice(-2);
                let minutes = (newDate.getMinutes() + "0").slice(0, 2);
                let newFrom = hours + ":" + minutes;
                this.from = newFrom;
            }
        } else if(this.chronotype == "lerche") {
            let subtract30Minutes = new Date(moment(dateLerche).subtract(30, 'minutes'));
            let newDate = moment(subtract30Minutes.getHours() + ":" + subtract30Minutes.getMinutes(), "HH:mm");
            if(new Date(moment(dateEule)).getHours() > 12 || new Date(moment(dateEule)).getHours() == 0) {
                dateEule = new Date(moment(dateEule).subtract(1, "day"));
            }
            let duration = moment.duration(newDate.diff(dateEule));
            if(parseInt(duration.asHours()) >= 5) {
                let newTo = newDate.format("HH:mm");
                this.to = newTo;
            }
        }
    },
    computeLongerWindow() {
        let dateEule = moment(this.from.split(":")[0] + ":" + this.from.split(":")[1], "HH:mm");
        let dateLerche = moment(this.to.split(":")[0] + ":" + this.to.split(":")[1], "HH:mm");
        if(this.chronotype == "eule") {
            let add30Minutes = new Date(moment(dateLerche).add(30, 'minutes'));
            let newDate = moment(add30Minutes.getHours() + ":" + add30Minutes.getMinutes(), "HH:mm");
            if(new Date(moment(dateEule)).getHours() > 12 || new Date(moment(dateEule)).getHours() == 0) {
                dateEule = new Date(moment(dateEule).subtract(1, "day"));
            }
            let duration = moment.duration(newDate.diff(dateEule));
            if(parseInt(duration.asHours()) >= 5) {
                let newTo = newDate.format("HH:mm");
                this.to = newTo;
            }
        } else if(this.chronotype == "lerche") {
            let newDate = new Date(moment(dateEule).subtract(30, 'minutes'));
            if(newDate.getHours() > 12 || newDate.getHours() == 0) {
                newDate = new Date(moment(newDate).subtract(1, "day"));
            }
            let duration = moment.duration(dateLerche.diff(newDate));
            if(parseInt(duration.asHours()) >= 5) {
                let hours = ("0" + newDate.getHours()).slice(-2);
                let minutes = (newDate.getMinutes() + "0").slice(0, 2);
                let newFrom = hours + ":" + minutes;
                this.from = newFrom;
            }
        }
    },
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
    submit() {
        this.sleepingWindow.uid = auth.currentUser.uid;
        this.sleepingWindow.chronotype = this.chronotype;
        this.sleepingWindow.efficiency = this.efficiency;
        if (this.$refs.form.validate()) {
            db.collection("SleepingWindow").add(this.sleepingWindow);
            this.$router.push("/dashboard");
        } else {
            this.$vuetify.goTo(0);
        }
    },
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
</style>