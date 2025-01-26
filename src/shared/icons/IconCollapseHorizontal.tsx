import { IconProps } from './props'

export const IconCollapseHorizontal = ({ width = 24, height = 24, className, bgHover, textHover }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox='0 0 34 34'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M17 0.5C7.8873 0.5 0.5 7.8873 0.5 17C0.5 26.1127 7.8873 33.5 17 33.5C26.1127 33.5 33.5 26.1127 33.5 17C33.5 7.8873 26.1127 0.5 17 0.5Z'
        stroke='#E4E4E7'
      />
      <rect x='1' y='1' width='32' height='32' rx='16' fill={bgHover} />
      <mask id='mask0_2994_90828' maskUnits='userSpaceOnUse' x='5' y='5' width='24' height='24'>
        <rect x='5' y='5' width='24' height='24' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_2994_90828)'>
        <path
          d='M18.3 22.3L13.7 17.7C13.6 17.6 13.5293 17.4917 13.488 17.375C13.446 17.2584 13.425 17.1334 13.425 17C13.425 16.8667 13.446 16.7417 13.488 16.625C13.5293 16.5084 13.6 16.4 13.7 16.3L18.3 11.7C18.4833 11.5167 18.7167 11.425 19 11.425C19.2833 11.425 19.5167 11.5167 19.7 11.7C19.8833 11.8834 19.975 12.1167 19.975 12.4C19.975 12.6834 19.8833 12.9167 19.7 13.1L15.8 17L19.7 20.9C19.8833 21.0834 19.975 21.3167 19.975 21.6C19.975 21.8834 19.8833 22.1167 19.7 22.3C19.5167 22.4834 19.2833 22.575 19 22.575C18.7167 22.575 18.4833 22.4834 18.3 22.3Z'
          fill={textHover}
        />
      </g>
    </svg>
  )
}

export default IconCollapseHorizontal
