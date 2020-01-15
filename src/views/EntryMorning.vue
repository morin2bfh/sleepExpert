<!--
In diesem File wird der Morgeneintrag initialisiert.
Die Formularfelder sind in Komponenten realisiert, aber in diesem File werden die eingegebenen
Daten in die Datenbank gespeichert.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
-->
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
import { bus } from "../main";

export default {
  components: {
    CardEntryMorning
  },
  data() {
    return {
      valid: true,
      cards,
      // das Objekt, welches in die Datenbank gespeichert wird
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
    // wird der Morgeneintrag gespeichert, so werden die Daten in die Datenbank gespeichert
    // dazu wird zuerst die UserID in das Objekt morningEntry gespeichert
    submit() {
      this.morningEntry.uid = auth.currentUser.uid;
      if (this.$refs.form.validate()) {
        db.collection("EntryMorning").add(this.morningEntry);
        this.$router.push("/dashboard");
      } else {
        this.$vuetify.goTo(0);
      }
    },
    // wird auf Abbrechen geklickt, so wird der User auf das Dashboard geleitet
    cancel() {
      bus.$emit("changedRoute", "/dashboard");
    },
    // die Änderungen der Formular-Felder werden hierhin weitergeleitet
    // diese werden in das Objekt morningEntry gespeichert
    onChangedValue(changedValue) {
      let value = changedValue.value;
      this.morningEntry[changedValue.id] = value;
    },
    // die Änderungen der Uhr-Felder haben ein anderes Format
    // diese werden in ein Datum gespeichert, welches entweder heute oder gestern ist
    // danach wird das Datum in das Objekt morningEntry gespeichert
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