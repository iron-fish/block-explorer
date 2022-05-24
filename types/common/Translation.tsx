import { ReactNode } from 'react'

export type Translator = (string) => string | ReactNode

export interface Translated {
  t: Translator
}
