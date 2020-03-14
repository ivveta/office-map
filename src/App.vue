<template>
  <v-app id="app">
    <Map/>
  </v-app>
</template>

<script>
import Map from './pages/Map.vue'
import { VApp } from 'vuetify/lib'

export default {
  name: 'app',
  components: {
    Map,
    VApp
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');

  p {
    margin: 0;
  }

  #app {
    font-family: 'Roboto', sans-serif;
    line-height: 1.4;
  }

</style>
