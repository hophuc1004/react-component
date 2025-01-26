import { differenceInMilliseconds, formatISO } from 'date-fns'
import isEmpty from 'lodash/isEmpty'
import { getStatusLeaveRequest } from '../share/helper'
import { LEAVE_REQUEST_STATUS } from '../share/constant'

export const getLeaveTypeId = (leaveType, leaveTypeValue, currentLeaveCategory) => {
  if (!leaveType) {
    if (currentLeaveCategory) {
      return currentLeaveCategory?.leaveTypes?.[0]?.id
    }
  }

  if (!isEmpty(leaveType?.leaveTypes)) {
    const length = leaveType?.leaveTypes?.length
    if (length > 1) {
      return leaveTypeValue.id
    } else {
      return leaveType?.id
    }
  }
}

export const getDataMyLeave = (arrLeaveRequest, leaveCategory) => {
  const dataUpComing = []
  const dataPastLeave = []
  let totalPendingReview = 0

  for (let i = 0; i < arrLeaveRequest?.length; i++) {
    let item = arrLeaveRequest[i]

    const formatEndDate = formatISO(item?.endDate)
    const currentTime = new Date()
    const diffMillCurrentAndEnd = differenceInMilliseconds(formatEndDate, currentTime)

    const newStatus = getStatusLeaveRequest({
      status: item?.status,
      startDate: item?.startDate,
      endDate: item?.endDate
    })

    item = { ...item, status: newStatus }

    if (newStatus === LEAVE_REQUEST_STATUS.PENDING) {
      const getLeaveCategory = leaveCategory?.find((itemCate) =>
        itemCate.leaveTypes?.map((leaveType) => leaveType.id)?.includes(item?.leaveTypeId)
      )
      if (getLeaveCategory?.id === 1) {
        totalPendingReview += Number(item?.duration)
      }
    }

    if (
      newStatus === LEAVE_REQUEST_STATUS.PENDING ||
      newStatus === LEAVE_REQUEST_STATUS.APPROVED ||
      newStatus === LEAVE_REQUEST_STATUS.ON_LEAVE
    ) {
      dataUpComing.push(item)
    } else {
      if (diffMillCurrentAndEnd > 0) {
        dataUpComing.push(item)
      } else {
        dataPastLeave.push(item)
      }
    }
  }

  return {
    dataUpComing,
    dataPastLeave,
    totalPendingReview
  }
}

export const handleSortGroup = (sortOrder, array) => {
  const arraySorted = [...array]

  arraySorted?.sort((a, b) => {
    const indexA = sortOrder?.indexOf(a?.name)
    const indexB = sortOrder?.indexOf(b?.name)

    // If both tasks are in sortOrder, sort by the specified order
    return indexA - indexB
  })

  return arraySorted
}

export const handleSortTaskInGroup = (array) => {
  if (isEmpty(array)) {
    return
  }

  const arraySorted = [...array]
  arraySorted?.sort((a, b) => {
    return a.id - b.id
  })

  return arraySorted
}

export const extractFileNumber = (fileName: string): number => {
  const match = fileName.match(/-(\d+)\.docx/)
  return match ? parseInt(match[1], 10) : 0
}
