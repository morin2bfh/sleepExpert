<template>
  <v-container id="containerMorningEntry">
    <h1 align="center">Morgeneintrag erfassen</h1>
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
        <v-btn color="#FBC02D" @click="submit()">Speichern</v-btn>
        <v-spacer></v-spacer>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import CardEntryMorning from "@/components/CardEntryMorning.vue";
import db from "../fb";

export default {
  components: {
    CardEntryMorning
  },
  data() {
    return {
      valid: true,
      cards: [
        {
          option: "clockOption",
          title: "Zu Bett gegangen um: *",
          label: "Uhrzeit",
          id: "bedTime"
        },

        {
          option: "clockOption",
          title: "Licht gelöscht um: *",
          label: "Uhrzeit",
          id: "lightsOut"
        },

        {
          option: "hhmmOption",
          title: "Geschätzte Einschlafdauer: *",
          label: "hh:mm",
          id: "fallAsleepTime"
        },
        {
          option: "hhmmOption",
          title: "Wie lange wach in der Nacht: *",
          label: "hh:mm",
          id: "durationAwake"
        },
        {
          option: "clockOption",
          title: "Endgültig aufgewacht um: *",
          label: "Uhrzeit",
          id: "wakeUpTime"
        },
        {
          option: "clockOption",
          title: "Morgens aufgestanden um: *",
          label: "Uhrzeit",
          id: "standUpTime"
        },
        {
          option: "sliderOption",
          title: "Schlafqualität:",
          label: "Gut",
          id: "sleepQuality",
          value: "0"
        },
        {
          option: "sliderOption",
          title: "Gefühl des Erholtseins:",
          label: "Gut",
          id: "relaxation",
          value: "0"
        },
        {
          option: "sliderOption",
          title: "Müdigkeit beim Zubettgehen:",
          label: "Keine",
          id: "tiredness",
          value: "0"
        },
        {
          option: "numbersOption",
          title: "Wie oft aufgewacht:",
          label: "Anzahl",
          id: "timesAwake"
        },
        {
          option: "checkboxOption",
          title: "Schlafmittel genommen:",
          id: "medication",
          value: "[false, false]"
        }
      ],
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
        timestamp: new Date()
      }
    };
  },
  methods: {
    submit() {
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
   /*  onChangedTime(changedTime) {
      let value = changedTime.value;
      let minutes = value.split(":")[0] * 60 + value.split(":")[1] * 1;
      this.morningEntry[changedTime.id] = minutes;
    }, */
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