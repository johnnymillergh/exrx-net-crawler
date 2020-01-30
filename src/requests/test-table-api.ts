/* eslint-disable no-unused-vars */
import * as IntraAxios from '@/plugins/axios/axios-for-intra-communication'
import { GetByIdPayload } from '@/domain/test-table/get-by-id-payload'

export const testTableApi = {
  getById: (getByIdPayload: GetByIdPayload) => IntraAxios.get('/test-table/get-by-id', getByIdPayload)
}
