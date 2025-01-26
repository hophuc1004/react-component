import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMilliseconds,
  formatISO
} from 'date-fns'

import {
  COMPETENCY_STAGE,
  EMPLOYEE_ASSESSMENT_COMPETENCY_STAGE,
  FORM_COMPETENCY_NEXT_ACTION,
  FORM_USER_ACCESS_COMPETENCY_TYPE,
  LEAVE_REQUEST_STATUS,
  SELF_SUBMIT_FORM_STATUS,
  STATUS_FORM_COMPETENCY_USER_ACCESS
} from './constant'
import isNaN from 'lodash/isNaN'
import isEmpty from 'lodash/isEmpty'
import { AnyType } from './types'
import filter from 'lodash/filter'
import get from 'lodash/get'

import isEqual from 'lodash/isEqual'
import { convertTo24Hour, fDateReverse, fDateTimeCustom } from '~/shared/utils/format-time'
import { ARR_ID_BENEFICIARY_CHECK_EXCEED, ARR_ID_CATE_CHECK_EXCEED } from '~/shared/constants/leave-request'
import { formatAmountDay } from '~/shared/utils/util'
import i18next from 'i18next'

export const getDiffMillCurrentAndDue = (dueDate) => {
  const currentDate = new Date()
  const formatDueDate = dueDate && new Date(dueDate)

  if (formatDueDate) {
    const diffMillCurrentAndEnd = differenceInMilliseconds(formatDueDate, currentDate)
    return diffMillCurrentAndEnd
  }
}

export const getStatusAppraisalWithTime = ({ status, endDate, judgementEndDate }) => {
  const diffWithDueSelf = getDiffMillCurrentAndDue(endDate)
  const diffWithDueEvaluator = getDiffMillCurrentAndDue(judgementEndDate)
  if (diffWithDueEvaluator < 0) {
    switch (status) {
      case SELF_SUBMIT_FORM_STATUS['NOT-SUBMITTED']:
        return SELF_SUBMIT_FORM_STATUS.CLOSE

      case SELF_SUBMIT_FORM_STATUS.SUBMITTED:
        return SELF_SUBMIT_FORM_STATUS.CLOSE

      case SELF_SUBMIT_FORM_STATUS.EVALUATED:
        return SELF_SUBMIT_FORM_STATUS.CLOSE
      default:
        break
    }
  }

  if (diffWithDueSelf < 0) {
    switch (status) {
      case SELF_SUBMIT_FORM_STATUS['NOT-SUBMITTED']:
        return SELF_SUBMIT_FORM_STATUS.MISSED

      default:
        break
    }
  }

  return status
}

export function parseNumberToRoman(num) {
  switch (num) {
    case 1:
      return 'I'
    case 2:
      return 'II'
    case 3:
      return 'III'
    default:
      return 'Number not supported'
  }
}

export const getScored = (scored) => {
  if (isNaN(Number(scored))) {
    return null
  }

  if (scored === 'null') {
    return null
  }
  return scored
}

export const handleSortByJudgementDate = (array) => {
  if (isEmpty(array)) {
    return
  }
  return array?.sort((a, b) => {
    const dateA = new Date(a.judgementEndDate).getTime()
    const dateB = new Date(b.judgementEndDate).getTime()
    return dateB - dateA // Descending order
  })
}

export const handleSortOrderQuestion = (array) => {
  if (isEmpty(array)) {
    return
  }
  return array?.sort((a, b) => {
    const orderA = a.order
    const orderB = b.order
    return orderA - orderB // Descending order
  })
}

export const handleSortListContactInfo = (array) => {
  if (isEmpty(array)) {
    return
  }
  return array?.sort((a, b) => {
    const orderA = a?.id
    const orderB = b?.id
    return orderA - orderB // Descending order
  })
}

