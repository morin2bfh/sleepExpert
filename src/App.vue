<template>
  <div id="app">
    <div id="app">
    <div id="nav">

      <router-link to="/dashboard">Dashboard</router-link> &#x2606;
      <router-link to="/entryMorning">Morgeneintrag</router-link> &#x2606;
      <router-link to="/entryEvening">Abendeintrag</router-link> &#x2606;
      <router-link to="/history">Verlauf</router-link> &#x2606;
      <router-link to="/stats">Statistik</router-link> &#x2606;
      <router-link to="/info">Informationen</router-link>
    </div>
    <router-view/>
  </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  /*components: {
    HelloWorld
  }*/
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #dbdbdb;
  background-color: #120b01;
  margin-top: 60px;
}
#nav {
  padding: 30px;
  font-size: 24px;
}

#nav a {
  font-weight: 200;
  text-decoration: none;
  color: #F5F5F5;
}

#nav a.router-link-exact-active {
  color: #f2b161;
  padding-bottom: 2px;
  padding-top: 2px;
  border-bottom: 1px solid #F5F5F5;
  border-top: 1px solid #F5F5F5;
}
</style>
