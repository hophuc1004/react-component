import classNames from 'classnames'
import ScrollBar from 'components/Scrollbar'
import React, { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'
import { Checkbox, CheckboxState } from 'components/Checkbox'

interface OptionProps {
  id?: number
  name?: string
}
interface CustomSelectProps {
  options?: Array<OptionProps>
  defaultChecked?: Array<OptionProps>
  handleChange?: (value: Array<OptionProps>) => void
  isCustomDefault?: boolean
  value?: Array<OptionProps>
  className?: string
  error?: boolean
  placeholder?: string
  helperText?: string
  onFocus?: any
  onBlur?: any
  disabled?: boolean
  icon?: React.ReactNode
  criteriaSelected?: any
  onSetProjectAndRole?: (value: any) => void
  onRemoveProject?: (value: any) => void
}

export const MultipleSelectCheckbox: React.FC<CustomSelectProps> = ({
  options,
  isCustomDefault = false,
  value = [],
  className,
  error,
  helperText = '',
  placeholder = 'Please select',
  onFocus,
  onBlur,
  disabled,
  icon,
  onSetProjectAndRole,
  onRemoveProject
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [criteriaSelected, setCriteriaSelected] = useState([])
  const { t } = useTranslation()

  const isChecked = (value: number) => {
    return criteriaSelected.includes(value)
  }

  const onChangeCriteria = (value: number, state: CheckboxState) => {
    let criteriaValue: number[] = [...criteriaSelected]

    if (state === CheckboxState.UNCHECK) {
      criteriaValue = criteriaValue.filter((i) => i !== value)
      onRemoveProject(value)
      return
    } else {
      criteriaValue.push(value)
      onSetProjectAndRole({
        projectId: value,
        roleId: null
      })
    }

    setCriteriaSelected(criteriaValue)
    // if (onSetProjectAndRole) {
    //   onSetProjectAndRole({
    //     projectId: value,
    //     roleId: null
    //   })
    // }
  }

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (value) {
      setCriteriaSelected(value)
      return
    }
  }, [value])

  const toggleDropdown = () => {
    if (disabled) {
      return
    }
    setIsOpen(!isOpen)
  }

  const renderValue = (criteriaSelected) => {
    if (criteriaSelected?.length > 0) {
      const arrayProjectName = criteriaSelected?.map((id) => {
        const existProject = options?.find((project) => project?.id === id)
        return existProject?.name
      })

      return <p className='typography-body-md font-normal text-gray-800'>{arrayProjectName?.join(`, `)}</p>
    } else {
      return <span className='items-start typography-body-md font-normal text-gray-400'>{t(placeholder)}</span>
    }
  }

  return (
    <>
      <div
        onFocus={onFocus}
        onBlur={onBlur}
        className={classNames('relative inline-block w-full rounded-md', {
          // 'focus-within:outline-primary-100 focus-within:outline hover:border-primary-500 focus-within:outline-[3px]':
          //   !isCustomDefault && !disabled
        })}
        ref={dropdownRef}
      >
        <div
          tabIndex={2}
          className={classNames(
            'w-full inline-flex justify-between rounded-md text-sm text-gray-700 overflow-y-hidden no-scrollbar',
            {
              'focus-within:outline-primary-100 focus-within:outline hover:border-primary-500 focus-within:outline-[3px] focus-within:border-primary-500':
                !isCustomDefault && !disabled,
              'bg-gray-100 cursor-not-allowed': disabled,
              ['border-[1.5px]']: !isCustomDefault,
              ['py-2']: !isCustomDefault,
              ['min-h-[40px]']: !isCustomDefault,
              ['px-3']: !isCustomDefault,
              ['border-red-500 border-[1.5px']: error,
              ['hover:border-primary-500 ']: !disabled
            }
          )}
          onClick={toggleDropdown}
        >
          {renderValue(criteriaSelected)}
          {icon}
        </div>{' '}
        {isOpen && (
          <ul
            className={classNames(
              'absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-depth02',
              {
                ['top-8']: isCustomDefault
              },
              className
            )}
          >
            <ScrollBar style={{ maxHeight: '20vh' }} className='flex-[1_1_auto] max-h-[80%]'>
              <div className='flex flex-col gap-1 p-3'>
                {options.map((project) => {
                  return (
                    <Checkbox
                      id={`project-${project.id}`}
                      value={project.id}
                      key={`project-${project.id}`}
                      initState={isChecked(project.id) ? CheckboxState.CHECKED : CheckboxState.UNCHECK}
                      onChange={(v: number, s) => onChangeCriteria(v, s)}
                    >
                      {project.name}
                    </Checkbox>
                  )
                })}
              </div>
            </ScrollBar>
          </ul>
        )}
        {error && helperText && (
          <div
            className={twMerge(
              classNames('text-sm font-normal text-gray-600 mt-[2px]', {
                'text-red-500': error
              })
            )}
          >
            {helperText}
          </div>
        )}
      </div>
    </>
  )
}
