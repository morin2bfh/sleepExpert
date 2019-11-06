<template>
  <v-card class="mx-auto mt-2" max-width="400" dark>
    <v-img class="white--text align-end" height="200px" :src="imgSrc">
      <v-card-title>{{title}}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">{{subtitle}}</v-card-subtitle>
  </v-card>
</template>
<script>
export default {
  name: "card",
  props: {
    title: String,
    subtitle: String,
    text: String,
    imgSrc: String
  }
};
</script>