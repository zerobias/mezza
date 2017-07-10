//@flow

import { curry } from './util'

type Pred = (val: mixed) => boolean

interface Match {
  <V, M: { [key: *]: V }, K: $Keys<M> | '_'>(
    matchBy: $ObjMap<M, (val: V) => Pred>,
    value: mixed
  ): $Keys<M>,
  <V, M: { [key: *]: V }, K: $Keys<M> | '_'>(
    matchBy: $ObjMap<M, (val: V) => Pred>):
    (value: mixed) => $Keys<M>
}

interface Remap {
  < T: { [key: string]: Pred },
    V,
    M: { [key: $Keys<T>]: V }
  >(matchBy: T, mapper: M, value: mixed): V,
  < T: { [key: string]: Pred },
    V,
    M: { [key: $Keys<T>]: V }
  >(matchBy: T, mapper: M): (value: mixed) => V,
  < T: { [key: string]: Pred },
    V,
    M: { [key: $Keys<T>]: V }
  >(matchBy: T): (mapper: M, value: mixed) => V,
  < T: { [key: string]: Pred },
    V,
    M: { [key: $Keys<T>]: V }
  >(matchBy: T): (mapper: M) => (value: mixed) => V,
}

const match: Match = curry(function match<V, M: { [key: *]: V }, K: $Keys<M> | '_'>(
  matchBy: $ObjMap<M, (val: V) => Pred>,
  value: mixed
): $Keys<M> {
  //$FlowIssue
  const keys: Array<K> = Object.keys(matchBy)
  let key,
      pred: Pred,
      singleTest: boolean
  for (let i = 0, ln = keys.length; i < ln; ++i) {
    key = keys[i]
    pred = matchBy[key]
    singleTest = pred(value)
    if (singleTest === true)
      return key
  }
  return '_'
})

export const remap: Remap = curry(function remap<
  T: { [key: string]: Pred },
  V,
  M: { [key: $Keys<T>]: V }
>(matchBy: T, mapper: M, value: mixed): V {
  return mapper[match(matchBy, value)]
})

export const choose: Remap = curry(function choose<
  T: { [key: string]: Pred },
  V,
  //eslint-disable-next-line
  M: { [key: $Keys<T>]: (val: mixed) => V }
>(matchBy: T, mapper: M, value: mixed): V {
  return mapper[match(matchBy, value)](value)
})

export default match
