<template>
  <h1>Hello</h1>
</template>
<script>
export default {
  created() {
    console.log(this.$route.params.id);
    console.log(this.$route.params.data);
  }
};
</script>
<style scoped>
</style>