import { CSSProperties } from 'react'

export interface IModifierConfig {
  css?: CSSProperties[] // Updated type to CSSProperties
}

export interface IModifier {
  [key: string]: IModifierConfig
}
