import classNames from 'classnames'
import TextField from 'components/TextField'
import { FC, useEffect, useRef, useState } from 'react'

interface CustomTextAreaProps {
  value?: string
  onChange?: (value) => void
  debouncedHandleChange?: (value) => void
  error?: boolean
  placeholder?: string
  className?: string
  maxLength?: number
  helperText?: string
  disabled?: boolean
  rows?: number
  minRows?: number
  maxRows?: number
  minHeight?: string
  question?: any
  maxHeight?: string
  indicatorOutsideBox?: boolean
}

export const CustomTextArea: FC<CustomTextAreaProps> = ({
  onChange,
  error,
  placeholder,
  maxLength,
  helperText,
  disabled,
  value,
  className,
  minHeight,
  maxHeight,
  indicatorOutsideBox = false
}) => {
  const [countLength, setCountLength] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [showIndicator, setShowIndicator] = useState(false)

  const ref = useRef(null)

  useEffect(() => {
    if (value) {
      setInputValue(value)
      setCountLength(value?.length)
      // adjustRows(value)
    }

    setTimeout(() => {
      if (!ref.current) {
        return
      }
      ref.current.style.height = '30px'
      ref.current.style.height = `${ref.current.scrollHeight}px`
    }, 50)

    return () => {}
  }, [value])

  // const adjustRows = (text) => {
  //   const lineCount = text.split('\n').length
  //   const newRows = Math.min(Math.max(lineCount, minRows), maxRowValue)
  //   setRows(newRows)
  // }

  const handleTextChange = (event) => {
    const { value } = event.target
    setShowIndicator(true)
    // ref.current.style.height = '30px'
    // ref.current.style.height = `${event.target.scrollHeight}px`

    if (value.length > maxLength) {
      const valueAfterSubstr = value.toString().substr(0, maxLength) // Cut the value to the first 2000 characters
      setCountLength(valueAfterSubstr.length) // Update character count
      setInputValue(valueAfterSubstr) // Update the state with the new value
      onChange(valueAfterSubstr)
      // adjustRows(valueAfterSubstr)
      return // Assuming you need to lift state up or perform other actions
    } else {
      setCountLength(value.length) // Update character count
      setInputValue(value) // Update the state with the new value
      // adjustRows(value)
      onChange(value)
      if (value.length >= maxLength) {
        return
      }
      return
    }
  }

  // const handleOnKeyDown = (e) => {
  //   if (e.which === 13 && numberOfLines === maxRows ) {
  //     return false;
  //   }
  // }

  return (
    <TextField
      error={error}
      helperText={helperText}
      disabled={disabled}
      hFull={true}
      className={classNames('flex flex-col h-full', { className })}
    >
      <div
        className={classNames('w-full relative rounded-lg h-full', {
          'cursor-not-allowed': disabled
        })}
      >
        <textarea
          onFocus={() => setShowIndicator(true)}
          onBlur={() => setShowIndicator(false)}
          disabled={disabled}
          value={inputValue}
          onChange={handleTextChange}
          id='message'
          ref={ref}
          className={classNames('block p-3 w-full text-sm rounded-lg outline-none h-full hidden-scroll', {
            [className]: true,
            'cursor-not-allowed text-gray-400': disabled,
            'bg-gray-100': disabled,
            'bg-white': !disabled,
            [`${minHeight}`]: minHeight,
            [`${maxHeight}`]: maxHeight,
            'text-gray-800': !disabled
          })}
          placeholder={placeholder}
          style={{ resize: 'none' }}
          // rows={rows}
        />
        {showIndicator && (
          <div
            className={classNames('absolute right-0 p-1', {
              ['bottom-0 text-gray-400 text-[10px]']: !indicatorOutsideBox,
              ['-bottom-6 text-[11px] text-gray-500']: indicatorOutsideBox
            })}
          >{`${countLength}/${maxLength}`}</div>
        )}
      </div>
    </TextField>
  )
}

{
  /* {error && <div className='absolute typography-body-sm -bottom-6 left-0 text-red-500'>{helperText}</div>} */
}
//focus-within:outline-primary-100 focus-within:outline hover:border-primary-500 focus-within:outline-[3px] focus:border-primary-500 rounded-lg border-[1.5px] outline-none border-gray-300

// return (
//   <div className='w-full flex flex-col'>
//     <div className='w-full relative'>
//       <textarea
//         value={inputValue}
//         onChange={handleTextChange}
//         id='message'
//         className={classNames(
//           'block p-3 w-full text-sm text-gray-800 bg-white focus-within:outline-primary-100 focus-within:outline hover:border-primary-500 focus-within:outline-[3px] focus:border-primary-500 rounded-lg border-[1.5px] outline-none border-gray-300 min-h-[160px]',
//           { ['border-red-500']: error }
//         )}
//         placeholder={placeholder}
//       />
//       <div className='text-gray-400 text-[10px] absolute bottom-0 right-0 p-1'>{`${countLength}/${maxLength}`}</div>
//     </div>
//     {error && <div className='typography-body-sm text-red-500 block'>{helperText}</div>}
//   </div>
// )
