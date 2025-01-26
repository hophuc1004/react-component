import { tv, type VariantProps } from 'tailwind-variants'

export const text = tv({
  base: 'font-sans no-underline',
  variants: {
    display: {
      small: 'tracking-normal font-bold text-[64px] leading-[80px]'
    },
    heading: {
      large: 'tracking-normal font-bold text-[52px] leading-[64px]',
      medium: 'tracking-normal font-bold text-[52px] leading-[64px]',
      small: 'tracking-normal font-bold text-[32px] leading-[44px]'
    },
    title: {
      large: 'tracking-normal font-bold text-[28px] leading-[36px]',
      medium: 'tracking-normal font-bold text-[24px] leading-[32px]',
      small: 'tracking-normal font-bold text-[20px] leading-[28px]'
    },
    label: {
      large: 'tracking-[0.15px] font-bold text-[16px] leading-[24px]',
      medium: 'tracking-[0.10px] font-bold text-[14px] leading-[20px]',
      small: 'tracking-[0.20px] font-bold text-[12px] leading-[16px]'
    },
    body: {
      large: 'tracking-[0.10px] font-normal text-[18px] leading-[24px]',
      medium: 'tracking-[0.10px] font-normal text-[16px] leading-[24px]',
      small: 'tracking-[0.15px] font-normal text-[14px] leading-[20px]'
    }
  },
  defaultVariants: {
    display: 'small'
  }
})

type TextVariants = VariantProps<typeof text>

interface TextProps extends TextVariants {
  children: React.ReactNode
}

export const Text = (props: TextProps) => {
  return <button className={text(props)}>{props.children}</button>
}
