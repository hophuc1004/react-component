import { VariantProps, tv } from 'tailwind-variants'

export const card = tv({
  base: 'p-4 rounded-md shadown',
  defaultVariants: {
    size: 'medium'
  },
  variants: {
    size: {
      small: '',
      medium: '',
      large: ''
    }
  }
})

type CardVariants = VariantProps<typeof card>

interface CardProps extends CardVariants {
  children: React.ReactNode
}

export const Card: React.FC<React.PropsWithChildren<CardProps>> = (props: CardProps) => {
  return <div className={card(props)}>{props.children}</div>
}
