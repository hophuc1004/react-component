import { FC, useEffect, useState } from 'react'
import { CloseIcon } from '~/shared/icons'
import isNil from 'lodash/isNil'
import { isEmpty } from 'lodash'
import { IAttachment } from '~/modules/share/types'
import { presignedAttachmentUrl, uploadAttachment } from '../request'
import classNames from 'classnames'
import { StatusCodes } from 'http-status-codes'
import { usePageHeaderContext } from '~/contexts/PageHeaderContext'
import DownloadIcon from '~/shared/icons/DownloadIcon'

interface SelectedTimeCpnProps {
  attachment?: IAttachment
  index?: number
  handleRemoveAttachment?: (originName: string, arrAttachments: IAttachment[]) => void
  arrAttachments?: IAttachment[]
  isEdit?: boolean
  handleRemoveAttach?: (payload: any) => void
  onUpdateAttach?: (payload: any) => void
  isPreview?: boolean
  taskId?: number
  isCreateNewTask?: boolean
  ownerId?: number
}

const AttachmentUpload: FC<SelectedTimeCpnProps> = ({
  attachment,
  index,
  handleRemoveAttachment,
  arrAttachments,
  handleRemoveAttach,
  isPreview,
  taskId,
  onUpdateAttach,
  isCreateNewTask,
  ownerId
}) => {
  // const event = new Event(UPDATE_FIELD_TASK_DETAIL)

  const [process, setProcess] = useState(0)
  const [isShowProcess, setIsShowProcess] = useState(false)
  const { handleSetPageHeaderState } = usePageHeaderContext()

  const handleUpdateObjectAttach = (att, arrAtt, s3Url) => {
    if (isEmpty(arrAtt)) {
      return
    }
    const arrAttAfterMap = arrAtt?.map((item) => {
      if (item?.originName === att?.originName && !item?.s3Url) {
        item.s3Url = s3Url
        item.ownerId = ownerId
        item.createdAt = new Date().getTime()
        return item
      }
      return item
    })

    handleRemoveAttach(arrAttAfterMap)
    taskId && !isCreateNewTask && onUpdateAttach(arrAttAfterMap)
  }

  const handleUpload = async (file, arrAttachments) => {
    setTimeout(() => {
      setProcess(75)
    }, 1000)
    try {
      const resultUpload = await uploadAttachment(file?.file?.type, file?.file)
      const s3Url = resultUpload?.data?.split('?')[0]
      if (s3Url) {
        setProcess(100)
        handleUpdateObjectAttach(file, arrAttachments, s3Url)
        setTimeout(() => {
          setIsShowProcess(false)
          // taskId && document.dispatchEvent(event)
        }, 2000)
      }
    } catch (error) {
      console.log('errorUpload:::: ', error)
    }
  }

  useEffect(() => {
    if (attachment?.s3Url) {
      setIsShowProcess(false)
      return
    } else {
      setIsShowProcess(true)
    }

    return () => {}
  }, [])

  useEffect(() => {
    if (isNil(attachment)) {
      return
    }

    if (!isNil(attachment?.s3Url)) {
      return
    }
    handleUpload(attachment, arrAttachments)

    return () => {}
  }, [])

  const onPreViewAttach = async (s3Url, originName) => {
    if (!isPreview) {
      return
    }
    const result = await presignedAttachmentUrl(s3Url, originName)

    if (result?.statusCode === StatusCodes.OK) {
      const payload = {
        s3Url: result?.data,
        filename: originName,
        s3UrlNotSign: s3Url
      }

      handleSetPageHeaderState({
        viewImage: payload,
        openPreviewImage: true
      })
    }
    try {
    } catch (error) {}
  }

  return (
    <div key={`${attachment?.originName}-${index}`} className='flex flex-col gap-2 max-w-80 items-center'>
      <div
        className={classNames('flex items-center gap-3 w-full', {
          'justify-between': !taskId
        })}
      >
        {taskId && (
          <div className='!w-[32px] !h-[32px] !text-primary-600'>
            <DownloadIcon className='!w-[32px] !h-[32px] !text-primary-600' />
          </div>
        )}
        <p
          onClick={() => onPreViewAttach(attachment?.s3Url, attachment?.originName)}
          className={classNames('typography-body-md text-primary-600 text-left', {
            'hover:border-b-primary-600 hover:cursor-pointer hover:border-b-2': isPreview
          })}
        >
          {attachment.originName}
        </p>
        {!isShowProcess && attachment?.ownerId === ownerId ? (
          <div
            className='cursor-pointer text-primary-600 hover:bg-gray-300 hover:rounded-full p-1'
            onClick={() => {
              if (taskId || isCreateNewTask) {
                return handleRemoveAttachment(attachment.s3Url, arrAttachments)
              }
              handleRemoveAttachment(attachment.originName, arrAttachments)
              // if (taskId) {
              //   document.dispatchEvent(event)
              // }
            }}
          >
            <CloseIcon className='text-primary-600' width={20} height={20} />
          </div>
        ) : null}
      </div>
      {isShowProcess ? (
        <div className='w-11/12 bg-gray-300 rounded-full h-1 mb-4'>
          <div
            className='bg-primary-500 h-1 rounded-full'
            style={{
              width: `${process}%`,
              transition: 'width 1s ease'
            }}
          />
        </div>
      ) : null}
    </div>
  )
}

export default AttachmentUpload
