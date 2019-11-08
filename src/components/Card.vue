<template>
  <v-card class="mx-auto mt-2" max-width="300px" height="28vh" dark @click="goTo(route)">
    <v-img class="white--text align-end" contain height="18vh" :src="imgSrc">
      <v-overlay absolute opacity="0.2" z-index="-10"></v-overlay>
      <v-card-title>{{title}}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-3 gradient">{{subtitle}}</v-card-subtitle>
  </v-card>
</template>
<script>
export default {
  name: "card",
  props: {
    title: String,
    subtitle: String,
    text: String,
    imgSrc: String,
    route: String
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    }
  }
};
</script>
<style scoped>
.gradient {
  background-image: linear-gradient(
    to top,
    rgba(244, 244, 244, 0.1),
    rgba(244, 244, 244, 0.1)
  );
}
.v-image__image {
  opacity: 0.5;
}
</style>