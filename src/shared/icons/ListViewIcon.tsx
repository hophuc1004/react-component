import { IconProps } from './props'

interface propViewIcon extends IconProps {
  isActive?: boolean
  isHover?: boolean
}

export function ListViewIcon({ width = 24, height = 24, className, isActive = false }: propViewIcon) {
  return (
    <svg width={width} height={height} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className={className}>
      <g fill={`${isActive ? '#21467B' : ''}`}>
        <circle cx='6' cy='6' r='1.5' />
        <circle cx='6' cy='12' r='1.5' />
        <circle cx='6' cy='18' r='1.5' />
        <rect x='9' y='5' width='10' height='2' rx='1' />
        <rect x='9' y='11' width='10' height='2' rx='1' />
        <rect x='9' y='17' width='10' height='2' rx='1' />
      </g>
    </svg>
  )
}
