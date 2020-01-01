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
        </div>
        <div v-else>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-card dark>
                    <p class="text-center mt-6 headline">Erfasse bitte dein bevorzugtes Schlaffenster:</p>
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

export default {
    components: {
        CardClock
    },
    data() {
        return {
            chronotype: "",
            valid: true,
            data: false,
            from: 0,
            to: 0,
            sleepingWindow: {
                from: null,
                to: null,
                chronotype: null,
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
                    docID = doc.id;
                })
                if(this.computeSleepEfficiency()) {
                    this.changeDBValues(docID);
                }
            } else {
                this.data = false;
            }

        })
  },
  methods: {
    computeSleepEfficiency() {
        let efficiency = 0.5;
        let changeDB = false;
        if(efficiency < 0.85) {
            this.computeNewTime();
            changeDB = true;
        }
        return changeDB;
    },
    computeNewTime() {
        if(this.chronotype == "eule") {
            let date = new Date();
            date.setHours(this.from.split(":")[0]);
            date.setMinutes(this.from.split(":")[1]);

            let newDate = new Date(moment(date).add(30, 'minutes'));
            let hours = ("0" + newDate.getHours()).slice(-2);
            let minutes = (newDate.getMinutes() + "0").slice(0, 2);
            let newFrom = hours + ":" + minutes;
            this.from = newFrom;
        } else if(this.chronotype == "lerche") {
            let date = new Date();
            date.setHours(this.to.split(":")[0]);
            date.setMinutes(this.to.split(":")[1]);

            let newDate = new Date(moment(date).subtract(30, 'minutes'));
            let hours = ("0" + newDate.getHours()).slice(-2);
            let minutes = (newDate.getMinutes() + "0").slice(0, 2);
            let newTo = hours + ":" + minutes;
            this.to = newTo;
        }
    },
    changeDBValues(id) {
        db.collection("SleepingWindow").doc(id).set({
            from: this.from,
            to: this.to,
            uid: auth.currentUser.uid,
            chronotype: this.chronotype,
            timestamp: this.sleepingWindow.timestamp
        })
    },
    submit() {
        this.sleepingWindow.uid = auth.currentUser.uid;
        this.sleepingWindow.chronotype = this.chronotype;
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