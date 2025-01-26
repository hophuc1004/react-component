import classNames from 'classnames'
import { StatusCodes } from 'http-status-codes'
import { FC } from 'react'
import { usePageHeaderContext } from '~/contexts/PageHeaderContext'
import DownloadIcon from '~/shared/icons/DownloadIcon'
import { presignedAttachmentUrl } from '../request'

interface AttachmentItemProps {
  s3Url?: string
  originName?: string
}

const AttachmentItem: FC<AttachmentItemProps> = ({ s3Url, originName }) => {
  const { handleSetPageHeaderState } = usePageHeaderContext()
  // const separateFileName = originName?.split('.')
  // const tailFile = separateFileName[separateFileName?.length - 1]

  const onDownloadAtt = async () => {
    try {
      const result = await presignedAttachmentUrl(s3Url, originName, true)
      const url = result?.data
      // Custom filename based on originName
      const filename = originName || 'default-filename'
      const a = document.createElement('a')
      a.href = url
      a.download = filename // Set the custom filename here
      document.body.appendChild(a)
      a.click()
      // Clean up
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.log('errorDownload::::: ', error)
    }
  }

  const onPreViewAttach = async (s3Url, originName) => {
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
    <div key={s3Url} className='flex gap-2 max-w-80 items-center'>
      <div className='cursor-pointer text-primary-600 hover:bg-gray-100 p-1 rounded-xSmall' onClick={onDownloadAtt}>
        <DownloadIcon className='text-primary-600' width={24} height={24} />
      </div>
      <p
        onClick={() => onPreViewAttach(s3Url, originName)}
        className={classNames(
          'typography-body-md text-primary-600 hover:border-b-primary-600 hover:cursor-pointer hover:border-b-2',
          {
            // ['hover:border-b-primary-600']: tailFile === 'png' || tailFile === 'pdf' || tailFile === 'jpeg',
            // ['hover:cursor-pointer']: tailFile === 'png' || tailFile === 'pdf' || tailFile === 'jpeg',
            // ['hover:border-b-2']: tailFile === 'png' || tailFile === 'pdf' || tailFile === 'jpeg'
          }
        )}
      >
        {originName}
      </p>
    </div>
  )
}

export default AttachmentItem
