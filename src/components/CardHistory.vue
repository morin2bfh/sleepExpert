<!--
In diesem File werden die Verlaufseinträge aufgelistet. Jedes Element enthält als Titel
das Datum des Eintrages und die entsprechende Bildquelle, zudem wird das gesamte Data-Objekt,
also die Werte eines Eintrages mitgegeben.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
-->

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
    route: String,
    data: Object,
    morning: Boolean
  },
  methods: {
    goTo(route) {
      if (this.morning) {
        //dem router können die Daten als Parameter weitergegeben werden, sodass
        //diese in der Ansicht dann nicht erneut aus der DB geladen werden müssen.
        this.$router.push({
          name: "MorgeneintragHistory",
          params: { id: route, data: this.data }
        });
      } else {
        //dem router können die Daten als Parameter weitergegeben werden, sodass
        //diese in der Ansicht dann nicht erneut aus der DB geladen werden müssen.
        this.$router.push({
          name: "AbendeintragHistory",
          params: { id: route, data: this.data }
        });
      }
    }
  }
};
</script>
<style scoped>
</style>