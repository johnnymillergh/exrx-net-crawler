/* eslint-disable no-unused-vars */
import { ExerciseLinkSortedByMuscle } from '@/domain/exercise/exercise-link-sorted-by-muscle'

export class SpecificMuscleExerciseLink {
  bodyPartName!: string
  muscleName!: string
  exerciseLinkList = [] as ExerciseLinkSortedByMuscle[]
}
