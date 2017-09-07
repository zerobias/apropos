//@flow

/*::
type IsomerSign = 'left' | 'right'
export opaque type LeftIsomer: IsomerSign = 'left'
export opaque type RightIsomer: IsomerSign = 'right'
*/
export const leftIsomer: LeftIsomer = 'left'
export const rightIsomer: RightIsomer = 'right'

/**
 * Either `Left` or `Right`
 *
 * @interface Apropos
 * @template L
 * @template R
 */
export interface Apropos<L, R> {
  map<R1>(fn: (x: R) => R1): Apropos<L, R1>,
  mapR<R1>(fn: (x: R) => R1): Apropos<L, R1>,
  mapL<L1>(fn: (x: L) => L1): Apropos<L1, R>,
  bimap<L1, R1>(l: (x: L) => L1, r: (x: R) => R1): Apropos<L1, R1>,


  tap(fn: (x: R) => any): Apropos<L, R>,
  tapR(fn: (x: R) => any): Apropos<L, R>,
  tapL(fn: (x: L) => any): Apropos<L, R>,
  bitap(l: (x: L) => any, r: (x: R) => any): Apropos<L, R>,


  chain<L1, R1>(fn: (x: R) => Apropos<L1, R1>): Apropos<L | L1, R1>,
  chainR<L1, R1>(fn: (x: R) => Apropos<L1, R1>): Apropos<L | L1, R1>,
  chainL<L1, R1>(fn: (x: L) => Apropos<L1, R1>): Apropos<L1, R | R1>,
  bichain<L1, L2, R1, R2>(
    l: (x: L) => Apropos<L2, R2>,
    r: (x: R) => Apropos<L1, R1>
  ): Apropos<L1 | L2, R1 | R2>,


  cond(fn: (x: R) => boolean): boolean,
  chainCond<L1, R1>(
    cond: (x: R) => boolean,
    pass: (x: R) => R1,
    fail: (x: R) => L1
  ): Apropos<L | L1, R1>,
  logic<L1, R1>({
    cond: (x: R) => boolean,
    pass: (x: R) => R1,
    fail: (x: R) => L1
  }): Apropos<L | L1, R1>,


  alt<L1, R1>(e: Apropos<L1, R1>): Apropos<L1, R | R1>,
  or<L1, R1>(e: Apropos<L1, R1>): Apropos<L1, R | R1>,
  and<L1, R1>(e: Apropos<L1, R1>): Apropos<L | L1, R1>,
  ap<L1, R1>(e: Apropos<L1, ((x: R) => R1)>): Apropos<L | L1, R1>,


  thru<L1, R1>(fn: (x: Apropos<L, R>) => Apropos<L1, R1>): Apropos<L1, R1>,
  orElse(value: R): R,
  swap(): Apropos<R, L>,

  /**
   * Converts Either to Promise, which resolves with right value or rejects with left
   *
   * @returns {Promise<R>}
   */
  promise(): Promise<R>,
  fold<O>(l: (x: L) => O, r: (x: R) => O): O,


  isRight(): boolean,
  isLeft(): boolean,

  equals(value: any): boolean,
}

export interface Maybe<T> {
  map<Tʹ>(fn: (x: T) => Tʹ): Maybe<Tʹ>,
  chain<Tʹ>(fn: (x: T) => Maybe<Tʹ>): Maybe<Tʹ>,
  tap(fn: (x: T) => any): Maybe<T>,
  fold<O>(l: () => O, r: (x: T) => O): O,
  orElse(x: T): T,

  alt<S>(maybe: Maybe<S>): Maybe<T | S>,
  both<S>(maybe: Maybe<S>): Maybe<[T, S]>,
  and<S>(maybe: Maybe<S>): Maybe<S>,

  match<J, N>({
    Just: (x: T) => J,
    Nothing: () => N,
  }): J | N,

  promise(): Promise<T>,
  equals(value: any): boolean,
  isJust(): boolean,
  isNothing(): boolean,
}
