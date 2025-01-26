import plugin from 'tailwindcss/plugin'
import { configToCss } from '../utils'
import { defaultModifiers } from './styles'

const typographyPlugin = plugin.withOptions(
  (
    { className, target }: { className: string; target: string } = {
      className: 'typography',
      target: 'modern'
    }
  ) => {
    return function ({ theme, addComponents }) {
      const modifiers = theme('typography_') as Record<string, never>

      // const selectors = ['display', 'heading', 'title']

      // // for (let selectors of ['display', 'heading', 'title']) {
      // for (const name of selectors) {
      //   const selector = target === 'legacy' ? selectors.map((selector) => `& ${selector}`) : selectors.join(', ')

      //   addVariant(
      //     `${className}-${name}`,
      //     target === 'legacy' ? selector : `& :is(${inWhere(selector as string, options)})`
      //   )
      // }
      addComponents(
        Object.keys(modifiers).map((modifier) => ({
          [modifier === 'DEFAULT' ? `.${className}` : `.${className}-${modifier}`]: configToCss(modifiers[modifier], {
            target,
            className,
            modifier
          })
        }))
      )
    }
  },
  () => {
    return {
      theme: {
        typography_: defaultModifiers
      }
    }
  }
)

export default typographyPlugin
