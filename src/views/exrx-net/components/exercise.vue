<template>
  <v-card :loading="loadingContent">
    <v-card-title>Exercise</v-card-title>
    <v-card-subtitle>
      <span>Length: {{ exerciseLinkSortedByBodyPartList.length }}</span>
      <span>{{ saveExerciseProgressOfBodyPart }}</span>
      <span>{{ saveSpecificExerciseProgress }}</span>
      <span>{{ saveExerciseProgress }}</span>
    </v-card-subtitle>
    <v-form v-model="formValidation">
      <v-text-field class="concurrency" v-model="concurrency" :rules="rules" type="number" label="Concurrency"
                    required/>
    </v-form>
    <v-card-actions>
      <v-btn v-debounced-click="handleClickSaveExercise" :loading="loadingSaveExercise" :disabled="loadingSaveExercise"
             color="primary" text>
        Save Exercise
      </v-btn>
      <v-spacer/>
      <v-btn icon @click="showExercise = !showExercise">
        <v-icon>{{ showExercise ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="showExercise">
        <v-divider/>
        <v-card-text>
          <h3>Exercise Link Sorted By Body Part List</h3>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Body Part Name</th>
                  <th class="text-left">Link</th>
                  <th class="text-left">Operation</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in exerciseLinkSortedByBodyPartList" :key="item.bodyPartName">
                  <td>{{ item.bodyPartName }}</td>
                  <td>{{ item.link }}</td>
                  <td>
                    <v-btn @click="parseAndSaveExerciseByBodyPart(item)">Parse and Save</v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import cheerio from 'cheerio'
import { exrxNetApi } from '@/requests/exrx-net-api'
import { DomUtil } from '@/utils/dom-util'
// eslint-disable-next-line no-unused-vars
import { ExerciseLinkSortedByBodyPart } from '@/domain/body-part/exercise-link-sorted-by-body-part'
import { ExerciseLinkSortedByMuscle } from '@/domain/exercise/exercise-link-sorted-by-muscle'
import { SpecificMuscleExerciseLink } from '@/domain/exercise/specific-muscle-exercise-link'
import { HyperlinkUtil } from '@/utils/hyperlink-util'
import { exerciseApi } from '@/requests/exercise-api'
import { SaveExercisePayload } from '@/domain/exercise/save-exercise-payload'
import { ExerciseRelatedClassificationType } from '@/constants/exercise-related-classification-type'
import { SaveExerciseGifPayload } from '@/domain/exercise/save-exercise-gif-payload'
import { ExerciseRelatedMuscleType } from '@/constants/exercise-related-muslce-type'

@Component
export default class Exercise extends Vue {
  // noinspection JSMismatchedCollectionQueryUpdate
  @Prop() private exerciseLinkSortedByBodyPartList!: ExerciseLinkSortedByBodyPart[]

  private loadingContent = false
  private formValidation = false
  private concurrency = 10
  private rules = [
    (value: number) => !!value || 'Concurrency is required.',
    (value: number) => {
      if (value <= 0) {
        return 'Concurrency must be larger than 0.'
      }
      return true
    }
  ]

  private loadingSaveExercise = false
  private showExercise = false
  private saveExerciseProgressOfBodyPart = ''
  private saveSpecificExerciseProgress = ''
  private saveExerciseProgress = ''
  private currentBodyPart = ''

  @Watch('exerciseLinkSortedByBodyPartList')
  private handleMuscleLinkListChange (value: ExerciseLinkSortedByBodyPart[]) {
    if (value.length) {
      setTimeout(() => {
        this.loadingContent = false
      }, 1000)
    }
  }

  private mounted () {
    this.loadingContent = true
  }

  async handleClickSaveExercise (): Promise<void> {
    if (!this.formValidation) {
      this.$toast.warning('Invalid concurrency!')
      return
    }
    if (!this.exerciseLinkSortedByBodyPartList || this.exerciseLinkSortedByBodyPartList.length === 0) {
      this.$toast.warning('Invalid data!')
      return
    }
    this.loadingContent = true
    this.loadingSaveExercise = true
    // const temp = []
    // temp.push(this.exerciseLinkSortedByBodyPartList[9])
    for (const exerciseLink of this.exerciseLinkSortedByBodyPartList) {
      const index = this.exerciseLinkSortedByBodyPartList.indexOf(exerciseLink)
      if (exerciseLink.bodyPartName) {
        this.currentBodyPart = exerciseLink.bodyPartName
      } else {
        throw new Error(`Body part name is not empty! exerciseLink: ${JSON.stringify(exerciseLink)}`)
      }
      const exercise = await this.getAndParseExerciseCategory(exerciseLink)
      this.saveExerciseProgressOfBodyPart = `; ${index + 1}. ${this.currentBodyPart}`
      const exerciseAmountList = exercise.flatMap(item => {
        return item.exerciseLinkList.length
      })
      let exerciseAmount = 0
      exerciseAmountList.forEach(item => {
        exerciseAmount += item
      })
      this.saveSpecificExerciseProgress = `, exercise amount: ${exerciseAmount}`
      for (const item of exercise) {
        let concurrentExerciseLinkList = []
        // parse and save every specific exercise by exercise link
        for (const link of item.exerciseLinkList) {
          const index = item.exerciseLinkList.indexOf(link)
          if (index === 0 || index % this.concurrency !== 0) {
            concurrentExerciseLinkList.push(link)
          } else {
            concurrentExerciseLinkList.push(link)
            console.info(`concurrentExerciseLinkList ${index}`, concurrentExerciseLinkList)
            const tasks = [] as Promise<unknown>[]
            concurrentExerciseLinkList.forEach(value => {
              tasks.push(this.parseSpecificExercise(value))
            })
            await Promise.all(tasks)
            concurrentExerciseLinkList = []
          }
        }
      }
    }
    this.loadingContent = false
    this.loadingSaveExercise = false
  }

  async getAndParseExerciseCategory (exerciseLinkSortedByBodyPart: ExerciseLinkSortedByBodyPart): Promise<SpecificMuscleExerciseLink[]> {
    const result = [] as SpecificMuscleExerciseLink[]
    console.info('exerciseLinkSortedByBodyPart', exerciseLinkSortedByBodyPart)
    const exerciseListHtml = await exrxNetApi.getResourceByUrl(exerciseLinkSortedByBodyPart.link)
    const exerciseListDom = cheerio.load(exerciseListHtml)
    let exerciseContainerDom = exerciseListDom('article').find('.container')
    // exerciseContainerDom.length === 0, other exercise
    if (exerciseContainerDom.length === 0) {
      const specificMuscleExerciseLink = new SpecificMuscleExerciseLink()
      specificMuscleExerciseLink.bodyPartName = exerciseLinkSortedByBodyPart.bodyPartName ? exerciseLinkSortedByBodyPart.bodyPartName : 'NONE'
      exerciseContainerDom = exerciseListDom('.col-sm-6')
      const exerciseListItem = exerciseContainerDom.find('li > a')
      exerciseListItem.each((index, element) => {
        const exerciseLinkSortedByMuscle = new ExerciseLinkSortedByMuscle()
        try {
          exerciseLinkSortedByMuscle.link = HyperlinkUtil.restorePathToUrl(element.attribs.href)
          exerciseLinkSortedByMuscle.exerciseName = cheerio.load(element)('a').text().trim()
          specificMuscleExerciseLink.exerciseLinkList.push(exerciseLinkSortedByMuscle)
        } catch (error) {
          console.error('Error occurred when iterating exercise!', error)
          console.error('Error element:', element)
        }
      })
      result.push(specificMuscleExerciseLink)
      console.info('getAndParseExerciseCategory result', result)
      return Promise.resolve(result)
    }
    // filter class="igSpacer"
    const ch = cheerio
    exerciseContainerDom = exerciseContainerDom.filter((i, el) => {
      const cheerio = ch.load(el)
      return cheerio.root().text().trim().length > 0
    })
    console.info('exerciseContainerDom', exerciseContainerDom)
    exerciseContainerDom.each((index, element) => {
      const muscleName = cheerio.load(element)('h2')
      if (muscleName.length !== 0) {
        console.info('muscleName', muscleName)
        const exerciseDom = cheerio.load(exerciseContainerDom[index + 1])('.col-sm-12 .col-sm-6 > ul')
        console.info('exerciseDom', exerciseDom)
        let mergedExerciseUnorderedList
        try {
          mergedExerciseUnorderedList = DomUtil.mergeSameLevelUnorderedList(exerciseDom).children()
        } catch (error) {
          console.error('Found one list cannot be merged', exerciseDom)
          mergedExerciseUnorderedList = exerciseDom
        }
        console.info('mergedExerciseUnorderedList', mergedExerciseUnorderedList)
        const specificMuscleExerciseLink = new SpecificMuscleExerciseLink()
        specificMuscleExerciseLink.bodyPartName = exerciseLinkSortedByBodyPart.bodyPartName ? exerciseLinkSortedByBodyPart.bodyPartName : 'NONE'
        specificMuscleExerciseLink.muscleName = muscleName.text().trim()
        mergedExerciseUnorderedList.children().each((index1, element1) => {
          const equipmentName = DomUtil.getFirstText(element1)
          console.info('equipmentName', equipmentName)
          const exerciseLinkDom = cheerio.load(element1)('a')
          console.info('exerciseLinkDom', exerciseLinkDom)
          exerciseLinkDom.each((index2, element2) => {
            const exerciseLinkSortedByMuscle = new ExerciseLinkSortedByMuscle()
            exerciseLinkSortedByMuscle.link = HyperlinkUtil.restorePathToUrl(element2.attribs.href)
            exerciseLinkSortedByMuscle.exerciseName = cheerio.load(element2)('a').text().trim()
            exerciseLinkSortedByMuscle.equipmentName = equipmentName
            specificMuscleExerciseLink.exerciseLinkList.push(exerciseLinkSortedByMuscle)
          })
          console.info('specificMuscleExerciseLink', specificMuscleExerciseLink)
        })
        result.push(specificMuscleExerciseLink)
      }
    })
    console.info('getAndParseExerciseCategory result', result)
    return Promise.resolve(result)
  }

  async parseSpecificExercise (exerciseLinkSortedByMuscle: ExerciseLinkSortedByMuscle) {
    const response = await exrxNetApi.getResourceByUrl(exerciseLinkSortedByMuscle.link)
    const article = cheerio.load(response)('article')
    const exerciseGifDom = article.find('img').first()
    const exerciseGifUrl = HyperlinkUtil.restorePathToUrl(exerciseGifDom.attr().src)
    const exerciseGif = await exrxNetApi.getResourceByUrl(exerciseGifUrl, undefined, 'arraybuffer')
    const classification = article.find('h2:contains(\'Classification\')').next()
    const classificationRegExp = /\s&\s|\sor\s/
    const utility = classification.find('td:contains(\'Utility:\')').next().text().trim().split(classificationRegExp)
    const mechanics = classification.find('td:contains(\'Mechanics:\')').next().text().trim().split(classificationRegExp)
    const force = classification.find('td:contains(\'Force:\')').next().text().trim().split(classificationRegExp)
    const saveExercisePayload = new SaveExercisePayload()
    saveExercisePayload.exerciseName = cheerio.load(response)('h1.page-title').text().trim()
    utility.forEach(item => {
      if (item.trim()) {
        saveExercisePayload.exerciseRelatedClassificationPayloadList.push({
          classificationName: item.trim(),
          exerciseRelatedClassificationType: ExerciseRelatedClassificationType.UTILITY.value
        })
      }
    })
    mechanics.forEach(item => {
      if (item.trim()) {
        saveExercisePayload.exerciseRelatedClassificationPayloadList.push({
          classificationName: item.trim(),
          exerciseRelatedClassificationType: ExerciseRelatedClassificationType.MECHANICS.value
        })
      }
    })
    force.forEach(item => {
      if (item.trim()) {
        saveExercisePayload.exerciseRelatedClassificationPayloadList.push({
          classificationName: item.trim(),
          exerciseRelatedClassificationType: ExerciseRelatedClassificationType.FORCE.value
        })
      }
    })
    saveExercisePayload.preparation = article.find('p:contains(\'Preparation\')').next().text().trim()
    saveExercisePayload.execution = article.find('p:contains(\'Execution\')').next().text().trim()
    saveExercisePayload.comments = article.find('h2:contains(\'Comments\')').next().text().trim()
    // parse exercise related muscles
    ExerciseRelatedMuscleType.getArray().forEach(item => {
      const relatedMuscles = article.find(`p > a:contains('${item.description}')`).parent().next()
      if (relatedMuscles.length) {
        const relatedMuscleList = DomUtil.getFirstLevelTextArray(relatedMuscles)
        relatedMuscleList.forEach(muscle => {
          saveExercisePayload.exerciseRelatedMusclePayloadList.push({
            muscleName: muscle,
            relatedMuscleType: item.value
          })
        })
      }
    })
    const saveExerciseGifPayload = new SaveExerciseGifPayload()
    saveExerciseGifPayload.exerciseGif = new File([exerciseGif], HyperlinkUtil.parseFileNameFromUrl(exerciseGifUrl))
    try {
      const saveExerciseResponse = await exerciseApi.saveExercise(saveExercisePayload)
      saveExerciseGifPayload.exerciseId = saveExerciseResponse.data
      const saveExerciseGifResponse = await exerciseApi.saveExerciseGif(saveExerciseGifPayload)
      this.$toast.success(`${saveExerciseResponse.message}; ${saveExerciseGifResponse.message}`)
    } catch (error) {
      console.error('Error occurred when saving exercise!', error)
      this.$toast.error(error.message)
    }
  }

  async parseAndSaveExerciseByBodyPart (exerciseLinkSortedByBodyPart: ExerciseLinkSortedByBodyPart) {
    const exercise = await this.getAndParseExerciseCategory(exerciseLinkSortedByBodyPart)
    console.info('parseAndSaveExerciseByBodyPart', exercise)
  }
}
</script>

<style scoped>
.concurrency {
  margin-left: 16px;
  margin-right: 16px;
}
</style>
