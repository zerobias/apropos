//@flow

import Isomer, { makeRight, makeLeft } from './base'
import { type Apropos } from './index.h'



export class EitherRight<R, L> extends Isomer implements Apropos<R, L> {
  value: R
  constructor(value: R): Apropos<R, L> {
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

  fold<O>(r: (x: R) => O/*:: , l: (x: L) => O*/): O {
    return r(this.value)
  }

  swap(): Apropos<L, R> {
    return new EitherLeft(this.value)
  }



  // --- Tap section ---

  tap(fn: (x: R) => any): Apropos<R, L> {
    return this.tapR(fn)
  }
  tapR(fn: (x: R) => any): Apropos<R, L> {
    fn(this.value)
    return this
  }
  tapL(/*:: fn: (x: L) => any */): Apropos<R, L> {
    return this
  }
  bitap(r: (x: R) => any/*:: , l: (x: L) => any */): Apropos<R, L> {
    return this.tapR(r)
  }



  // --- Map section ---

  map<R1>(fn: (x: R) => R1): Apropos<R1, L> {
    return this.mapR(fn)
  }
  mapR<R1>(fn: (x: R) => R1): Apropos<R1, L> {
    return new EitherRight(fn(this.value))
  }
  mapL<L1>(/*:: fn: (x: L) => L1 */): Apropos<R, L1> {
    return /*:: changeL( */this /*::) */
  }
  bimap<R1, L1>(r: (x: R) => R1/*:: , l: (x: L) => L1 */): Apropos<R1, L1> {
    return /*:: changeL( */this.mapR(r) /*::) */
  }



  // --- Chain section ---

  chain<R1, L1>(fn: (x: R) => Apropos<R1, L1>): Apropos<R1, L | L1> {
    return this.chainR(fn)
  }
  chainR<R1, L1>(fn: (x: R) => Apropos<R1, L1>): Apropos<R1, L | L1> {
    return /*:: concatL(*/fn(this.value)/*::) */
  }
  chainL<R1, L1>(/*:: fn: (x: L) => Apropos<R1, L1> */): Apropos<R | R1, L1> {
    return /*:: changeL(concatR(*/this/*::)) */
  }
  bichain<R1, R2, L1, L2>(
    r: (x: R) => Apropos<R1, L1>
    /*::, l: (x: L) => Apropos<R2, L2> */
  ): Apropos<R1 | R2, L1 | L2> {
    return /*:: concatR(concatL(*/r(this.value)/*::)) */
  }



  // --- Cond section ---

  cond(fn: (x: R) => boolean): boolean {
    return fn(this.value)
  }

  chainCond<R1, L1>(
    cond: (x: R) => boolean,
    pass: (x: R) => R1,
    fail: (x: R) => L1
  ): Apropos<R1, L | L1> {
    if (this.cond(cond))
      return /*:: concatL( */this.mapR(pass) /*::) */
    else
      return /*:: changeR( */new EitherLeft(fail(this.value))/*::) */
  }

  logic<R1, L1>({
    cond, pass, fail
  }: {
    cond: (x: R) => boolean,
    pass: (x: R) => R1,
    fail: (x: R) => L1
  }): Apropos<R1, L | L1> {
    return this.chainCond(cond, pass, fail)
  }



  // --- Combine section ---

  alt<R1, L1>(/*::e: Apropos<R1, L1>*/): Apropos<R | R1, L1> {
    return /*:: concatR(changeL( */this /*::)) */
  }

  and<R1, L1>(e: Apropos<R1, L1>): Apropos<R1, L | L1> {
    return /*:: concatL(*/e/*::) */
  }

  thru<R1, L1>(fn: (x: Apropos<R, L>) => Apropos<R1, L1>): Apropos<R1, L1> {
    return fn(this)
  }

  ap<R1, L1>(e: Apropos<((x: R) => R1), L1>): Apropos<R1, L | L1> {
    if (e.isRight())
      return /*:: concatL(*/e/*::) */.mapR(fn => fn(this.value))
    return /*:: changeR(concatL( */e /*::)) */
  }



  toString() {
    return 'Right( ' + failSafeStringify(this.value) + ' )'
  }

  inspect() {
    return this.toString()
  }
}

export class EitherLeft<R, L> extends Isomer implements Apropos<R, L> {
  value: L
  constructor(value: L): Apropos<R, L> {
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

  fold<O>(r: (x: R) => O, l: (x: L) => O): O {
    return l(this.value)
  }

  swap(): Apropos<L, R> {
    return new EitherRight(this.value)
  }



  // --- Tap section ---

  tap(fn: (x: R) => any): Apropos<R, L> {
    return this.tapR(fn)
  }
  tapR(/*:: fn: (x: R) => any*/): Apropos<R, L> {
    return this
  }
  tapL(fn: (x: L) => any): Apropos<R, L> {
    fn(this.value)
    return this
  }
  bitap(r: (x: R) => any, l: (x: L) => any): Apropos<R, L> {
    return this.tapL(l)
  }



  // --- Map section ---

  map<R1>(/*:: fn: (x: R) => R1*/): Apropos<R1, L> {
    return /*:: changeR( */this /*::) */
  }
  mapR<R1>(/*:: fn: (x: R) => R1*/): Apropos<R1, L> {
    return /*:: changeR( */this /*::) */
  }
  mapL<L1>(fn: (x: L) => L1): Apropos<R, L1> {
    return new EitherLeft(fn(this.value))
  }
  bimap<R1, L1>(r: (x: R) => R1, l: (x: L) => L1): Apropos<R1, L1> {
    return /*:: changeR( */this.mapL(l) /*::) */
  }



  // --- Chain section ---

  chain<R1, L1>(fn: (x: R) => Apropos<R1, L1>): Apropos<R1, L | L1> {
    return this.chainR(fn)
  }
  chainR<R1, L1>(/*:: fn: (x: R) => Apropos<R1, L1>*/): Apropos<R1, L | L1> {
    return /*:: changeR(concatL(*/this/*::)) */
  }
  chainL<R1, L1>(fn: (x: L) => Apropos<R1, L1>): Apropos<R | R1, L1> {
    return /*:: concatR(*/fn(this.value)/*::) */
  }
  bichain<R1, R2, L1, L2>(
    r: (x: R) => Apropos<R1, L1>,
    l: (x: L) => Apropos<R2, L2>
  ): Apropos<R1 | R2, L1 | L2> {
    return /*:: concatR(concatL(*/l(this.value)/*::)) */
  }



  // --- Cond section ---

  cond(/*:: fn: (x: R) => boolean*/): boolean {
    return false
  }

  chainCond<R1, L1>(/*::
    cond: (x: R) => boolean,
    pass: (x: R) => R1,
    fail: (x: R) => L1*/
  ): Apropos<R1, L | L1> {
    return /*:: changeR(concatL(*/this/*::)) */
  }

  logic<R1, L1>(/*::{
    cond, pass, fail
  }: {
    cond: (x: R) => boolean,
    pass: (x: R) => R1,
    fail: (x: R) => L1
  }*/): Apropos<R1, L | L1> {
    return /*:: changeR(concatL(*/this/*::)) */
  }



  // --- Combine section ---

  alt<R1, L1>(e: Apropos<R1, L1>): Apropos<R | R1, L1> {
    return  /*:: concatR(*/e/*::) */
  }

  and<R1, L1>(/*:: e: Apropos<R1, L1>*/): Apropos<R1, L | L1> {
    return /*:: changeR(concatL( */this /*::)) */
  }

  thru<R1, L1>(fn: (x: Apropos<R, L>) => Apropos<R1, L1>): Apropos<R1, L1> {
    return fn(this)
  }

  ap<R1, L1>(/*:: e: Apropos<((x: R) => R1), L1>*/): Apropos<R1, L | L1> {
    return /*:: changeR(concatL( */this /*::)) */
  }



  toString() {
    return 'Left( ' + failSafeStringify(this.value) + ' )'
  }

  inspect() {
    return this.toString()
  }
}

makeRight(EitherRight)
makeLeft(EitherLeft)

function failSafeStringify(value: any) {
  try {
    return JSON.stringify(value)
  } catch (error) {
    return String(value)
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
 * @returns {Apropos<R, L>}
 */
export function Right<R, -L>(value: R): Apropos<R, L> {
  return new EitherRight(value)
}

/**
 * Create left-handed value.
 *
 * Right-handed type is inferred from usage
 *
 * @template R
 * @template L
 * @param {L} value
 * @returns {Apropos<R, L>}
 */
export function Left<-R, L>(value: L): Apropos<R, L> {
  return new EitherLeft(value)
}

/**
 * Create pure right-handed value
 *
 * Left-handed type is empty
 *
 * @template R
 * @param {R} value
 * @returns {Apropos<R, void>}
 */
export function of<R>(value: R): Apropos<R, void> {
  return new EitherRight(value)
}


/**
 * Checks whether an object is an instance of `Apropos`
 *
 * @template T
 * @param {T} value
 * @returns {boolean}
 */
export function is<-T>(value: T): boolean %checks {
  return value instanceof Isomer
}

declare function changeL<R, -L, +L1>(r: Apropos<R, L>): Apropos<R, L1>

declare function concatL<R, L, +L1>(r: Apropos<R, L>): Apropos<R, L | L1>

declare function changeR<-R, +R1, L>(r: Apropos<R, L>): Apropos<R1, L>

declare function concatR<R, +R1, L>(r: Apropos<R, L>): Apropos<R | R1, L>

