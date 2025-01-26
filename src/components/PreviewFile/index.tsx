import { FC, useEffect } from 'react'
import { CloseIcon } from '~/shared/icons'
import DownloadIcon from '~/shared/icons/DownloadIcon'
import UnSupportPreview from '~/assets/images/unsupport-preview.svg'
import { Button } from 'components/Button'
import { presignedAttachmentUrl } from '~/modules/share/request'
interface PreviewFileProps {
  url?: string
  onClose?: () => void
  filename?: string
  s3UrlNotSign?: string
}

export const PreviewFile: FC<PreviewFileProps> = ({ url, onClose, filename, s3UrlNotSign }) => {
  const separateFileName = filename?.split('.')
  const tailFile = separateFileName[separateFileName?.length - 1]

  useEffect(() => {
    return () => {
      onClose()
    }
  }, [])

  const onDownloadAtt = async (s3UrlNotSign, originName) => {
    try {
      const result = await presignedAttachmentUrl(s3UrlNotSign, originName, true)
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

  const renderContent = (fileType) => {
    switch (fileType) {
      case 'doc':
      case 'docx':
      case 'xls':
      case 'xlsx':
        return (
          <div className='flex items-center justify-between flex-col min-w-full w-full h-full'>
            <div className='flex justify-between w-full min-w-full bg-gray-800 h-[64px] px-10 py-5'>
              <p className='typography-body-md text-white'>{filename}</p>
              <div className='flex items-center gap-4'>
                <div className='cursor-pointer' onClick={() => onDownloadAtt(s3UrlNotSign, filename)}>
                  <DownloadIcon className='fill-white text-white' width={24} height={24} />
                </div>
                <div onClick={onClose} className='cursor-pointer hover:rounded-full p-1'>
                  <CloseIcon className='fill-white text-white' width={20} height={20} />
                </div>
              </div>
            </div>
            <iframe
              src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}`}
              width={'100%'}
              height={'100%'}
            ></iframe>
          </div>
        )

      case 'pdf':
        return (
          <div className='flex items-center justify-between flex-col min-w-full w-full h-full'>
            <div className='flex justify-between w-full min-w-full bg-gray-800 h-[64px] px-10 py-5'>
              <p className='typography-body-md text-white'>{filename}</p>
              <div className='flex items-center gap-4'>
                <div className='cursor-pointer' onClick={() => onDownloadAtt(s3UrlNotSign, filename)}>
                  <DownloadIcon className='fill-white text-white' width={24} height={24} />
                </div>
                <div onClick={onClose} className='cursor-pointer hover:rounded-full p-1'>
                  <CloseIcon className='fill-white text-white' width={20} height={20} />
                </div>
              </div>
            </div>
            <iframe src={url} style={{ width: '100%', height: '100%' }} title='PDF Viewer' allowFullScreen />
          </div>
        )

      case 'png':
      case 'jpg':
      case 'jpeg':
        return (
          <div className='flex items-center justify-between flex-col w-full min-w-full h-full'>
            <div className='flex items-center justify-between min-w-full w-full bg-gray-800 h-[64px] px-10 py-5'>
              <p className='typography-body-md text-white'>{filename}</p>
              <div className='flex items-center gap-4'>
                <div className='cursor-pointer' onClick={() => onDownloadAtt(s3UrlNotSign, filename)}>
                  <DownloadIcon className='fill-white text-white' width={24} height={24} />
                </div>
                <div onClick={onClose} className='cursor-pointer hover:rounded-full p-1'>
                  <CloseIcon className='fill-white text-white' width={20} height={20} />
                </div>
              </div>
            </div>
            <div className='w-full min-w-full h-full flex items-center justify-center mb-5'>
              <img src={url} style={{ maxHeight: '100%', maxWidth: '100%' }} alt='Attachment File' />
            </div>
          </div>
        )

      default:
        return (
          <div className='flex items-center justify-between flex-col w-full min-w-full h-full'>
            <div className='flex items-center justify-between min-w-full w-full bg-gray-800 h-[64px] px-10 py-5'>
              <p className='typography-body-md text-white'>{filename}</p>
              <div className='flex items-center gap-4'>
                <div className='cursor-pointer' onClick={() => onDownloadAtt(s3UrlNotSign, filename)}>
                  <DownloadIcon className='fill-white text-white' width={24} height={24} />
                </div>
                <div onClick={onClose} className='cursor-pointer hover:rounded-full p-1'>
                  <CloseIcon className='fill-white text-white' width={20} height={20} />
                </div>
              </div>
            </div>
            <div className='w-full min-w-full h-full flex flex-col items-center justify-center mb-5 gap-6'>
              {/* <img src={url} style={{ maxHeight: '100%', maxWidth: '100%' }} alt='Attachment File' /> */}
              <div>
                <img src={UnSupportPreview} alt='No Employee Icon' />
              </div>
              <p className='font-normal typography-title-sm text-white tracking-[0.15px]'>
                Unable to preview this file. Try to reload or download this file.
              </p>
              <Button
                onClick={() => onDownloadAtt(s3UrlNotSign, filename)}
                style='outline'
                leadingIcon={<DownloadIcon className='fill-black text-black' width={24} height={24} />}
              >
                Download
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className='fixed h-full min-h-full min-w-full w-full top-0 left-0 bottom-0 right-0 flex justify-center z-[1000]'>
      <div className='fixed h-full min-h-full min-w-full w-full top-0 left-0 flex items-center text-center justify-center bottom-0 z-[999] bg-black/80 backdrop-blur-sm'>
        {renderContent(tailFile)}
      </div>
    </div>
  )
}
