import { IColumnInputEntry } from '../share/types'

export const END_POINT = {
  listUsers: 'v1/users',
  userPrimaryInfo: (id: number) => `v1/users/${id}/primary`,
  userTaxInsuranceInfo: (id: number) => `v1/users/${id}/tax-insurance`,
  userBankInfo: (id: number) => `v1/users/${id}/bank`,
  userHealthcareInfo: (id: number) => `v1/users/${id}/healthcare`,
  userPersonalContact: (id: number) => `/v1/users/${id}/contact`,

  userPersonalInfo: (id: number) => `v1/users/${id}/personal-info`,
  employeeProfile: (id: number) => `v1/employee/${id}/profile`,
  employeeContractInfo: (id: number) => `v1/employee/${id}/contract`,

  updateTaskStatus: (userId: number) => `v1/employee/on-boarding/${userId}/done`,
  completeOnboardingStatus: (userId: number) => `v1/employee/on-boarding/${userId}/complete`,

  updateAddressInfo: (userId: number) => `v1/users/${userId}/address`,
  updateGeneralInfo: (userId: number) => `v1/users/${userId}/general-info`,

  createEmergencyInfo: `v1/users/emergency-info`,
  updateEmergencyInfo: (userId: number) => `v1/users/${userId}/emergency-info`,

  createFamilyInfo: `v1/users/family-info`,
  updateFamilyInfo: (userId: number) => `v1/users/${userId}/family-info`,

  updateIDCard: (userId: number) => `v1/users/${userId}/id-card`,
  updateOrgEmployeeProfile: (userId: number) => `v1/users/${userId}/employee-profile`,
  updateOrgEmployeeRole: (userId: number) => `v1/users/${userId}/responsibility`,

  employeeList: 'v1/employee/list',
  lineManager: 'v1/employee/line-manager',
  positionList: 'v1/employee/position',
  companyLevelList: 'v1/employee/company-level',
  getDepartmentList: 'v1/employee/departments',
  getProjectList: 'v1/employee/projects',
  getProjectRole: 'v1/employee/project-roles',

  leaveTypeList: (leaveCategoryId: number) => `v1/employee/leave-category/${leaveCategoryId}/leave-type`,
  generatePresignedUrl: 'v1/presigned-url',
  getFileUpload: 'v1/signed-url',
  updateLeaveRequest: (id: number) => `v1/leave-request/update/${id}`,
  getUnpaidLeave: 'v1/leave-request/unpaid-monthly',
  employeeAppraisalList: 'v1/performance-appraisal/accessible-forms',
  employeeAppraisalDetail: (id: number) => `v1/performance-appraisal/accessible-forms/${id}`,
  employeeAnswerQuestion: 'v1/performance-appraisal/answer',
  employeeContribute: 'v1/performance-appraisal/user-contribute',
  employeeSubmitForm: (id: number) => `v1/performance-appraisal/user-submit-form/${id}`,
  employeeLeaveDetail: (id: number) => `v1/leave-request/${id}`,
  cancelEmployeeLeaveRequest: (id: number) => `v1/leave-request/cancel/${id}`,
  employeeCompetencyAssessRecord: 'v1/competency/accessible-forms',
  employeeAssRecordCompetencyDetail: (id: number) => `v1/competency/accessible-forms/${id}`,
  employeeAddGoal: 'v1/competency/user-add-goal',
  employeeInputRatingQuestion: 'v1/competency/answer',
  commentCompetency: 'v1/competency/evaluator-comment',
  deleteCommentCompetency: (id: number) => `v1/competency/evaluator-comment/${id}`,
  submitCompetency: (id: number) => `v1/competency/user-submit-form/${id}`,
  employeeCreateStageCompetency: `v1/competency/forms-stage`,
  formsStageCompetency: `v1/competency/forms-stage`,
  deleteStageCompetency: (stageId: number) => `v1/competency/forms-stage/${stageId}`,

  createOnBoardingEmployee: 'v1/users/on-boarding',
  getEmployeeOnboardingDetail: (employeeOnboardingId: number) =>
    `v1/employee/on-boarding/check-list/${employeeOnboardingId}`,
  deleteOnboardingTask: (taskId: number) => `v1/employee/on-boarding/${taskId}`,
  getTaskOnboardingDetail: (taskId: number) => `v1/employee/on-boarding/task-detail/${taskId}`,
  getGroupDeptOnboarding: `v1/employee/on-boarding/group-dept`,
  getListPersonWithGroupDept: (params: { groupId: number; employeeId: number }) =>
    `v1/employee/on-boarding/group-dept/${params?.groupId}/person/${params?.employeeId}`,

  createNewTaskOnboarding: `v1/users/on-boarding/new-task`,
  updateTaskOnboarding: (id: number) => `v1/users/on-boarding/update-task/${id}`,
  updateAttachmentTask: (id: number) => `v1/users/on-boarding/update-attachment-task/${id}`
}

