export interface UserPrimaryInfo {
  userInfo: User
  workProfile: WorkProfile
  projects: Project[]
  contact: Contact
}

export interface Contact {
  phoneNumber: string
  email: string
  countryCode?: string
}

export interface IGroupHeader {
  header?: string
  subHeader?: string
  borderBottomColor?: string
  background?
  string
  colSpan?: number
  align?: string
  width?: number
  subWidth?: number
  subTitle?: string
  isSticky?: boolean
  key?: string
  isEvaluatedIa?: boolean
}
export interface IGroupChildHeader {
  accessorKey?: string
  childHeader?: string
  textColor?: string
  childAlign?: string
  childWidth?: number
  childTypography?: string
  isShowTooltip?: boolean
  isEvaluatedIa?: boolean
  width?: number
  subWidth?: number
}
export interface IAccessor {
  accessorKey?: string
  childHeader?: string
  textColor?: string
  childAlign?: string
  childWidth?: number
  childTypography?: string
  isShowModal?: boolean
  fontWeight?: string
  stageIAId?: number
  isEvaluatedIa?: boolean
}
export interface IRowCA {
  category?: string
  competency?: string
  questionNote?: string
  general_attributes?: string
  entry_employee_current?: number | string
  entry_employee_expected?: number | string
  entry_evaluator_current?: number | string
  entry_evaluator_expected?: number | string
  employee_input_exit?: number | string
  evaluator_input_exit?: number | string
  additional_input?: string
  formId?: number
  questionId?: number
  comments: ICommentCompetency[]
  formUserAccessId: number
  isEvaluatedIa?: boolean
}

export interface IUser {
  firstName?: string
  lastName?: string
  avatar?: string
  status?: number
  employeeStatus?: number
}

export interface IRow {
  employeeId?: number
  staffId?: string
  name?: string
  lineManager?: string
  joinDate?: string
  division?: string
  jan?: number
  feb?: number
  mar?: number
  apr?: number
  may?: number
  jun?: number
  jul?: number
  aug?: number
  sep?: number
  oct?: number
  nov?: number
  dec?: number
  leaveTakenInfo?: number
  unpaidLeave?: number
  infoLeaveBalance?: number
  supportingAdvanceLeave?: number
  supportingLeaveBalance?: number
  supportingLeaveTransfer?: number
  supportingActualAnnualLeave?: number
  supportingLoyaltyLeave?: number
  supportingSettlement?: number
  supportingLeaveTaken?: number
  afterAnnualLeave?: number
  afterLoyaltyLeave?: number
  afterAdvanceLeave?: number
  questionId?: number
  formId?: number
  isEvaluatedIa?: boolean
}

