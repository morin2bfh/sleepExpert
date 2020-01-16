 <!--
In diesem File wird die Komponente für die Seite Tipps definiert.
Alle Kacheln weisen Titel, Untertitel und TextExpanded auf.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
-->
<template>
  <v-card @click="show = !show" dark class="mx-auto mt-2" id="styleCard">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle class="my-auto">{{ subtitle }}</v-card-subtitle>
    <v-card-actions>
      <v-btn icon>
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-card-text id="styleText">{{ textExpanded }}</v-card-text>
        <slot></slot>
      </div>
    </v-expand-transition>
  </v-card>
</template>
   
<script>
export default {
  props: {
    title: String,
    subtitle: String,
    textExpanded: String
  },
  data: () => ({
    show: false
  })
}
</script>
 
<style>
  .v-card__actions {
    justify-content: flex-end;
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
</style>