export const TEMPLATE_APPRAISAL_STATUS = {
  DRAFT: 0,
  PUBLISHED: 1
}

export const FORM_TYPE_TEMPLATE = {
  JUNIOR_MID: 1,
  SENIOR_LEAD: 2
}

export const CATEGORY_EDIT_USER_INFO = {
  GENERAL: 'GENERAL',
  ID_CARD: 'ID_CARD',
  CONTACT: 'CONTACT',
  ADDRESS: 'ADDRESS',
  FAMILY: 'FAMILY',
  EMERGENCY: 'EMERGENCY',
  ORG_INFO_EMPLOYEE_PROFILE: 'ORG_INFO_EMPLOYEE_PROFILE',
  ORG_ROLE_EMPLOYEE_PROFILE: 'ORG_ROLE_EMPLOYEE_PROFILE'
}
// 0 - Applicant, 1 - Candidate, 2 - Probation, 3 - Employee, 4 - Alumni
export const STATUS_LIFECYCLE_USER = {
  ON_BOARDING: 2,
  CURRENT: 3,
  OFF_BOARDING: 4
}

export const STATUS_ONBOARDING_TASK = {
  UNDONE: 0,
  DONE: 1
}

export const TOTAL_TASK_ONBOARDING = 19

export const mapGroupOnBoarding = {
  HR: 'HR',
  Department: 'Department',
  IT: 'IT',
  'New Hire': 'New Hire'
}

export const mapTypeGenerate = {
  HR: 'hrTask',
  IT: 'itTask',
  Department: 'deptTask',
  'New Hire': 'newHireTask'
}

export const sortOrderOnBoardingHr = ['HR', 'IT', 'Department', 'New Hire']
export const sortOrderGroupDept = ['HR', 'IT', 'Department', 'New Hire']

export const mapIdGroupOnBoarding = {
  1: 'HR',
  2: 'Department',
  3: 'IT',
  4: 'New Hire'
}

export const contractTypes = [
  { id: 1, name: 'Probation' },
  { id: 2, name: 'Labour - Fixed term' },
  { id: 3, name: 'Casual' },
  { id: 4, name: 'Intern' },
  { id: 5, name: 'Labour - Indefinite' }
]

export const FILE_ACCEPT_ID_CARD = ['png', 'jpg', 'jpeg']

export const SIZE_LIMIT_ID_CARD = 100

export const mapFormType = {
  1: 'Middle & Junior Form',
  2: 'Senior & Lead Form'
}

export const mapFormRecipients = {
  1: 'All Middle and Junior group',
  2: 'All Seniors and Leaders group'
}

export const mapStatusTemplate = {
  0: 'Draft',
  1: 'Published'
}

export const keyLoading = {
  UPDATE_ADDRESS: 'updateAddress',
  UPDATE_GENERAL: 'updateGeneral',
  UPDATE_ID_CARD: 'updateIDCard',
  UPDATE_PERSONAL_CONTACT: 'updatePersonalContact',
  CREATE_EMERGENCY: 'createEmergency',
  EDIT_EMERGENCY: 'editEmergency',
  CREATE_FAMILY: 'createFamily',
  EDIT_FAMILY: 'editFamily',
  EDIT_ORG_INFO_EMPLOYEE: 'editOrgInfoEmployee',
  EDIT_ORG_ROLE_EMPLOYEE: 'editOrgRoleEmployee'
}

