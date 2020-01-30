<template>
  <v-app id="exrx-app">
    <v-card id="exrx-card" outlined>
      <v-card-title>
        <v-icon large left>mdi-file-document</v-icon>
        <span class="title font-weight-light">ExRx.net Document</span>
      </v-card-title>
      <div id="result-container">
        <body-part v-on:exercise-link-list-generated="handleExerciseLinkListGenerated"/>
        <v-divider class="content-divider"/>
        <muscle v-on:muscle-link-generated="handelMuscleLinkGenerated"/>
        <v-divider class="content-divider"/>
        <muscle-link-view :muscle-link-list="muscleLinkList"/>
        <v-divider class="content-divider"/>
        <exercise-classification/>
        <v-divider class="content-divider"/>
        <exercise v-bind:exercise-link-sorted-by-body-part-list="exerciseLinkList"/>
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
// eslint-disable-next-line no-unused-vars
import { ExerciseLinkSortedByBodyPart } from '@/domain/body-part/exercise-link-sorted-by-body-part'
import Exercise from '@/views/exrx-net/components/exercise.vue'
import ExerciseClassification from '@/views/exrx-net/components/exercise-classification.vue'

export default Vue.extend({
  name: 'exrx-net',
  components: {
    BodyPart,
    Muscle,
    MuscleLinkView,
    Exercise,
    ExerciseClassification
  },
  data: () => ({
    muscleLinkList: [] as Array<MuscleLink>,
    exerciseLinkList: [] as ExerciseLinkSortedByBodyPart[]
  }),
  methods: {
    handelMuscleLinkGenerated (generatedMuscleLinkList: Array<MuscleLink>) {
      this.muscleLinkList = generatedMuscleLinkList
    },
    handleExerciseLinkListGenerated (generatedMuscleLinkList: ExerciseLinkSortedByBodyPart[]) {
      this.exerciseLinkList = generatedMuscleLinkList
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
