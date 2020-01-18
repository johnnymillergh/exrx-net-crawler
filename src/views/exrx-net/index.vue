<template>
  <v-app id="exrx-app">
    <v-card id="exrx-card" :loading="loadingContent" outlined>
      <v-card-title>
        <v-icon large left>mdi-file-document</v-icon>
        <span class="title font-weight-light">ExRx.net Document</span>
      </v-card-title>
      <div id="result-container">
        <v-row>Human Body Parts: {{ bodyPartList }}</v-row>
        <v-row>
          <v-btn v-debounced-click="handleClickSaveBodyPart" :loading="loadingSaveBodyPart" color="primary">
            Save Body Part
          </v-btn>
        </v-row>
        <v-row>Muscle: {{ muscleList }}</v-row>
        <v-row>
          <v-btn v-debounced-click="handleClickSaveMuscleList" :loading="loadingMuscle" color="primary">Save Muscle
          </v-btn>
        </v-row>
      </div>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { exrxNetApi } from '@/requests/exrx-net-api'
import cheerio from 'cheerio'
import { DomUtil } from '@/utils/dom-util'
import { bodyPartApi } from '@/requests/body-part-api'
import { SaveBodyPartPayload } from '@/domain/body-part/save-body-part-payload'
import { SaveMusclePayload } from '@/domain/muscle/save-muscle-payload'
import { MusclePayload } from '@/domain/muscle/muscle-payload'
import { muscleApi } from '@/requests/muscle-api'

export default Vue.extend({
  name: 'exrx-net',
  data: () => ({
    loadingContent: false,
    mergedMuscleUnorderedList: {} as Cheerio,
    bodyPartList: [] as string[],
    loadingSaveBodyPart: false,
    loadingMuscle: false,
    muscleList: [] as string[]
  }),
  methods: {
    async getAndParseBodyPart (): Promise<any> {
      try {
        const response = await exrxNetApi.exerciseDirectory()
        const cheerioInstance = cheerio.load(response)
        this.mergedMuscleUnorderedList = DomUtil.mergeSameLevelUnorderedList(cheerioInstance('.col-sm-6').find('div > ul'))
        this.bodyPartList = DomUtil.getFirstLevelTextArray(this.mergedMuscleUnorderedList.children())
      } catch (error) {
        console.error('Error occurred when sending request `exerciseDirectory`!', error)
        this.$toast.error(`Error occurred when sending request \`exerciseDirectory\`! Cause: ${error.message}`)
        return Promise.reject(error)
      }
    },
    async getAndParseMuscleList (): Promise<any> {
      try {
        const response = await exrxNetApi.muscleList()
        const cheerioInstance = cheerio.load(response)
        const cheerio1 = cheerioInstance('.col-sm-6').find('li')
        this.muscleList = DomUtil.getFirstLevelTextArray(cheerio1)
        // Iterate list to compensate lost muscle data
        cheerio1.each((index, element) => {
          const trimmedMuscleItem = element.firstChild.data?.trim()
          if (trimmedMuscleItem) {
            this.muscleList[index] = trimmedMuscleItem
          }
        })
      } catch (error) {
        console.error('Error occurred when sending request `exerciseDirectory`!', error)
        this.$toast.error(`Error occurred when sending request \`exerciseDirectory\`! Cause: ${error.message}`)
        return Promise.reject(error)
      }
    },
    async handleClickSaveBodyPart (): Promise<void> {
      if (!this.bodyPartList.length) {
        this.$toast.warning('Invalid data!')
        return
      }
      this.loadingSaveBodyPart = true
      const saveBodyPartPayload = new SaveBodyPartPayload()
      saveBodyPartPayload.bodyPartNameList = this.bodyPartList
      try {
        const response = await bodyPartApi.saveBodyPart(saveBodyPartPayload)
        this.$toast.success(response.message)
      } catch (error) {
        console.error('Error occurred when saving body part!', error)
        this.$toast.error(`Error occurred when saving body part! Cause: ${error.message}`)
      } finally {
        this.loadingSaveBodyPart = false
      }
    },
    async handleClickSaveMuscleList (): Promise<void> {
      if (!this.muscleList.length) {
        this.$toast.warning('Invalid data!')
        return
      }
      this.loadingMuscle = true
      const saveMusclePayload = new SaveMusclePayload()
      saveMusclePayload.musclePayloadList = []
      this.muscleList.forEach(muscle => {
        const musclePayload = new MusclePayload()
        musclePayload.name = muscle
        saveMusclePayload.musclePayloadList.push(musclePayload)
      })
      try {
        const response = await muscleApi.saveMuscle(saveMusclePayload)
        this.$toast.success(response.message)
      } catch (error) {
        console.error('Error occurred when saving muscle!', error)
        this.$toast.error(`Error occurred when saving muscle! Cause: ${error.message}`)
      } finally {
        this.loadingMuscle = false
      }
    }
  },
  mounted () {
    this.loadingContent = true
    const tasks = [
      this.getAndParseBodyPart(),
      this.getAndParseMuscleList()
    ]
    Promise.all(tasks).finally(() => {
      this.loadingContent = false
    })
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
</style>
