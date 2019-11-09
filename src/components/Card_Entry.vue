<template>
<v-card class="mx-auto mt-2" max-width="400" dark>
      <v-card-title >{{title}}</v-card-title>
  </v-card>
</template>
<script>
export default {
  name: "card",
  props: {
    title: String,
    imgSrc: String
  }
};
</script>