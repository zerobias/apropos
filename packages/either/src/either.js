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

import { type Either } from './index.h'


const sign = classSignature({
  meta: {
    name:  'Either',
    scope: 'apropos',
  },
})

@sanctuaryType`Either`
@fantasyType
@sign
export default class EitherBase extends Base<'Either'> implements TypedClass<'Either'> {
  signature: Signature<'Either'>
  /**
   * Create right-handed value.
   *
   * Left-handed type is inferred from usage
   *
   * @template R
   * @param {R} value
   * @returns {Either<mixed, R>}
   */
  static Right<R>(value: R): Either<mixed, R> {
    return new EitherRight(value)
  }
  /**
   * Create left-handed value.
   *
   * Right-handed type is inferred from usage
   *
   * @template L
   * @param {L} value
   * @returns {Either<L, mixed>}
   */
  static Left<L>(value: L): Either<L, mixed> {
    return new EitherLeft(value)
  }
  /**
   * Create pure right-handed value
   *
   * Left-handed type is empty
   *
   * @template R
   * @param {R} value
   * @returns {Either<empty, R>}
   */
  static of<R>(value: R): Either<empty, R> {
    return new EitherRight(value)
  }

  /**
   * Checks whether an object is an instance of `Either`
   *
   * @param {*} value
   * @returns {boolean}
   */
  static is/*::: $Pred<1>*/ = is
}


class EitherRight<L, R> extends EitherBase implements Either<L, R> {
  value: R
  constructor(value: R): Either<L, R> {
    super()
    this.value = value
    /*:: return this */
  }
  isRight(): boolean { return true }
  isLeft(): boolean { return false }

  orElse(/*::value: R*/): R {
    return this.value
  }

  promise(): Promise<R> {
    return Promise.resolve(this.value)
  }

  fold<O>(l: (x: L) => O, r: (x: R) => O): O {
    return r(this.value)
  }

  swap(): Either<R, L> {
    return new EitherLeft(this.value)
  }

  equals(value: any): boolean {
    if (value instanceof EitherBase) {
      if (value instanceof EitherRight) {
        return value.value === this.value
      } else
        return false
    } else
      return value === this.value
  }



  // --- Tap section ---

  tap(fn: (x: R) => any): Either<L, R> {
    return this.tapR(fn)
  }
  tapR(fn: (x: R) => any): Either<L, R> {
    fn(this.value)
    return this
  }
  tapL(/*:: fn: (x: L) => any */): Either<L, R> {
    return this
  }
  bitap(l: (x: L) => any, r: (x: R) => any): Either<L, R> {
    return this.tapR(r)
  }



  // --- Map section ---

  map<R1>(fn: (x: R) => R1): Either<L, R1> {
    return this.mapR(fn)
  }
  mapR<R1>(fn: (x: R) => R1): Either<L, R1> {
    return new EitherRight(fn(this.value))
  }
  mapL<L1>(/*:: fn: (x: L) => L1 */): Either<L1, R> {
    return /*:: changeL( */this /*::) */
  }
  bimap<L1, R1>(l: (x: L) => L1, r: (x: R) => R1): Either<L1, R1> {
    return /*:: changeL( */this.mapR(r) /*::) */
  }



  // --- Chain section ---

  chain<L1, R1>(fn: (x: R) => Either<L1, R1>): Either<L | L1, R1> {
    return this.chainR(fn)
  }
  chainR<L1, R1>(fn: (x: R) => Either<L1, R1>): Either<L | L1, R1> {
    return /*:: concatL(*/fn(this.value)/*::) */
  }
  chainL<L1, R1>(/*:: fn: (x: L) => Either<L1, R1> */): Either<L1, any> {
    return /*:: changeL(*/this/*::) */
  }
  bichain<L1, L2, R1, R2>(
    l: (x: L) => Either<L2, R2>,
    r: (x: R) => Either<L1, R1>
  ): Either<L1 | L2, R1 | R2> {
    return /*:: concatR(concatL(*/r(this.value)/*::)) */
  }



  // --- Cond section ---

  cond(fn: (x: R) => boolean): boolean {
    return fn(this.value)
  }

  chainCond<L1, R1>(
    cond: (x: R) => boolean,
    pass: (x: R) => R1,
    fail: (x: R) => L1
  ): Either<L | L1, R1> {
    if (this.cond(cond))
      return /*:: concatL( */this.mapR(pass) /*::) */
    else
      return /*:: changeR( */new EitherLeft(fail(this.value))/*::) */
  }

  logic<L1, R1>(transformer: {
    cond(x: R): boolean,
    pass(x: R): R1,
    fail(x: R): L1
  }): Either<L | L1, R1> {
    const { cond, pass, fail } = transformer
    return this.chainCond(cond, pass, fail)
  }



  // --- Combine section ---

  alt<L1, R1>(/*::e: Either<L1, R1>*/): Either<L1, any> {
    return /*:: changeL( */this /*::) */
  }

  or<L1, R1>(/*::e: Either<L1, R1>*/): Either<L1, any> {
    return /*:: changeL( */this /*::) */
  }

  and<L1, R1>(e: Either<L1, R1>): Either<L | L1, R1> {
    return /*:: concatL(*/e/*::) */
  }

  thru<L1, R1>(fn: (x: Either<L, R>) => Either<L1, R1>): Either<L1, R1> {
    return fn(this)
  }

  ap<L1, R1>(e: Either<L1, ((x: R) => R1)>): Either<L | L1, R1> {
    if (e.isRight())
      return /*:: concatL(*/e/*::) */.mapR(fn => fn(this.value))
    return /*:: changeR(concatL( */e /*::)) */
  }


