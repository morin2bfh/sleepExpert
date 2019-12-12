 <template>
    <v-card dark class="mx-auto mt-2">
        <v-card-title>{{title}}</v-card-title>
        <v-card-actions justify="end">
            <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>
        <v-expand-transition>
            <div v-show="show">
                <v-card-text>{{textExpanded}}</v-card-text>
            </div>
        </v-expand-transition>
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
  </style>