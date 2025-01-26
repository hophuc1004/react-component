import { IconProps } from './props'

export const MinusIcon = ({ width = 24, height = 24, className }: IconProps) => {
  return (
    <svg
      width={width}
      className={className}
      height={height}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.8337 10.625H4.16699C3.82199 10.625 3.54199 10.345 3.54199 10C3.54199 9.655 3.82199 9.375 4.16699 9.375H15.8337C16.1787 9.375 16.4587 9.655 16.4587 10C16.4587 10.345 16.1787 10.625 15.8337 10.625Z'
        fill='#202124'
      />
    </svg>
  )
}

export default MinusIcon
