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
          <v-btn v-debounced-click="handleClickSaveBodyPart" :loading="loadingSaveBodyPart" color="primary" block>
            Save Body Part
          </v-btn>
        </v-row>
        <v-row>Muscle: {{ muscleList }}</v-row>
        <v-row>
          <v-btn v-debounced-click="handleClickSaveMuscleList" :loading="loadingMuscle" color="primary" block>
            Save Muscle
          </v-btn>
        </v-row>
        <v-row>Muscle link list: {{ muscleLinkList }}</v-row>
        <v-row>
          <v-btn v-debounced-click="handleClickUpdateMuscleDetails" :loading="loadingUpdateMuscleDetails"
                 color="primary" block>
            <template v-slot:loader>
              <span>{{ updateMuscleDetailsProgress }}</span>
            </template>
            Update Muscle Details
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
import { MuscleLink } from '@/domain/muscle/muscle-link'
import { HyperlinkUtil } from '@/utils/hyperlink-util'
import { UpdateMuscleDetailsPayload } from '@/domain/muscle/update-muscle-details-payload'

export default Vue.extend({
  name: 'exrx-net',
  data: () => ({
    loadingContent: false,
    mergedMuscleUnorderedList: {} as Cheerio,
    bodyPartList: [] as string[],
    loadingSaveBodyPart: false,
    loadingMuscle: false,
    loadingUpdateMuscleDetails: false,
    muscleList: [] as string[],
    muscleLinkList: [] as Array<MuscleLink>,
    updateMuscleDetailsProgress: ''
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
      } catch (error) {
        console.error('Error occurred when sending request `exerciseDirectory`!', error)
        this.$toast.error(`Error occurred when sending request \`exerciseDirectory\`! Cause: ${error.message}`)
        return Promise.reject(error)
      }
    },
    async getAndParseMuscleDetails (muscleLink: MuscleLink): Promise<any> {
      console.info('muscleLink', muscleLink)
      if (!muscleLink.link) {
        return
      }
      const updateMuscleDetailsPayload = new UpdateMuscleDetailsPayload()
      updateMuscleDetailsPayload.name = muscleLink.name
      const response = await exrxNetApi.getHtmlByUrl(muscleLink?.link)
      const cheerio1 = cheerio.load(response)
      try {
        updateMuscleDetailsPayload.otherNames = DomUtil.getFirstLevelTextArray(cheerio1('.col-sm-6').find('h2:contains(\'Other Names\')').next())
      } catch (error) {
        console.info('Muscle doesn\'t have otherNames', muscleLink, error)
      }
      try {
        updateMuscleDetailsPayload.relatedMuscleNameList = DomUtil.getFirstLevelTextArray(cheerio1('.col-sm-6').find('h2:contains(\'Related Muscles\')').next())
      } catch (error) {
        console.info('Muscle doesn\'t have relatedMuscleNameList', muscleLink, error)
      }
      const muscleImages = cheerio1('.col-sm-6').find('img')
      await this.getMuscleImage(muscleImages, updateMuscleDetailsPayload)
      console.info('updateMuscleDetailsPayload', updateMuscleDetailsPayload)
      try {
        const response = await muscleApi.updateMuscleDetails(updateMuscleDetailsPayload)
        this.$toast.success(response.message)
      } catch (error) {
        console.error('Error occurred when sending request `updateMuscleDetails`!', error)
        this.$toast.error(`Error occurred when sending request 'updateMuscleDetails'! Cause: ${error.message}`)
      }
    },
    async getMuscleImage (muscleImages: Cheerio, updateMuscleDetailsPayload: UpdateMuscleDetailsPayload): Promise<void> {
      const imageUrlList = [] as string[]
      muscleImages.each((index, element) => {
        // TODO: parse img alt (alternative text of image)
        imageUrlList.push(HyperlinkUtil.restorePathToUrl(element.attribs.src))
      })
      for (const url of imageUrlList) {
        const image = await exrxNetApi.getHtmlByUrl(url)
        const imageFile = new File([image], HyperlinkUtil.parseFileNameFromUrl(url))
        updateMuscleDetailsPayload.muscleImageList.push(imageFile)
      }
      return Promise.resolve()
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
    },
    timeoutHandler (muscleLink: MuscleLink) {
      return new Promise((resolve, reject) => {
        const timeout = Math.round(Math.random() * 5) * 1000
        const that = this
        setTimeout(async function () {
          try {
            await that.getAndParseMuscleDetails(muscleLink)
            return resolve(muscleLink)
          } catch (error) {
            return reject(error)
          }
        }, timeout)
      })
    },
    async handleClickUpdateMuscleDetails (): Promise<void> {
      if (!this.muscleLinkList.length) {
        this.$toast.warning('Invalid data!')
        return
      }
      this.loadingUpdateMuscleDetails = true
      try {
        for (const item of this.muscleLinkList) {
          const index = this.muscleLinkList.indexOf(item)
          this.updateMuscleDetailsProgress = `Updating muscle. Progress: ${index + 1} of ${this.muscleLinkList.length}`
          await this.timeoutHandler(item)
        }
      } catch (error) {
        console.error('Error occurred when updating muscle details!', error)
        this.$toast.error('Error occurred when updating muscle details!')
      } finally {
        this.loadingUpdateMuscleDetails = false
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
