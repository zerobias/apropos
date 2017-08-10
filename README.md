# Apropos

Fast strong typed 'Either' data structure for typescript and flow

```
npm -S apropos
```


## API

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


### Other

- thru

- orElse

- swap

- promise

- fold


- isRight

- isLeft


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
