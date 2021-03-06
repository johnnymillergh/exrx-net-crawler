/* eslint-disable no-unused-vars */
import * as IntraAxios from '@/plugins/axios/axios-for-intra-communication'
import { SaveBodyPartPayload } from '@/domain/body-part/save-body-part-payload'

export const bodyPartApi = {
  saveBodyPart: (saveBodyPartPayload: SaveBodyPartPayload) => IntraAxios.post('/body-part/save-body-part', saveBodyPartPayload)
}
