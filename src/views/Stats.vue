<template>
  <v-card class="mx-auto pt-5" max-width="400" dark>
    <v-img :src="imgScr" height="250px" contain></v-img>

    <v-card-title class="ml-3">Deine Schlafstatistik</v-card-title>

    <v-card-subtitle class="my-auto">Hier findest du bald deine Schlafstatistik</v-card-subtitle>
    <v-card-actions>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>Diese Funktion ist noch in Entwicklung. Hier wirst du aber bald deine Schlafstatistik finden. In der Statistik kannst du nachsehen, wie gut du durchschnittlich schläfst oder wie sich deine Schlafqualität entwickelt hat.</v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    imgScr: require("../assets/comingsoon.png"),

    show: false
  })
};
</script>
