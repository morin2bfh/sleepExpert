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
            .get()

        let me = this;
        window.then(values => {
            if(values.size > 0) {
                this.data = true;      
                let efficiency = this.computeSleepEfficiency();
                console.log(efficiency);
                values.forEach(function(doc) {
                    me.from = doc.data().from;
                    me.to = doc.data().to;
                })
            } else {
                this.data = false;
            }
        })        
  },
  methods: {
    computeSleepEfficiency() {
        let efficiency = 0;
        return efficiency;
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