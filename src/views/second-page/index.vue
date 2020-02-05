<template>
  <v-app class="second-page-container">
    <v-card class="second-page-card" outlined>
      <v-card-title>
        <v-icon large left>mdi-file-document</v-icon>
        <span class="title font-weight-light">Hello, second page!</span>
      </v-card-title>
      <p>Data from parent page: {{ $route.query.version }}</p>
      <v-btn @click="handleClickGoBack" color="primary">GO BACK</v-btn>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'second-page',
  methods: {
    handleClickGoBack () {
      this.windowBack({ id: Math.random() })
    }
  }
})
</script>

<style lang="scss" scoped>
.second-page-container {
  margin: 20px;

  .second-page-card {
    padding: 20px;
  }
}
</style>
