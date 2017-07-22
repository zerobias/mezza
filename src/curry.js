//@flow

import { curry } from './util'
import {
  match as matchFn,
  remap as remapFn,
  choose as chooseFn,
} from './match'

export const match = curry(matchFn)
export const remap = curry(remapFn)
export const choose = curry(chooseFn)
