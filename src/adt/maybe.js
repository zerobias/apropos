//@flow

import Base from '../base'
import { type Maybe } from '../index.h'
import { failSafeStringify, addInterop } from '../util'

type MaybeSign = 'just' | 'nothing'

class MaybeBase extends Base { isomer: MaybeSign }

export type { Maybe }

class MaybeJust<T> extends MaybeBase implements Maybe<T> {
  value: T
  constructor(value: T): Maybe<T> {
    super()
    this.value = value
    /*:: return this */
  }

  map<Tʹ>(fn: (x: T) => Tʹ): Maybe<Tʹ> {
    return new MaybeJust(fn(this.value))
  }

  chain<Tʹ>(fn: (x: T) => Maybe<Tʹ>): Maybe<Tʹ> {
    return fn(this.value)
  }

  tap(fn: (x: T) => any): Maybe<T> {
    fn(this.value)
    return this
  }

  fold<O>(l: () => O, r: (x: T) => O): O {
    return r(this.value)
  }

  orElse(/*:: x: T */): T {
    return this.value
  }

  match<J, N>(transformer: {
    Just: (x: T) => J,
    Nothing: () => N,
  }): J | N {
    const { Just } = transformer
    return Just(this.value)
  }

  promise(): Promise<T> {
    return Promise.resolve(this.value)
  }

  equals(value: any): boolean {
    if (value instanceof MaybeJust) {
      return this.value === value.value
    }
    return this.value === value
  }

  alt<S>(/*:: maybe: Maybe<S> */): Maybe<T | S> {
    return /*:: addS( */ this /*:: ) */
  }
  both<S>(maybe: Maybe<S>): Maybe<[T, S]> {
    if (maybe instanceof MaybeJust) {
      return new MaybeJust([this.value, maybe.value])
    }
    declare var t: [T, S]
    return new MaybeNothing(/*:: t */)
  }
  and<S>(maybe: Maybe<S>): Maybe<S> {
    return maybe
  }

  isJust() {
    return true
  }
  isNothing() {
    return false
  }

  toString() {
    return 'Just( ' + failSafeStringify(this.value) + ' )'
  }
}

class MaybeNothing<T> extends MaybeBase implements Maybe<T> {
  constructor(/*:: value: T */): Maybe<T> {
    super()
    /*:: return this */
  }

  map<Tʹ>(/*:: fn: (x: T) => Tʹ */): Maybe<Tʹ> {
    return /*:: changeT( */ this /*:: ) */
  }

  chain<Tʹ>(/*:: fn: (x: T) => Maybe<Tʹ> */): Maybe<Tʹ> {
    return /*:: changeT( */ this /*:: ) */
  }

  tap(/*:: fn: (x: T) => any */): Maybe<T> {
    return this
  }

  fold<O>(l: () => O /*:: , r: (x: T) => O */): O {
    return l()
  }

  orElse(x: T): T {
    return x
  }

  match<J, N>(transformer: {
    Just: (x: T) => J,
    Nothing: () => N,
  }): J | N {
    const { Nothing } = transformer
    return Nothing()
  }

  promise(): Promise<T> {
    return Promise.reject()
  }

  equals(value: any): boolean {
    return value instanceof MaybeNothing
  }

  alt<S>(maybe: Maybe<S>): Maybe<T | S> {
    return /*:: addS( */ maybe /*:: ) */
  }
  both<S>(/*:: maybe: Maybe<S> */): Maybe<[T, S]> {
    declare var t: [T, S]
    return new MaybeNothing(/*:: t */)
  }
  and<S>(/*:: maybe: Maybe<S> */): Maybe<S> {
    declare var t: S
    return new MaybeNothing(/*:: t */)
  }

  isJust() {
    return false
  }
  isNothing() {
    return true
  }

  toString() {
    return 'Nothing()'
  }
}

Object.defineProperty(MaybeJust.prototype, 'isomer', {
  value     : 'just',
  enumerable: true,
  writable  : false,
})

Object.defineProperty(MaybeNothing.prototype, 'isomer', {
  value     : 'nothing',
  enumerable: true,
  writable  : false,
})

addInterop(MaybeJust, 'Maybe')
addInterop(MaybeNothing, 'Maybe')

export function Just<T>(value: T): Maybe<T> {
  return new MaybeJust(value)
}

export function of<T>(value: T): Maybe<T> {
  return new MaybeJust(value)
}

export function Nothing<+T>(): Maybe<T> {
  declare var t: T
  return new MaybeNothing(/*:: t */)
}

export function empty<+T>(): Maybe<T> {
  declare var t: T
  return new MaybeNothing(/*:: t */)
}

export function fromNullable<T>(value: ?T): Maybe<T> {
  declare var t: T
  if (value == null) return new MaybeNothing(/*:: t */)
  return new MaybeJust(value)
}

declare function toPair<T, +S>(maybe: Maybe<T>): Maybe<[T, S]>
declare function addS<T, +S>(maybe: Maybe<T>): Maybe<T | S>

declare function changeT<-T, +Tʹ>(maybe: Maybe<T>): Maybe<Tʹ>