export const getCurrentStage = ({
  statusTemplate,
  formSubmitted,
  formUserAccessType,
  formAddGoal,
  formAnswerTemporary,
  formComments
}) => {
  const isNotInput =
    isEmpty(formAddGoal) && isEmpty(formAnswerTemporary) && isEmpty(formComments) && isEmpty(formSubmitted)
  const isHaveInput = !isEmpty(formAddGoal) || !isEmpty(formAnswerTemporary) || !isEmpty(formComments) // const isEmptyAll = isEmpty(formAddGoal) && isEmpty(formAnswerTemporary) && isEmpty(formComments)
  if (statusTemplate === 1 && isNotInput && formUserAccessType === FORM_USER_ACCESS_COMPETENCY_TYPE.ENTRY) {
    return EMPLOYEE_ASSESSMENT_COMPETENCY_STAGE.ENTRY
  }

  if (isHaveInput) {
    return EMPLOYEE_ASSESSMENT_COMPETENCY_STAGE.ENTRY
  }

  if (!isEmpty(formSubmitted)) {
    return EMPLOYEE_ASSESSMENT_COMPETENCY_STAGE.ENTRY
  }

  if (formUserAccessType === FORM_USER_ACCESS_COMPETENCY_TYPE.IA) {
    return EMPLOYEE_ASSESSMENT_COMPETENCY_STAGE.IA
  }

  if (formUserAccessType === FORM_USER_ACCESS_COMPETENCY_TYPE.EXIT) {
    return EMPLOYEE_ASSESSMENT_COMPETENCY_STAGE.EXIT
  }

  return EMPLOYEE_ASSESSMENT_COMPETENCY_STAGE.ENTRY
}

export const getCurrentFormStage = (formDetail: AnyType) => {
  const currentState = get(formDetail, 'StageCompetency')
  if (currentState) {
    const stageName = get(currentState, 'stageName')

    if (stageName == COMPETENCY_STAGE.EXIT) {
      return EMPLOYEE_ASSESSMENT_COMPETENCY_STAGE.EXIT
    }
    if (stageName == COMPETENCY_STAGE.IA) {
      return EMPLOYEE_ASSESSMENT_COMPETENCY_STAGE.IA
    }
  }
  return EMPLOYEE_ASSESSMENT_COMPETENCY_STAGE.ENTRY
}

export const getNextActionFollowStage = ({
  currentState,
  formAddGoal,
  formAnswerTemporary,
  formComments,
  userSubmitted,
  stage
}) => {
  if (!currentState) {
    return
  }

  const isEmptyAll = isEmpty(formAddGoal) && isEmpty(formAnswerTemporary) && isEmpty(formComments)

  switch (currentState) {
    case EMPLOYEE_ASSESSMENT_COMPETENCY_STAGE.ENTRY:
      if (userSubmitted?.[0]?.status === STATUS_FORM_COMPETENCY_USER_ACCESS.IS_EMPLOYEE_SUBMITTED) {
        return FORM_COMPETENCY_NEXT_ACTION.NO_ACTION_REQUIRED
      }

      if (userSubmitted?.[0]?.status === STATUS_FORM_COMPETENCY_USER_ACCESS.IS_EVALUATOR_SUBMITTED) {
        return FORM_COMPETENCY_NEXT_ACTION.CREATE_IA_OR_EXIT
      }

      if (isEmptyAll && userSubmitted?.[0]?.status === STATUS_FORM_COMPETENCY_USER_ACCESS.IS_NOT_SUBMIT) {
        return FORM_COMPETENCY_NEXT_ACTION.ENTRY
      }
      return FORM_COMPETENCY_NEXT_ACTION.RESUME

    case EMPLOYEE_ASSESSMENT_COMPETENCY_STAGE.IA: {
      if (stage?.status === STATUS_FORM_COMPETENCY_USER_ACCESS.IS_EMPLOYEE_SUBMITTED) {
        return FORM_COMPETENCY_NEXT_ACTION.NO_ACTION_REQUIRED
      }
      if (stage?.status === STATUS_FORM_COMPETENCY_USER_ACCESS.IS_EVALUATOR_SUBMITTED) {
        return FORM_COMPETENCY_NEXT_ACTION.CREATE_IA_OR_EXIT
      }
      const formAnswerTempFiltered = filter(
        formAnswerTemporary || [],
        (v: AnyType) => !!get(v, 'stageCompetencyId', stage?.id)
      )

      if (!isEmpty(formAnswerTempFiltered) || !isEmpty(formAddGoal) || !isEmpty(formAnswerTemporary)) {
        return FORM_COMPETENCY_NEXT_ACTION.RESUME_IA
      }
      return FORM_COMPETENCY_NEXT_ACTION.CREATE_IA_OR_EXIT
    }

    case EMPLOYEE_ASSESSMENT_COMPETENCY_STAGE.EXIT: {
      if (
        userSubmitted?.[0]?.status === STATUS_FORM_COMPETENCY_USER_ACCESS.IS_EMPLOYEE_SUBMITTED ||
        userSubmitted?.[0]?.status === STATUS_FORM_COMPETENCY_USER_ACCESS?.IS_EVALUATOR_SUBMITTED
      ) {
        return FORM_COMPETENCY_NEXT_ACTION.NO_ACTION_REQUIRED
      }
      const formAnswerTempFiltered = filter(formAnswerTemporary || [], (v: AnyType) => !!get(v, 'stageCompetencyId', 0))

      if (isEmpty(formAnswerTempFiltered)) {
        return FORM_COMPETENCY_NEXT_ACTION.EXIT
      }

      if (!isEmpty(formAddGoal) || !isEmpty(formAnswerTemporary)) {
        return FORM_COMPETENCY_NEXT_ACTION.RESUME_EXIT
      }
      return
    }

    default:
      break
  }
}

