/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EmployeeDetail,
  EmployeeListDetail,
  EmployeePersonalInfo,
  IAnswerQuestion,
  ICancelLeaveRequest,
  IEmployeeAppraisal,
  IEmployeeBankInfo,
  IEmployeeContractInfo,
  IEmployeeContribute,
  IEmployeeTaxInsuranceInfo,
  ILeaveTypeList,
  IUserHealthcareInfo,
  UserPrimaryInfo
} from '~/modules/employee/types'
import { END_POINT } from './constant'
import { BaseResponse, ListResponse } from '~/shared/types/api-response'
import { UserInfo } from '~/shared/types/user-info'
import httpClient from '~/shared/utils/http-client'
import axios from 'axios'
import {
  AnyType,
  ICommentCompetency,
  ICompetencyAddGoal,
  IInputRatingQuestion,
  IUpdateAddressInfo,
  IUpdateIDCard,
  IUpdateLeaveRequest,
  LineManager,
  IUpdateGeneralInfo,
  ICreateOnBoardingEmployee,
  IUpdateOnboardingTask,
  IUpdateTaskAttachment,
  IUpdatePersonalContact,
  ICreateEmergencyInfo,
  IUpdateEmergencyInfo,
  IUpdateFamilyInfo,
  ICreateFamilyInfo,
  IUpdateOrgEmployeeProfile,
  IUpdateOrgEmployeeRole,
  ICreateStage
} from '../share/types'
import { IPosition } from 'react-tooltip'

export const getListUsers = async () => {
  const response: BaseResponse<ListResponse<UserInfo>> = await httpClient.get(END_POINT.listUsers, {
    params: {
      page: 1,
      limit: 1000
    }
  })
  return response
}

export const getUserPrimaryInfo = async (id: number) => {
  if (!id) {
    return
  }

  const response: BaseResponse<UserPrimaryInfo> = await httpClient.get(END_POINT.userPrimaryInfo(id))
  return response
}

export const getUserPersonalInfo = async (id: number) => {
  const response: BaseResponse<EmployeePersonalInfo> = await httpClient.get(END_POINT.userPersonalInfo(id))
  return response
}

export const getEmployeeProfile = async (id: number) => {
  const response: BaseResponse<EmployeeDetail> = await httpClient.get(END_POINT.employeeProfile(id))
  return response
}

export const getTaxAndInsurance = async (id: number) => {
  const response: BaseResponse<IEmployeeTaxInsuranceInfo> = await httpClient.get(END_POINT.userTaxInsuranceInfo(id))
  return response
}

export const getContract = async (id: number) => {
  const response: BaseResponse<IEmployeeContractInfo> = await httpClient.get(END_POINT.employeeContractInfo(id))
  return response
}

export const getBankInfo = async (id: number) => {
  const response: BaseResponse<IEmployeeBankInfo> = await httpClient.get(END_POINT.userBankInfo(id))
  return response
}

export const getHealthcareInfo = async (id: number) => {
  const response: BaseResponse<IUserHealthcareInfo> = await httpClient.get(END_POINT.userHealthcareInfo(id))
  return response
}

export const getEmployeeList = async (query) => {
  const response: BaseResponse<ListResponse<EmployeeListDetail>> = await httpClient.post(END_POINT.employeeList, query)
  return response.data
}

export const getLineManager = async () => {
  const response: BaseResponse<LineManager[]> = await httpClient.get(END_POINT.lineManager)
  return response.data
}

export const getPositionList = async () => {
  const response: BaseResponse<IPosition[]> = await httpClient.get(END_POINT.positionList)
  return response.data
}

export const getCompanyLevelList = async () => {
  const response: BaseResponse<IPosition[]> = await httpClient.get(END_POINT.companyLevelList)
  return response.data
}

export const getDepartmentsList = async () => {
  const response: BaseResponse<any> = await httpClient.get(END_POINT.getDepartmentList)
  return response.data
}

export const getProjectsList = async () => {
  const response: BaseResponse<any> = await httpClient.get(END_POINT.getProjectList)
  return response.data
}

export const getProjectsRole = async () => {
  const response: BaseResponse<any> = await httpClient.get(END_POINT.getProjectRole)
  return response.data
}

