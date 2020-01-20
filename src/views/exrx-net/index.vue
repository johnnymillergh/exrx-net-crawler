<template>
  <v-app id="exrx-app">
    <v-card id="exrx-card" outlined>
      <v-card-title>
        <v-icon large left>mdi-file-document</v-icon>
        <span class="title font-weight-light">ExRx.net Document</span>
      </v-card-title>
      <div id="result-container">
        <body-part/>
        <v-divider class="content-divider"/>
        <muscle v-on:muscle-link-generated="handelMuscleLinkGenerated"/>
        <v-divider class="content-divider"/>
        <muscle-link-view :muscle-link-list="muscleLinkList"/>
      </div>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import BodyPart from './components/body-part.vue'
import Muscle from './components/muscle.vue'
import MuscleLinkView from './components/muscle-link.vue'
// eslint-disable-next-line no-unused-vars
import { MuscleLink } from '@/domain/muscle/muscle-link'

export default Vue.extend({
  name: 'exrx-net',
  components: {
    BodyPart,
    Muscle,
    MuscleLinkView
  },
  data: () => ({
    muscleLinkList: [] as Array<MuscleLink>
  }),
  methods: {
    handelMuscleLinkGenerated (generatedMuscleLinkList: Array<MuscleLink>) {
      this.muscleLinkList = generatedMuscleLinkList
    }
  }
})
</script>

<style lang="scss" scoped>
#exrx-card {
  margin: 20px;
}

#result-container {
  padding: 20px;
}

.content-divider {
  margin-top: 12px;
  margin-bottom: 12px
}
</style>