export const handleEffectCssOnRatingContainer = (boxId, element) => {
  switch (boxId) {
    case 5:
      element.classList.remove(`!bg-blue-500`)
      element.classList.remove(`!bg-green-500`)
      element.classList.remove(`!bg-yellow-500`)
      element.classList.remove(`!bg-red-500`)
      // element.classList.remove(`bg-blue-500`)
      // element.classList.remove(`bg-green-500`)
      // element.classList.remove(`bg-yellow-500`)
      // element.classList.remove(`bg-red-500`)

      element?.classList?.add('!bg-purple-500')
      break

    case 4:
      element.classList.remove(`!bg-purple-500`)
      element.classList.remove(`!bg-green-500`)
      element.classList.remove(`!bg-yellow-500`)
      element.classList.remove(`!bg-red-500`)

      // element.classList.remove(`bg-purple-500`)
      // element.classList.remove(`bg-green-500`)
      // element.classList.remove(`bg-yellow-500`)
      // element.classList.remove(`bg-red-500`)

      element?.classList?.add('!bg-blue-500')
      break

    case 3:
      element.classList.remove(`!bg-purple-500`)
      element.classList.remove(`!bg-blue-500`)
      element.classList.remove(`!bg-yellow-500`)
      element.classList.remove(`!bg-red-500`)
      // element.classList.remove(`bg-purple-500`)
      // element.classList.remove(`bg-yellow-500`)
      // element.classList.remove(`bg-red-500`)

      element?.classList?.add('!bg-green-500')
      break

    case 2:
      element.classList.remove(`!bg-purple-500`)
      element.classList.remove(`!bg-blue-500`)
      element.classList.remove(`!bg-green-500`)
      element.classList.remove(`!bg-red-500`)
      // element.classList.remove(`bg-purple-500`)
      // element.classList.remove(`bg-blue-500`)
      // element.classList.remove(`bg-green-500`)
      // element.classList.remove(`bg-red-500`)

      element?.classList?.add('!bg-yellow-500')
      break

    case 1:
      element.classList.remove(`!bg-purple-500`)
      element.classList.remove(`!bg-blue-500`)
      element.classList.remove(`!bg-green-500`)
      element.classList.remove(`!bg-yellow-500`)
      // element.classList.remove(`bg-purple-500`)
      // element.classList.remove(`bg-blue-500`)
      // element.classList.remove(`bg-green-500`)
      // element.classList.remove(`bg-yellow-500`)

      element?.classList?.add('!bg-red-500')
      break

    default:
      element?.classList?.add('!bg-gray-200')
      break
  }
}

export const getNameOfInputRating = (valueInput) => {
  switch (valueInput) {
    case null:
    case 0:
    case undefined:
      return 'N/A'

    case 1:
      return `1. ${i18next.t('General Awareness')}`

    case 2:
      return `2. ${i18next.t('Practical Knowledge')}`

    case 3:
      return `3. ${i18next.t('Skilled')}`

    case 4:
      return `4. ${i18next.t('Expert')}`

    case 5:
      return `5. ${i18next.t('Strategist')}`

    default:
      return 'N/A'
  }
}

export const getStage = (data: AnyType) => {
  const stageCompetency: AnyType = get(data, 'StageCompetency')
  return {
    ...stageCompetency,
    stageId: get(stageCompetency, 'id', undefined),
    stageName: get(stageCompetency, 'stageName', COMPETENCY_STAGE.ENTRY)
  }
}

