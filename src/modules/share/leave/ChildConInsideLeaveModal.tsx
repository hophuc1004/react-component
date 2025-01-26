import classNames from 'classnames'
import { FC, ReactNode } from 'react'
interface ChildCpnInsideProps {
  title?: string
  component?: ReactNode
  className?: string
  error?: boolean
  helperText?: string
  zIndex?: string
}

const ChildCpnInsideLeaveModal: FC<ChildCpnInsideProps> = ({ title, component, error, helperText, zIndex }) => {
  if (error) {
    return (
      <div className='py-3'>
        <div
          className={classNames('flex items-start space-x-2 justify-between w-full relative', {
            [`${zIndex}`]: zIndex
          })}
        >
          <div className='typography-label-md font-semibold text-gray-800 w-4/12'>{title}</div>
          {component}
        </div>
        <div className='flex w-full mt-1'>
          <div className='typography-label-md font-semibold text-gray-800 w-3/12' />
          <div className='flex flex-col ml-1'>
            <div className='typography-body-sm text-red-500 block'>{helperText}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='py-3'>
      <div
        className={classNames('flex items-start space-x-2 justify-between w-full relative', {
          [`${zIndex}`]: zIndex
        })}
      >
        <div className='typography-label-md font-semibold text-gray-800 w-4/12'>{title}</div>
        {component}
      </div>
    </div>
  )
}

export default ChildCpnInsideLeaveModal
