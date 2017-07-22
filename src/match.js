//@flow

type Pred = (val: mixed) => boolean

// interface Match {
//   <V, M: { [key: *]: V }, K: $Keys<M> | '_'>(
//     matchBy: $ObjMap<M, (val: V) => Pred>,
//     value: mixed
//   ): $Keys<M>,
//   <V, M: { [key: *]: V }, K: $Keys<M> | '_'>(
//     matchBy: $ObjMap<M, (val: V) => Pred>):
//     (value: mixed) => $Keys<M>
// }

// interface Remap {
//   < T: { [key: string]: Pred },
//     V,
//     M: { [key: $Keys<T>]: V }
//   >(matchBy: T, mapper: M, value: mixed): V,
//   < T: { [key: string]: Pred },
//     V,
//     M: { [key: $Keys<T>]: V }
//   >(matchBy: T, mapper: M): (value: mixed) => V,
//   < T: { [key: string]: Pred },
//     V,
//     M: { [key: $Keys<T>]: V }
//   >(matchBy: T): (mapper: M, value: mixed) => V,
//   < T: { [key: string]: Pred },
//     V,
//     M: { [key: $Keys<T>]: V }
//   >(matchBy: T): (mapper: M) => (value: mixed) => V,
// }

export function match<M: { [key: string]: Pred }, K: $Keys<M> | '_'>(
  matchBy: M,
  value: mixed
): $Keys<M> {
  //$FlowIssue
  const keys: Array<K> = Object.keys(matchBy)
  let key,
      pred: $Values<M>,
      singleTest: boolean
  for (let i = 0, ln = keys.length; i < ln; ++i) {
    key = keys[i]
    pred = matchBy[key]
    singleTest = pred(value)
    if (singleTest === true)
      return key
  }
  return '_'
}

export function remap<
  T: { [key: string]: Pred },
  V,
  //eslint-disable-next-line space-before-function-paren
  M: $ObjMap<T, (pred: Pred) => V>
>(matchBy: T, mapper: M, value: mixed): $Values<M> {
  return mapper[match(matchBy, value)]
}

export function choose<
  T: { [key: string]: Pred },
  //eslint-disable-next-line space-before-function-paren
  M: $ObjMap<T, (pred: Pred) => (<I, O>(val: I) => O)>
>(matchBy: T, mapper: M, value: any) {
  const mapped: $Values<M> = mapper[match(matchBy, value)]
  return mapped(value)
}

export default match