export const renderTitleCurrentStage = (stageName) => {
  if (!stageName) {
    return 'Entry Assessment'
  }

  if (stageName == COMPETENCY_STAGE.ENTRY) {
    return 'Entry Assessment'
  }

  if (stageName == COMPETENCY_STAGE.EXIT) {
    return 'Exit Assessment'
  }

  if (stageName == COMPETENCY_STAGE.IA) {
    return 'IA Assessment'
  }
}

export const areArraysDifferent = (arr1, arr2) => {
  if ((arr1 ?? [])?.length !== (arr2 ?? [])?.length) {
    return true // Different length means different arrays
  }

  for (let i = 0; i < arr1.length; i++) {
    if (!isEqual(arr1[i], arr2[i])) {
      return true // Found a difference
    }
  }

  return false // No differences found
}

export const calculateLeaveBalance = (leaveBalanceInfo) => {
  if (!leaveBalanceInfo) {
    return
  }

  return leaveBalanceInfo?.annualLeave + leaveBalanceInfo?.remainLeave + leaveBalanceInfo?.loyaltyLeave
}

export const getStatusLeaveRequest = ({ status, startDate, endDate }) => {
  const formatStartDate = formatISO(startDate)
  const formatEndDate = formatISO(endDate)

  const currentTime = new Date()

  const diffMillCurrentAndStart = differenceInMilliseconds(formatStartDate, currentTime)
  const diffMillCurrentAndEnd = differenceInMilliseconds(formatEndDate, currentTime)

  switch (status) {
    case LEAVE_REQUEST_STATUS.PENDING:
      if (diffMillCurrentAndStart > 0) {
        return LEAVE_REQUEST_STATUS.PENDING
      } else {
        return LEAVE_REQUEST_STATUS.CANCELLED
      }

    case LEAVE_REQUEST_STATUS.APPROVED:
      if (diffMillCurrentAndStart > 0) {
        return status
      }

      if (diffMillCurrentAndStart < 0 && diffMillCurrentAndEnd > 0) {
        return LEAVE_REQUEST_STATUS.ON_LEAVE
      }

      if (diffMillCurrentAndEnd < 0) {
        return LEAVE_REQUEST_STATUS.TAKEN
      }
      break

    case LEAVE_REQUEST_STATUS.REJECTED:
      if (diffMillCurrentAndEnd > 0) {
        return status
      } else {
        return status
      }

    case LEAVE_REQUEST_STATUS.PENDING_REJECTION:
      if (diffMillCurrentAndEnd > 0) {
        return status
      } else {
        return status
      }

    default:
      return status
  }
}

export const handleLinkTime = (dateValue, timeValue) => {
  const date = fDateReverse(dateValue)
  const time = convertTo24Hour(timeValue)
  return `${date} ${time}`
}

export const getValueLinkedDateAndTime = ({ startDate, startTime, endDate, endTime }) => {
  const startTimeValue = startTime?.name
  const endTimeValue = endTime?.name

  const linkTimeStart = handleLinkTime(startDate, startTimeValue)

  const linkTimeEnd = handleLinkTime(endDate, endTimeValue)

  return {
    startDate,
    endDate,
    startTimeValue,
    endTimeValue,
    linkTimeStart,
    linkTimeEnd
  }
}

export const parseDate = (dateStr) => {
  const [time, date] = dateStr.trim().split(', ')
  const [day, month, year] = date.split('/').map(Number)
  return { date: new Date(year, month - 1, day), time }
}

