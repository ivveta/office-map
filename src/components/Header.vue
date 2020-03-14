<template>
  <v-app-bar
    color="deep-purple accent-4"
    dark
    class="header"
  >
    <v-toolbar-title>Office map, floor {{openedFloor}}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
  import { VAppBar, VToolbarTitle } from 'vuetify/lib';

  export default {
    name: "Header",

    components: {VAppBar, VToolbarTitle},

    props: {
      openedFloor: {
        type: String,
      },
    },

    data: () => ({
      showNavigation: false,
    })
  }
</script>

<style scoped>
  .header {
    margin-bottom: 50px;
  }
</style>