export const ARR_LOADING_KEYS = [
  keyLoading['UPDATE_ADDRESS'],
  keyLoading['UPDATE_GENERAL'],
  keyLoading['UPDATE_ID_CARD'],
  keyLoading['UPDATE_PERSONAL_CONTACT'],
  keyLoading['CREATE_EMERGENCY'],
  keyLoading['EDIT_EMERGENCY'],
  keyLoading['CREATE_FAMILY'],
  keyLoading['EDIT_FAMILY'],
  keyLoading['EDIT_ORG_INFO_EMPLOYEE'],
  keyLoading['EDIT_ORG_ROLE_EMPLOYEE']
]

export const columnInputEntry = (): IColumnInputEntry[] => {
  return [
    {
      header: 'Criteria Group Name',
      subHeader: 'Assessment Criteria',
      borderBottomColor: 'border-b-secondary-300',
      background: ' bg-secondary-100',
      colSpan: 5,
      align: 'start',
      width: 118 + 152 + 186,
      isSticky: true,
      key: 'criteria',
      childColumns: [
        {
          accessorKey: 'category',
          childHeader: 'Category',
          textColor: 'text-gray-900',
          childAlign: 'start',
          childWidth: 118,
          isShowModal: false
        },
        {
          accessorKey: 'competency',
          childHeader: 'Competency',
          textColor: 'text-gray-900',
          childAlign: 'start',
          childWidth: 152,
          isShowModal: false
        },
        {
          accessorKey: 'general_attributes',
          childHeader: 'General Attributes',
          textColor: 'text-gray-900',
          childAlign: 'start',
          childWidth: 186,
          isShowModal: false
        }
      ]
    },
    {
      header: `Entry Assessment`,
      subHeader: 'Employee Rate',
      borderBottomColor: 'border-b-blue-500',
      background: 'bg-blue-100',
      colSpan: 2,
      align: 'center',
      width: 2 * 120,
      key: 'entryAssessment',
      childColumns: [
        {
          accessorKey: 'entry_employee_current',
          childHeader: 'Current',
          textColor: 'text-gray-900',
          childAlign: 'center',
          childWidth: 120,
          isShowModal: true
        },
        {
          accessorKey: 'entry_employee_expected',
          childHeader: 'Expected',
          textColor: 'text-gray-900',
          childAlign: 'center',
          childWidth: 120,
          isShowModal: true
        }
      ]
    },
    {
      header: `Additional Input`,
      subHeader: `Notes / Action Plans`,
      borderBottomColor: 'border-b-primary-500',
      background: 'bg-primary-100',
      colSpan: 3,
      align: 'center',
      width: 320,
      key: 'additionalInput',
      childColumns: [
        {
          accessorKey: 'additional_input',
          // childHeader: 'Expected',
          // textColor: 'text-gray-900',
          // childAlign: 'center',
          childWidth: 320,
          isShowModal: true
        }
      ]
    }
  ]
}

// export const columnInputExitEntry: IColumnInputEntry = {
//   header: `Exit Assessment`,
//   subHeader: `Employee Rate`,
//   borderBottomColor: 'border-b-purple-400',
//   background: 'bg-purple-100',
//   colSpan: 1,
//   align: 'center',
//   width: 160,
//   key: 'exitAssessment',
//   childColumns: [
//     {
//       accessorKey: 'employee_input_exit',
//       childHeader: 'Captured',
//       textColor: 'text-gray-900',
//       childAlign: 'center',
//       childWidth: 160,
//       isShowModal: true
//     }
//   ]
// }

