import { CountryCode } from 'libphonenumber-js'
import { IAttachment } from '../share/types'
import { EmployeeDetail } from './types.d'
export interface UserPrimaryInfo {
  userInfo: User
  workProfile: WorkProfile
  projects: Project[]
  contact: Contact
}

interface User {
  id: number
  firstName: string
  lastName: string
  middleName: string
  avatar: string
  phoneNumber: string
  email: string
  status?: number
  employeeStatus?: number
  position?: string
  level?: string
  joinDate?: string | Date
  employeeId?: number
}

export interface WorkProfile {
  department: string
  level: string
  position: string
  joinDate: string
  lineManager: LineManager
  departmentId: number
}

export interface LineManager {
  id: number
  firstName: string
  lastName: string
  middleName: string
  avatar: string
  fullName?: string
}

export interface Project {
  name: string
  role: string
}

export interface Contact {
  phoneNumber: string
  email: string
  countryCode?: CountryCode
}

export interface EmployeePersonalInfo {
  generalInfo: EmployeeGeneral
  cardInfo?: ICardInfo
  contactInfo: Contact
  address: []
  familyInfo: FamilyInfo[]
  emergencyContactInfo?: EmergencyContactInfo[]
  socialInfo?: ISocialInfo[]
  vehicleInfo?: IVehicleInfo[]
  addresses?: IAddressV2
}

export interface ICardInfo {
  cardNo: string
  cardName: string
  issueDate: string
  expiredAt: string
  issuePlace: string
  imageFront: string
  imageBack: string
  id?: number
}
export interface EmployeeGeneral {
  firstName: string
  lastName: string
  middleName: string
  gender: string | number
  martialStatus: string
  dob: string
  email: string
  id?: number
  placeOfBirth?: string
  maritalStatus?: string | number
}

export interface EmployeeContact {
  idCard: string
  issuedDate: string
  expiredDate: string
  issuePlace: string
  imgFront: string
  imgBack: string
}

export interface EmployeeFamily {
  id: number
  name: string
  phone: string
  contactAddress: string
  relation: string
  occupation: unknown
  countryCode: CountryCode
  userId: number
}

export interface EmployeeEmergencyContactInfo {
  id: number
  name: string
  phone: string
  homePhone: string
  address: string
  relation: string
  countryCode: CountryCode
  userId: number
}

export interface ISocialInfo {
  id: number
  socialName: string
  value: string
  key: string
  userId: number
}

export interface IVehicleInfo {
  id: number
  vehicleName: string
  vehicleBrand: string
  vehicleNo: string
  userId: number
}

export interface IAddress {
  id: number
  address: string
  wardId: number
  districtId: number
  cityId: number
  type: number
  userId: number
  houseNo?: string
  countryId: number
  district: IDistrict
  city: ICity
  ward: IWard
  country: ICountry
}

export interface IAddressV2 {
  address: string
  permanentAddress: string
}

export interface IDistrict {
  id: number
  name: string
  nameEn: string
  cityId: number
  grant: string
}

export interface ICity {
  id: number
  name: string
  nameEn: string
  grant: string
}

export interface IWard {
  id: number
  name: string
  nameEn: string
  districtId: number
  grant: string
}

export interface Country {
  id: number
  name: string
  code: string
}

export interface EmployeeDetail {
  id: number
  staffId: string
  code: string
  joinDate: Date
  status: number
  email: string
}

export interface Tax {
  id: number
  userId: number
  taxCode: string
  taxNo: string
  numberOfDep: number
  nameOfDep: string[]
}

export interface Insurance {
  id: number
  userId: number
  insuranceNo: string
  insuranceId: string
  registrationPlace: string
}

export interface IEmployeeTaxInsuranceInfo {
  tax: Tax
  insurance: Insurance
}

export interface Contract {
  contractType: string
  contractNo: string
  startDate: string
  endDate: string
  jobTitle: string
}

export interface IEmployeeContractInfo {
  contract: Contract
}

export interface Bank {
  bankName: string
  accountNo: string
  holder: string
}

export interface IEmployeeBankInfo {
  companyBank: Bank
  personalBank: Bank
}

export interface Healthcare {
  cardId: string
  cardNo: string
  name: string
  startDate: string
  endDate: string
  type: number
  provider
  birthDate: string
}

export interface IUserHealthcareInfo {
  personalHealthcare: Healthcare
  dependentHealthcare: Healthcare[]
}

export interface EmployeeListDetail extends User {
  staffId: string
  lineManager: LineManager
  contact: Contact
  departments?: any[]
  position?: string
  joinDate: Date
  onboardingTasks?: any[]
}

export interface ILeaveTypeSingle {
  id: number
  name: string
}
export interface ILeaveTypeList {
  leaveTypeList: ILeaveType[]
}
interface ILeaveCategoryQuery {
  id?: number
}

export interface ITime {
  id: number
  name: string
}
export interface LeaveRequestListDetail {
  id: number
  leaveTypeId: number
  startDate: string
  endDate: string
  duration: number
  approver: string
  status: number
  categoryName?: string
  leaveCategoryId?: number
  leaveTypeName?: string
  approver?: any
}

export interface IEmployeeAppraisal {
  id: number
  formName: string
  subTitle: string
  templateId: number
  description: string
  startDate: string
  endDate: Date
  judgementStartDate: Date
  judgementEndDate: Date
  notes: string
  formType: number
  status: number
}

export type IListEmployeeAppraisal = IEmployeeAppraisal[]

// export interface IUpdateDetailTemplate {
//   id?: number
//   endDate?: Date
//   judgementStartDate?: Date
//   judgementEndDate?: Date
//   isPrivate?: boolean
// }

export interface IAnswerQuestion {
  answer?: string
  comment?: string
  formId?: number
  questionId?: number
}
export interface IEmployeeContribute {
  contribution?: string
  formId?: number
}
export interface ICancelLeaveRequest {
  id: number
  reason: string
}

export interface ICreateNewTaskOnBoard {
  typeGenerate?: string
  employeeId?: number
  departmentId?: number
  name?: string
  groupOnboardingId?: number
  status?: number
  note?: string
  attachments?: IAttachment[]
  dueDate?: Date | string
  desc?: string
  assignedTo?: number
  assignedBy?: number
}

export interface CountryInfo {
  countryCode: CountryCode
  name: string
  phoneLimit: number
}

export interface Countries extends Array<CountryInfo> {}
