/* eslint-disable no-unused-vars */
import * as IntraAxios from '@/plugins/axios/axios-for-intra-communication'
import { SaveExercisePayload } from '@/domain/exercise/save-exercise-payload'
import { SaveExerciseClassificationPayload } from '@/domain/exercise/save-exercise-classification-payload'

export const exerciseApi = {
  saveExercise: (payload: SaveExercisePayload) => IntraAxios.postWithMultipart('/exercise/save-exercise', payload),
  saveExerciseClassification: (payload: SaveExerciseClassificationPayload) => IntraAxios.post('/exercise/save-exercise-classification', payload)
}
