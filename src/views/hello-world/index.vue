<template>
  <div class="home">
    <hello-world msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default Vue.extend({
  name: 'hello-world',
  components: {
    HelloWorld
  }
})
</script>
