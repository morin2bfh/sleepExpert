<template>
  <v-container class="flex-column justify-space-around" id="container">
    <card-tipps
      v-for="card in cards"
      :key="card.title"
      :title="card.title"
      :textExpanded="card.textExpanded"
    >
      <v-img contain height="30vh" width="300px" :src="card.imgSrc"/>
    </card-tipps>
  </v-container>
</template>

<script>
import CardTipps from "@/components/CardTipps.vue";

export default {
  components: {
    CardTipps,
  },
  data: () => ({
    show: false,
    cards: [
      {
        title: "Schlafdruck",
        textExpanded: "Körperlich bedingte Schläfrigkeit, wird umso grösser, je länger man wach ist. Schlaf am Tag führt zu reduziertem Schlafdruck, was in der Nacht zu Ein- oder Durchschlaf-Probleme führt.",
        imgSrc: require("../assets/Individueller_Schlafdruck-1.png")
      },
       {
        title: "Individueller Schlafrhythmus",
        textExpanded: "Es gibt unterschiedliche Rhythmustypen. Wer ein Spättyp ist, kann auch gut nach Mitternacht zu Bett gehen und hat dadurch keinen Schaden – im Gegenteil: Es ist gut, nach dem persönlichen Rhythmus zu leben, wenn die Verpflichtungen es zulassen.",
        imgSrc: require("../assets/Chronotypen.png")
      },
    ]
  })
};
</script>

<style scoped>
  #container {
    padding-bottom: 80px;
  }
</style>
