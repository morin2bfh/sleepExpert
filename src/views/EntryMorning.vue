<template>
  <v-container id="containerMorningEntry">
    <v-form ref="form" v-model="valid" lazy-validation>
      <card-entry-morning
        dark
        v-for="card in cards"
        :key="card.title"
        :title="card.title"
        :option="card.option"
        :label="card.label"
        :id="card.id"
        :value="card.value"
        @changedValue="onChangedValue($event)"
        @changedTime="onChangedTime($event)"
        @changedClock="onChangedClock($event)"
      ></card-entry-morning>

      <v-layout row child-flex justify-center align-center wrap id="layoutButtons">
        <v-spacer></v-spacer>
        <v-btn color="#6D4C41" @click="cancel()">Abbrechen</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="yellow darken-2" @click="submit()">Speichern</v-btn>
        <v-spacer></v-spacer>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import CardEntryMorning from "@/components/CardEntryMorning.vue";
import cards from "@/config/morningEntryConfig.js";
import db from "../fb";
import { auth } from "../fb";

export default {
  components: {
    CardEntryMorning
  },
  data() {
    return {
      valid: true,
      cards,
      morningEntry: {
        standUpTime: null,
        wakeUpTime: null,
        bedTime: null,
        durationAwake: null,
        fallAsleepTime: null,
        lightsOut: null,
        medication: [false, false],
        relaxation: null,
        sleepQuality: null,
        timesAwake: null,
        tiredness: null,
        timestamp: new Date(),
        uid: null
      }
    };
  },
  methods: {
    submit() {
      this.morningEntry.uid = auth.currentUser.uid;
      if (this.$refs.form.validate()) {
        db.collection("EntryMorning").add(this.morningEntry);
        this.$router.push("/dashboard");
      } else {
        this.$vuetify.goTo(0);
      }
    },
    cancel() {
      this.$router.push("/dashboard");
    },
    onChangedValue(changedValue) {
      let value = changedValue.value;
      this.morningEntry[changedValue.id] = value;
    },
    onChangedClock(changedClock) {
      let value = changedClock.value;
      let date = new Date();
      date.setHours(value.split(":")[0]);
      date.setMinutes(value.split(":")[1]);
      date.setSeconds("00");
      if (date.getHours() > "14") {
        date.setDate(date.getDate() - 1);
      }

      this.morningEntry[changedClock.id] = date;
    }
  }
};
</script>

<style scoped>
#containerMorningEntry {
  padding-bottom: 50px;
}
#layoutButtons {
  padding: 10px;
}
</style>