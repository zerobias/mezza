//@flow

type Pred = (val: mixed) => boolean

function plainMatch<V, M: { [key: *]: V }, K: $Keys<M> | '_'>(
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
}

function match<T: { [key: string]: Pred }>(matchBy: T): (value: mixed) => $Keys<T> {
  return function matcher(value: mixed): $Keys<T> {
    return plainMatch(matchBy, value)
  }
}

export function remap<
    T: { [key: string]: Pred },
    V,
    M: { [key: $Keys<T>]: V }
  >(matchBy: T) {
  return function(mapper: M) {
    return function(value: mixed): V {
      return mapper[plainMatch(matchBy, value)]
    }
  }
}

export default match