export const columnInputExit: IColumnInputEntry[] = [
  {
    header: 'Criteria Group Name',
    subHeader: 'Assessment Criteria',
    borderBottomColor: 'border-b-secondary-300',
    background: ' bg-secondary-100',
    colSpan: 5,
    align: 'start',
    width: 118 + 152 + 186,
    isSticky: true,
    key: 'criteria',
    childColumns: [
      {
        accessorKey: 'category',
        childHeader: 'Category',
        textColor: 'text-gray-900',
        childAlign: 'start',
        childWidth: 118,
        isShowModal: false
      },
      {
        accessorKey: 'competency',
        childHeader: 'Competency',
        textColor: 'text-gray-900',
        childAlign: 'start',
        childWidth: 152,
        isShowModal: false
      },
      {
        accessorKey: 'general_attributes',
        childHeader: 'General Attributes',
        textColor: 'text-gray-900',
        childAlign: 'start',
        childWidth: 186,
        isShowModal: false
      }
    ]
  },
  {
    header: `Entry Assessment`,
    subHeader: 'Employee Rate',
    borderBottomColor: 'border-b-blue-500',
    background: 'bg-blue-100',
    colSpan: 2,
    align: 'center',
    width: 4 * 120,
    subWidth: 2 * 120,
    key: 'entryAssessment',
    childColumns: [
      {
        accessorKey: 'entry_employee_current',
        childHeader: 'Current',
        textColor: 'text-gray-900',
        childAlign: 'center',
        childWidth: 120,
        isShowModal: true
      },
      {
        accessorKey: 'entry_employee_expected',
        childHeader: 'Expected',
        textColor: 'text-gray-900',
        childAlign: 'center',
        childWidth: 120,
        isShowModal: true
      }
    ]
  },
  {
    header: null,
    subHeader: 'Final Rate',
    borderBottomColor: 'border-b-blue-500',
    background: 'bg-blue-100',
    colSpan: 2,
    align: 'center',
    width: 2 * 120,
    key: 'entryAssessment',
    childColumns: [
      {
        accessorKey: 'entry_evaluator_current',
        childHeader: 'Current',
        textColor: 'text-gray-900',
        childAlign: 'center',
        childWidth: 120,
        isShowModal: true
      },
      {
        accessorKey: 'entry_evaluator_expected',
        childHeader: 'Expected',
        textColor: 'text-gray-900',
        childAlign: 'center',
        childWidth: 120,
        isShowModal: true
      }
    ]
  },
  {
    header: `Exit Assessment`,
    subHeader: `Employee Rate`,
    borderBottomColor: 'border-b-purple-400',
    background: 'bg-purple-100',
    colSpan: 2,
    align: 'center',
    width: 160,
    key: 'exitAssessment',
    childColumns: [
      {
        accessorKey: 'employee_input_exit',
        childHeader: 'Captured',
        textColor: 'text-gray-900',
        childAlign: 'center',
        childWidth: 160,
        isShowModal: true
      }
    ]
  },
  {
    header: `Additional Input`,
    subHeader: `Notes / Action Plans`,
    borderBottomColor: 'border-b-primary-500',
    background: 'bg-primary-100',
    colSpan: 3,
    align: 'center',
    width: 320,
    key: 'additionalInput',
    childColumns: [
      {
        accessorKey: 'additional_input',
        // childHeader: 'Expected',
        // textColor: 'text-gray-900',
        // childAlign: 'center',
        childWidth: 320,
        isShowModal: true
      }
    ]
  }
]

export const renderItemExit = () => {
  return {
    header: `Exit Assessment`,
    subHeader: `Employee Rate`,
    borderBottomColor: 'border-b-purple-400',
    background: 'bg-purple-100',
    colSpan: 2,
    align: 'center',
    width: 160,
    key: 'exitAssessment',
    childColumns: [
      {
        accessorKey: 'employee_input_exit',
        childHeader: 'Captured',
        textColor: 'text-gray-900',
        childAlign: 'center',
        childWidth: 160,
        isShowModal: true
      }
    ]
  }
}

export const renderItemIaAssessment = (iaName, timeCreate, stageIAId) => {
  return {
    header: `${iaName} - ${timeCreate}`,
    subHeader: `Employee Rate`,
    borderBottomColor: 'border-b-yellow-500',
    background: 'bg-yellow-100',
    colSpan: 2,
    align: 'center',
    width: 160,
    key: 'iaAssessment',
    childColumns: [
      {
        accessorKey: `employee_input_ia${stageIAId}`,
        childHeader: 'Captured',
        textColor: 'text-gray-900',
        childAlign: 'center',
        childWidth: 160,
        isShowModal: true,
        stageIAId: stageIAId
      }
    ]
  }
}

