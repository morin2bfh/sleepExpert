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
          <v-btn color="#FBC02D" @click="submit()">Anmelden</v-btn>
        </v-container>
      </v-card-title>
    </v-card>
    <router-link to="/login">zurück zum Login</router-link>
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
        .createUserWithEmailAndPassword(this.userMail, this.password)
        .then(() => {
          this.$router.push("/dashboard");
        }) //if an error occurs
        .catch(function(err) {
          //get the error code
          var code = err.code;
          if (code == "auth/weak-password") {
            this.pwError = true;
            this.pwErrMsg = "Passwort muss mindesten 6 Zeichen enthalten.";
          } else if (code == "auth/invalid-email") {
            this.emailError = true;
            this.emailErrMsg = "üngültige Email Adresse";
          } else if (code == "auth/email-already-in-use") {
            this.emailError = true;
            this.emailErrMsg =
              "Email Adresse wird bereits verwendet. Gehen Sie zu Login";
          } else {
            console.log(err);
          }
        });
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
</style>