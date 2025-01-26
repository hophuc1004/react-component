import {
  MDXEditor,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  listsPlugin,
  ListsToggle,
  maxLengthPlugin
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import './Editor.css'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import TextField from 'components/TextField'
import { useTranslation } from 'react-i18next'

interface ChildCpnInsideProps {
  onChange?: (value: string) => void
  className?: string
  error?: boolean
  helperText?: string
  zIndex?: string
  maxLength?: number
  value?: string
  editLeaveRequest?: boolean
}

const PendingWorkloadEditor: FC<ChildCpnInsideProps> = ({ onChange, error, helperText, maxLength, value }) => {
  const [countLength, setCountLength] = useState(0)
  const [showIndicator, setShowIndicator] = useState(false)

  const [valueEditor, setValueEditor] = useState('')
  const { t } = useTranslation()

  const refMarkdown = useRef(null)

  useEffect(() => {
    if (value) {
      setValueEditor(value)
      setCountLength(value.toString()?.length)
      refMarkdown?.current?.getMarkdown()
    }

    return () => {}
  }, [value])

  useEffect(() => {
    if (refMarkdown.current) {
      refMarkdown.current.setMarkdown(valueEditor)
    }
  }, [valueEditor])
  // const [inputValue, setInputValue] = useState('')

  const handleTextChange = (value) => {
    // const { value } = event.target
    if (value.length > maxLength) {
      const valueAfterSubstr = value.toString().substr(0, maxLength) // Cut the value to the first 2000 characters
      setCountLength(valueAfterSubstr.length) // Update character count
      // setInputValue(valueAfterSubstr) // Update the state with the new value
      onChange(valueAfterSubstr)
      return // Assuming you need to lift state up or perform other actions
    } else {
      setCountLength(value.length) // Update character count
      // setInputValue(value) // Update the state with the new value
      onChange(value)
      if (value.length >= maxLength) {
        return
      }
      return
    }
  }

  const renderMDXEditor = useMemo(() => {
    return (
      <MDXEditor
        ref={refMarkdown}
        markdown={valueEditor ? valueEditor : ''}
        // markdown={''}
        onChange={handleTextChange}
        placeholder={t('leaveRequestModal.handleOverWork')}
        contentEditableClassName='typo text-sm text-gray-800 !font-sans'
        className='prose text-sm'
        autoFocus={false}
        onBlur={() => setShowIndicator(false)}
        plugins={[
          listsPlugin(),
          maxLengthPlugin(maxLength),
          // headingsPlugin({ allowedHeadingLevels: [1, 2] }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                {/* <BlockTypeSelect /> */}
                <BoldItalicUnderlineToggles />
                <ListsToggle options={['bullet', 'number']} />
              </>
            )
          })
        ]}
      />
    )
  }, [valueEditor])

  return (
    <TextField error={error} helperText={helperText}>
      <div className='w-full outline-none min-h-[160px] relative' onFocus={() => setShowIndicator(true)}>
        {renderMDXEditor}
        {showIndicator && (
          <div className='text-gray-400 text-[10px] absolute bottom-0 right-0 p-1'>{`${countLength}/${maxLength}`}</div>
        )}
      </div>
    </TextField>
  )
}

export default PendingWorkloadEditor

// return (
//   <div className='flex flex-col w-full'>
//     <div
//       className={classNames('w-full border-[1.5px] rounded-md min-h-[160px] relative', {
//         ['border-red-500']: error,
//         ['hover:border-primary-500 focus:border-primary-500']: !error
//       })}
//     >
//       <div className=''>
//         <MDXEditor
//           markdown={''}
//           onChange={handleTextChange}
//           placeholder={`Your request won't be approved without sharing pending workload...`}
//           contentEditableClassName='typo'
//           className='prose'
//           autoFocus
//           plugins={[
//             listsPlugin(),
//             maxLengthPlugin(maxLength),
//             // headingsPlugin({ allowedHeadingLevels: [1, 2] }),
//             toolbarPlugin({
//               toolbarContents: () => (
//                 <>
//                   {/* <BlockTypeSelect /> */}
//                   <BoldItalicUnderlineToggles />
//                   <ListsToggle options={['bullet', 'number']} />
//                 </>
//               )
//             })
//           ]}
//         />
//         <div className='text-gray-400 text-[10px] absolute bottom-0 right-0 p-1'>{`${countLength}/${maxLength}`}</div>
//       </div>
//     </div>
//     {error && <div className='typography-body-sm text-red-500 block'>{helperText}</div>}
//   </div>
// )
