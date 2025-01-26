import classnames from 'classnames'
import { IconButton } from 'components/IconButton'
import { has } from 'lodash'
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ArrowLeftIcon from '~/shared/icons/ArrowLeftIcon'
import ArrowRightIcon from '~/shared/icons/ArrowRightIcon'

export interface TabItem {
  key: string
  name: string
  component: React.ReactNode
  isVisible?: () => boolean
  permissions?: number[]
  isNotPadding?: boolean
  isHaveOnboardingTask?: boolean
}

interface TabBarProps {
  tabs: TabItem[]
  tabActive: string
  onClick: (key: string) => void
  className?: string
  tabClass?: string
  arrow?: boolean
}

interface TabItemProps {
  tab: TabItem
  isActive: (key: string) => boolean
  onClick: (key: string) => void
}

function easeInOutSin(time) {
  return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2
}

export default function animate(property, element, to, options = {}, cb = (_: any) => {}) {
  const {
    ease = easeInOutSin,
    duration = 300 // standard
  } = options as any

  let start = null
  const from = element[property]
  let cancelled = false

  const cancel = () => {
    cancelled = true
  }

  const step = (timestamp) => {
    if (cancelled) {
      return
    }

    if (start === null) {
      start = timestamp
    }
    const time = Math.min(1, (timestamp - start) / duration)

    element[property] = ease(time) * (to - from) + from

    if (time >= 1) {
      requestAnimationFrame(() => {
        cb(null)
      })
      return
    }

    requestAnimationFrame(step)
  }

  if (from === to) {
    return cancel
  }

  requestAnimationFrame(step)
  return cancel
}

const TabItem = forwardRef<HTMLDivElement, TabItemProps>(({ tab, isActive, onClick }, ref) => {
  return (
    <div ref={ref} key={tab.key} className='flex-initial w-fit' onClick={() => onClick(tab.key)}>
      <div
        className={classnames(
          'flex items-center justify-center px-1 py-3  select-none transition-color duration-300 cursor-pointer text-nowrap',
          {
            'relative text-primary-600 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:rounded-md after:bg-primary-600':
              isActive(tab.key),
            'text-gray-500 relative hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:h-0.5 hover:after:w-full hover:after:rounded-md hover:after:bg-gray-300':
              !isActive(tab.key)
          }
        )}
      >
        {tab.name}
      </div>
    </div>
  )
})

export const TabBar: React.FC<React.PropsWithChildren<TabBarProps>> = ({
  tabs,
  tabActive,
  onClick,
  className,
  tabClass,
  arrow
}) => {
  const isActive = (key: string) => key === tabActive

  const filteredTabs = useMemo(() => tabs.filter((t) => (has(t, 'isVisible') ? t.isVisible() : true)), [tabs])

  const [mount, setMount] = useState(false)

  const firstItemRef = useRef<HTMLDivElement>(null)
  const lastItemRef = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState({ firstItem: true, lastItem: true })

  const intersectingHandler = useCallback(
    (key: string, value: boolean) => {
      setIsIntersecting((prev) => ({ ...prev, [key]: value }))
    },
    [isIntersecting]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (p) => {
        const [entry] = p
        if (firstItemRef.current === null || lastItemRef.current === null) return
        const key = entry.target === firstItemRef.current ? 'firstItem' : 'lastItem'
        intersectingHandler(key, entry.isIntersecting)
      },
      {
        threshold: 1
      }
    )

    const observeElements = () => {
      if (firstItemRef.current) {
        observer.observe(firstItemRef.current)
      }
      if (lastItemRef.current) {
        observer.observe(lastItemRef.current)
      }
    }

    const unobserveElements = () => {
      if (firstItemRef.current) {
        observer.unobserve(firstItemRef.current)
      }
      if (lastItemRef.current) {
        observer.unobserve(lastItemRef.current)
      }
    }

    observeElements()

    return () => {
      unobserveElements()
    }
  }, [firstItemRef, lastItemRef, mount])

  const containerRef = useRef<HTMLDivElement>(null)

  const getScrollSize = () => {
    const containerSize = containerRef.current['clientWidth']
    let totalSize = 0
    const children = Array.from(containerRef.current.children)

    for (let i = 0; i < children.length; i += 1) {
      const tab = children[i]
      if (totalSize + tab['clientWidth'] > containerSize) {
        // If the first item is longer than the container size, then only scroll
        // by the container size.
        if (i === 0) {
          totalSize = containerSize
        }
        break
      }
      totalSize += tab['clientWidth']
    }

    return totalSize
  }

  const handleStartScrollClick = () => {
    moveTabsScroll(-1 * getScrollSize())
  }

  const handleEndScrollClick = () => {
    moveTabsScroll(getScrollSize())
  }

  const moveTabsScroll = (delta) => {
    let scrollValue = containerRef.current['scrollLeft']

    scrollValue += delta * 1
    scroll(scrollValue)
  }

  const scroll = (scrollValue) => {
    animate('scrollLeft', containerRef.current, scrollValue, {
      duration: 300
    })
  }

  useEffect(() => {
    if (!containerRef.current) return
    const childrenWidth = Array.from(containerRef.current.children).reduce(
      (acc, child) => acc + child['clientWidth'],
      0
    )

    if (containerRef.current['clientWidth'] < childrenWidth) {
      setIsIntersecting({ firstItem: true, lastItem: false })
    }
  }, [containerRef, mount])

  useEffect(() => {
    setMount(true)
  }, [])

  return (
    <div className={classnames('border-b border-b-gray-200 flex items-center relative', className)}>
      {!isIntersecting.firstItem && arrow && (
        <div
          className='h-full absolute left-2 flex items-center w-36 bg-white z-10'
          style={{
            background: 'linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 54.96%)'
          }}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <IconButton
            className='w-8 h-8 mr-auto'
            onClick={() => {
              setIsIntersecting({ firstItem: true, lastItem: false })
              handleStartScrollClick()
            }}
          >
            <ArrowLeftIcon />
          </IconButton>
        </div>
      )}
      <div
        ref={containerRef}
        className={classnames(
          '-mb-px flex items-center gap-4 typography-body-md font-semibold overflow-x-auto',
          tabClass,
          {
            'no-scrollbar': arrow
          }
        )}
      >
        {mount &&
          filteredTabs.map((tab, index) => {
            const isFirst = index === 0
            const isLast = index === filteredTabs.length - 1
            const ref = isFirst ? firstItemRef : isLast ? lastItemRef : null
            return <TabItem key={tab.key} tab={tab} isActive={isActive} onClick={onClick} ref={ref} />
          })}
      </div>

      {!isIntersecting.lastItem && arrow && (
        <div
          className='absolute right-2 flex items-center w-36'
          style={{
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 54.96%)'
          }}
        >
          <IconButton
            className='w-8 h-8 ml-auto'
            onClick={() => {
              setIsIntersecting({ firstItem: false, lastItem: true })
              handleEndScrollClick()
            }}
          >
            <ArrowRightIcon />
          </IconButton>
        </div>
      )}
    </div>
  )
}
