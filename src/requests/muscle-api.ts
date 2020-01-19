/* eslint-disable no-unused-vars */
import * as IntraAxios from '@/plugins/axios/axios-for-intra-communication'
import { SaveMusclePayload } from '@/domain/muscle/save-muscle-payload'
import { UpdateMuscleDetailsPayload } from '@/domain/muscle/update-muscle-details-payload'

export const muscleApi = {
  saveMuscle: (payload: SaveMusclePayload) => IntraAxios.post('/muscle/save-muscle', payload),
  updateMuscleDetails: (payload: UpdateMuscleDetailsPayload) => IntraAxios.postWithMultipart('/muscle/update-muscle-details', payload)
}
