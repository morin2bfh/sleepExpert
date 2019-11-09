<template>
  <v-container>
    <h1 align="center">Morgeneintrag erfassen</h1>

    <card-entry
      dark
      v-for="card in cards"
      :key="card.title"
      :title="card.title"
      :option="card.option"
      :label="card.label"
    ></card-entry>
  </v-container>
</template>

<script>
import CardEntry from "@/components/CardEntry.vue";
export default {
  components: {
    CardEntry
  },

  data() {
    return {
      cards: [
        {
          option: "slider",
          title: "Schlafqualität:",
          label: "Gut"
        },
        {
          option: "slider",
          title: "Gefühl des Erholtseins:",
          label: "Gut"
        },
        {
          option: "slider",
          title: "Müdigkeit beim Zubettgehen:",
          label: "Keine"
        },
        { option: "clock", title: "Zu Bett gegangen um:", label: "Uhrzeit" },
        { option: "clock", title: "Licht gelöscht um:", label: "Uhrzeit" },
        { option: "hhmm", title: "Geschätzte Einschlafdauer:", label: "hh:mm" },
        { option: "numbers", title: "Wie oft aufgewacht:", label: "Anzahl" },
        {
          option: "hhmm",
          title: "Wie lange wach in der Nacht:",
          label: "hh:mm"
        },
        {
          option: "clock",
          title: "Endgültig aufgewacht um:",
          label: "Uhrzeit"
        },
        {
          option: "clock",
          title: "Morgens aufgestanden um:",
          label: "Uhrzeit"
        },
        { option: "checkbox", title: "Schlafmittel genommen:" },
        { option: "buttons" }
      ]
    };
  },

  methods: {
    save(time) {
      this.$refs.dialog.save(time);
    }
  }
};
</script>