export const countriesInfo = {
  AF: { name: 'Afghanistan', phoneLimit: 9 },
  AL: { name: 'Albania', phoneLimit: 8 },
  DZ: { name: 'Algeria', phoneLimit: 9 },
  AS: { name: 'American Samoa', phoneLimit: 7 },
  AD: { name: 'Andorra', phoneLimit: 6 },
  AO: { name: 'Angola', phoneLimit: 9 },
  AI: { name: 'Anguilla', phoneLimit: 7 },
  AQ: { name: 'Antarctica', phoneLimit: 9 },
  AG: { name: 'Antigua and Barbuda', phoneLimit: 7 },
  AR: { name: 'Argentina', phoneLimit: 10 },
  AM: { name: 'Armenia', phoneLimit: 8 },
  AW: { name: 'Aruba', phoneLimit: 7 },
  AU: { name: 'Australia', phoneLimit: 9 },
  AT: { name: 'Austria', phoneLimit: 10 },
  AZ: { name: 'Azerbaijan', phoneLimit: 9 },
  BS: { name: 'Bahamas', phoneLimit: 7 },
  BH: { name: 'Bahrain', phoneLimit: 8 },
  BD: { name: 'Bangladesh', phoneLimit: 10 },
  BB: { name: 'Barbados', phoneLimit: 7 },
  BY: { name: 'Belarus', phoneLimit: 9 },
  BE: { name: 'Belgium', phoneLimit: 9 },
  BZ: { name: 'Belize', phoneLimit: 7 },
  BJ: { name: 'Benin', phoneLimit: 8 },
  BM: { name: 'Bermuda', phoneLimit: 7 },
  BT: { name: 'Bhutan', phoneLimit: 8 },
  BO: { name: 'Bolivia', phoneLimit: 8 },
  BA: { name: 'Bosnia and Herzegovina', phoneLimit: 8 },
  BW: { name: 'Botswana', phoneLimit: 7 },
  BR: { name: 'Brazil', phoneLimit: 10 },
  IO: { name: 'British Indian Ocean', phoneLimit: 7 },
  BN: { name: 'Brunei Darussalam', phoneLimit: 7 },
  BG: { name: 'Bulgaria', phoneLimit: 9 },
  BF: { name: 'Burkina Faso', phoneLimit: 8 },
  BI: { name: 'Burundi', phoneLimit: 8 },
  CV: { name: 'Cabo Verde', phoneLimit: 7 },
  KH: { name: 'Cambodia', phoneLimit: 9 },
  CM: { name: 'Cameroon', phoneLimit: 9 },
  CA: { name: 'Canada', phoneLimit: 10 },
  KY: { name: 'Cayman Islands', phoneLimit: 7 },
  CF: { name: 'Central African Republic', phoneLimit: 8 },
  TD: { name: 'Chad', phoneLimit: 8 },
  CL: { name: 'Chile', phoneLimit: 9 },
  CN: { name: 'China', phoneLimit: 11 },
  CO: { name: 'Colombia', phoneLimit: 10 },
  KM: { name: 'Comoros', phoneLimit: 7 },
  CG: { name: 'Congo-Brazzaville', phoneLimit: 8 },
  CD: { name: 'Democratic Republic', phoneLimit: 9 },
  CK: { name: 'Cook Islands', phoneLimit: 7 },
  CR: { name: 'Costa Rica', phoneLimit: 8 },
  HR: { name: 'Croatia', phoneLimit: 9 },
  CU: { name: 'Cuba', phoneLimit: 8 },
  CY: { name: 'Cyprus', phoneLimit: 8 },
  CZ: { name: 'Czech Republic', phoneLimit: 9 },
  DK: { name: 'Denmark', phoneLimit: 8 },
  DJ: { name: 'Djibouti', phoneLimit: 8 },
  DM: { name: 'Dominica', phoneLimit: 7 },
  DO: { name: 'Dominican Republic', phoneLimit: 10 },
  EC: { name: 'Ecuador', phoneLimit: 9 },
  EG: { name: 'Egypt', phoneLimit: 9 },
  SV: { name: 'El Salvador', phoneLimit: 8 },
  GQ: { name: 'Equatorial Guinea', phoneLimit: 9 },
  ER: { name: 'Eritrea', phoneLimit: 8 },
  EE: { name: 'Estonia', phoneLimit: 8 },
  SZ: { name: 'Eswatini (Swaziland)', phoneLimit: 9 },
  ET: { name: 'Ethiopia', phoneLimit: 9 },
  FJ: { name: 'Fiji', phoneLimit: 7 },
  FI: { name: 'Finland', phoneLimit: 9 },
  FR: { name: 'France', phoneLimit: 10 },
  GF: { name: 'French Guiana', phoneLimit: 10 },
  PF: { name: 'French Polynesia', phoneLimit: 10 },
  GA: { name: 'Gabon', phoneLimit: 8 },
  GM: { name: 'Gambia', phoneLimit: 7 },
  GE: { name: 'Georgia', phoneLimit: 9 },
  DE: { name: 'Germany', phoneLimit: 11 },
  GH: { name: 'Ghana', phoneLimit: 9 },
  GI: { name: 'Gibraltar', phoneLimit: 8 },
  GR: { name: 'Greece', phoneLimit: 10 },
  GL: { name: 'Greenland', phoneLimit: 7 },
  GD: { name: 'Grenada', phoneLimit: 7 },
  GP: { name: 'Guadeloupe', phoneLimit: 9 },
  GU: { name: 'Guam', phoneLimit: 10 },
  GT: { name: 'Guatemala', phoneLimit: 8 },
  GG: { name: 'Guernsey', phoneLimit: 8 },
  GN: { name: 'Guinea', phoneLimit: 8 },
  GW: { name: 'Guinea-Bissau', phoneLimit: 8 },
  GY: { name: 'Guyana', phoneLimit: 8 },
  HT: { name: 'Haiti', phoneLimit: 8 },
  HN: { name: 'Honduras', phoneLimit: 8 },
  HK: { name: 'Hong Kong', phoneLimit: 8 },
  HU: { name: 'Hungary', phoneLimit: 9 },
  IS: { name: 'Iceland', phoneLimit: 7 },
  IN: { name: 'India', phoneLimit: 10 },
  ID: { name: 'Indonesia', phoneLimit: 10 },
  IR: { name: 'Iran', phoneLimit: 10 },
  IQ: { name: 'Iraq', phoneLimit: 10 },
  IE: { name: 'Ireland', phoneLimit: 9 },
  IM: { name: 'Isle of Man', phoneLimit: 8 },
  IL: { name: 'Israel', phoneLimit: 9 },
  IT: { name: 'Italy', phoneLimit: 10 },
  CI: { name: 'Ivory Coast', phoneLimit: 10 },
  JM: { name: 'Jamaica', phoneLimit: 7 },
  JP: { name: 'Japan', phoneLimit: 10 },
  JE: { name: 'Jersey', phoneLimit: 8 },
  JO: { name: 'Jordan', phoneLimit: 9 },
  KZ: { name: 'Kazakhstan', phoneLimit: 10 },
  KE: { name: 'Kenya', phoneLimit: 10 },
  KI: { name: 'Kiribati', phoneLimit: 7 },
  KW: { name: 'Kuwait', phoneLimit: 8 },
  KG: { name: 'Kyrgyzstan', phoneLimit: 9 },
  LA: { name: 'Laos', phoneLimit: 8 },
  LV: { name: 'Latvia', phoneLimit: 8 },
  LB: { name: 'Lebanon', phoneLimit: 8 },
  LS: { name: 'Lesotho', phoneLimit: 8 },
  LR: { name: 'Liberia', phoneLimit: 8 },
  LY: { name: 'Libya', phoneLimit: 9 },
  LI: { name: 'Liechtenstein', phoneLimit: 8 },
  LT: { name: 'Lithuania', phoneLimit: 8 },
  LU: { name: 'Luxembourg', phoneLimit: 9 },
  MO: { name: 'Macao', phoneLimit: 8 },
  MG: { name: 'Madagascar', phoneLimit: 9 },
  MW: { name: 'Malawi', phoneLimit: 8 },
  MY: { name: 'Malaysia', phoneLimit: 10 },
  MV: { name: 'Maldives', phoneLimit: 7 },
  ML: { name: 'Mali', phoneLimit: 8 },
  MT: { name: 'Malta', phoneLimit: 8 },
  MH: { name: 'Marshall Islands', phoneLimit: 7 },
  MQ: { name: 'Martinique', phoneLimit: 10 },
  MR: { name: 'Mauritania', phoneLimit: 8 },
  MU: { name: 'Mauritius', phoneLimit: 8 },
  YT: { name: 'Mayotte', phoneLimit: 7 },
  MX: { name: 'Mexico', phoneLimit: 10 },
  FM: { name: 'Micronesia', phoneLimit: 7 },
  MD: { name: 'Moldova', phoneLimit: 8 },
  MC: { name: 'Monaco', phoneLimit: 8 },
  MN: { name: 'Mongolia', phoneLimit: 8 },
  ME: { name: 'Montenegro', phoneLimit: 8 },
  MS: { name: 'Montserrat', phoneLimit: 7 },
  MA: { name: 'Morocco', phoneLimit: 10 },
  MZ: { name: 'Mozambique', phoneLimit: 9 },
  MM: { name: 'Myanmar (Burma)', phoneLimit: 8 },
  NA: { name: 'Namibia', phoneLimit: 9 },
  NR: { name: 'Nauru', phoneLimit: 7 },
  NP: { name: 'Nepal', phoneLimit: 10 },
  NL: { name: 'Netherlands', phoneLimit: 9 },
  NC: { name: 'New Caledonia', phoneLimit: 7 },
  NZ: { name: 'New Zealand', phoneLimit: 9 },
  NI: { name: 'Nicaragua', phoneLimit: 8 },
  NE: { name: 'Niger', phoneLimit: 8 },
  NG: { name: 'Nigeria', phoneLimit: 10 },
  NU: { name: 'Niue', phoneLimit: 7 },
  NF: { name: 'Norfolk Island', phoneLimit: 7 },
  KP: { name: 'North Korea', phoneLimit: 10 },
  MK: { name: 'North Macedonia', phoneLimit: 8 },
  MP: { name: 'Northern Mariana Islands', phoneLimit: 7 },
  NO: { name: 'Norway', phoneLimit: 8 },
  OM: { name: 'Oman', phoneLimit: 8 },
  PK: { name: 'Pakistan', phoneLimit: 10 },
  PW: { name: 'Palau', phoneLimit: 7 },
  PA: { name: 'Panama', phoneLimit: 8 },
  PG: { name: 'Papua New Guinea', phoneLimit: 8 },
  PY: { name: 'Paraguay', phoneLimit: 9 },
  PE: { name: 'Peru', phoneLimit: 9 },
  PH: { name: 'Philippines', phoneLimit: 9 },
  PN: { name: 'Pitcairn Islands', phoneLimit: 7 },
  PL: { name: 'Poland', phoneLimit: 9 },
  PT: { name: 'Portugal', phoneLimit: 9 },
  PR: { name: 'Puerto Rico', phoneLimit: 10 },
  QA: { name: 'Qatar', phoneLimit: 8 },
  RO: { name: 'Romania', phoneLimit: 9 },
  RU: { name: 'Russia', phoneLimit: 10 },
  RW: { name: 'Rwanda', phoneLimit: 9 },
  RE: { name: 'Réunion', phoneLimit: 9 },
  BL: { name: 'Saint Barthélemy', phoneLimit: 7 },
  SH: { name: 'Saint Helena', phoneLimit: 7 },
  KN: { name: 'Saint Kitts, Nevis', phoneLimit: 7 },
  LC: { name: 'Saint Lucia', phoneLimit: 7 },
  MF: { name: 'Saint Martin', phoneLimit: 7 },
  PM: { name: 'Saint Pierre, Miquelon', phoneLimit: 7 },
  VC: { name: 'Saint Vincent, Grenadines', phoneLimit: 7 },
  WS: { name: 'Samoa', phoneLimit: 7 },
  SM: { name: 'San Marino', phoneLimit: 7 },
  ST: { name: 'Sao Tome and Principe', phoneLimit: 7 },
  SA: { name: 'Saudi Arabia', phoneLimit: 9 },
  SN: { name: 'Senegal', phoneLimit: 8 },
  RS: { name: 'Serbia', phoneLimit: 8 },
  SC: { name: 'Seychelles', phoneLimit: 7 },
  SL: { name: 'Sierra Leone', phoneLimit: 8 },
  SG: { name: 'Singapore', phoneLimit: 8 },
  SX: { name: 'Sint Maarten', phoneLimit: 7 },
  SK: { name: 'Slovakia', phoneLimit: 9 },
  SI: { name: 'Slovenia', phoneLimit: 9 },
  SB: { name: 'Solomon Islands', phoneLimit: 7 },
  SO: { name: 'Somalia', phoneLimit: 8 },
  ZA: { name: 'South Africa', phoneLimit: 10 },
  KR: { name: 'South Korea', phoneLimit: 10 },
  SS: { name: 'South Sudan', phoneLimit: 8 },
  ES: { name: 'Spain', phoneLimit: 9 },
  LK: { name: 'Sri Lanka', phoneLimit: 10 },
  SD: { name: 'Sudan', phoneLimit: 9 },
  SR: { name: 'Suriname', phoneLimit: 8 },
  SE: { name: 'Sweden', phoneLimit: 10 },
  CH: { name: 'Switzerland', phoneLimit: 10 },
  SY: { name: 'Syria', phoneLimit: 9 },
  TW: { name: 'Taiwan', phoneLimit: 10 },
  TJ: { name: 'Tajikistan', phoneLimit: 9 },
  TZ: { name: 'Tanzania', phoneLimit: 9 },
  TH: { name: 'Thailand', phoneLimit: 9 },
  TL: { name: 'Timor-Leste', phoneLimit: 7 },
  TG: { name: 'Togo', phoneLimit: 8 },
  TK: { name: 'Tokelau', phoneLimit: 7 },
  TO: { name: 'Tonga', phoneLimit: 7 },
  TT: { name: 'Trinidad and Tobago', phoneLimit: 7 },
  TN: { name: 'Tunisia', phoneLimit: 8 },
  TR: { name: 'Turkey', phoneLimit: 10 },
  TM: { name: 'Turkmenistan', phoneLimit: 9 },
  TV: { name: 'Tuvalu', phoneLimit: 7 },
  UG: { name: 'Uganda', phoneLimit: 9 },
  UA: { name: 'Ukraine', phoneLimit: 10 },
  AE: { name: 'United Arab', phoneLimit: 9 },
  GB: { name: 'United Kingdom', phoneLimit: 10 },
  US: { name: 'United States', phoneLimit: 10 },
  UY: { name: 'Uruguay', phoneLimit: 9 },
  UZ: { name: 'Uzbekistan', phoneLimit: 9 },
  VU: { name: 'Vanuatu', phoneLimit: 7 },
  VA: { name: 'Vatican City', phoneLimit: 8 },
  VE: { name: 'Venezuela', phoneLimit: 10 },
  VN: { name: 'Vietnam', phoneLimit: 10 },
  WF: { name: 'Wallis and Futuna', phoneLimit: 7 },
  EH: { name: 'Western Sahara', phoneLimit: 8 },
  YE: { name: 'Yemen', phoneLimit: 8 },
  ZM: { name: 'Zambia', phoneLimit: 9 },
  ZW: { name: 'Zimbabwe', phoneLimit: 9 },
  XK: { name: 'Kosovo', phoneLimit: 8 },
  TA: { name: 'Tristan da Cunha', phoneLimit: 7 },
  AC: { name: 'Ascension Island', phoneLimit: 7 },
  BQ: { name: 'Caribbean Netherlands', phoneLimit: 7 },
  AX: { name: 'Åland Islands', phoneLimit: 7 },
  CW: { name: 'Curaçao', phoneLimit: 7 },
  CC: { name: 'Cocos Islands', phoneLimit: 7 },
  CX: { name: 'Christmas Island', phoneLimit: 7 },
  FK: { name: 'Falkland Islands', phoneLimit: 7 },
  FO: { name: 'Faroe Islands', phoneLimit: 7 },
  PS: { name: 'Palestine', phoneLimit: 8 },
  SJ: { name: 'Svalbard, Jan Mayen', phoneLimit: 7 },
  TC: { name: 'Turks, Caicos Islands', phoneLimit: 7 },
  VG: { name: 'British Virgin Islands', phoneLimit: 7 },
  VI: { name: 'United States Virgin Islands', phoneLimit: 7 }
}
