import { remap, match, choose } from '../src'
import { curry } from '../src/util'


test('Basic test', () => {
  expect(typeof match).toBe('function')
  const matchBy = {
    Just   : (val) => val != null,
    Nothing: (val) => val == null,
  }
  const matcher = match(matchBy)
  expect(typeof matcher).toBe('function')

  const caseName = matcher(null)
  expect(caseName).toBe('Nothing')
})


describe('default case', () => {
  const matchBy = {
    List : (val) => Array.isArray(val) && val.length > 0,
    Empty: (val) => Array.isArray(val) && val.length === 0,
  }

  test('default match', () => {
    const matcher = match(matchBy)

    expect(matcher([])).toBe('Empty')
    expect(matcher([true])).toBe('List')
    expect(matcher({})).toBe('_')
  })


  test('default remap', () => {
    const mapper = remap(matchBy)
    const mapWithDef = {
      List : 'l',
      Empty: 'e',
      _    : 'default',
    }

    const mapNoDef = {
      List : 'l',
      Empty: 'e',
    }


    expect(mapper(mapWithDef, {})).toBe('default')
    expect(mapper(mapNoDef, {})).not.toBeDefined()
  })
})


test('remap', () => {
  const matcher = {
    List : (val) => Array.isArray(val) && val.length > 0,
    Empty: (val) => Array.isArray(val) && val.length === 0,
  }
  const mapper = {
    List : 'list',
    Empty: 'empty',
  }
  const stage1 = remap(matcher)
  expect(typeof stage1).toBe('function')
  const stage2 = stage1(mapper)
  expect(typeof stage2).toBe('function')

  const result1 = stage2([])
  const result2 = stage2([true])

  expect(result1).toBe('empty')
  expect(result2).toBe('list')
})

test('choose', () => {
  const matcher = {
    List : (val) => Array.isArray(val) && val.length > 0,
    Empty: (val) => Array.isArray(val) && val.length === 0,
  }
  const mapper = {
    List : (value) => `length ${value.length}`,
    Empty: () => 'empty',
  }
  const stage1 = choose(matcher)
  expect(typeof stage1).toBe('function')
  const stage2 = stage1(mapper)
  expect(typeof stage2).toBe('function')

  const result1 = stage2([])
  const result2 = stage2([true])

  expect(result1).toBe('empty')
  expect(result2).toBe('length 1')
})

test('curried matching', () => {
  const matcher = {
    List : (val) => Array.isArray(val) && val.length > 0,
    Empty: (val) => Array.isArray(val) && val.length === 0,
  }
  const mapper = {
    List : 'list',
    Empty: 'empty',
  }

  expect(
    match(matcher, [])
  ).toBe('Empty')

  expect(
    remap(matcher, mapper)([])
  ).toBe('empty')
  expect(
    remap(matcher)(mapper)([])
  ).toBe('empty')
  expect(
    remap(matcher)(mapper, [])
  ).toBe('empty')
  expect(
    remap(matcher, mapper, [])
  ).toBe('empty')
})


test('curry itself', () => {
  const mark = Symbol('mark')

  //eslint-disable-next-line
  function fnFour(a, b, c, d) {
    return mark
  }
  function fnZero() {
    return mark
  }


  expect(curry(fnFour)).toBe(fnFour)
  expect(curry(fnZero)).toBe(fnZero)
})

