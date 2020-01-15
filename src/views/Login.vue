<!--
Login-Page für bereits registrierte User

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
-->

<template>
  <v-container class="d-flex flex-column align-center">
    <v-avatar min-width="200px" min-height="200px" class="mb-8">
      <img id="logo-login" src="../assets/sun.png" alt="Sleepexpert Logo" />
    </v-avatar>
    <v-card dark>
      <v-card-title class="headline">Login</v-card-title>
      <v-card-subtitle class="d-flex flex-column">
        <v-form dark class>
          <v-text-field
            :error="emailError"
            :error-messages="emailErrMsg"
            v-model="userMail"
            placeholder="E-Mail"
            required
          ></v-text-field>
          <v-text-field
            :error="pwError"
            :error-messages="pwErrMsg"
            dark
            v-model="password"
            type="password"
            placeholder="Passwort"
            required
          ></v-text-field>
        </v-form>
        <v-container d-flex flex-row justify-end id="button-container">
          <v-btn color="yellow darken-2" @click="submit()">Anmelden</v-btn>
        </v-container>
      </v-card-subtitle>
      <v-banner id="link-banner" dark color="yellow darken-2">
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
#logo-login {
  height: 100%;
  width: 100%;
}
</style>