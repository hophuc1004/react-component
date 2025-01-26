/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode, createContext, useState } from 'react'

interface User {
  id: number
  firstName: string
  lastName: string
  avatar: string
}

interface EmployeeOnboarding {
  user: User
}

interface EmployeeAssignTo {
  user: User
}

interface GroupOnboarding {
  name: string
}

interface OnboardingTask {
  employeeId: number
  departmentId: number
  groupOnboardingId: number
  id: number
  status: number
  attachments: any[]
  dueDate: string | null
  description: string
  name: string
  EmployeeOnboarding: EmployeeOnboarding
  EmployeeAssignTo: EmployeeAssignTo
  GroupOnboarding: GroupOnboarding
}

interface OnboardingTasks {
  HR: OnboardingTask[]
  IT: OnboardingTask[]
  DeptTeam: OnboardingTask[]
  NewHire: OnboardingTask[]
}

interface EmployeeOnboardingUser {
  user: User
}

interface ArrayTaskOnboarding extends OnboardingTask {}

interface OnboardingData {
  onboardingTasks: OnboardingTasks
  employeeOnboarding: EmployeeOnboardingUser
  listTaskOnboarding: ArrayTaskOnboarding[]
}

interface IPageHeaderState {
  approve?: boolean
  reject?: boolean
  confirmReject?: boolean
  handleCloseConfirmReject?: () => void
  resetPageHeaderState?: () => void
  handleSetPageHeaderState?: (value: any) => void
  openPreviewImage: boolean
  viewImage?: {
    s3Url?: string
    filename?: string
    s3UrlNotSign?: string
  }
  showEmployeeSideBar?: boolean
  titleTemplateAppraisal?: string
  isPrivateAppraisal?: boolean
  confirmPublishAppraisal?: boolean
  confirmSubmitSelfEvaluation?: boolean
  confirmPreSubmitSelfEvaluation?: boolean
  isOpenGuideline?: boolean
  isFirstSubmit?: boolean
  isPreSubmit?: boolean
  infoTimeSubmit?: string
  lockForm?: boolean
  warningDescriptionAppraisal?: string
  toastMessageSubmit?: string
  confirmSubmitEvaluated?: boolean
  confirmPreSubmitEvaluated?: boolean
  isOpenGuidelineEvaluator?: boolean
  isFirstSubmitEvaluated?: boolean
  isPreSubmitEvaluated?: boolean
  infoTimeSubmitEvaluated?: string
  toastMessageEvaluatedSubmit?: string
  isMainEvaluator?: boolean
  lockFormEvaluator?: false
  approverStatus?: number
  employeeStatus?: number
  totalScore?: number
  employeeScore?: number
  managerScore?: number
  confirmCancel?: boolean
  cancel?: boolean
  editLeaveRequest?: boolean
  titleAssRecordCompetency?: string
  statusAssRecordCompetency?: number
  processSaveHeader?: boolean
  savedHeader?: boolean
  openLeaveRequestGlobal?: boolean
  considerModalGlobal?: boolean
  isOpenOrgChart?: boolean
  employeeOnboardingName?: string
  onboardingDetail: OnboardingData
  isCreateReview?: boolean
}

const initialState: IPageHeaderState = {
  approve: false,
  reject: false,
  confirmReject: false,
  openPreviewImage: false,
  viewImage: {},
  showEmployeeSideBar: true,
  titleTemplateAppraisal: null,
  isPrivateAppraisal: true,
  confirmPublishAppraisal: false,
  confirmSubmitSelfEvaluation: false,
  confirmPreSubmitSelfEvaluation: false,
  isOpenGuideline: false,
  isFirstSubmit: false,
  isPreSubmit: false,
  infoTimeSubmit: null,
  lockForm: false,
  warningDescriptionAppraisal: null,
  toastMessageSubmit: null,
  confirmSubmitEvaluated: false,
  confirmPreSubmitEvaluated: false,
  isOpenGuidelineEvaluator: false,
  isFirstSubmitEvaluated: false,
  isPreSubmitEvaluated: false,
  infoTimeSubmitEvaluated: null,
  toastMessageEvaluatedSubmit: null,
  isMainEvaluator: false,
  lockFormEvaluator: false,
  approverStatus: null,
  employeeStatus: null,
  totalScore: null,
  employeeScore: null,
  managerScore: null,
  confirmCancel: false,
  cancel: false,
  editLeaveRequest: false,
  titleAssRecordCompetency: null,
  statusAssRecordCompetency: null,
  processSaveHeader: false,
  savedHeader: false,
  openLeaveRequestGlobal: false,
  considerModalGlobal: false,
  isOpenOrgChart: false,
  employeeOnboardingName: null,
  onboardingDetail: null,
  isCreateReview: false
}

const PageHeaderContext = createContext(initialState)

const PageHeaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pageHeaderState, setPageHeaderState] = useState(initialState)

  const resetPageHeaderState = () => {
    setPageHeaderState(initialState)
  }

  const handleSetPageHeaderState = (value) => {
    setPageHeaderState((prev) => ({ ...prev, ...value }))
  }

  return (
    <PageHeaderContext.Provider
      value={{
        ...pageHeaderState,
        resetPageHeaderState,
        handleSetPageHeaderState
      }}
    >
      {children}
    </PageHeaderContext.Provider>
  )
}

export const usePageHeaderContext = () => React.useContext(PageHeaderContext)

export default PageHeaderProvider
