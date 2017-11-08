//@flow

import {
  Base,
  stringify,
  classSignature,
  fantasyType,
  sanctuaryType,
  type TypedClass,
  type Signature,
} from '@apropos/core'

import { type Maybe } from './index.h'


const sign = classSignature({
  meta: {
    name:  'Maybe',
    scope: 'apropos',
  },
})

@sanctuaryType`Maybe`
@fantasyType
@sign
/*#__PURE__*/export default class MaybeBase extends Base<'Maybe'> implements TypedClass<'Maybe'> {
  signature: Signature<'Maybe'>
  static of<T>(value: T): Maybe<T> {
    return new MaybeJust(value)
  }
  static Just<T>(value: T): Maybe<T> {
    return new MaybeJust(value)
  }
  static Nothing<T>(): Maybe<T> {
    declare var t: T
    return new MaybeNothing(/*:: t */)
  }
  static empty(): Maybe<empty> {
    declare var t: empty
    return new MaybeNothing(/*:: t */)
  }
  static validate<T>(validators: $ReadOnlyArray<((x: T) => boolean)>) {
    return (x: T): Maybe<T> => validators.reduce((acc, fn) => acc.pred(fn), new MaybeJust(x))
  }
  static fromNullable<T>(value: T | null | void): Maybe<T> {
    declare var t: T
    if (value == null) return new MaybeNothing(/*:: t */)
    return new MaybeJust(value)
  }
}


/*#__PURE__*/class MaybeJust<T> extends MaybeBase implements Maybe<T> {
  value: T
  constructor(value: T): Maybe<T> {
    super()
    this.value = value
    /*:: return this */
  }

  ap<S>(maybe: Maybe<((x: T) => S)>): Maybe<S> {
    const run = (fn: ((x: T) => S)) => new MaybeJust(fn(this.value))
    return maybe.chain(run)
  }

  map<S>(fn: (x: T) => S): Maybe<S> {
    return new MaybeJust(fn(this.value))
  }

  chain<S>(fn: (x: T) => Maybe<S>): Maybe<S> {
    return fn(this.value)
  }

  tap(fn: (x: T) => any): Maybe<T> {
    fn(this.value)
    return this
  }

  fold<O>(l: () => O, r: (x: T) => O): O {
    return r(this.value)
  }

  orElse(): T {
    return this.value
  }

  chainCond<S>(
    cond: (x: T) => boolean,
    pass: (x: T) => S
  ): Maybe<S> {
    if (cond(this.value))
      return new MaybeJust(pass(this.value))
    declare var t: S
    return new MaybeNothing(/*:: t */)
  }

  logic<S>(transformer: {
    cond(x: T): boolean,
    pass(x: T): S,
  }): Maybe<S> {
    const { cond, pass } = transformer
    return this.chainCond(cond, pass)
  }

  pred(check: (x: T) => boolean): Maybe<T> {
    if (check(this.value))
      return this
    declare var t: T
    return new MaybeNothing(/*:: t */)
  }

  match<J, N>(transformer: {
    Just(x: T): J,
    Nothing(): N,
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

  alt<S>(/*:: maybe: Maybe<S> */): Maybe<any> {
    return this
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
    return 'Just( ' + stringify(this.value) + ' )'
  }
}

/*#__PURE__*/class MaybeNothing<T> extends MaybeBase implements Maybe<T> {
  constructor(/*:: value: T */): Maybe<T> {
    super()
    /*:: return this */
  }

  ap<S>(/*:: maybe: Maybe<((x: T) => S)> */): Maybe<S> {
    return /*:: changeT( */ this /*:: ) */
  }

  map<S>(/*:: fn: (x: T) => S */): Maybe<S> {
    return /*:: changeT( */ this /*:: ) */
  }

  chain<S>(/*:: fn: (x: T) => Maybe<S> */): Maybe<S> {
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

  chainCond<S>(/*::
    cond: (x: T) => boolean,
    pass: (x: T) => S
  */): Maybe<S> {
    declare var t: S
    return new MaybeNothing(/*:: t */)
  }

  logic<S>(transformer: {
    cond(x: T): boolean,
    pass(x: T): S
  }): Maybe<S> {
    const { cond, pass } = transformer
    return this.chainCond(cond, pass)
  }

  pred(/*:: check: (x: T) => boolean */): Maybe<T> {
    return this
  }

  match<J, N>(transformer: {
    Just(x: T): J,
    Nothing(): N,
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


export function Just<T>(value: T): Maybe<T> {
  return new MaybeJust(value)
}

export function of<T>(value: T): Maybe<T> {
  return new MaybeJust(value)
}

export function Nothing<T>(): Maybe<T> {
  declare var t: T
  return new MaybeNothing(/*:: t */)
}

export function empty(): Maybe<any> {
  declare var t: any
  return new MaybeNothing(/*:: t */)
}

export function validate<T>(validators: $ReadOnlyArray<((x: T) => boolean)>) {
  return (x: T): Maybe<T> => validators.reduce((acc, fn) => acc.pred(fn), new MaybeJust(x))
}

export function fromNullable<T>(value: T | null | void): Maybe<T> {
  declare var t: T
  if (value == null) return new MaybeNothing(/*:: t */)
  return new MaybeJust(value)
}

declare function toPair<T, S>(maybe: Maybe<T>): Maybe<[T, S]>
declare function addS<T, S>(maybe: Maybe<T>): Maybe<T | S>

declare function changeT<T, S>(maybe: Maybe<T>): Maybe<S>

