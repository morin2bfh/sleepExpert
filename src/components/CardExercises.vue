<!--
In diesem File wird die Komponente für die Seite Übungen definiert. Alle Kacheln
weisen Titel, TextExpanded, Bild, Datei sowie die Frage ob die Audio-Datei bereits abgespielt ist auf.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
-->
<template>
<v-card>
  <v-card  dark class="mx-auto mt-2" id="styleCard">
    <v-card-title bold @click="show = !show">{{ title }}</v-card-title>
    <v-card-actions>
      <v-btn icon @click="show = !show">
        <v-icon id="chevron">{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show" id="divStyle">
        <v-card-text id="styleText" bold @click="show = !show">{{ textExpanded }}</v-card-text>
        <v-img class="white--text align-end" @click="show = !show" contain height="15vh" :src="imgSrc">
          <v-overlay absolute opacity="0" z-index="-10"></v-overlay>
          </v-img>
          <v-spacer></v-spacer>
          <slot></slot>
      </div>
    </v-expand-transition>
  </v-card>
  </v-card>
</template>
   
<script>
export default {
  props: {
    title: String,
    textExpanded: String,
    imgSrc: String,
    file: String,
    isPlaying: String
  },
  data: () => ({
    show: false
  })
}
</script>
 
<style>
  .v-card__text {
    justify-content: left;
  }
  .v-card__title {
    word-break: break-word;
    padding: 4px;
  }
  .v-card__actions {
    padding: 0px;
  }
  #styleText {
    font-size: 1.2rem;
  }
  #styleCard {
    padding: 10px;
  }
  #divStyle {
    padding-top: 0px;
  }
</style>