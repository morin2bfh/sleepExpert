<template>
  <v-container>
    <v-card dark>
      <v-card-title class="d-flex flex-column">
        <v-form dark class>
          <v-text-field dark v-model="userMail" label="E-Mail" required></v-text-field>
          <v-text-field
            :error="pwError"
            dark
            v-model="password"
            type="password"
            label="Passwort"
            required
          ></v-text-field>
        </v-form>
        <v-container d-flex flex-row justify-end id="button-container">
          <v-btn color="#FBC02D" @click="submit()">Anmelden</v-btn>
        </v-container>
      </v-card-title>
    </v-card>
    <router-link to="/signup">Noch kein Konto? Zur Registrierung</router-link>
  </v-container>
</template>
<script>
import { auth } from "../fb";
export default {
  components: {},
  data: () => ({
    userMail: "",
    password: "",
    pwError: false
  })
};
</script>
<style scoped>
.v-form {
  min-width: 70% !important;
}
#button-container {
  max-width: 70% !important;
}
</style>