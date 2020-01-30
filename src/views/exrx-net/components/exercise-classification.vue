<template>
  <v-card :loading="loadingContent">
    <v-card-title>Exercise Classification</v-card-title>
    <v-card-actions>
      <v-btn v-debounced-click="getAndParseExerciseClassification" :loading="loadingSaveExercise"
             :disabled="loadingSaveExercise" color="primary" text>
        Save Exercise Classification
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import cheerio from 'cheerio'
import { exrxNetApi } from '@/requests/exrx-net-api'
import { SaveExerciseClassificationPayload } from '@/domain/exercise/save-exercise-classification-payload'
import { ExerciseClassificationPayload } from '@/domain/exercise/exercise-classification-payload'
import { exerciseApi } from '@/requests/exercise-api'

@Component
export default class Exercise extends Vue {
  private loadingContent = false
  private loadingSaveExercise = false

  async getAndParseExerciseClassification () {
    this.loadingContent = true
    this.loadingSaveExercise = true
    const response = await exrxNetApi.getResourceByUrl('http://exrx.net/WeightTraining/Glossary')
    const saveExerciseClassificationPayload = new SaveExerciseClassificationPayload()
    let exerciseClassificationPayload = new ExerciseClassificationPayload()
    exerciseClassificationPayload.name = 'Basic'
    exerciseClassificationPayload.description = cheerio.load(response)('p:contains(\'Basic\')').next().text().trim()
    saveExerciseClassificationPayload.exerciseClassificationPayloadList.push(exerciseClassificationPayload)

    exerciseClassificationPayload = new ExerciseClassificationPayload()
    exerciseClassificationPayload.name = 'Auxiliary'
    exerciseClassificationPayload.description = cheerio.load(response)('p:contains(\'Auxiliary\')').next().text().trim()
    saveExerciseClassificationPayload.exerciseClassificationPayloadList.push(exerciseClassificationPayload)

    exerciseClassificationPayload = new ExerciseClassificationPayload()
    exerciseClassificationPayload.name = 'Compound'
    exerciseClassificationPayload.description = cheerio.load(response)('p:contains(\'Compound\')').next().text().trim()
    saveExerciseClassificationPayload.exerciseClassificationPayloadList.push(exerciseClassificationPayload)

    exerciseClassificationPayload = new ExerciseClassificationPayload()
    exerciseClassificationPayload.name = 'Isolated'
    exerciseClassificationPayload.description = cheerio.load(response)('p:contains(\'Isolated\')').next().text().trim()
    saveExerciseClassificationPayload.exerciseClassificationPayloadList.push(exerciseClassificationPayload)

    exerciseClassificationPayload = new ExerciseClassificationPayload()
    exerciseClassificationPayload.name = 'Closed Chain'
    exerciseClassificationPayload.description = cheerio.load(response)('p:contains(\'Closed Chain\')').next().next().text().trim()
    saveExerciseClassificationPayload.exerciseClassificationPayloadList.push(exerciseClassificationPayload)

    exerciseClassificationPayload = new ExerciseClassificationPayload()
    exerciseClassificationPayload.name = 'Open Chain'
    exerciseClassificationPayload.description = cheerio.load(response)('p:contains(\'Open Chain\')').next().text().trim()
    saveExerciseClassificationPayload.exerciseClassificationPayloadList.push(exerciseClassificationPayload)

    exerciseClassificationPayload = new ExerciseClassificationPayload()
    exerciseClassificationPayload.name = 'Functional'
    exerciseClassificationPayload.description = cheerio.load(response)('p:contains(\'Functional\')').next().text().trim()
    saveExerciseClassificationPayload.exerciseClassificationPayloadList.push(exerciseClassificationPayload)

    exerciseClassificationPayload = new ExerciseClassificationPayload()
    exerciseClassificationPayload.name = 'Push'
    exerciseClassificationPayload.description = cheerio.load(response)('p:contains(\'Push\')').next().text().trim()
    saveExerciseClassificationPayload.exerciseClassificationPayloadList.push(exerciseClassificationPayload)

    exerciseClassificationPayload = new ExerciseClassificationPayload()
    exerciseClassificationPayload.name = 'Pull'
    exerciseClassificationPayload.description = cheerio.load(response)('p:contains(\'Pull\')').next().text().trim()
    saveExerciseClassificationPayload.exerciseClassificationPayloadList.push(exerciseClassificationPayload)

    try {
      const response = await exerciseApi.saveExerciseClassification(saveExerciseClassificationPayload)
      this.$toast.success(response.message)
    } catch (error) {
      console.error('Error occurred when saving exercise classification!', error)
      this.$toast.error(error.message)
    } finally {
      this.loadingContent = false
      this.loadingSaveExercise = false
    }
  }
}
</script>
