/* eslint-disable no-unused-vars */
import * as IntraAxios from '@/plugins/axios/axios-for-intra-communication'
import { SaveMusclePayload } from '@/domain/muscle/save-muscle-payload'

export const muscleApi = {
  saveMuscle: (saveMusclePayload: SaveMusclePayload) => IntraAxios.post('/muscle/save-muscle', saveMusclePayload)
}
