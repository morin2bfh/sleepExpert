<template>
  <v-card dark @click="goTo(route)" class="mx-auto mt-2" max-width="400">
    <v-layout row child-flex justify-center align-center wrap>
      <v-img contain height="15vh" max-height="70px" :src="imgSrc">
        <v-card-text>{{title}}</v-card-text>
      </v-img>
    </v-layout>
  </v-card>
</template>
<script>
export default {
  name: "card",
  props: {
    title: String,
    imgSrc: String,
    route: String
  },
  methods: {
    goTo(route) {
      this.$router.push("history/" + route);
    }
  }
};
</script>
<style scoped>
</style>