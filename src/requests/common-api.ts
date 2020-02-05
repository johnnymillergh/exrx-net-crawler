/* eslint-disable no-unused-vars */
import * as IntraAxios from '@/plugins/axios/axios-for-intra-communication'

export const commonApi = {
  appInfo: () => IntraAxios.get('/common/app-info')
}
