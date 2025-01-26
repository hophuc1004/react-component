import { castArray, merge } from 'lodash'
import parser, { Pseudo } from 'postcss-selector-parser'
const parseSelector = parser()

const round = (num: number) => {
  return num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
}

export const rem = (px: number) => `${round(px / 16)}rem`
export const em = (px: number, base: number) => `${round(px / base)}em`
export const hexToRgb = (hex: string) => {
  hex = hex.replace('#', '')
  hex = hex.length === 3 ? hex.replace(/./g, '$&$&') : hex
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `${r} ${g} ${b}`
}

export const commonTrailingPseudos = (selector) => {
  const ast = parseSelector.astSync(selector)

  const matrix: Pseudo[][] = []

  // Put the pseudo elements in reverse order in a sparse, column-major 2D array
  for (const [i, sel] of ast.nodes.entries()) {
    for (const [j, child] of [...sel.nodes].reverse().entries()) {
      // We only care about pseudo elements
      if (child.type !== 'pseudo' || !child.value.startsWith('::')) {
        break
      }

      matrix[j] = matrix[j] || []
      matrix[j][i] = child
    }
  }

  const trailingPseudos = parser.selector({ value: '' })

  // At this point the pseudo elements are in a column-major 2D array
  // This means each row contains one "column" of pseudo elements from each selector
  // We can compare all the pseudo elements in a row to see if they are the same
  for (const pseudos of matrix) {
    // It's a sparse 2D array so there are going to be holes in the rows
    // We skip those
    if (!pseudos) {
      continue
    }

    const values = new Set([...pseudos.map((p) => p.value)])

    // The pseudo elements are not the same
    if (values.size > 1) {
      break
    }

    pseudos.forEach((pseudo) => pseudo.remove())
    trailingPseudos.prepend(pseudos[0])
  }

  if (trailingPseudos.nodes.length) {
    return [trailingPseudos.toString(), ast.toString()]
  }

  return [null, selector]
}

export function inWhere(selector: string, { className, modifier }: { className: string; modifier?: string }) {
  const prefixedNot = '.not-${className}'
  const selectorPrefix = selector.startsWith('>')
    ? `${modifier === 'DEFAULT' ? `.${className}` : `.${className}-${modifier}`} `
    : ''

  // Parse the selector, if every component ends in the same pseudo element(s) then move it to the end
  const [trailingPseudo, rebuiltSelector] = commonTrailingPseudos(selector)

  if (trailingPseudo) {
    return `:where(${selectorPrefix}${rebuiltSelector}):not(:where([class~="${prefixedNot}"],[class~="${prefixedNot}"] *))${trailingPseudo}`
  }

  return `:where(${selectorPrefix}${selector}):not(:where([class~="${prefixedNot}"],[class~="${prefixedNot}"] *))`
}

function isObject<T>(value: T) {
  return typeof value === 'object' && value !== null
}

export const configToCss = (config: { css?: never } = {}, { target, className, modifier }) => {
  function updateSelector(key: string, value: never) {
    if (target === 'legacy') {
      return [key, value]
    }

    if (Array.isArray(value)) {
      return [key, value]
    }

    if (isObject(value)) {
      const nested = Object.values(value).some(isObject)
      if (nested) {
        return [
          inWhere(key, { className, modifier }),
          key,
          Object.fromEntries(Object.entries(value).map(([mKey, mValue]) => updateSelector(mKey, mValue as never)))
        ]
      }

      return [inWhere(key, { className, modifier }), value]
    }

    return [key, value]
  }

  const computed = {}

  return Object.fromEntries(
    Object.entries(
      merge(
        {},
        ...Object.keys(config)
          .filter((key) => computed[key])
          .map((key) => computed[key](config[key])),
        ...castArray(config.css || {})
      )
    ).map(([k, v]) => updateSelector(k, v as never))
  )
}