export const updateAddressInfo = async (payload: IUpdateAddressInfo, id: number) => {
  const response: BaseResponse<any> = await httpClient.put(END_POINT.updateAddressInfo(id), payload)
  return response
}

export const updateGeneralInfo = async (payload: IUpdateGeneralInfo, id: number) => {
  const response: BaseResponse<any> = await httpClient.put(END_POINT.updateGeneralInfo(id), payload)
  return response
}

export const createEmergencyInfo = async (payload: ICreateEmergencyInfo) => {
  const response: BaseResponse<any> = await httpClient.post(END_POINT.createEmergencyInfo, payload)
  return response
}

export const updateEmergencyInfo = async (payload: IUpdateEmergencyInfo) => {
  const response: BaseResponse<any> = await httpClient.put(END_POINT.updateEmergencyInfo(payload.userId), payload)
  return response
}

export const createFamilyInfo = async (payload: ICreateFamilyInfo) => {
  const response: BaseResponse<any> = await httpClient.post(END_POINT.createFamilyInfo, payload)
  return response
}

export const updateFamilyInfo = async (payload: IUpdateFamilyInfo) => {
  const response: BaseResponse<any> = await httpClient.put(END_POINT.updateFamilyInfo(payload.userId), payload)
  return response
}

export const updateIDCard = async (payload: IUpdateIDCard, id: number) => {
  const response: BaseResponse<any> = await httpClient.put(END_POINT.updateIDCard(id), payload)
  return response
}

export const updateOrgEmployeeProfile = async (payload: IUpdateOrgEmployeeProfile, id: number) => {
  const response: BaseResponse<any> = await httpClient.put(END_POINT.updateOrgEmployeeProfile(id), payload)
  return response
}

export const updateOrgEmployeeRole = async (payload: IUpdateOrgEmployeeRole, id: number) => {
  const response: BaseResponse<any> = await httpClient.put(END_POINT.updateOrgEmployeeRole(id), payload)
  return response
}

export const updateTaskStatus = async (payload: IUpdateOnboardingTask) => {
  const response: BaseResponse<any> = await httpClient.put(END_POINT.updateTaskStatus(payload.id), {
    status: payload.status
  })
  return response
}
export const updatePersonalContact = async (payload: IUpdatePersonalContact, id: number) => {
  const response: BaseResponse<IUpdatePersonalContact> = await httpClient.put(
    END_POINT.userPersonalContact(id),
    payload
  )
  return response
}

export const completeOnboardingStatus = async (employeeId: number) => {
  const response: BaseResponse<any> = await httpClient.put(END_POINT.completeOnboardingStatus(employeeId))
  return response
}

