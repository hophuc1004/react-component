import { IconProps } from './props'

export const NewPlusIcon = ({ width = 24, height = 24, className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16.4587 9.99999C16.4587 10.345 16.1787 10.625 15.8337 10.625H10.6253V15.8333C10.6253 16.1783 10.3453 16.4583 10.0003 16.4583C9.65533 16.4583 9.37533 16.1783 9.37533 15.8333V10.625H4.16699C3.82199 10.625 3.54199 10.345 3.54199 9.99999C3.54199 9.65499 3.82199 9.37499 4.16699 9.37499H9.37533V4.16666C9.37533 3.82166 9.65533 3.54166 10.0003 3.54166C10.3453 3.54166 10.6253 3.82166 10.6253 4.16666V9.37499H15.8337C16.1787 9.37499 16.4587 9.65499 16.4587 9.99999Z'
        fill='#202124'
      />
    </svg>
  )
}

export default NewPlusIcon
