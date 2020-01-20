/* eslint-disable no-unused-vars */
import * as InterAxios from '@/plugins/axios/axios-for-inter-communication'
import { ResponseType } from 'axios'

export const exrxNetApi = {
  exerciseDirectory: () => InterAxios.get('/http://exrx.net/Lists/Directory'),
  muscleList: () => InterAxios.get('/http://exrx.net/Lists/Muscle'),
  getResourceByUrl: (url: string, param?: any, responseType?: ResponseType) => InterAxios.get(`/${url}`, param, responseType)
}