export const getLeaveType = async (leaveCategoryId: number) => {
  const response: BaseResponse<ILeaveTypeList> = await httpClient.get(END_POINT.leaveTypeList(leaveCategoryId))
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

export const getFileUploaded = async (url?: string) => {
  const response: BaseResponse<any> = await httpClient.post(END_POINT.getFileUpload, { url })
  return response.data
}

export const updateLeaveRequest = async (payload: IUpdateLeaveRequest, id: number) => {
  const response: BaseResponse<any> = await httpClient.put(END_POINT.updateLeaveRequest(id), payload)
  return response
}

export const getUnpaidLeave = async (year: number) => {
  const response: BaseResponse<any> = await httpClient.get(END_POINT.getUnpaidLeave, {
    params: {
      year
    }
  })
  return response
}

export const getEmployeeAppraisalList = async () => {
  const response: BaseResponse<IEmployeeAppraisal[]> = await httpClient.get(END_POINT.employeeAppraisalList)
  return response.data
}

export const getEmployeeAppraisalDetail = async (id: number) => {
  const response: BaseResponse<any> = await httpClient.get(END_POINT.employeeAppraisalDetail(id))
  return response
}

export const employeeAnswerQuestion = async (payload: IAnswerQuestion) => {
  const response: BaseResponse<any> = await httpClient.post(END_POINT.employeeAnswerQuestion, payload)
  return response
}

export const employeeContribute = async (payload: IEmployeeContribute) => {
  const response: BaseResponse<any> = await httpClient.post(END_POINT.employeeContribute, payload)
  return response
}

export const employeeSubmitForm = async (id: number) => {
  const response: BaseResponse<any> = await httpClient.post(END_POINT.employeeSubmitForm(id))
  return response
}

export const getEmployeeLeaveDetail = async (id: number) => {
  const response: BaseResponse<any> = await httpClient.get(END_POINT.employeeLeaveDetail(id))
  return response
}

export const cancelLeaveRequest = async (payload: ICancelLeaveRequest) => {
  const response: BaseResponse<any> = await httpClient.post(END_POINT.cancelEmployeeLeaveRequest(payload.id), payload)
  return response
}

// competency
export const getEmployeeAssessmentRecord = async () => {
  const response: BaseResponse<any> = await httpClient.get(END_POINT.employeeCompetencyAssessRecord)
  return response.data
}

export const getEmployeeAssRecordCompetencyDetail = async (id: number) => {
  const response: BaseResponse<any> = await httpClient.get(END_POINT.employeeAssRecordCompetencyDetail(id))
  return response
}

export const employeeAddGoal = async (payload: ICompetencyAddGoal) => {
  const response: BaseResponse<any> = await httpClient.post(END_POINT.employeeAddGoal, payload)
  return response
}

export const employeeInputRatingQuestion = async (payload: IInputRatingQuestion) => {
  const response: BaseResponse<any> = await httpClient.post(END_POINT.employeeInputRatingQuestion, payload)
  return response
}

export const addComment = async (payload: ICommentCompetency) => {
  const response: BaseResponse<AnyType> = await httpClient.post(END_POINT.commentCompetency, payload)
  return response.data
}

export const removeComment = async (id: number) => {
  const response: BaseResponse<AnyType> = await httpClient.delete(END_POINT.deleteCommentCompetency(id))
  return response.data
}

export const submitCompetency = async (id: number) => {
  const response: BaseResponse<AnyType> = await httpClient.post(END_POINT.submitCompetency(id))
  return response.data
}

export const employeeCreateStageCompetency = async (payload: ICreateStage) => {
  const response: BaseResponse<any> = await httpClient.post(END_POINT.employeeCreateStageCompetency, payload)
  return response.data
}

export const createExitCompetency = async (formId: number) => {
  const response: BaseResponse<AnyType> = await httpClient.post(END_POINT.formsStageCompetency, {
    formId: formId,
    stage: 'EXIT'
  })
  return response.data
}

export const deleteIACompetency = async (stageId: number) => {
  const response: BaseResponse<AnyType> = await httpClient.delete(END_POINT.deleteStageCompetency(stageId))
  return response.data
}

export const createOnBoardingEmployee = async (payload: ICreateOnBoardingEmployee) => {
  const response: BaseResponse<any> = await httpClient.post(END_POINT.createOnBoardingEmployee, payload)
  return response
}

export const getEmployeeOnboardingDetail = async (employeeOnboardingId: number) => {
  const response: BaseResponse<any> = await httpClient.get(END_POINT.getEmployeeOnboardingDetail(employeeOnboardingId))
  return response
}

export const deleteOnboardingTask = async (taskId: number) => {
  const response: BaseResponse<AnyType> = await httpClient.delete(END_POINT.deleteOnboardingTask(taskId))
  return response.data
}

export const getTaskOnboardingDetail = async (taskId: number) => {
  const response: BaseResponse<any> = await httpClient.get(END_POINT.getTaskOnboardingDetail(taskId))
  return response
}

export const getGroupDeptOnboardList = async () => {
  const response: BaseResponse<AnyType[]> = await httpClient.get(END_POINT.getGroupDeptOnboarding)
  return response.data
}

export const getListPersonWithGroupDept = async (params: { groupId: number; employeeId: number }) => {
  const response: BaseResponse<any> = await httpClient.get(END_POINT.getListPersonWithGroupDept(params))
  return response
}

export const createNewTaskOnboarding = async (payload: any) => {
  const response: BaseResponse<any> = await httpClient.post(END_POINT.createNewTaskOnboarding, payload)
  return response
}

export const updateTaskOnboarding = async (payload: any, id: number) => {
  const response: BaseResponse<any> = await httpClient.put(END_POINT.updateTaskOnboarding(id), payload)
  return response
}

export const updateTaskAttachment = async (payload: IUpdateTaskAttachment) => {
  const response: BaseResponse<any> = await httpClient.put(END_POINT.updateAttachmentTask(payload.taskId), {
    attachments: payload?.attachments
  })
  return response
}
