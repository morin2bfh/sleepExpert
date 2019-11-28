<template>
  <h1>Statistik</h1>
</template>
<script>
import { auth } from "../fb";
export default {
  created: function() {
    var user = auth.currentUser;
    if (user == null) {
      this.$router.push("/login");
    }
  }
};
</script>