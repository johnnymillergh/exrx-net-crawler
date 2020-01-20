<template>
  <v-card :loading="loadingContent">
    <v-card-title>Human Body Part List</v-card-title>
    <v-card-subtitle>
      <span>Length: {{ bodyPartList.length }}</span>
    </v-card-subtitle>
    <v-card-actions>
      <v-btn v-debounced-click="handleClickSaveBodyPart" :loading="loadingSaveBodyPart" color="primary" text>
        Save Body Part
      </v-btn>
      <v-spacer/>
      <v-btn icon @click="showBodyPartList = !showBodyPartList">
        <v-icon>{{ showBodyPartList ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="showBodyPartList">
        <v-divider/>
        <v-card-text>
          {{ bodyPartList }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import cheerio from 'cheerio'
import { exrxNetApi } from '@/requests/exrx-net-api'
import { DomUtil } from '@/utils/dom-util'
import { SaveBodyPartPayload } from '@/domain/body-part/save-body-part-payload'
import { bodyPartApi } from '@/requests/body-part-api'

export default Vue.extend({
  name: 'body-part',
  data: () => ({
    loadingContent: false,
    mergedMuscleUnorderedList: {} as Cheerio,
    bodyPartList: [] as string[],
    loadingSaveBodyPart: false,
    showBodyPartList: false
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
    }
  },
  mounted () {
    this.loadingContent = true
    const tasks = [
      this.getAndParseBodyPart()
    ]
    Promise.all(tasks).finally(() => {
      this.loadingContent = false
    })
  }
})
</script>
