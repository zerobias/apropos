# Apropos

Fast strong typed 'Either' data structure for typescript and flow

```bash
$ npm install --save apropos
```

[![npm version][npm-image]][npm-url]
[![Build Status](https://travis-ci.org/zerobias/apropos.svg?branch=master)](https://travis-ci.org/zerobias/apropos)

## API

- [of](https://github.com/zerobias/apropos#of)
- [ofL](#ofL)
- [Right](https://github.com/zerobias/apropos#Right)
- [Left](https://github.com/zerobias/apropos#Left)
- [is](https://github.com/zerobias/apropos#is)
- [makeError](https://github.com/zerobias/apropos#makeError)

```javascript
//@flow

import defaultOf, {
  of,
  ofL,
  Right,
  Left,
  is,
  makeError,
  type Apropos,
  type MakeError,
} from 'apropos'
```

### of
```javascript
function of<R>(value: R): Apropos<void, R>
```

Create pure right-handed value, left-handed type is empty.
Exports by default

### ofL
```javascript
function ofL<L>(value: L): Apropos<L, void>
```

Create pure left-handed value, right-handed type is empty.

### Right
```javascript
function Right<-L, R>(value: R): Apropos<L, R>
```

Create right-handed value, left-handed type is inferred from usage.
Technically, `Right` returns the same as `of`; the difference is only in the type inference.

### Left
```javascript
function Left<L, -R>(value: L): Apropos<L, R>
```

Create left-handed value, right-handed type is inferred from usage

### is
```javascript
function is<-T>(value: T): boolean
```

Checks whether an object is an instance of `Apropos`

### makeError

```javascript
class AnnotatedError<Context, Tag> extends Error {
  tag: Tag
  data: Context
}

function makeError<-Tag>(tag: Tag): <Context>(data: Context) => AnnotatedError<Context, Tag>
```

Create fabric for generating tagged error constructors.
Useful in `.mapL`.

See [annotated errors](https://github.com/zerobias/apropos#annotated-errors)

## Instance methods

- isRight

- isLeft


- equals

- thru

- orElse

- swap

- promise

- fold


### Maps

- map

- mapR

- mapL

- bimap


### Taps

- tap

- tapR

- tapL

- bitap


### Chains

- chain

- chainR

- chainL

- bichain


### Conditions

- cond

- chainCond

- logic


### Combinations

- alt

- and

- ap


## Annotated errors

```typescript
import { of, makeError, MakeError, Left } from 'apropos'

const notNumber: MakeError<'Not a number'> = makeError('Not a number')
const isNegative: MakeError<'Negative number'> = makeError('Negative number')

const positiveNum =
  of(-2)
    .map(x => x + 1)
    .chain(x => typeof x === 'number'
      ? of(x)
      : Left(x))
    .mapL(notNumber)
    .logic({
      cond: x => x > 0,
      pass: x => 'Positive number: ' + x,
      fail: isNegative
    })

positiveNum.fold(x => console.log(x), x => console.error(x))

// => Annotated Error: 'Negative number' -1

```

The project is released under the [Mit License](./LICENSE)


[npm-url]: https://www.npmjs.org/package/apropos
[npm-image]: https://badge.fury.io/js/apropos.svg
