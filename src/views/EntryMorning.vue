<template>
  <v-container id="containerMorningEntry">
    <h1 prepend-inner-icon="$vuetify.icons.clock"
      align="center">Morgeneintrag erfassen</h1>

    <v-form ref="form" lazy-validation>
      <card-entry-morning
        dark
        v-for="card in cards"
        :key="card.title"
        :title="card.title"
        :option="card.option"
        :label="card.label"
        :id="card.id"
        @changedValue="onChange($event)"
      >
      </card-entry-morning>
      
      <v-layout row child-flex justify-center align-center wrap id="layoutButtons">
        <v-spacer></v-spacer>
        <v-btn color="#6D4C41" @click=cancel() 
        >Abbrechen</v-btn><v-spacer></v-spacer>
        <v-btn color="#FBC02D" @click=submit() 
        >Speichern</v-btn><v-spacer></v-spacer>
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
      cards: [
        {
          option: "sliderOption",
          title: "Schlafqualität:",
          label: "Gut",
          id: "sleepQuality"
        },
        {
          option: "sliderOption",
          title: "Gefühl des Erholtseins:",
          label: "Gut",
          id: "relaxation"
        },
        {
          option: "sliderOption",
          title: "Müdigkeit beim Zubettgehen:",
          label: "Keine",
          id: "tiredness",
        },
        {
          option: "clockOption", 
          title: "Zu Bett gegangen um:", 
          label: "Uhrzeit",
          id: "bedTime",
        },
        {
          option: "clockOption", 
          title: "Licht gelöscht um:", 
          label: "Uhrzeit",
          id: "lightsOut",
        },
        {
          option: "hhmmOption", 
          title: "Geschätzte Einschlafdauer:", 
          label: "hh:mm", 
          id: "fallAsleepTime",
        },
        {
          option: "numbersOption", 
          title: "Wie oft aufgewacht:", 
          label: "Anzahl",
          id: "timesAwake", 
        },
        {
          option: "hhmmOption",
          title: "Wie lange wach in der Nacht:",
          label: "hh:mm",
          id: "durationAwake",
        },
        {
          option: "clockOption",
          title: "Endgültig aufgewacht um:",
          label: "Uhrzeit",
          id: "wakeUpTime",
        },
        {
          option: "clockOption",
          title: "Morgens aufgestanden um:",
          label: "Uhrzeit",
          id: "standUpTime",
        },
        {
          option: "checkboxOption", 
          title: "Schlafmittel genommen:",
          id: "medication"
        }
      ],
      morningEntry: {
        standUpTime: null,
          wakeUpTime: null,
          bedTime: null,
          durationAwake: null,
          fallAsleepTime: null,
          lightsOut: null,
          medication: [],
          relaxation: null,
          sleepQuality: null,
          timesAwake: null,
          tiredness: null
      }
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        db.collection("EntryMorning").add(this.morningEntry);
      }

      this.$router.push('/dashboard');
    },
    cancel() {     
        this.$router.push('/dashboard');
    },
    onChange(changedValue) {
      this.morningEntry[changedValue.id] = changedValue.value;
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