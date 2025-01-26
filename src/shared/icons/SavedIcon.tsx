import { IconProps } from './props'

export const SavedIcon = ({ width = 24, height = 24, className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='24' height='24' rx='12' fill='#346EC1' />
      <mask id='mask0_2978_33031' maskUnits='userSpaceOnUse' x='2' y='2' width='20' height='20'>
        <rect x='2' y='2' width='20' height='20' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_2978_33031)'>
        <path
          d='M10.0912 17C9.98756 17 9.8904 16.9812 9.79972 16.9436C9.70904 16.9066 9.62484 16.8434 9.54711 16.7539L6.20481 12.906C6.06231 12.742 5.99417 12.5293 6.00039 12.268C6.00713 12.0073 6.08174 11.7949 6.22425 11.6309C6.36675 11.4668 6.54811 11.3848 6.76834 11.3848C6.98857 11.3848 7.16993 11.4668 7.31243 11.6309L10.0912 14.83L16.6786 7.24609C16.8211 7.08203 17.0059 7 17.2328 7C17.4593 7 17.6437 7.08203 17.7862 7.24609C17.9288 7.41014 18 7.62252 18 7.88322C18 8.14452 17.9288 8.3572 17.7862 8.52125L10.6353 16.7539C10.5576 16.8434 10.4734 16.9066 10.3827 16.9436C10.292 16.9812 10.1948 17 10.0912 17Z'
          fill='white'
        />
      </g>
    </svg>
  )
}

export default SavedIcon
