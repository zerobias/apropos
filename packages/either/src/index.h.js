//@flow

/**
 * Either `Left` or `Right`
 *
 * @interface Either
 * @template L
 * @template R
 */
export interface Either<L, R> {
  map<S>(fn: (x: R) => S): Either<L, S>,
  mapR<S>(fn: (x: R) => S): Either<L, S>,
  mapL<M>(fn: (x: L) => M): Either<M, R>,
  bimap<M, S>(l: (x: L) => M, r: (x: R) => S): Either<M, S>,


  tap(fn: (x: R) => any): Either<L, R>,
  tapR(fn: (x: R) => any): Either<L, R>,
  tapL(fn: (x: L) => any): Either<L, R>,
  bitap(l: (x: L) => any, r: (x: R) => any): Either<L, R>,


  chain<M, S>(fn: (x: R) => Either<M, S>): Either<L | M, S>,
  chainR<M, S>(fn: (x: R) => Either<M, S>): Either<L | M, S>,
  chainL<M, S>(fn: (x: L) => Either<M, S>): Either<M, R | S>,
  bichain<M, M1, S, S1>(
    l: (x: L) => Either<M1, S1>,
    r: (x: R) => Either<M, S>
  ): Either<M | M1, S | S1>,


  cond(fn: (x: R) => boolean): boolean,
  chainCond<M, S>(
    cond: (x: R) => boolean,
    pass: (x: R) => S,
    fail: (x: R) => M
  ): Either<L | M, S>,
  logic<M, S>(pred: {
    cond(x: R): boolean,
    pass(x: R): S,
    fail(x: R): M
  }): Either<L | M, S>,


  alt<M, S>(e: Either<M, S>): Either<M, R | S>,
  or<M, S>(e: Either<M, S>): Either<M, R | S>,
  and<M, S>(e: Either<M, S>): Either<L | M, S>,
  ap<M, S>(e: Either<M, ((x: R) => S)>): Either<L | M, S>,


  thru<M, S>(fn: (x: Either<L, R>) => Either<M, S>): Either<M, S>,
  orElse(value: R): R,
  swap(): Either<R, L>,

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

