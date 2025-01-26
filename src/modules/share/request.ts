import httpClient from '~/shared/utils/http-client'
import { AnyType, ICommentCompetency, ICreateLeaveRequest, ILeaveCategoryList } from './types'
import { BaseResponse } from '~/shared/types/api-response'
import { END_POINT } from './endpoints'
import axios from 'axios'

export const addComment = async (payload: ICommentCompetency) => {
  const response: BaseResponse<AnyType> = await httpClient.post(END_POINT.commentCompetency, payload)
  return response.data
}

export const removeComment = async (id: number) => {
  const response: BaseResponse<AnyType> = await httpClient.delete(END_POINT.deleteCommentCompetency(id))
  return response.data
}

// handleSetArrAttach({ originName: file.name, s3Url })
export const uploadAttachment = async (contentType?: string, attachment?: any) => {
  const response: BaseResponse<any> = await httpClient.post(END_POINT.generatePresignedUrl, { contentType })

  await axios({
    method: 'put',
    url: response.data,
    headers: {
      'Content-Type': contentType
    },
    data: attachment
    // onUploadProgress(progressEvent) {
    //   // const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)

    //   // setUploadProgress(progress);
    // }
  })

  const signedUrl = await httpClient.post('/v1/signed-url', {
    url: response.data.split('?')[0]
  })

  return signedUrl
}

export const getPendingDeduct = async (year: number) => {
  const response: BaseResponse<any> = await httpClient.get(END_POINT.getPendingDeduct, {
    params: {
      year
    }
  })
  return response
}

export const getMyLeaveList = async (query) => {
  const response: BaseResponse<any> = await httpClient.get(END_POINT.getMyLeaveList, {
    params: query
  })
  return response.data
}

export const getLeaveCategory = async () => {
  const response: BaseResponse<ILeaveCategoryList> = await httpClient.get(END_POINT.leaveCategoryList)
  return response.data
}

export const getDurationLeave = async (startDate: string, endDate: string) => {
  const response: BaseResponse<any> = await httpClient.get(END_POINT.getDurationLeave, {
    params: {
      startDate,
      endDate
    }
  })
  return response
}

export const getLeaveBalance = async (year: number) => {
  const response: BaseResponse<any> = await httpClient.get(END_POINT.getLeaveBalance, {
    params: {
      year
    }
  })
  return response
}

export const createLeaveRequest = async (payload: ICreateLeaveRequest) => {
  const response: BaseResponse<any> = await httpClient.post(END_POINT.createLeaveRequest, payload)
  return response
}

export const presignedAttachmentUrl = async (url?: string, filename?: string, isDownload?: boolean) => {
  const response: BaseResponse<any> = await httpClient.post('/v1/signed-url', {
    url,
    filename,
    isDownload
  })
  return response
}