  toString() {
    return 'Right( ' + stringify(this.value) + ' )'
  }
}

class EitherLeft<L, R> extends EitherBase implements Either<L, R> {
  value: L
  constructor(value: L): Either<L, R> {
    super()
    this.value = value
    /*:: return this */
  }
  isRight(): boolean { return false }
  isLeft(): boolean { return true }

  orElse(value: R): R {
    return value
  }

  promise(): Promise<R> {
    return Promise.reject(this.value)
  }

  fold<O>(l: (x: L) => O/*::, r: (x: R) => O*/): O {
    return l(this.value)
  }

  swap(): Either<R, L> {
    return new EitherRight(this.value)
  }

  equals(value: any): boolean {
    if (value instanceof EitherBase) {
      if (value instanceof EitherLeft) {
        return value.value === this.value
      } else
        return false
    } else
      return value === this.value
  }



  // --- Tap section ---

  tap(fn: (x: R) => any): Either<L, R> {
    return this.tapR(fn)
  }
  tapR(/*:: fn: (x: R) => any*/): Either<L, R> {
    return this
  }
  tapL(fn: (x: L) => any): Either<L, R> {
    fn(this.value)
    return this
  }
  bitap(l: (x: L) => any, /*::r: (x: R) => any*/): Either<L, R> {
    return this.tapL(l)
  }



  // --- Map section ---

  map<R1>(/*:: fn: (x: R) => R1*/): Either<L, R1> {
    return /*:: changeR( */this /*::) */
  }
  mapR<R1>(/*:: fn: (x: R) => R1*/): Either<L, R1> {
    return /*:: changeR( */this /*::) */
  }
  mapL<L1>(fn: (x: L) => L1): Either<L1, R> {
    return new EitherLeft(fn(this.value))
  }
  bimap<L1, R1>(l: (x: L) => L1/*::, r: (x: R) => R1*/): Either<L1, R1> {
    return /*:: changeR( */this.mapL(l) /*::) */
  }



  // --- Chain section ---

  chain<L1, R1>(fn: (x: R) => Either<L1, R1>): Either<L | L1, R1> {
    return this.chainR(fn)
  }
  chainR<L1, R1>(/*:: fn: (x: R) => Either<L1, R1>*/): Either<any, R1> {
    return /*:: changeR(*/this/*::) */
  }
  chainL<L1, R1>(fn: (x: L) => Either<L1, R1>): Either<L1, R | R1> {
    return /*:: concatR(*/fn(this.value)/*::) */
  }
  bichain<L1, L2, R1, R2>(
    l: (x: L) => Either<L2, R2>
    /*::, r: (x: R) => Either<L1, R1>*/
  ): Either<L1 | L2, R1 | R2> {
    return /*:: concatR(concatL(*/l(this.value)/*::)) */
  }



  // --- Cond section ---

  cond(/*:: fn: (x: R) => boolean*/): boolean {
    return false
  }

  chainCond<L1, R1>(/*::
    cond: (x: R) => boolean,
    pass: (x: R) => R1,
    fail: (x: R) => L1*/
  ): Either<any, R1> {
    return /*:: changeR(*/this/*::) */
  }

  logic<L1, R1>(/*::transformer: {
    cond(x: R): boolean,
    pass(x: R): R1,
    fail(x: R): L1
  }*/): Either<any, R1> {
    return /*:: changeR(*/this/*::) */
  }



  // --- Combine section ---

  alt<L1, R1>(e: Either<L1, R1>): Either<L1, R | R1> {
    return  /*:: concatR(*/e/*::) */
  }

  or<L1, R1>(e: Either<L1, R1>): Either<L1, R | R1> {
    return this.alt(e)
  }

  and<L1, R1>(/*:: e: Either<L1, R1>*/): Either<any, R1> {
    return /*:: changeR( */this /*::) */
  }

  thru<L1, R1>(fn: (x: Either<L, R>) => Either<L1, R1>): Either<L1, R1> {
    return fn(this)
  }

  ap<L1, R1>(/*:: e: Either<L1, ((x: R) => R1)>*/): Either<any, R1> {
    return /*:: changeR( */this /*::) */
  }

  toString() {
    return 'Left( ' + stringify(this.value) + ' )'
  }
}

/**
 * Create right-handed value.
 *
 * Left-handed type is inferred from usage
 *
 * @template R
 * @template L
 * @param {R} value
 * @returns {Either<L, R>}
 */
export function Right<R>(value: R): Either<mixed, R> {
  return new EitherRight(value)
}

/**
 * Create left-handed value.
 *
 * Right-handed type is inferred from usage
 *
 * @template L
 * @param {L} value
 * @returns {Either<L, mixed>}
 */
export function Left<L>(value: L): Either<L, mixed> {
  return new EitherLeft(value)
}

/**
 * Create pure right-handed value
 *
 * Left-handed type is empty
 *
 * @template R
 * @param {R} value
 * @returns {Either<empty, R>}
 */
export function of<R>(value: R): Either<empty, R> {
  return new EitherRight(value)
}

/**
 * Checks whether an object is an instance of `Either`
 *
 * @param {*} value
 * @returns {boolean}
 */
export function is(value: mixed): boolean %checks {
  return value instanceof EitherBase
}

declare function changeL<L, L1, R>(r: Either<L, R>): Either<L1, R>

declare function concatL<L, L1, R>(r: Either<L, R>): Either<L | L1, R>

declare function changeR<L, R, R1>(r: Either<L, R>): Either<L, R1>

declare function concatR<L, R, +R1>(r: Either<L, R>): Either<L, R | R1>


