/* eslint-disable no-unused-vars */
import * as IntraAxios from '@/plugins/axios/axios-for-intra-communication'
import { SaveExercisePayload } from '@/domain/exercise/save-exercise-payload'
import { SaveExerciseClassificationPayload } from '@/domain/exercise/save-exercise-classification-payload'
import { SaveExerciseGifPayload } from '@/domain/exercise/save-exercise-gif-payload'

export const exerciseApi = {
  saveExercise: (payload: SaveExercisePayload) => IntraAxios.post('/exercise/save-exercise', payload),
  saveExerciseGif: (payload: SaveExerciseGifPayload) => IntraAxios.postWithMultipart('/exercise/save-exercise-gif', payload),
  saveExerciseClassification: (payload: SaveExerciseClassificationPayload) => IntraAxios.post('/exercise/save-exercise-classification', payload)
}
