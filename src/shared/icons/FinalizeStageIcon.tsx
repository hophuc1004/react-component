import { IconProps } from './props'

export const FinalizeStageIcon = ({ width = 24, height = 24, className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <mask id='mask0_7804_14574' maskUnits='userSpaceOnUse' x='0' y='0' width='24' height='24'>
        <rect width='24' height='24' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_7804_14574)'>
        <circle cx='12' cy='12' r='10' fill='#3DABB8' />
        <path
          d='M10.5984 13.8L8.42344 11.625C8.2401 11.4417 8.0111 11.3543 7.73644 11.363C7.4611 11.371 7.23177 11.4667 7.04844 11.65C6.8651 11.8333 6.77344 12.0667 6.77344 12.35C6.77344 12.6333 6.8651 12.8667 7.04844 13.05L9.89844 15.9C10.0818 16.0833 10.3151 16.175 10.5984 16.175C10.8818 16.175 11.1151 16.0833 11.2984 15.9L16.9734 10.225C17.1568 10.0417 17.2444 9.81233 17.2364 9.537C17.2278 9.26233 17.1318 9.03333 16.9484 8.85C16.7651 8.66666 16.5318 8.575 16.2484 8.575C15.9651 8.575 15.7318 8.66666 15.5484 8.85L10.5984 13.8Z'
          fill='white'
        />
      </g>
    </svg>
  )
}

export default FinalizeStageIcon
