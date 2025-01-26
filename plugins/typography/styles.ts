import { IModifier } from '../types/modifiers'
import { rem } from '../utils'
export const defaultModifiers: IModifier = {
  'display-sm': {
    css: [{ fontSize: rem(64), lineHeight: rem(80), fontWeight: 'bold', letterSpacing: '0px' }]
  },
  'heading-lg': {
    css: [{ fontSize: rem(52), lineHeight: rem(64), fontWeight: 700, letterSpacing: '0px' }]
  },
  'heading-md': {
    css: [{ fontSize: rem(44), lineHeight: rem(56), fontWeight: 700, letterSpacing: '0px' }]
  },
  'heading-sm': {
    css: [{ fontSize: rem(32), lineHeight: rem(44), fontWeight: 700, letterSpacing: '0px' }]
  },
  'title-lg': {
    css: [{ fontSize: rem(28), lineHeight: rem(36), fontWeight: 700, letterSpacing: '0px' }]
  },
  'title-md': {
    css: [{ fontSize: rem(24), lineHeight: rem(32), fontWeight: 700, letterSpacing: '0px' }]
  },
  'title-sm': {
    css: [{ fontSize: rem(20), lineHeight: rem(28), fontWeight: 700, letterSpacing: '0px' }]
  },

  'label-lg': {
    css: [{ fontSize: rem(16), lineHeight: rem(24), fontWeight: 600, letterSpacing: rem(0.15) }]
  },
  'label-md': {
    css: [{ fontSize: rem(14), lineHeight: rem(20), fontWeight: 600, letterSpacing: rem(0.1) }]
  },
  'label-sm': {
    css: [{ fontSize: rem(12), lineHeight: rem(16), fontWeight: 600, letterSpacing: rem(0.2) }]
  },

  'body-lg': {
    css: [{ fontSize: rem(18), lineHeight: rem(24), fontWeight: 400, letterSpacing: rem(0.1) }]
  },
  'body-md': {
    css: [{ fontSize: rem(16), lineHeight: rem(24), fontWeight: 400, letterSpacing: rem(0.1) }]
  },
  'body-sm': {
    css: [{ fontSize: rem(14), lineHeight: rem(20), fontWeight: 400, letterSpacing: rem(0.15) }]
  },

  'button-lg': {
    css: [{ fontSize: rem(16), lineHeight: rem(24), fontWeight: 500, letterSpacing: rem(0.15) }]
  },

  button: {
    css: [{ fontSize: rem(14), lineHeight: rem(20), fontWeight: 500, letterSpacing: rem(0.15) }]
  },
  link: {
    css: [{ fontSize: rem(14), lineHeight: rem(20), fontWeight: 500, letterSpacing: rem(0.15) }]
  },
  caption: {
    css: [{ fontSize: rem(11), lineHeight: rem(16), fontWeight: 400, letterSpacing: rem(0.6) }]
  }
}
