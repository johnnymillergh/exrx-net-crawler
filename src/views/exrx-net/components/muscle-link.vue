<template>
  <v-card :loading="loadingContent">
    <v-card-title>Muscle Link List</v-card-title>
    <v-card-subtitle>
      <span>Length: {{ muscleLinkList.length }} {{ updateMuscleDetailsProgress }}</span>
    </v-card-subtitle>
    <v-text-field class="concurrency" v-model="concurrency" type="number" label="Concurrency" required/>
    <v-card-actions>
      <v-btn v-debounced-click="handleClickUpdateMuscleDetails" :loading="loadingUpdateMuscleDetails"
             :disabled="loadingUpdateMuscleDetails" color="primary" text>
        Update Muscle Details
      </v-btn>
      <v-spacer/>
      <v-btn icon @click="showMuscleLinkList = !showMuscleLinkList">
        <v-icon>{{ showMuscleLinkList ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="showMuscleLinkList">
        <v-divider/>
        <v-card-text>
          {{ muscleLinkList }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import cheerio from 'cheerio'
// eslint-disable-next-line no-unused-vars
import { MuscleLink } from '@/domain/muscle/muscle-link'
import { exrxNetApi } from '@/requests/exrx-net-api'
import { DomUtil } from '@/utils/dom-util'
import { HyperlinkUtil } from '@/utils/hyperlink-util'
import { UpdateMuscleDetailsPayload } from '@/domain/muscle/update-muscle-details-payload'
import { muscleApi } from '@/requests/muscle-api'

@Component
export default class MuscleLinkView extends Vue {
  @Prop() private muscleLinkList!: Array<MuscleLink>

  private concurrency = 5
  private loadingContent = false
  // muscleLinkList: [] as Array<MuscleLink>,
  private loadingUpdateMuscleDetails = false
  private showMuscleLinkList = false
  private updateMuscleDetailsProgress = ''

  @Watch('muscleLinkList')
  private handleMuscleLinkListChange (value: Array<MuscleLink>) {
    if (value.length) {
      setTimeout(() => {
        this.loadingContent = false
      }, 1000)
    }
  }

  async getAndParseMuscleDetails (muscleLink: MuscleLink): Promise<any> {
    if (!muscleLink.link) {
      return
    }
    const updateMuscleDetailsPayload = new UpdateMuscleDetailsPayload()
    updateMuscleDetailsPayload.name = muscleLink.name
    const response = await exrxNetApi.getResourceByUrl(muscleLink?.link)
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
  }

  async getMuscleImage (muscleImages: Cheerio, updateMuscleDetailsPayload: UpdateMuscleDetailsPayload): Promise<void> {
    const imageUrlList = [] as string[]
    muscleImages
      .each((index, element) => {
        // TODO: parse img alt (alternative text of image)
        imageUrlList.push(HyperlinkUtil.restorePathToUrl(element.attribs.src))
      })
    for (const url of imageUrlList) {
      const image = await exrxNetApi.getResourceByUrl(url, undefined, 'arraybuffer')
      const imageFile = new File([image], HyperlinkUtil.parseFileNameFromUrl(url))
      updateMuscleDetailsPayload.muscleImageList.push(imageFile)
    }
    return Promise.resolve()
  }

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
  }

  async handleClickUpdateMuscleDetails (): Promise<void> {
    if (!this?.muscleLinkList.length) {
      this.$toast.warning('Invalid data!')
      return
    }
    this.loadingUpdateMuscleDetails = true
    try {
      let concurrentMuscleLinkList = []
      for (const item of this.muscleLinkList) {
        const index = this.muscleLinkList.indexOf(item)
        if (index === 0 || index % this.concurrency !== 0) {
          concurrentMuscleLinkList.push(item)
        } else {
          concurrentMuscleLinkList.push(item)
          console.info(`concurrentMuscleLinkList ${index}`, concurrentMuscleLinkList)
          const tasks = [] as Promise<unknown>[]
          concurrentMuscleLinkList.forEach(value => {
            tasks.push(this.timeoutHandler(value))
          })
          await Promise.all(tasks)
          concurrentMuscleLinkList = []
        }
      }
    } catch (error) {
      console.error('Error occurred when updating muscle details!', error)
      this.$toast.error('Error occurred when updating muscle details!')
    } finally {
      this.loadingUpdateMuscleDetails = false
    }
  }

  mounted () {
    this.loadingContent = true
  }
}
</script>

<style scoped>
.concurrency {
  margin-left: 16px;
  margin-right: 16px;
}
</style>
