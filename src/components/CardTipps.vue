<template>
  <v-card @click="show = !show" dark class="mx-auto mt-2" id="styleCard">
    <v-card-title bold>{{title}}</v-card-title>
    <v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-card-text id="styleText" bold>{{textExpanded}}</v-card-text>
          <slot></slot>
        </div>
      </v-expand-transition>
      <v-btn icon>
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
   
<script>
export default {
  props: {
    title: String,
    textExpanded: String,
  },
  data: () => ({
    show: false,
    })
  }

</script>
 
<style>
  .v-card__actions {
    justify-content: flex-end;
  }
  .v-card__title {
    word-break: break-word;
    padding: 4px;
  }
  .v-card__actions {
    padding: 0px;
  }
  #styleText{
    font-size: 1.2rem;
  }
  #styleCard{
    padding: 10px;
  }
</style>