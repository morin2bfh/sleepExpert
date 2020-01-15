<!--
In diesem File wird die Komponente für den das Formular-Feld Uhr definiert.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
-->
<template>
  <v-col cols="12" sm="4">
    <v-dialog ref="dialog" v-model="clockTime" :return-value.sync="time" persistent width="290px">
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="time"
          :label="label"
          :rules="ruleClockTime"
          :disabled="disabled"
          prepend-inner-icon="$vuetify.icons.clock"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="clockTime"
        :id="id"
        :disabled="disabled"
        v-model="time"
        full-width
        format="24hr"
        color="yellow darken-3"
        @change="onClockChanged()"
      >
        <v-spacer></v-spacer>
        <v-btn text color="yellow darken-3" @click="clockTime = false">Abbrechen</v-btn>
        <v-btn text color="yellow darken-3" @click="save(time)">Übernehmen</v-btn>
      </v-time-picker>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    id: String,
    disabled: Boolean
  },
  data() {
    return {
      // Variabel, um den Wert des Textfelds zu speichern
      time: null,
      clockTime: false,
      clock: false,
      // Regel, dass die Uhr immer ein Pflichtfeld ist
      ruleClockTime: [v => !!v || "Dies ist ein Pflichtfeld"]
    };
  },
  created() {
    // wurde eine value mitgegeben, so wird diese in das Textfeld geschrieben
    // dies wird für den Verlauf gebraucht
    if (this.value) {
      this.time = this.value;
    }
  },
  methods: {
    // wird auf Übernehmen geklickt, wird die ausgewählte Zeit gespeichert
    save(time) {
      this.$refs.dialog.save(time);
    },
    // ändert sich die Uhr, so wird die Änderung an die Ober-Komponente weitergegeben
    onClockChanged() {
      const changedClock = {
        value: this.time,
        id: this.id
      };
      this.$emit("changedClock", changedClock);
    }
  }
};
</script>