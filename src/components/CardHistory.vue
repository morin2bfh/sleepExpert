<template>
   
   <v-card dark @click="goTo(route)" class="mx-auto mt-2" max-width="400">
      <v-img 
        class="white--text align-end" 
        contain height="15vh" 
        v-if="option == 'optionEntry'"
        :src="imgSrc">
      </v-img>
    <v-card-title>{{ title }}</v-card-title>
   </v-card>
</template>
<script>

export default {
  name: "card",
  props: {
    title: String,
    imgSrc: String,
    option: String,
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
</style>