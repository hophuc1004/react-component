import { IColumnInputEntry } from './types'

export const FORM_TYPE = {
  MIDDLE: 1,
  SENIOR: 2
}

export const mapStatusFormAppraisal = {
  0: 'Not-submitted',
  1: 'Submitted',
  2: 'Evaluated',
  3: 'Missed',
  4: 'Closed'
}

export const mapStatusFormSubmitted = {
  0: 'Missed',
  1: 'Submitted',
  2: 'Evaluated',
  4: 'Closed'
}

export const SELF_SUBMIT_FORM_STATUS = {
  'NOT-SUBMITTED': 0,
  SUBMITTED: 1,
  EVALUATED: 2,
  MISSED: 3,
  CLOSE: 4
}

export const LEAVE_REQUEST_STATUS = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
  CANCELLED: 3,
  PENDING_REJECTION: 4,
  ON_LEAVE: 5,
  TAKEN: 6
}

export const EMPLOYEE_ASSESSMENT_COMPETENCY_STAGE = {
  ENTRY: 'Entry Assessment',
  IA: 'In-Progress Assessment',
  EXIT: 'Exit Assessment'
}

export const EMPLOYEE_ASSESSMENT_COMPETENCY_NEXT_ACTION = {
  'Entry Assessment': 'Input Entry Assessment',
  'In-Progress Assessment': 'Resume Entry Assessment'
}

export const FORM_COMPETENCY_NEXT_ACTION = {
  ENTRY: 'Input Entry Assessment',
  RESUME_IA: 'Resume In-Progress Assessment',
  RESUME: 'Resume Entry Assessment',
  NO_ACTION_REQUIRED: 'No action required',
  FINALIZE_ENTRY: 'Finalize Entry Assessment',
  FINALIZE_IA: 'Finalize In-Progress Assessment',
  FINALIZE_EXIT: 'Finalize Exit Assessment',
  RESUME_EXIT: 'Resume Exit Assessment',
  EXIT: 'Input Exit Assessment',
  CREATE_IA_OR_EXIT: 'Create IA or Exit Assessment'
}

export const mapStatusFormEmployeeCompetency = {
  1: 'Active',
  2: 'Closed'
}

export const FORM_USER_ACCESS_COMPETENCY_TYPE = {
  ENTRY: 0,
  SUBMIT: 1,
  IA: 2,
  EXIT: 3
}

export const STATUS_FORM_COMPETENCY_USER_ACCESS = {
  IS_NOT_SUBMIT: 0,
  IS_EMPLOYEE_SUBMITTED: 1,
  IS_EVALUATOR_SUBMITTED: 2
}

export const EMPLOYEE_SUBMITTED_FORM_STATUS = {
  PENDING: 0,
  SUBMITTED: 1
}

export const STATUS_FORM_ASS_COMPETENCY = {
  ACTIVE: 1,
  CLOSED: 2
}

export const COMPETENCY_STAGE = {
  ENTRY: 'ENTRY',
  EXIT: 'EXIT',
  IA: 'IA'
}

export const USER_TYPE = {
  USER: 0,
  MANAGER: 1
}

// annual - sickness - maternity - wedding - funeral - unpaid
export const arrayCategoryOrder = [
  { order: 1, id: 1 },
  { order: 2, id: 2 },
  { order: 3, id: 5 },
  { order: 4, id: 6 },
  { order: 5, id: 4 },
  { order: 6, id: 3 }
]

// husband - wife
export const arrBeneOrder = [
  { order: 7, id: 11 },
  { order: 8, id: 10 },
  { order: 9, id: 12 },
  { order: 10, id: 13 },
  { order: 11, id: 14 },
  { order: 12, id: 15 },
  { order: 13, id: 4 },
  { order: 14, id: 6 },
  { order: 15, id: 7 },
  { order: 16, id: 8 },
  { order: 17, id: 5 },
  { order: 18, id: 9 }
]

