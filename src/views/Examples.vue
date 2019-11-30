<template>
  <v-container class="d-flex flex-column mt-4">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="name" :rules="nameRules" label="Name" required dark></v-text-field>
      <v-slider v-model="age" min="1" max="100" label="Age" required dark></v-slider>
      <v-menu transition="scale-transition" offset-y max-width="290px" min-width="290px">
        <template v-slot:activator="{on}">
          <v-text-field
            v-model="dateFormatted"
            slot="activator"
            label="Datum auswählen"
            prepend-icon="$vuetify.icons.date"
            readonly
            v-on="on"
            dark
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title dark></v-date-picker>
      </v-menu>
      <v-btn @click="submit" dark>Add to Database</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="logout" dark>Logout</v-btn>
    </v-form>
  </v-container>
</template>
<script>
import db from "../fb";
import { auth } from "../fb";

export default {
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      age: 0,
      date: new Date().toISOString(),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu: false
    };
  },

  watch: {
    date: function(val) {
      this.dateFormatted = this.formatDate(val);
    }
  },
  methods: {
    formatDate(date) {
      if (!date) {
        return null;
      }
      const [year, month, day] = date.substr(0, 10).split("-");
      return `${day}.${month}.${year}`;
    },
    submit() {
      if (this.$refs.form.validate()) {
        const dummy = {
          age: this.age,
          name: this.name,
          date: this.date
        };

        db.collection("DummyDump").add(dummy);
      }
    },
    logout() {
      auth.signOut().then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
<style scoped>
.container {
  max-width: 50vw;
  background-color: #424242;
}
</style>
