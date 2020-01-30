<template>
  <v-card :loading="loadingContent">
    <v-card-title>Muscle List</v-card-title>
    <v-card-subtitle>
      <span>Length: {{ muscleList.length }}</span>
    </v-card-subtitle>
    <v-card-actions>
      <v-btn v-debounced-click="handleClickSaveMuscleList" :loading="loadingMuscle" color="primary" text>
        Save Muscle
      </v-btn>
      <v-spacer/>
      <v-btn icon @click="showMuscleList = !showMuscleList">
        <v-icon>{{ showMuscleList ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="showMuscleList">
        <v-divider/>
        <v-card-text>
          {{ muscleList }}
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
import { HyperlinkUtil } from '@/utils/hyperlink-util'
import { muscleApi } from '@/requests/muscle-api'
import { SaveMusclePayload } from '@/domain/muscle/save-muscle-payload'
import { MusclePayload } from '@/domain/muscle/muscle-payload'
import { MuscleLink } from '@/domain/muscle/muscle-link'

export default Vue.extend({
  name: 'muscle',
  data: () => ({
    loadingContent: false,
    mergedMuscleUnorderedList: {} as Cheerio,
    loadingMuscle: false,
    muscleList: [] as string[],
    showMuscleList: false,
    muscleLinkList: [] as Array<MuscleLink>
  }),
  methods: {
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
          const muscleLink = cheerio.load(element)('a')
          const ml = new MuscleLink()
          ml.name = this.muscleList[index]
          if (muscleLink.length === 1) {
            ml.link = muscleLink[0].attribs.href
          }
          this.muscleLinkList.push(ml)
        })
        this.muscleLinkList.forEach(item => {
          if (item.link) {
            item.link = HyperlinkUtil.restorePathToUrl(item.link)
          }
        })
        this.$emit('muscle-link-generated', this.muscleLinkList)
      } catch (error) {
        console.error('Error occurred when sending request `exerciseDirectory`!', error)
        this.$toast.error(`Error occurred when sending request \`exerciseDirectory\`! Cause: ${error.message}`)
        return Promise.reject(error)
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
      this.getAndParseMuscleList()
    ]
    Promise.all(tasks).finally(() => {
      this.loadingContent = false
    })
  }
})
</script>

<style scoped>

</style>
