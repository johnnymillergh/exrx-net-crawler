<template>
  <div>
    <h1>Hello, second page!</h1>
    <button @click="handleClickGoBack">GO BACK</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'hello-world',
  methods: {
    handleClickGoBack () {
      this.windowBack({ id: Math.random() })
    }
  }
})
</script>

<style scoped>

</style>
