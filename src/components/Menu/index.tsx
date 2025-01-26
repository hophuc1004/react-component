import { useState, useRef, useEffect } from 'react'

interface MenuProps {
  trigger: React.ReactNode
  items: Array<{
    icon?: React.ReactNode
    label: string
    onClick: () => void
  }>
  placement?: 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start'
}

export const Menu: React.FC<MenuProps> = ({ trigger, items, placement = 'bottom-end' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='relative' ref={menuRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={`absolute ${
            placement === 'bottom-end' ? 'right-0' : 'left-0'
          } p-2 gap-2 w-[260px] bg-white rounded-lg shadow-lg z-50`}
        >
          {items.map((item, index) => (
            <button
              key={index}
              className='w-full p-2 gap-3 flex items-center hover:bg-gray-100 text-left rounded-lg'
              onClick={() => {
                item.onClick()
                setIsOpen(false)
              }}
            >
              {item.icon && <div className='w-5 h-5 flex items-center justify-center fill-gray-800'>{item.icon}</div>}
              <span className='text-gray-800 typography-body-md flex-1'>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