export const columnInputEntryFinalized: IColumnInputEntry[] = [
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
        isShowModal: false,
        childTypography: 'typography-body-sm'
      },
      {
        accessorKey: 'competency',
        childHeader: 'Competency',
        textColor: 'text-gray-900',
        childAlign: 'start',
        childWidth: 152,
        isShowModal: false,
        childTypography: 'typography-body-sm'
      },
      {
        accessorKey: 'general_attributes',
        childHeader: 'General Attributes',
        textColor: 'text-gray-900',
        childAlign: 'start',
        childWidth: 186,
        isShowModal: false,
        childTypography: 'typography-body-sm'
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
        isShowModal: true,
        childTypography: 'typography-body-sm'
      },
      {
        accessorKey: 'entry_employee_expected',
        childHeader: 'Expected',
        textColor: 'text-gray-900',
        childAlign: 'center',
        childWidth: 120,
        isShowModal: true,
        childTypography: 'typography-body-sm'
      }
      // {
      //   accessorKey: 'entry_evaluator_current',
      //   childHeader: 'Current',
      //   textColor: 'text-gray-900',
      //   childAlign: 'center',
      //   childWidth: 120,
      //   isShowModal: true
      // },
      // {
      //   accessorKey: 'entry_evaluator_expected',
      //   childHeader: 'Expected',
      //   textColor: 'text-gray-900',
      //   childAlign: 'center',
      //   childWidth: 120,
      //   isShowModal: true
      // }
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
        isShowModal: true,
        childTypography: 'typography-body-sm'
      },
      {
        accessorKey: 'entry_evaluator_expected',
        childHeader: 'Expected',
        textColor: 'text-gray-900',
        childAlign: 'center',
        childWidth: 120,
        isShowModal: true,
        childTypography: 'typography-body-sm'
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

export const columnInputExitFinalized: IColumnInputEntry[] = [
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
        isShowModal: false,
        childTypography: 'typography-body-sm'
      },
      {
        accessorKey: 'competency',
        childHeader: 'Competency',
        textColor: 'text-gray-900',
        childAlign: 'start',
        childWidth: 152,
        isShowModal: false,
        childTypography: 'typography-body-sm'
      },
      {
        accessorKey: 'general_attributes',
        childHeader: 'General Attributes',
        textColor: 'text-gray-900',
        childAlign: 'start',
        childWidth: 186,
        isShowModal: false,
        childTypography: 'typography-body-sm'
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
        isShowModal: true,
        childTypography: 'typography-body-sm'
      },
      {
        accessorKey: 'entry_employee_expected',
        childHeader: 'Expected',
        textColor: 'text-gray-900',
        childAlign: 'center',
        childWidth: 120,
        isShowModal: true,
        childTypography: 'typography-body-sm'
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
        isShowModal: true,
        childTypography: 'typography-body-sm'
      },
      {
        accessorKey: 'entry_evaluator_expected',
        childHeader: 'Expected',
        textColor: 'text-gray-900',
        childAlign: 'center',
        childWidth: 120,
        isShowModal: true,
        childTypography: 'typography-body-sm'
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
    width: 160 * 2,
    key: 'exitAssessment',
    subWidth: 160,
    childColumns: [
      {
        accessorKey: 'employee_input_exit',
        childHeader: 'Captured',
        textColor: 'text-gray-900',
        childAlign: 'center',
        childWidth: 160,
        isShowModal: true,
        childTypography: 'typography-body-sm'
      }
    ]
  },
  {
    header: null,
    subHeader: `Final Rate`,
    borderBottomColor: 'border-b-purple-400',
    background: 'bg-purple-100',
    colSpan: 2,
    align: 'center',
    width: 160,
    key: 'exitAssessment',
    childColumns: [
      {
        accessorKey: 'evaluator_input_exit',
        childHeader: 'Captured',
        textColor: 'text-gray-900',
        childAlign: 'center',
        childWidth: 160,
        isShowModal: true,
        childTypography: 'typography-body-sm'
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

export const renderItemIaAssForEvaluator = (iaName, timeCreate, stageId, isEvaluatedIa) => {
  return [
    {
      header: `${iaName} - ${timeCreate}`,
      subHeader: `Employee Rate`,
      borderBottomColor: 'border-b-yellow-500',
      background: 'bg-yellow-100',
      colSpan: 2,
      align: 'center',
      width: 160 * 2,
      key: 'iaAssessment',
      isEvaluatedIa: isEvaluatedIa,
      subWidth: 160,
      childColumns: [
        {
          accessorKey: `employee_input_ia${stageId}`,
          childHeader: 'Captured',
          textColor: 'text-gray-900',
          childAlign: 'center',
          childWidth: 160,
          isShowModal: true,
          childTypography: 'typography-body-sm',
          isEvaluatedIa: isEvaluatedIa
        }
      ]
    },
    {
      header: null,
      subHeader: `Final Rate`,
      borderBottomColor: 'border-b-yellow-500',
      background: 'bg-yellow-100',
      colSpan: 2,
      align: 'center',
      width: 160,
      key: 'iaAssessment',
      isEvaluatedIa: isEvaluatedIa,
      childColumns: [
        {
          accessorKey: `evaluator_input_ia${stageId}`,
          childHeader: 'Captured',
          textColor: 'text-gray-900',
          childAlign: 'center',
          childWidth: 160,
          isShowModal: true,
          childTypography: 'typography-body-sm',
          isEvaluatedIa: isEvaluatedIa
        }
      ]
    }
  ]
}

export const renderItemExitAssForEvaluator = () => {
  return [
    {
      header: `Exit Assessment`,
      subHeader: `Employee Rate`,
      borderBottomColor: 'border-b-purple-400',
      background: 'bg-purple-100',
      colSpan: 2,
      align: 'center',
      width: 160 * 2,
      key: 'exitAssessment',
      subWidth: 160,
      childColumns: [
        {
          accessorKey: 'employee_input_exit',
          childHeader: 'Captured',
          textColor: 'text-gray-900',
          childAlign: 'center',
          childWidth: 160,
          isShowModal: true,
          childTypography: 'typography-body-sm'
        }
      ]
    },
    {
      header: null,
      subHeader: `Final Rate`,
      borderBottomColor: 'border-b-purple-400',
      background: 'bg-purple-100',
      colSpan: 2,
      align: 'center',
      width: 160,
      key: 'exitAssessment',
      childColumns: [
        {
          accessorKey: 'evaluator_input_exit',
          childHeader: 'Captured',
          textColor: 'text-gray-900',
          childAlign: 'center',
          childWidth: 160,
          isShowModal: true,
          childTypography: 'typography-body-sm'
        }
      ]
    }
  ]
}
