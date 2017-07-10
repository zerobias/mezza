//@flow

interface Curry2<A, B, +R> {
  (a: A, b: B): R,
  (a: A): (b: B) => R,
}

interface Curry3<A, B, C, +R> {
  (a: A, b: B, c: C): R,
  (a: A, b: B): (c: C) => R,
  (a: A): (b: B, c: C) => R,
  (a: A): (b: B) => (c: C) => R,
}

export function curry(fn: Function) {
  return _curry(fn, fn.length)
}

function _curry(fn: Function, arity: number) {
  switch (arity) {
    case 0:
    case 1: return fn
    //$FlowIssue No annotation for function arguments yet
    case 2: return curry2(fn)
    //$FlowIssue No annotation for function arguments yet
    case 3: return curry3(fn)
    default: return fn
  }
}

function curry2<A, B, R>(fn: (a: A, b: B) => R): Curry2<A, B, R> {
  function curried(a: A, b) {
    return _curry2(fn, a, b)
  }
  rename(fn, curried)
  return curried
}

function curry3<A, B, C, R>(fn: (a: A, b: B, c: C) => R): Curry3<A, B, C, R> {
  function curried(a, b, c): Curry3<A, B, C, R> {
    return _curry3(fn, a, b, c)
  }
  rename(fn, curried)
  return curried
}

function _curry2<A, B, R>(fn: (a: A, b: B) => R, a: A, b?: B): (R | ((b: B) => R)) {
  if (b !== undefined)
    return fn(a, b)
  return fn2a(fn, a)
}

function _curry3<A, B, C, R>(fn: (a: A, b: B, c: C) => R, a: A, b?: B, c?: C) {
  if (c !== undefined && b !== undefined)
    return fn(a, b, c)
  if (b !== undefined)
    return fn3b(fn, a, b)
  return fn3a(fn, a)
}

function fn2a<A, B, R>(fn: (a: A, b: B) => R, a: A): (b: B) => R {
  return function(b: B): R { return fn(a, b) }
}

function fn3a(fn: Function, a: mixed) {
  return function(b: mixed, c: mixed) {
    if (c !== undefined)
      return fn(a, b, c)
    return fn3b(fn, a, b)
  }
}

function fn3b(fn: Function, a: mixed, b: mixed) {
  return function(c: mixed) { return fn(a, b, c) }
}

function rename(source: Function, target: Function) {
  setName(source.name, target)
}

function setName(name: string, target: Function) {
  Object.defineProperty(target, 'name', {
    enumerable: false,
    value     : name,
  })
}
