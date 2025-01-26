import classnames from 'classnames'
import { Button } from 'components/Button'
import { Checkbox, CheckboxState } from 'components/Checkbox'
import { Modal } from 'components/Modal'
import { cloneDeep, get } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { ContractIcon } from '~/shared/icons/ContractIcon'
import SupervisorAccountIcon from '~/shared/icons/SupervisorAccountIcon'
import { WorkIcon } from '~/shared/icons/WorkIcon'
import { getFullName } from '~/shared/utils/util'
import { Loading } from 'components/Loading'
import { AvatarInfo } from '~/modules/share/components'
import { AnyType } from '~/modules/share/types'
import { useTranslation } from 'react-i18next'
interface FilterModalProps {
  visible: boolean
  initCriteria: { [x: string]: number[] }
  positions: AnyType[]
  lineManagers: AnyType[]
  contractTypes: { id: number; name: string }[]
  onApply?: (criteria: { [x: string]: number[] }) => void
  onCancel?: () => void
  isLoadingPosition?: boolean
  isLoadingLineManager?: boolean
}

export const EmployeeFilterModal: React.FC<React.PropsWithChildren<FilterModalProps>> = ({
  visible,
  initCriteria = {},
  onApply,
  onCancel,
  positions,
  lineManagers,
  isLoadingPosition,
  isLoadingLineManager
}) => {
  const [criteriaSelected, setCriteriaSelected] = useState({})
  const { t } = useTranslation()

  useEffect(() => {
    if (initCriteria) {
      setCriteriaSelected(cloneDeep(initCriteria))
    } else {
      setCriteriaSelected({})
    }
  }, [initCriteria, visible])

  const totalSelected = useMemo(() => {
    return Object.values(criteriaSelected).reduce<number>(
      (total: number, criteria: number[]) => total + criteria.length,
      0
    )
  }, [criteriaSelected])

  const isChecked = (criteria: string, value: number) => {
    const criteriaValue = get(criteriaSelected, criteria, [])
    return criteriaValue.includes(value)
  }

  const onChangeCriteria = (criteria: string, value: number, state: CheckboxState) => {
    let criteriaValue: number[] = criteriaSelected[criteria] || []

    if (state === CheckboxState.UNCHECK) {
      criteriaValue = criteriaValue.filter((i) => i !== value)
    } else {
      criteriaValue.push(value)
    }

    setCriteriaSelected(Object.assign({}, criteriaSelected, { [criteria]: criteriaValue }))
  }

  const handleApply = () => {
    onApply && onApply(criteriaSelected)
  }

  const onReset = () => {
    setCriteriaSelected({})
  }

  const renderHeaderModal = () => {
    return (
      <div>
        <h2 className='typography-title-sm text-gray-800'>{t('employeeManagement.filter')}</h2>
        <div
          className={classnames('space-x-4 typography-body-md  select-none', {
            'text-gray-400': totalSelected === 0,
            'text-gray-800': totalSelected > 0
          })}
        >
          <span className='transition-all duration-300'>
            {totalSelected} {t('common.selected')}
          </span>
          <span
            className={classnames('transition-colors duration-300', {
              'cursor-pointer text-primary-600 typography-button-lg': totalSelected > 0
            })}
            onClick={onReset}
          >
            {t('buttonTitle.Reset')}
          </span>
        </div>
      </div>
    )
  }

  const renderFooterModal = () => {
    return (
      <div className='flex justify-end space-x-2'>
        <Button style='outline' onClick={onCancel && onCancel}>
          {t('common.cancel')}
        </Button>

        <Button style='filled' onClick={handleApply}>
          {t('buttonTitle.Apply')}
        </Button>
      </div>
    )
  }

  return (
    <Modal
      visible={visible}
      header={renderHeaderModal()}
      footer={renderFooterModal()}
      modalWrapperClassName='w-[800px]'
    >
      <div className='space-y-4'>
        <div className=''>
          <div className='flex items-center space-x-2'>
            <WorkIcon width={24} height={24}></WorkIcon>
            <div className='typography-body-lg font-semibold text-gray-800'>{t('jobTitle')}</div>
          </div>

          <div
            className={classnames('grid  py-2', {
              'grid-cols-1': isLoadingPosition,
              'grid-cols-2 md:grid-cols-2': !isLoadingPosition
            })}
          >
            {!isLoadingPosition &&
              positions.map((position) => {
                return (
                  <Checkbox
                    id={`position-${position.id}`}
                    value={position.id}
                    key={`position-${position.id}`}
                    initState={isChecked('positions', position.id) ? CheckboxState.CHECKED : CheckboxState.UNCHECK}
                    onChange={(v: number, s) => onChangeCriteria('positions', v, s)}
                  >
                    {position.name}
                  </Checkbox>
                )
              })}
            {isLoadingPosition && <Loading />}
          </div>
        </div>

        <div className=''>
          <div className='flex items-center space-x-2'>
            <SupervisorAccountIcon width={24} height={24}></SupervisorAccountIcon>
            <div className='typography-body-lg font-semibold text-gray-800'>{t('lineManager')}</div>
          </div>

          <div
            className={classnames('grid py-2', {
              'grid-cols-1': isLoadingLineManager,
              'grid-cols-2 md:grid-cols-2': !isLoadingLineManager
            })}
          >
            {!isLoadingLineManager &&
              lineManagers.map((lineManager) => {
                return (
                  <Checkbox
                    id={`lineManager-${lineManager.id}`}
                    key={`lineManager-${lineManager.id}`}
                    value={lineManager.id}
                    initState={
                      isChecked('lineManagers', lineManager.id) ? CheckboxState.CHECKED : CheckboxState.UNCHECK
                    }
                    onChange={(v: number, s) => onChangeCriteria('lineManagers', v, s)}
                  >
                    <AvatarInfo
                      name={getFullName(lineManager.firstName, lineManager.middleName, lineManager.lastName)}
                      url={lineManager.avatar}
                      textClass='max-w-[300px]'
                    ></AvatarInfo>
                  </Checkbox>
                )
              })}
            {isLoadingLineManager && <Loading />}
          </div>
        </div>

        <div className=''>
          <div className='flex items-center space-x-2'>
            <ContractIcon width={24} height={24}></ContractIcon>
            <div className='typography-body-lg font-semibold text-gray-800'>{t('contractType')}</div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 py-2'>
            {/* {contractTypes.map((contractType) => {
              return (
                <Checkbox
                  id={`contractType-${contractType.id}`}
                  value={contractType.id}
                  initState={isChecked('contractType', contractType.id) ? CheckboxState.CHECKED : CheckboxState.UNCHECK}
                  onChange={(v: number, s) => onChangeCriteria('contractType', v, s)}
                >
                  {contractType.name}
                </Checkbox>
              )
            })} */}
            <div className='text-gray-700'>{t('Coming soon')}</div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