export interface IColumnInputEntry {
  header?: any
  subHeader?: string | string[]
  subTitle?: string
  borderBottomColor?: string
  background?: string
  colSpan?: number
  align?: string
  childColumns?: IChildColumn[]
  width?: number
  subWidth?: number
  isSticky?: boolean
  key?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any
export interface IInfoAssRecordLeft {
  phase?: string
  from?: string
  to?: string
  currentStage?: {
    stageName?: string
    stageId?: number
  }
  currentStageNameDisplay?: string
  employee?: string
  jobTitle?: string
  companyLevel?: string
  lineManager?: string
  formAddGoal?: any
  formId?: number
  formSubmitted?: any[]
  formAddGoal?: ICompetencyAddGoal[]
  formAnswerTemporary: IFormAnswerTemporaryCompetency[]
  formComments: ICommentCompetency[]
  userSubmitted?: any[]
  formUserAccessType?: number
  disabledOpenChart?: boolean
  arrPreFilter?: any[]
}
export interface ICompetencyAddGoal {
  goal?: string
  formId?: number
}

export interface ICommentCompetency {
  id?: number
  comment?: string
  questionId?: number
  updatedBy?: number
  formUserAccessId?: number
  updatedAt?: string
  createdAt?: string
  User?: IUser
}

export interface IDataTableEmployeeAssessment {
  id?: number
  status?: number
  subTitle?: string
  formType?: number
  formUserAccessType?: number
  formName?: string
  lineManager?: {
    firstName?: string
    lastName?: string
    middleName?: string
  }
  formSubmitted?: any[]
  formAddGoal?: IFormAddGoal[]
  formAnswerTemporary?: IFormAnswerTemporaryCompetency[]
  formComments?: any[]
  template?: {
    templateName?: string
    questionGroups: IQuestionGroupCompetency[]
  }
  userSubmitted?: any[]
}

export interface IEmployeeAssessmentDetail {
  id?: number
  status?: number
  subTitle?: string
  formType?: number
  formUserAccessType?: number
  formUserAccessId?: number
  fullName?: string
  level?: string
  endDate?: string
  position?: string
  startDate?: string
  formName?: string
  lineManager?: {
    firstName?: string
    lastName?: string
    middleName?: string
    fullName?: string
  }
  formSubmitted?: any[]
  formAddGoal?: IFormAddGoal[]
  formAnswerTemporary?: IFormAnswerTemporaryCompetency[]
  formComments?: any[]
  template?: {
    templateName?: string
    questionGroups: IQuestionGroupCompetency[]
  }
  userSubmitted?: any[]
  user?: {
    level?: string
    position?: string
    firstName?: string
    lastName?: string
    middleName?: string
  }
  form?: {
    endDate?: string
    formName?: string
    formType?: number
    startDate?: string
    status?: number
    subTitle?: string
    template?: {
      questionGroups: IQuestionGroupCompetency[]
    }
  }
}
export interface IFormCompetency {}

export interface IFormAddGoal {
  formId?: number
  goal?: string
  type?: number
  userId?: number
  id?: number
}

export interface IFormAnswerTemporaryCompetency {
  id?: number
  formId?: number
  questionId?: number
  type?: number
  userId?: number
  expected?: string
  current?: string
}

export interface IQuestionGroupCompetency {
  id?: number
  groupName?: string
  questions?: QuestionCompetency[]
}

export interface QuestionCompetency {
  id?: number
  explaination?: string
  groupId?: number
  order?: number
  question?: string
  questionCategory?: string
  questionKey?: string
}

export interface IRowTableCompetencyAss {
  category?: string
  competency?: string
  questionNote?: string
  general_attributes?: string
  entry_employee_current?: number
  entry_employee_expected?: number
  entry_evaluator_current?: number
  entry_evaluator_expected?: number
  employee_input_exit?: number
  evaluator_input_exit?: number
  employee_input_ia?: number
  evaluator_input_ia?: number
  additional_input?: string
  formId?: number
  questionId?: number
  formUserAccessId?: number
  comments?: any[]
}

export interface IInputRatingQuestion {
  current?: string
  expected?: string
  formId?: number
  questionId?: number
}

export interface IAttachment {
  originName: string
  s3Url: string
  percentage?: number
  file?: any
  ownerId?: number
  createdAt?: number
}
export interface ICreateLeaveRequest {
  employeeId: number
  startDate: string
  endDate: string
  leaveTypeId: number
  pendingWorkload: string
  note: string
  attachments: Array[]
}

export interface IUpdateLeaveRequest {
  employeeId?: number
  startDate?: string
  endDate?: string
  leaveTypeId?: number
  pendingWorkload?: string
  note?: string
  attachments?: Array[]
  leaveRequestId?: number
}

export interface ILeaveRequestDetail {
  id?: number
  leaveTypeId?: number
  startDate?: string
  endDate?: string
  status?: number
  attachments?: IAttachment[]
  pendingWorkload?: string
  note?: string
  employeeId?: number
  companyId?: number
  departmentId?: number
  duration?: number
  approver?: string
}
export interface IPosition {
  id: number
  name: string
  descriptions: string
}

export interface LineManager {
  id: number
  firstName: string
  lastName: string
  middleName: string
  avatar: string
  fullName?: string
}

export interface ILeaveCategorySingle {
  id: number
  name: string
  leaveTypes: Array
}

export type ILeaveCategoryList = ILeaveCategorySingle[]
export interface ILeaveType {
  id: number
  leaveCategoryId: number
  name: string
  maxDay: number
}

export interface IUpdateAddressInfo {
  address?: string
  permanentAddress?: string
  userId?: number
}

export interface ICreateEmergencyInfo {
  name?: string
  phone?: string
  countryCode?: string
  address?: string
  relation?: string
  userId: number
}
export interface IUpdateEmergencyInfo {
  id?: number
  name?: string
  phone?: string
  countryCode?: string
  address?: string
  relation?: string
  userId: number
}

export interface ICreateFamilyInfo {
  name?: string
  phone?: string
  countryCode?: string
  contactAddress?: string
  relation?: string
  userId: number
}
export interface IUpdateFamilyInfo {
  id?: number
  name?: string
  phone?: string
  countryCode?: string
  contactAddress?: string
  relation?: string
  userId: number
}

export interface IUpdateGeneralInfo {
  fullName?: string
  dob?: Date
  placeOfBirth?: string
  gender?: number | string
  maritalStatus?: number | string
  userId?: number
}
export interface IUpdateIDCard {
  idCard?: string | number
  issuedPlace?: string
  issuedDate?: Date | string
  expiredDate?: Date | string
  imageFront?: string
  imageBack?: string
  userId?: number
}

export interface IUpdateOrgEmployeeProfile {
  email: string
  joinDate: string
  status: number
  code: string
  staffId?: string
  userId?: number
}
export interface IUpdateOrgEmployeeRole {
  departmentId?: number
  positionId?: number
  levelId?: number
  projects: any[]
  userId?: number
}

export interface IUpdatePersonalContact {
  countryCode: string
  phone: string
  personalEmail: string
  userId: number
}

export interface ICreateOnBoardingEmployee {
  fullName?: string
  joinDate?: Date
  position?: number | string
  companyLevel?: number | string
  userId?: number
}

export interface IUpdateOnboardingTask {
  status?: number
  userId?: number
  id?: number
}

export interface IUpdateTaskAttachment {
  attachments?: AnyType[]
  taskId?: number
}

export interface IDataDocumentsTable {
  fileName: string
  uploadedBy: string
  lastModified: string
  fileSize: string
}
export interface ICreateStage {
  formId: number
  stage: string
}

export interface IDeleteStage {
  formId: number
  stageId: number
}
