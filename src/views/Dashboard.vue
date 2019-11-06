<template>
  <v-container>
    <card
      v-for="card in cards"
      :key="card.title"
      @click="goTo(card.route)"
      :title="card.title"
      :subtitle="card.subtitle"
      :imgSrc="(card.imgSrc)"
      :route="card.route"
    ></card>
  </v-container>
</template>
<script>
import Card from "@/components/Card.vue";
export default {
  components: {
    Card
  },
  data() {
    return {
      cards: [
        {
          title: "Morgeneintrag",
          subtitle:
            "Erfasse einen neuen Eintrag, um deine Schlafdauer und -Qualität zu dokumentieren.",
          imgSrc: require("../assets/sun.png"),
          route: "/entryMorning"
        },
        {
          title: "Abendeintrag",
          subtitle:
            "Erfasse einen neuen Eintrag, um dein Befinden tagüber zu dokumentieren.",
          imgSrc: require("../assets/moon.png"),
          route: "/entryEvening"
        }
      ]
    };
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    }
  }
};
</script>