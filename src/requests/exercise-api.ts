/* eslint-disable no-unused-vars */
import * as IntraAxios from '@/plugins/axios/axios-for-intra-communication'
import { SaveExercisePayload } from '@/domain/exercise/save-exercise-payload'

export const exerciseApi = {
  saveExercise: (saveExercisePayload: SaveExercisePayload) => IntraAxios.postWithMultipart('/exercise/save-exercise', saveExercisePayload)
}