export const handleCompareTime = ({
  startDate,
  endDate,
  linkTimeEnd,
  linkTimeStart,
  onSetErrorText,
  durationLeave,
  requestExist
}) => {
  if (!startDate || !endDate) {
    return
  }
  const formatStartDate = formatISO(startDate)
  const formatEndDate = formatISO(endDate)
  const conditionDay = differenceInCalendarDays(formatEndDate, formatStartDate)
  const conditionHour = differenceInHours(new Date(linkTimeEnd), new Date(linkTimeStart))
  const conditionTime = differenceInMinutes(new Date(linkTimeEnd), new Date(linkTimeStart))

  const formaEndExistDateTest = fDateTimeCustom(requestExist?.endDate)
  const formatStartExistDateTest = fDateTimeCustom(requestExist?.startDate)

  const conditionWithStartExist = differenceInMinutes(new Date(formaEndExistDateTest), new Date(linkTimeStart))
  const conditionWithEndExist = differenceInMinutes(new Date(linkTimeEnd), new Date(formatStartExistDateTest))

  if (requestExist && conditionWithStartExist > 0 && conditionWithEndExist > 0) {
    return onSetErrorText('Those period was submitted or taken. Please choose another period.')
  }

  if (Number(conditionDay) < 0) {
    return onSetErrorText('"To" date must be greater than or equal to "From" date.')
  }

  if (durationLeave?.total === 0) {
    if ((linkTimeEnd !== linkTimeStart && new Date(startDate).getDay() <= 6) || new Date(startDate).getDay() >= 6) {
      return onSetErrorText(`Unable to select period in weekend/holiday/holiday's compensation.`)
    }
  }

  if (Number(conditionHour) < 1 && conditionHour > 0) {
    return onSetErrorText('The minimum period is 1 hour per day.')
  }

  if (Number(conditionTime) < 0) {
    return onSetErrorText('"End" time must be greater than "Start" time.')
  }

  const totalTime = Number(durationLeave?.total * 8 * 60)

  if (Number(totalTime) <= 30) {
    return onSetErrorText('The minimum period is 1 hour per day.')
  }

  onSetErrorText(null)
  return
}

export const getMaxDayWithLeaveType = (leaveTypeId, arrLeaveTypes) => {
  if (!leaveTypeId) {
    return
  }
  if (isEmpty(arrLeaveTypes)) {
    return
  }
  const result = arrLeaveTypes.find((leave) => leave.id === leaveTypeId)

  return result.maxDays
}

export const handleCheckExceedDay = ({
  leaveTypeId,
  arrLeaveTypes,
  leaveCategoryChoose,
  onSetErrorExceedDay,
  listLeaveRequest,
  durationLeave,
  editLeaveRequest,
  prevLeaveTypeId
}) => {
  const maxDay = getMaxDayWithLeaveType(leaveTypeId, arrLeaveTypes)
  const isCategoryCheckExceed = ARR_ID_CATE_CHECK_EXCEED?.includes(leaveCategoryChoose?.id)
  const isBeneficiaryCheckExceed = ARR_ID_BENEFICIARY_CHECK_EXCEED?.includes(leaveTypeId)

  if (isCategoryCheckExceed) {
    if (isBeneficiaryCheckExceed) {
      const listLeaveSameLeaveType = listLeaveRequest?.filter((leave) => {
        const conditionWithCancelled =
          Number(leave.leaveTypeId) === Number(leaveTypeId) && Number(leave?.status) !== LEAVE_REQUEST_STATUS.CANCELLED
        const conditionReview =
          Number(leave.leaveTypeId) === Number(leaveTypeId) &&
          new Date(leave?.startDate) > new Date() &&
          Number(leave?.status) === LEAVE_REQUEST_STATUS.PENDING

        return conditionWithCancelled || conditionReview
      })

      const amountAlreadyLeavedDay = listLeaveSameLeaveType?.reduce((acc, curr) => {
        return acc + curr?.duration
      }, 0)

      const currentLeave = durationLeave?.total

      if (editLeaveRequest && Number(leaveTypeId) == Number(prevLeaveTypeId)) {
        if (Number(currentLeave) > Number(maxDay)) {
          const formatDay = formatAmountDay(maxDay)

          const text = i18next.t('youExceedTheMaximumDaysForLeaveCategory', {
            leaveCategory: leaveCategoryChoose?.name,
            formatDay
          })
          return onSetErrorExceedDay(text)
        }
      } else {
        if (Number(currentLeave) > Number(maxDay) - Number(amountAlreadyLeavedDay)) {
          const formatDay = formatAmountDay(maxDay)

          const text = i18next.t('youExceedTheMaximumDaysForLeaveCategory', {
            leaveCategory: leaveCategoryChoose?.name,
            formatDay
          })
          return onSetErrorExceedDay(text)
        }
      }

      return onSetErrorExceedDay(null)
    }
    return onSetErrorExceedDay(null)
  }
  return onSetErrorExceedDay(null)
}

export const handleSortArrPrevStage = (array) => {
  if (isEmpty(array)) {
    return
  }
  return array?.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return dateA - dateB // Ascending order
  })
}
