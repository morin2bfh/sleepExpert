<!--
In diesem File wird die Ansicht zu der Seite Übungen initialisiert.
Die Daten, welche benötigt werden, werden aus dem Array cards der data() Funktion eingelesen.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
-->
<template>
  <v-container class="flex-column justify-space-around" id="container">
    <h2 class="white--text text-center">Progressive Muskelrelaxion</h2>
    <card-exercises
      v-for="card in cards"
      :key="card.title"
      :title="card.title"
      :textExpanded="card.textExpanded"
      :imgSrc="card.imgSrc"
    >
      <v-layout class="py-4 align-end justify-end">
        <v-btn
          color="yellow darken-3"
          @click.prevent="card.isPlaying ? pause(card) : play(card)"
          :key="card.title"
        >{{ card.isPlaying ? 'Pause' : 'Play' }} {{ card.title }}
        </v-btn>
      </v-layout>
    </card-exercises>
  </v-container>
</template>

<script>
// Komponent CardExercises wird importiert
import CardExercises from "@/components/CardExercises.vue";

export default {
  components: {
    // CardExercises wird initialisiert
    CardExercises,
  },
  methods: {
    // Diese Methode startet die Audio-Datei
    play(audio) {
      audio.isPlaying = true;
      // Startet die Audio-Datei
      audio.file.play();
    },
    // Diese Methode pausiert die abspielende Audio-Datei
    pause(audio) {
      audio.isPlaying = false;
      // Pausiert die Audio-Datei
      audio.file.pause();
    }
  },
  data() {
    return {
      audio: "",
      isPlaying: false,
      // Definiert die Daten die in die jeweiligen Cards eingefügt werden
      cards: [
        {
          title: "Allgemeine Informationen",
          textExpanded:
            "Übungen im Tagesablauf fixieren.\nTechnik im Sitzen lernen.\nMöglichst ohne Hilfen lernen.\nWenn etwas während der Übung stört, ändere es (z.B.: Jucken).\nGedanklicher abschweif während der Übung ist normal, einfach zurückkehren.\nErst richtig Üben, dann für das richtige einsetzten.\nÜbungen kürzen oder verlängern, je nach Bedürfnis.\nEntspannungsphase ist ~3x so lang wie Anspannungsphase.\nGesamte Übung dauer 10-15 Minuten",
          imgSrc: require("../assets/meditation_uebung.png"),
          file: new Audio(require("../assets/Einleitung.mp3")),
          isPlaying: false
        },
        {
          title: "Arme",
          textExpanded:
            "Beide Hände zu Fäusten ballen → Anspannen der Hände und Unterarme. Nun Hände zur Schulter führen → Anspannen der Oberarme",
          imgSrc: require("../assets/Arm.png"),
          file: new Audio(require("../assets/Arme.mp3")),
          isPlaying: false
        },
        {
          title: "Beine",
          textExpanded:
            "Fersen auf den Boden pressen, Zehen nach oben richten, Unterschenkel, Oberschenkel und Gesässmuskeln anspannen",
          imgSrc: require("../assets/Beine.png"),
          file: new Audio(require("../assets/Beine.mp3")),
          isPlaying: false
        },
        {
          title: "Brust",
          textExpanded:
            "Entspannen, ruhig und tief einatmen. Luft kurz anhalten → Anspannen der Brustmuskulatur. Wieder ruhig atmen und Entspannung fühlen",
          imgSrc: require("../assets/Brust_t.png"),
          file: new Audio(require("../assets/Brust.mp3")),
          isPlaying: false
        },
        {
          title: "Nacken und Hals",
          textExpanded:
            "Kopf nach hinten drücken → Anspannen des Nackens. Kopf nach vorne auf die Brust drücken → Anspannen der Halsmuskeln",
          imgSrc: require("../assets/Hals_t.png"),
          file: new Audio(require("../assets/NackenHals.mp3")),
          isPlaying: false
        }
      ]
    };
  }
};
</script>

<style scoped>
#container {
  padding-bottom: 80px;
}
#layoutCards {
  padding: 10px;
}
</style>
