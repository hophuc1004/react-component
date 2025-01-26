import { IconButton } from 'components/IconButton'
import Typography from 'components/Typography'
import { cloneDeep, get, isNil } from 'lodash'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMatches, useNavigate } from 'react-router-dom'
import { usePageHeaderContext } from '~/contexts/PageHeaderContext'
import { BackIcon, PlusIcon } from '~/shared/icons'

const PageHeader = () => {
  const { t } = useTranslation()

  const { titleTemplateAppraisal } = usePageHeaderContext()

  const navigate = useNavigate()
  const matches = useMatches()

  const [pageTitle, setPageTitle] = useState('')
  const [parentUrl, setParentUrl] = useState(null)

  const [_, setShouldShow] = useState(false)

  // state saving indicator css

  // const renderStateSave = (isSaved, processSave) => {
  //   if (isSaved && !processSave) {
  //     return (
  //       <div className='flex gap-2 items-center'>
  //         <SavedIcon className='text-primary-600' width={24} height={24} />
  //         <p className='text-sm text-gray-500 font-normal'>{t('common.saved')}</p>
  //       </div>
  //     )
  //   }
  //   if (processSave) {
  //     return (
  //       <div className='flex gap-2 items-center'>
  //         <div className='flex items-start'>
  //           <svg
  //             aria-hidden='true'
  //             role='status'
  //             className='inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-200'
  //             viewBox='0 0 100 101'
  //             fill='none'
  //             xmlns='http://www.w3.org/2000/svg'
  //           >
  //             <path
  //               d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
  //               fill='currentColor'
  //             />
  //             <path
  //               d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
  //               fill='#275391'
  //             />
  //           </svg>
  //         </div>
  //         <p className='text-sm text-gray-500 font-normal'>{t('common.saving')}...</p>
  //       </div>
  //     )
  //   }
  //   return null
  // }

  // learn for use scroll to top

  // const renderScore = () => {
  //   return (
  //     <div id='appraisal-score' className='flex gap-[8px] text-gray-900 relative items-center'>
  //       <div className='flex gap-2 items-center'>
  //         <span className='text-sm font-[600] text-nowrap'>{t('common.seftRating')}:</span>
  //         <span className='text-[20px] font-[400]'>
  //           <b>{employeeScore || '_'}</b>/{totalScore}
  //         </span>
  //       </div>
  //       <div className='h-[28px] w-[3px] bg-gray-200 rounded-lg' />
  //       <div className='flex gap-2 items-center'>
  //         <span className='text-sm font-[600] text-nowrap'>{t('common.managerRating')}:</span>
  //         <span className='text-[20px] font-[400]'>
  //           <b>{managerScore || '_'}</b>/{totalScore}
  //         </span>
  //       </div>
  //     </div>
  //   )
  // }

  const renderHeader = () => {
    return (
      <div className='h-full border-b flex items-center bg-white min-h-[56px]'>
        <div className='flex items-center gap-2 ml-4'>
          {parentUrl && (
            <IconButton
              onClick={() => {
                navigate(parentUrl)
              }}
            >
              <BackIcon className='cursor-pointer flex items-center justify-center' />
            </IconButton>
          )}

          <Typography variants='title' className='text-gray-900 typography-title-md'>
            {t(`${pageTitle}`)}
          </Typography>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (matches && matches.length) {
      const matchesClone = cloneDeep(matches)
      const lastMatch = matchesClone.pop()

      if (lastMatch && lastMatch.handle) {
        setPageTitle(get(lastMatch.handle, 'title', ''))
        setParentUrl(get(lastMatch.handle, 'parent', null))
      }

      if (lastMatch && lastMatch.pathname === '/review/manage') {
        setPageTitle('360° Review')
      }
    }
  }, [matches])

  useEffect(() => {
    if (titleTemplateAppraisal) {
      setPageTitle(titleTemplateAppraisal)
    }

    return () => {}
  }, [titleTemplateAppraisal])

  const handleScroll = (e) => {
    // Logic to execute on scroll

    if (e.target.scrollTop > 120) {
      const element = document.getElementById('appraisal-score')

      if (element) {
        if (e.target.scrollTop < 200) {
          element.style.transform = `translateY(${e.target.scrollTop - 200}px)`
          element.style.opacity = `${(e.target.scrollTop - 150) / 150 - 0.1}`
        } else {
          element.style.transform = `translateY(0px)`
          element.style.opacity = `1`
        }
      }

      setShouldShow(true)
    } else {
      setShouldShow(false)
    }
  }

  useEffect(() => {
    if (!titleTemplateAppraisal) return
    // Get the target element by ID
    const targetElement = document.getElementById('performance-appraisal-detail')

    // Check if the element exists
    if (targetElement) {
      // Add the scroll event listener to the target element
      window.addEventListener('scroll', handleScroll, true)
      targetElement.addEventListener('scroll', () => {}, true)
    }

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll, true)
      setShouldShow(false)
    }
  }, [titleTemplateAppraisal])

  return renderHeader()
}

export default PageHeader
