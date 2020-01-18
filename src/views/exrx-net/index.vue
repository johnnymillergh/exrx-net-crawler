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
      </div>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { exrxNetApi } from '@/requests/exrx-net-api'
import cheerio from 'cheerio'
import { DomUtil } from '@/utils/dom-util'
import { bodyPartApi } from '@/requests/body-part/body-part-api'
import { SaveBodyPartPayload } from '@/domain/body-part/save-body-part-payload'

export default Vue.extend({
  name: 'exrx-net',
  data: () => ({
    loadingContent: false,
    mergedMuscleUnorderedList: {} as Cheerio,
    bodyPartList: [] as string[],
    loadingSaveBodyPart: false
  }),
  methods: {
    readMuscle (): void {
      console.debug('this.mergedMuscleUnorderedList.children()', this.mergedMuscleUnorderedList.children())
      this.bodyPartList = DomUtil.getFirstLevelTextArray(this.mergedMuscleUnorderedList.children())
    },
    async handleClickSaveBodyPart () {
      if (!this.bodyPartList.length) {
        return this.$toast.warning('Invalid data!')
      }
      this.loadingSaveBodyPart = true
      const saveBodyPartPayload = new SaveBodyPartPayload()
      saveBodyPartPayload.bodyPartNameList = this.bodyPartList
      try {
        await bodyPartApi.saveBodyPart(saveBodyPartPayload)
      } catch (error) {
        console.error('Error occurred when saving body part!', error)
        this.$toast.error('Error occurred when saving body part!')
      } finally {
        this.loadingSaveBodyPart = false
      }
    }
  },
  async mounted () {
    this.loadingContent = true
    try {
      const response = await exrxNetApi.exerciseDirectory()
      this.$toast.success('Succeed to getFirstText extercise directory.')
      const cheerioInstance = cheerio.load(response)
      this.mergedMuscleUnorderedList = DomUtil.mergeSameLevelUnorderedList(cheerioInstance('.col-sm-6').find('div > ul'))
      this.readMuscle()
    } catch (error) {
      console.error('Error occurred when sending request `exerciseDirectory`!', error)
      this.$toast.error('Error occurred when sending request `exerciseDirectory`!')
    } finally {
      this.loadingContent = false
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
</style>
