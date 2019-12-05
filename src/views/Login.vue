<template>
  <v-container>
    <v-card dark>
      <v-card-title class="d-flex flex-column">
        <v-form dark class>
          <v-text-field
            :error="emailError"
            :error-messages="emailErrMsg"
            v-model="userMail"
            label="E-Mail"
            required
          ></v-text-field>
          <v-text-field
            :error="pwError"
            :error-messages="pwErrMsg"
            dark
            v-model="password"
            type="password"
            label="Passwort"
            required
          ></v-text-field>
        </v-form>
        <v-container d-flex flex-row justify-end id="button-container">
          <v-btn color="yellow darken-2" @click="submit()">Anmelden</v-btn>
        </v-container>
      </v-card-title>
      <v-banner id="link-banner" single-line dark color="yellow darken-2">
        Noch kein Konto?
        <v-btn color="yellow darken-2" text @click="goTo('signup')">Zur Registrierung</v-btn>
      </v-banner>
    </v-card>
  </v-container>
</template>
<script>
import { auth } from "../fb";
export default {
  components: {},
  data: () => ({
    userMail: "",
    password: "",
    emailError: false,
    emailErrMsg: "",
    pwError: false,
    pwErrMsg: ""
  }),
  methods: {
    submit() {
      //reset the error messages and states.
      this.emailError = false;
      this.emailErrMsg = "";
      this.pwError = false;
      this.pwErrMsg = "";

      auth
        .signInWithEmailAndPassword(this.userMail, this.password)
        .then(() => {
          this.$router.push("/dashboard");
        }) //if an error occurs
        .catch(err => {
          //get error code
          var code = err.code;
          if (code == "auth/invalid-email") {
            this.emailError = true;
            this.emailErrMsg = "üngültige Email Adresse";
          } else if (code == "auth/wrong-password") {
            this.pwError = true;
            this.pwErrMsg = "falsches Passwort";
          } else if (code == "auth/user-not-found") {
            this.emailError = true;
            this.emailErrMsg = "Es wurde kein Nutzer gefunden.";
          } else {
            console.log(err);
          }
        });
    },
    goTo(route) {
      this.$router.push(route);
    }
  }
};
</script>
<style scoped>
.v-form {
  min-width: 70% !important;
}
#button-container {
  max-width: 70% !important;
}
#link-banner {
  max-width: 70% !important;
}
</style>