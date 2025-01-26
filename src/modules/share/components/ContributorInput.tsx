import classNames from 'classnames'
import { Button } from 'components/Button'
import isNil from 'lodash/isNil'
import React, { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'
import OptionMore from './OptionMore'
import { AvatarInfo } from '.'
import { useTranslation } from 'react-i18next'

type TextFieldVariant = VariantProps<typeof textField>
type HtmlInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color' | 'ref'>
export interface TextFieldProps extends HtmlInputProps, TextFieldVariant {
  label?: string
  error?: boolean
  helperText?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  disabled?: boolean
  cols?: any
  rows?: any
  onChange?: (value: any) => void
  placeholder?: string
  handleAddContributorComment?: (value: any) => void
  handleUpdateContributorComment?: (value: any) => void
  handleDeleteContributorComment?: (value: any) => void
  value?: any
  maxLength?: number
  isMainEvaluator?: boolean
}

export const ContributorInput: React.FC<TextFieldProps> = (props) => {
  const {
    label,
    placeholder,
    error,
    helperText,
    disabled,
    handleAddContributorComment,
    value,
    maxLength,
    handleUpdateContributorComment,
    handleDeleteContributorComment,
    isMainEvaluator
  } = props

  const ref = useRef(null)

  const [inputValue, setInputValue] = useState('')
  const [openBtnComment, setOpenBtnComment] = useState(false)
  const [isViewComment, setIsViewComment] = useState(false)
  const [openOption, setOpenOption] = useState(false)
  const [isEditComment, setIsEditComment] = useState(false)

  const { t } = useTranslation()

  useEffect(() => {
    if (value) {
      setInputValue(value?.comment)
      // adjustRows(value?.comment)
      setIsViewComment(true)
    }

    setTimeout(() => {
      ref.current.style.height = '30px'
      ref.current.style.height = `${ref.current.scrollHeight}px`
    }, 100)

    return () => { }
  }, [value])

  const handleTextChange = (e) => {
    setInputValue(e.target.value)

    setTimeout(() => {
      ref.current.style.height = '30px'
      ref.current.style.height = `${ref.current.scrollHeight}px`
    }, 100)
    // adjustRows(e.target.value)
  }

  const handleCloseBtnComment = () => {
    if (value) {
      setTimeout(() => {
        ref.current.style.height = '30px'
        ref.current.style.height = `${ref.current.scrollHeight}px`
      }, 100)
      setInputValue(value?.comment)
      setOpenBtnComment(false)
      setOpenOption(false)
      setIsEditComment(false)
      setIsViewComment(true)
      return
    } else {
      ref.current.style.height = '48px'
      setOpenBtnComment(false)
      setOpenOption(false)
      setIsEditComment(false)
      setInputValue('')
      return
    }
  }

  const handleToggleOption = () => {
    setOpenOption(!openOption)
  }

  const handleCloseOption = () => {
    setOpenOption(false)
  }

  const handleAddComment = () => {
    if (inputValue?.trim() === '' || isNil(inputValue)) {
      return
    }
    handleAddContributorComment({ comment: inputValue })
    setIsViewComment(true)
    setOpenBtnComment(false)
  }

  const handleUpdateEditComment = () => {
    if (inputValue?.trim() === '' || isNil(inputValue)) {
      return
    }
    handleUpdateContributorComment({ comment: inputValue, idComment: value?.id })
    setIsViewComment(true)
    setOpenBtnComment(false)
  }

  const handleDeleteComment = () => {
    handleDeleteContributorComment({ idComment: value?.id })
    setTimeout(() => {
      setOpenBtnComment(false)
      setOpenOption(false)
      setIsEditComment(false)
      setInputValue('')
      setIsViewComment(false)
    }, 500)
  }

  const onEditComment = () => {
    setIsEditComment(true)
    setIsViewComment(false)
    setOpenBtnComment(true)
    setOpenOption(false)
    setTimeout(() => {
      ref.current.style.height = '30px'
      ref.current.style.height = `${ref.current.scrollHeight}px`
    }, 100)
  }

  const renderBtnAddComment = (isEditComment) => {
    return (
      <div className='mr-4 flex items-center justify-center gap-4 mt-4'>
        {isEditComment ? (
          <div
            className='min-w-[80px] rounded-md px-3 transition-color duration-300 leading-none typography-button items-center justify-center text-white fill-white bg-primary-500 hover:bg-primary-600 active:bg-primary-700 disabled:bg-gray-400 h-[40px] border-[1px] cursor-pointer flex'
            onClick={handleUpdateEditComment}
          >
            {t('common.save')}
          </div>
        ) : (
          <div
            className='min-w-[80px] rounded-md px-3 transition-color duration-300 leading-none typography-button items-center justify-center text-white fill-white bg-primary-500 hover:bg-primary-600 active:bg-primary-700 disabled:bg-gray-400 h-[40px] border-[1px] cursor-pointer flex'
            onClick={handleAddComment}
          >
            {t('Add comment')}
          </div>
        )}
        <Button style='outline' onClick={handleCloseBtnComment}>
          {t('common.cancel')}
        </Button>
      </div>
    )
  }

  const renderInfoComment = () => {
    if (isNil(value)) {
      return
    }
    return (
      <AvatarInfo
        name={value?.fullName || value?.lastUser?.fullName}
        url={value?.avatar || value?.lastUser?.avatar}
        textClass='text-table'
        size='small'
      />
    )
  }

  return (
    <>
      <div className='w-full flex flex-col items-start'>
        <label className='block text-sm font-medium leading-6 text-gray-800'>{label}</label>
        <div className='w-full flex justify-between'>
          <div className={textField({ error, disabled, isViewComment, isMainEvaluator })}>
            {/* <ScrollBar className='p-2 pr-3' style={{ maxHeight: '206px', width: '100%' }}> */}
            {renderInfoComment()}
            <textarea
              disabled={disabled || isViewComment || isMainEvaluator}
              maxLength={maxLength}
              value={inputValue}
              ref={ref}
              className={input({ disabled, isViewComment, isMainEvaluator })}
              placeholder={!isMainEvaluator ? placeholder : ''}
              onChange={handleTextChange}
              onFocus={() => {
                setOpenBtnComment(true)
              }}
              style={{
                resize: 'none'
              }}
            />
            {/* </ScrollBar> */}
          </div>

          {error && helperText && (
            <div
              className={twMerge(
                classNames('text-sm font-normal text-gray-600', {
                  'text-red-500': error
                })
              )}
            >
              {helperText}
            </div>
          )}
          {isViewComment && !isMainEvaluator && !disabled && (
            <OptionMore
              handleToggleOption={handleToggleOption}
              onEditComment={onEditComment}
              handleDeleteComment={handleDeleteComment}
              openOption={openOption}
              handleCloseOption={handleCloseOption}
            />
          )}
        </div>
        {openBtnComment && !isViewComment && renderBtnAddComment(isEditComment)}
      </div>
    </>
  )
}

const textField = tv({
  base: ` flex flex-col items-start hidden-scroll`,
  variants: {
    color: {
      default: 'ring-gray-300',
      primary: 'focus-within:border-primary-500',
      secondary: 'ring-secondary'
    },
    error: {
      true: 'border-red-500'
    },
    disabled: {
      true: 'bg-gray-100 text-gray-500 cursor-not-allowed border-b-gray-300',
      false: 'border-b-gray-500 hover:border-b-primary-500'
    },
    isViewComment: {
      true: 'border-none w-11/12 !bg-white block hidden-scroll',
      false: 'border-b-[1.5px] w-full block hidden-scroll'
    },
    isMainEvaluator: {
      true: 'border-none'
    }
  },
  defaultVariants: {
    color: 'primary'
  }
})
const input = tv({
  base: `hidden-scroll w-full p-3 outline-none block flex-1 border-0 bg-transparent text-sm placeholder:text-gray-400 placeholder:font-normal placeholder:text-sm focus:ring-0 sm:text-md sm:leading-6`,
  variants: {
    disabled: {
      true: 'bg-gray-100 text-gray-800 cursor-not-allowed'
    },
    isViewComment: {
      true: '!bg-white'
    },
    isMainEvaluator: {
      true: '!bg-white'
    }
  }
})

export default ContributorInput
