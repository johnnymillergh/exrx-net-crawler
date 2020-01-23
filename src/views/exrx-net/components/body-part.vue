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
          <h3>Body Part List</h3>
          <p>{{ bodyPartList }}</p>
          <h3>Exercise Link List (sorted by body part)</h3>
          <span >Length: {{ exerciseLinkList.length }}</span>
          <p>{{ exerciseLinkList }}</p>
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
import { ExerciseLinkSortedByBodyPart } from '@/domain/body-part/exercise-link-sorted-by-body-part'
import { HyperlinkUtil } from '@/utils/hyperlink-util'

export default Vue.extend({
  name: 'body-part',
  data: () => ({
    loadingContent: false,
    mergedMuscleUnorderedList: {} as Cheerio,
    bodyPartList: [] as string[],
    loadingSaveBodyPart: false,
    showBodyPartList: false,
    exerciseLinkList: [] as ExerciseLinkSortedByBodyPart[]
  }),
  methods: {
    async getAndParseBodyPart (): Promise<any> {
      try {
        const response = await exrxNetApi.exerciseDirectory()
        const cheerioInstance = cheerio.load(response)
        this.mergedMuscleUnorderedList = DomUtil.mergeSameLevelUnorderedList(cheerioInstance('.col-sm-6').find('div > ul'))
        this.bodyPartList = DomUtil.getFirstLevelTextArray(this.mergedMuscleUnorderedList.children())
        const invalidLinkRegExp = /#+/
        const exerciseListPrefix = 'ExList/'
        this.mergedMuscleUnorderedList.find('a').each((index, element) => {
          if (!invalidLinkRegExp.test(element.attribs.href)) {
            const exerciseLinkSortedByBodyPart = new ExerciseLinkSortedByBodyPart()
            exerciseLinkSortedByBodyPart.bodyPartName = element.children[0].data
            if (element.attribs.href.search(exerciseListPrefix) < 0) {
              exerciseLinkSortedByBodyPart.link = HyperlinkUtil.restorePathToUrl(`/${exerciseListPrefix}${element.attribs.href}`)
            } else {
              exerciseLinkSortedByBodyPart.link = HyperlinkUtil.restorePathToUrl(`/${element.attribs.href}`)
            }
            this.exerciseLinkList.push(exerciseLinkSortedByBodyPart)
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
