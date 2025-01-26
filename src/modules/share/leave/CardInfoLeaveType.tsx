import classNames from 'classnames'
import { Tooltip } from 'components/Tooltip'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import { FC, ReactNode } from 'react'
import InfoIcon from '~/shared/icons/InfoIcon'
import { formatAmountDayNoParen, formatAmountDayTail } from '~/shared/utils/util'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useTranslation } from 'react-i18next'

interface CardInfoLeaveTypeProps {
  title?: string
  icon?: ReactNode
  className?: string
  color?: string
  isCard?: boolean
  leaveBalanceInfo?: any
  leaveBalanceTotal?: any
  type?: any
  pendingDeduct?: number
  leaveCategory?: any
  pendingReview?: number
}

const CardInfoLeaveType: FC<CardInfoLeaveTypeProps> = ({
  title,
  icon,
  className,
  color,
  leaveBalanceInfo,
  leaveBalanceTotal,
  type,
  pendingDeduct,
  leaveCategory,
  pendingReview
}) => {
  const currentYear = new Date().getFullYear()
  const { t } = useTranslation()

  const renderRowInfo = (title, value) => {
    if (Number(value) > 0) {
      return (
        <div className='flex justify-between'>
          <p className='typography-body-sm text-gray-800'>{title}</p>
          <p className='typography-body-sm text-gray-800'>{formatAmountDayNoParen(value)}</p>
        </div>
      )
    } else {
      return (
        <div className='flex justify-between'>
          <p className='typography-body-sm text-gray-800'>{title}</p>
          <p className='typography-body-sm text-gray-800'>{formatAmountDayNoParen(value)}</p>
        </div>
      )
    }
  }

  // comment for later
  const renderRowInfoSub = (title, value) => {
    return (
      <div className='flex justify-between'>
        <p className='text-[11px] font-normal text-gray-500'>{title}</p>
        <p className='text-[11px] font-normal text-gray-500'>{formatAmountDayNoParen(value)}</p>
      </div>
    )
  }

  const renderContent = (dataLeaveBalance, currentYear) => {
    return (
      <div className='flex flex-col w-full'>
        {dataLeaveBalance?.annualLeave >= 0
          ? renderRowInfo(t('leavePage.annual'), dataLeaveBalance?.annualLeave)
          : null}
        {dataLeaveBalance?.remainLeave > 0
          ? renderRowInfo(t('leavePage.remaining', { year: currentYear - 1 }), dataLeaveBalance?.remainLeave)
          : null}
        {dataLeaveBalance?.loyaltyLeave > 0
          ? renderRowInfo(t('leavePage.loyalty'), dataLeaveBalance?.loyaltyLeave)
          : null}
        {(pendingDeduct > 0 || pendingReview > 0) && <div className='border-[1px] border-gray-100 mt-1 mb-1' />}
        {pendingReview > 0 && renderRowInfoSub(t('leavePage.pendingReview'), pendingReview)}
        {pendingDeduct > 0 && renderRowInfoSub(t('leavePage.pendingRequestsToDeduct'), pendingDeduct)}
      </div>
    )
  }

  const renderContentUnpaid = (arr) => {
    if (isEmpty(arr)) {
      return
    }

    return arr?.map((item, index) => {
      return (
        <div className='flex flex-col w-full' key={`unpaid-${index}`}>
          {item?.amountDayDeducted >= 0 ? renderRowInfo(item?.name, item?.amountDayDeducted) : null}
          {/* {item?.amountDayPending > 0 && renderRowInfoSub('Pending deduction', item?.amountDayPending)} */}
          {arr?.length >= 2 && index !== arr?.length - 1 ? (
            <div className='border-[1px] border-gray-100 mt-1 mb-1' />
          ) : null}
        </div>
      )
    })
  }

  const renderSpecialStyleForDay = (color, value) => {
    if (isNil(value)) {
      return
    }
    return (
      <div className='flex items-end gap-1 h-[32px]'>
        <p>
          <span className={classNames('typography-title-md mr-1', `${color}`)}>{value}</span>
          <span className={classNames('typography-body-sm text-gray-800')}>{formatAmountDayTail(Number(value))}</span>
        </p>
        {/* <p className={classNames('typography-title-md', `${color}`)}>{value}</p>
        <p className={classNames('typography-body-sm text-gray-800')}>{formatAmountDayTail(Number(value))}</p> */}
      </div>
    )
  }

  // const renderSpecialStyleForHour = (color, value) => {
  //   return (
  //     <div className='flex items-end gap-1 h-[32px]'>
  //       <p>
  //         <span className={classNames('typography-title-md mr-1', `${color}`)}>{value}</span>
  //         <span className={classNames('typography-body-sm text-gray-800')}>{formatAmountHourTail(Number(value))}</span>
  //       </p>
  //       {/* <p className={classNames('typography-title-md', `${color}`)}>{value}</p>
  //       <p className={classNames('typography-body-sm text-gray-800')}>{formatAmountHourTail(Number(value))}</p> */}
  //     </div>
  //   )
  // }

  const renderContentTooltipUnpaid = (unpaidLeaveInfo, leaveCategory) => {
    if (!unpaidLeaveInfo) {
      return
    }

    const objLeaveTypeDeducted = unpaidLeaveInfo?.leaveType ?? {}
    const objLeaveTypePending = unpaidLeaveInfo?.waiting ?? {}
    const arrIdLeaveTypeDeducted = objLeaveTypeDeducted ? Object.keys(objLeaveTypeDeducted) : []
    const arrIdLeaveTypePending = objLeaveTypePending ? Object.keys(objLeaveTypePending) : []

    const arrayCategoryDeducted = arrIdLeaveTypeDeducted?.map((leaveTypeDD) => {
      const amountDayDeducted = objLeaveTypeDeducted && objLeaveTypeDeducted[leaveTypeDD]
      const amountDayPending = objLeaveTypePending && objLeaveTypePending[leaveTypeDD]

      const getLeaveCategory = leaveCategory?.find((item) =>
        item.leaveTypes?.map((leaveType) => leaveType.id)?.includes(Number(leaveTypeDD))
      )
      const finalCategory = { ...getLeaveCategory, amountDayDeducted, amountDayPending }

      return finalCategory
    })

    const filterArrIdNotDeduct = arrIdLeaveTypePending?.filter((item) => !arrIdLeaveTypeDeducted?.includes(item))

    const arrayCategoryPending = filterArrIdNotDeduct?.map((leaveTypeDD) => {
      const amountDayDeducted = (objLeaveTypeDeducted && objLeaveTypeDeducted[leaveTypeDD]) ?? 0
      const amountDayPending = objLeaveTypePending && objLeaveTypePending[leaveTypeDD]

      const getLeaveCategory = leaveCategory?.find((item) =>
        item.leaveTypes?.map((leaveType) => leaveType.id)?.includes(Number(leaveTypeDD))
      )
      const finalCategory = { ...getLeaveCategory, amountDayDeducted, amountDayPending }

      return finalCategory
    })

    const mergeArray = arrayCategoryDeducted.concat(arrayCategoryPending)

    // const valueUnpaidDisplay = formatAmountDayNoParen(unpaidLeaveInfo?.all)

    return (
      <div
        className={classNames('p-3 rounded-smallNudge border-l-4 border flex justify-between bg-white', `${className}`)}
      >
        <div className='w-[40px] mr-2'>{icon}</div>
        <div className='w-full'>
          <div className='flex justify-between w-full h-6 mb-3'>
            <div className={classNames('text-left typography-body-md font-bold mb-2 mt-2')}>{title}</div>
            <div className='flex gap-1 items-end'>
              <div className='-mb-2 flex gap-1'>
                {unpaidLeaveInfo?.all >= 0 ? renderSpecialStyleForDay(color, unpaidLeaveInfo?.all) : null}
                {/* {hourNumber > 0 && renderSpecialStyleForHour(color, hourNumber)} */}
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start flex-1'>
            {!isEmpty(mergeArray) ? renderContentUnpaid(mergeArray) : null}
          </div>
        </div>
      </div>
    )
  }

  const renderContentTooltipAdvance = () => {
    return (
      <div
        className={classNames(
          'p-3 rounded-smallNudge border-l-4 border flex justify-between bg-white z-50',
          `${className}`
        )}
      >
        <div className='w-[40px] mr-2'>{icon}</div>
        <div className='w-full'>
          <p className={classNames('typography-body-sm text-gray-800')}>
            {'Those leaves will be deducted on the final settlement at the end of March.'}
          </p>
        </div>
      </div>
    )
  }

  switch (type) {
    case 'balance':
      return (
        <div
          className={classNames(
            'max-h-[164px] p-3 rounded-smallNudge border-l-4 border flex justify-between',
            `${className}`
          )}
        >
          <div className='w-[40px] mr-2'>{icon}</div>
          <div className='w-full'>
            <div className='flex justify-between w-full h-6 mb-3'>
              <div className={classNames('text-left typography-body-md font-bold mb-2 mt-2')}>{title}</div>
              <div className='flex gap-1 items-end'>
                <div className='-mb-2 flex gap-1'>
                  {leaveBalanceTotal >= 0 ? renderSpecialStyleForDay(color, leaveBalanceTotal) : null}
                  {/* {hourNumberBalance > 0 && renderSpecialStyleForHour(color, hourNumberBalance)} */}
                </div>
              </div>
            </div>
            <div className='flex flex-col items-start gap-3 flex-1'>{renderContent(leaveBalanceInfo, currentYear)}</div>
          </div>
        </div>
      )

    case 'unpaid':
      return (
        <div
          className={classNames(
            'max-h-[164px] p-3 rounded-smallNudge border-l-4 border flex justify-between',
            `${className}`
          )}
        >
          <div className='w-[40px] mr-2'>{icon}</div>
          <div className='w-full'>
            <div className='flex justify-between w-full h-6 mb-3'>
              <div className={classNames('text-left typography-body-md font-bold mb-2 mt-2')}>{title}</div>
              <div className='flex items-center justify-center gap-1'>
                <div className='flex gap-1 items-end'>
                  <div className='-mb-2 flex gap-1'>
                    {leaveBalanceInfo?.all >= 0 ? renderSpecialStyleForDay(color, leaveBalanceInfo?.all) : null}
                    {/* {hourNumberUnpaid > 0 && renderSpecialStyleForHour(color, hourNumberUnpaid)} */}
                  </div>
                </div>
                <div className='flex items-end justify-center'>
                  <Tooltip
                    showArrow={false}
                    className='bg-white w-[332px] rounded-smallNudge'
                    content={renderContentTooltipUnpaid(leaveBalanceInfo, leaveCategory)}
                  >
                    <InfoIcon className='cursor-pointer mt-2' width={20} height={20} />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    case 'advanced':
      return (
        <div
          className={classNames(
            'max-h-[164px] p-3 rounded-smallNudge border-l-4 border flex justify-between',
            `${className}`
          )}
        >
          <div className='w-[40px] mr-2'>{icon}</div>
          <div className='w-full'>
            <div className='flex justify-between w-full h-6 mb-3'>
              <div className={classNames('text-left typography-body-md font-bold mb-2 mt-2')}>{title}</div>

              <div className='flex items-center justify-center gap-1'>
                <div className='flex gap-1 items-end'>
                  <div className='-mb-2 flex gap-1'>
                    <p className={classNames('typography-title-md', `${color}`)}>{'-'}</p>
                    {leaveBalanceInfo?.advanceLeave >= 0
                      ? renderSpecialStyleForDay(color, leaveBalanceInfo?.advanceLeave)
                      : null}
                    {/* {hourNumberAdvance > 0 && renderSpecialStyleForHour(color, hourNumberAdvance)} */}
                  </div>
                </div>
                {/* <div className='flex items-end justify-center'>
                  <Tooltip
                    showArrow={false}
                    className='bg-white w-[332px] rounded-smallNudge'
                    content={renderContentTooltipAdvance()}
                  >
                    <InfoIcon className='cursor-pointer mt-2' width={20} height={20} />
                  </Tooltip>
                </div> */}
                <div className='flex items-end justify-center'>
                  <div data-tooltip-id={`tooltip-${type}`}>
                    <InfoIcon className='cursor-pointer mt-2' width={20} height={20} />
                    <ReactTooltip
                      id={`tooltip-${type}`}
                      place='right'
                      children={renderContentTooltipAdvance()}
                      style={{
                        background: 'none',
                        maxWidth: '400px',
                        alignItems: 'center',
                        padding: '0px',
                        borderRadius: '16px'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    default:
      return (
        <div
          className={classNames(
            'max-h-[164px] p-3 rounded-smallNudge border-l-4 border flex justify-between',
            `${className}`
          )}
        >
          <div className='w-[40px] mr-2'>{icon}</div>
          <div className='w-full'>
            <div className='flex justify-between w-full h-6 mb-3'>
              <div className={classNames('text-left typography-body-md font-bold mb-2 mt-2')}>{title}</div>
              {type === 'balance' ? (
                <div className='flex gap-1 items-end'>
                  <div className='-mb-2 flex gap-1'>
                    {leaveBalanceTotal >= 0 && renderSpecialStyleForDay(color, leaveBalanceTotal)}
                    {/* {dayNumberBalance > 0 && renderSpecialStyleForHour(color, hourNumberBalance)} */}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )
  }
}

export default CardInfoLeaveType
