import mezza from '../src'



test('Basic test', () => {
  expect(typeof mezza).toBe('function')
  const matchBy = {
    Just   : (val) => val != null,
    Nothing: (val) => val == null,
  }
  const matcher = mezza(matchBy)
  expect(typeof matcher).toBe('function')

  const caseName = matcher(null)
  expect(caseName).toBe('Nothing')
})


test('default case', () => {
  const matcher = mezza({
    List : (val) => Array.isArray(val) && val.length > 0,
    Empty: (val) => Array.isArray(val) && val.length === 0,
  })

  expect(matcher([])).toBe('Empty')
  expect(matcher([true])).toBe('List')
  expect(matcher({})).toBe('_')
})

