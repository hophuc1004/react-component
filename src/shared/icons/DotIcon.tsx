import { IconProps } from './props'

export const DotIcon = ({ width = 24, height = 24, className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox='0 0 3 4'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='1.5' cy='2' r='1.5' fill='#27272A' />
    </svg>
  )
}

export default DotIcon
