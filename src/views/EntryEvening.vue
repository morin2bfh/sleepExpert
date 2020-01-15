<!--
In diesem File wird der Abendeintrag initialisiert.
Die Formularfelder sind in Komponenten realisiert, aber in diesem File werden die eingegebenen
Daten in die Datenbank gespeichert.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
-->
<template>
  <v-container id="containerEveningEntry">
    <v-form ref="form" v-model="valid" lazy-validation>
      <card-entry-evening
        dark
        v-for="card in cards"
        :key="card.title"
        :title="card.title"
        :option="card.option"
        :label="card.label"
        :id="card.id"
        :value="card.value"
        @changedValue="onChangedValue($event)"
      ></card-entry-evening>
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
import CardEntryEvening from "@/components/CardEntryEvening.vue";
import cards from "@/config/eveningEntryConfig.js";
import db from "../fb";
import { auth } from "../fb";
import { bus } from "../main";

export default {
  components: {
    CardEntryEvening
  },
  data() {
    return {
      valid: true,
      cards,
      // das Objekt, welches in die Datenbank gespeichert wird
      eveningEntry: {
        dayTiredness: null,
        concentration: null,
        mood: null,
        relaxation: null,
        daySleep: [false, false, false],
        stimulants: [false, false, false, false],
        timestamp: new Date(),
        uid: null
      }
    };
  },
  methods: {
    // wird der Abendeintrag gespeichert, so werden die Daten in die Datenbank gespeichert
    // dazu wird zuerst die UserID in das Objekt eveningEntry gespeichert
    submit() {
      this.eveningEntry.uid = auth.currentUser.uid;
      if (this.$refs.form.validate()) {
        db.collection("EntryEvening").add(this.eveningEntry);
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
    // diese werden in das Objekt eveningEntry gespeichert
    onChangedValue(changedValue) {
      let value = changedValue.value;
      this.eveningEntry[changedValue.id] = value;
    }
  }
};
</script>
<style scoped>
#containerEveningEntry {
  padding-bottom: 50px;
}
#layoutButtons {
  padding: 10px;
}
</style>