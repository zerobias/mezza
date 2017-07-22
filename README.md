# Mezza 🎯

An object switch-case. Selects the appropriate case from the object with variants. Core part of [mezzanine][mezzanine]

```bash
npm install --save mezza
```

[![NPM version][npm-image]][npm-url]
[![Unix Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

## Usage

```javascript
import choose from 'mezza'

function findUsers(username) {
  /* Some function that returns a list of users */
}

const cases = {
  Some: value => Array.isArray(value) && value.length > 1,
  One : value => Array.isArray(value) && value.length === 1,
  None: value => Array.isArray(value) && value.length === 0
}

const actions = {
  Some: list => 'Find ' + list.length + ' users',
  One : list => 'Find one user: ' + list[0],
  None: () => 'Nothing found',
  _   : () => 'Oops, something going wrong!' //Optional default case
}



function printUsers(username) {
  const found = findUsers(username)
  const resultText = choose(cases, actions, found)
  return resultText
}

```

Method is curried by default

```javascript
const printText = choose(cases, actions)

printText(['username']) // => Found one user: username
printText({}) // => 'Oops, something going wrong!'

```

Try this example in browser

[![Edit Mezza example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/PEQDng3y)

## License

The project is released under the [Mit License](./LICENSE)

[mezzanine]: https://github.com/zerobias/mezzanine

[npm-url]: https://npmjs.org/package/mezza
[npm-image]: https://img.shields.io/npm/v/mezza.svg?style=flat-square

[travis-url]: https://travis-ci.org/zerobias/mezza
[travis-image]: https://img.shields.io/travis/zerobias/mezza.svg?style=flat-square&label=unix

[appveyor-url]: https://ci.appveyor.com/project/zerobias/mezza
[appveyor-image]: https://img.shields.io/appveyor/ci/zerobias/mezza.svg?style=flat-square&label=windows

[coveralls-url]: https://coveralls.io/r/zerobias/mezza
[coveralls-image]: https://img.shields.io/coveralls/zerobias/mezza.svg?style=flat-square

[depstat-url]: https://david-dm.org/zerobias/mezza
[depstat-image]: https://david-dm.org/zerobias/mezza.svg?style=flat-square
