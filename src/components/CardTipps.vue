 <template>
    <v-card class="mx-auto mt-2" max-width="400">
        <v-card-title>{{title}}</v-card-title>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>
        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>
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
  }
  </script>
  
  <style>
  
  </style>