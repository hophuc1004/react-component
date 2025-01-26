import { IconProps } from './props'

export const LoaderIcon = ({ width = 24, height = 24, className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM2.39881 12C2.39881 17.3026 6.69741 21.6012 12 21.6012C17.3026 21.6012 21.6012 17.3026 21.6012 12C21.6012 6.69741 17.3026 2.39881 12 2.39881C6.69741 2.39881 2.39881 6.69741 2.39881 12Z'
        fill='url(#paint0_angular_3650_1029)'
      />
      <circle cx='22.7996' cy='12' r='1.2' fill='#1F2937' />
      <defs>
        <radialGradient
          id='paint0_angular_3650_1029'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(12 12) scale(7.32)'
        >
          <stop stop-color='#1F2937' stop-opacity='0.01' />
          <stop offset='1' stop-color='#1F2937' />
        </radialGradient>
      </defs>
    </svg>
  )
}

export default LoaderIcon
