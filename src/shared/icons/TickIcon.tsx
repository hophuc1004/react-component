import { IconProps } from './props'

export const TickIcon = ({ width = 8, height = 6, className }: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 8 6'
      className={className}
      width={width}
      height={height}
      fill='none'
    >
      <path d='M1 3L2.99765 5L7 1' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}
