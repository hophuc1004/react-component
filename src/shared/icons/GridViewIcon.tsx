import { IconProps } from './props'
interface propViewIcon extends IconProps {
  isActive: boolean
  isHover?: boolean
}
export function GridViewIcon({ width = 24, height = 24, className, isActive }: propViewIcon) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={width} height={height} className={className}>
      <g stroke={`${isActive ? '#21467B' : '#1F2937'}`} fill='none' strokeWidth='2'>
        <rect x='6' y='6' width='4' height='4' rx='1' />
        <rect x='14' y='6' width='4' height='4' rx='1' />
        <rect x='6' y='14' width='4' height='4' rx='1' />
        <rect x='14' y='14' width='4' height='4' rx='1' />
      </g>
    </svg>
  )
}
