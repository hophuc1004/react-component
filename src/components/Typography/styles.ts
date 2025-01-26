import { VariantProps, tv } from 'tailwind-variants'

export const typography = tv({
  base: 'font-sans no-underline text-common',
  variants: {
    variants: {
      display: 'typography-display-sm',
      heading: null,
      title: null,
      label: null,
      body: null,
      button: 'typography-button',
      link: 'typography-link',
      caption: 'typography-caption'
    },
    size: {
      small: '',
      medium: '',
      large: ''
    }
  },
  compoundVariants: [
    {
      variants: 'heading',
      size: 'small',
      className: 'typography-heading-sm'
    },
    {
      variants: 'heading',
      size: 'medium',
      className: 'typography-heading-md'
    },
    {
      variants: 'heading',
      size: 'large',
      className: 'typography-heading-lg'
    },
    {
      variants: 'title',
      size: 'small',
      className: 'typography-title-sm'
    },
    {
      variants: 'title',
      size: 'medium',
      className: 'typography-title-md'
    },
    {
      variants: 'title',
      size: 'large',
      className: 'typography-title-lg'
    },
    {
      variants: 'label',
      size: 'small',
      className: 'typography-label-sm'
    },
    {
      variants: 'label',
      size: 'medium',
      className: 'typography-label-md'
    },
    {
      variants: 'label',
      size: 'large',
      className: 'typography-label-lg'
    },
    {
      variants: 'body',
      size: 'small',
      className: 'typography-body-sm'
    },
    {
      variants: 'body',
      size: 'medium',
      className: 'typography-body-md'
    },
    {
      variants: 'body',
      size: 'large',
      className: 'typography-body-lg'
    }
  ],
  defaultVariants: {
    variants: 'body',
    size: 'medium'
  }
})

export type TypographyVariants = VariantProps<typeof typography>
