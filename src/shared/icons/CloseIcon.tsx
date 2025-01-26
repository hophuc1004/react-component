import { IconProps } from './props'

export const CloseIcon = ({ width = 24, height = 24, className }: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width={width}
      height={height}
      viewBox='0 -960 960 960'
      fill='inherit'
    >
      <path
        d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default CloseIcon
