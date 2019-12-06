<template>
  <v-card dark @click="goTo(route)" >
    <v-img class="white--text align-end" contain height="15vh" :src="imgSrc">
      <v-overlay absolute opacity="0.5" z-index="-10"></v-overlay>
      <v-card-title>{{title}}</v-card-title>
    </v-img>
    <v-card-text height="10vh">{{subtitle}}</v-card-text>
  </v-card>
</template>
<script>
import { bus } from "../main";

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
     bus.$emit("changedRoute", route);
    }
  }
};
</script>
<style scoped>
</style>