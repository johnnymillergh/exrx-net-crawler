<template>
  <v-card :loading="loadingContent">
    <v-card-title>Exercise</v-card-title>
    <v-card-subtitle>
      <span>Length: {{ exerciseLinkSortedByBodyPartList.length }}{{ saveExerciseProgressOfBodyPart }}</span>
      <span>{{ saveSpecificExerciseProgress }}</span>
    </v-card-subtitle>
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
          <p>{{ exerciseLinkSortedByBodyPartList }}</p>
          <p v-html="html"/>
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

@Component
export default class Exercise extends Vue {
  // noinspection JSMismatchedCollectionQueryUpdate
  @Prop() private exerciseLinkSortedByBodyPartList!: ExerciseLinkSortedByBodyPart[]

  private loadingContent = false
  private loadingSaveExercise = false
  private showExercise = false
  private saveExerciseProgressOfBodyPart = ''
  private saveSpecificExerciseProgress = ''
  private currentBodyPart = ''
  private html: string | null = ''

  @Watch('exerciseLinkSortedByBodyPartList')
  private handleMuscleLinkListChange (value: ExerciseLinkSortedByBodyPart[]) {
    if (value.length) {
      setTimeout(() => {
        this.loadingContent = false
      }, 1000)
    }
  }

  async handleClickSaveExercise (): Promise<void> {
    if (!this.exerciseLinkSortedByBodyPartList || this.exerciseLinkSortedByBodyPartList.length === 0) {
      this.$toast.warning('Invalid data!')
      return
    }
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
      this.saveSpecificExerciseProgress = `; exercise amount: ${exerciseAmount}`
      exercise.forEach(item => {
        // parse and save every specific exercise by exercise link
      })
    }
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
        exerciseLinkSortedByMuscle.exerciseName = cheerio.load(element)('a').text().trim()
        exerciseLinkSortedByMuscle.link = element.attribs.href
        specificMuscleExerciseLink.exerciseLinkList.push(exerciseLinkSortedByMuscle)
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
            exerciseLinkSortedByMuscle.link = element2.attribs.href
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

  async parseSpecificExercise () {

  }

  mounted () {
    this.loadingContent = true
  }
}
</script>
