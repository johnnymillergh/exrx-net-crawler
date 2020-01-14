import * as InterAxios from '@/plugins/axios/axios-for-inter-communication'

export const exrxNetApi = {
  exerciseDirectory: () => InterAxios.get('/http://exrx.net/Lists/Directory')
}
