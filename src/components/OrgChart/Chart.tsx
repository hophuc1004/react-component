import { Button } from 'components/Button'
import { debounce } from 'lodash'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TransformWrapper, TransformComponent, useControls } from 'react-zoom-pan-pinch'
import { NewPlusIcon } from '~/shared/icons'
import DownloadIcon from '~/shared/icons/DownloadIcon'
import MinusIcon from '~/shared/icons/MinusIcon'

const Controls = () => {
  const { zoomIn, zoomOut } = useControls()

  const [scale, setScale] = useState(0.4) // Default zoom at 40%

  const handleZoomIn = debounce(() => {
    const pre = scale
    setScale((prevScale) => Math.min(prevScale + 0.1, 1.2)) // Increment by 10%, max 120%

    if (+pre.toFixed(1) < 1.2) {
      return zoomIn(0.2)
    }
  }, 200)

  const handleZoomOut = debounce(() => {
    const pre = scale

    setScale((prevScale) => Math.max(prevScale - 0.1, 0.3)) // Decrement by 10%, min 30%

    if (+pre.toFixed(1) > 0.3) {
      return zoomOut(0.2)
    }
  }, 200)

  return (
    <div className='flex w-full justify-center px-4 absolute bottom-6'>
      <div
        className='tools bg-[#E0EEFF] rounded-[90px]  px-4 flex justify-between gap-[8px] items-center min-w-[152px]'
        style={{
          boxShadow: '0px 2px 2px -8px #0000000A'
        }}
      >
        <div
          className={`w-[32px] h-[32px] text-[34px] flex justify-center items-center ${+scale.toFixed(1) === 0.3 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => handleZoomOut()}
        >
          <MinusIcon width={20} className='mr-1' height={20} />
        </div>
        <div className='text-[16px] font-[400] leading-[0px] min-w-[40px] flex justify-center'>
          {(scale * 100)?.toFixed(0)}%
        </div>
        <div
          className={`!w-[32px] !h-[32px] flex justify-center items-center ${+scale.toFixed(1) === 1.2 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => handleZoomIn()}
        >
          <NewPlusIcon width={20} className='mr-1' height={20} />
        </div>
      </div>
    </div>
  )
}

const Example = () => {
  const { t } = useTranslation()
  const handleDownload = () => {
    const imageURL = '/org.png' // Your image path
    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'org-chart.png' // Set the name for the downloaded file
    link.click()
  }

  return (
    <TransformWrapper
      initialScale={1}
      wheel={{
        disabled: true
      }}
      centerZoomedOut
      centerOnInit
      minScale={0.3}
      pinch={{ disabled: true }}
    >
      {() => (
        <div className='w-full h-full relative'>
          <TransformComponent wrapperStyle={{ height: '100%' }} contentStyle={{ willChange: 'transform' }}>
            <img src='/org.png' alt='test' />
          </TransformComponent>
          <Controls />

          <div className='flex w-full justify-end absolute top-2 right-4'>
            <Button
              onClick={handleDownload}
              leadingIcon={<DownloadIcon width={24} className='mr-1' height={24} />}
              style='filled'
            >
              {t('download')}
            </Button>
          </div>
        </div>
      )}
    </TransformWrapper>
  )
}

export default Example
