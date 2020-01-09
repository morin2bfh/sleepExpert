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
    submit() {
      this.eveningEntry.uid = auth.currentUser.uid;
      if (this.$refs.form.validate()) {
        db.collection("EntryEvening").add(this.eveningEntry);
        this.$router.push("/dashboard");
      } else {
        this.$vuetify.goTo(0);
      }
    },
    cancel() {
      bus.$emit("changedRoute", "/dashboard");
    },
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