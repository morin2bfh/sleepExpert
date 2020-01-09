<template>
  <v-card class="mx-auto pt-5" max-width="400" dark>
    <v-img :src="imgScr" height="250px" contain></v-img>
    <card-tips
      :key="title"
      :title="title"
      :subtitle="subtitle"
      :textExpanded="textExpanded"
    >
    </card-tips>
  </v-card>
</template>

<script>
import CardTips from "@/components/CardTips.vue";

export default {
  components: {
    CardTips
  },
  data: () => ({
    title: "Deine Schlafstatistik",
    subtitle: "Hier findest du bald deine Schlafstatistik",
    textExpanded: "Diese Funktion ist noch in Entwicklung. Hier wirst du aber bald deine Schlafstatistik finden. In der Statistik kannst du nachsehen, wie gut du durchschnittlich schläfst oder wie sich deine Schlafqualität entwickelt hat.",
    imgScr: require("../assets/comingsoon.png")
  })
};
</script>
