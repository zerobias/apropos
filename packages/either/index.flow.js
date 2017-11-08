//@flow

declare module '@apropos/either' {
  /**
   * Either `Left` or `Right`
   *
   * @class Either
   * @template L
   * @template R
   */
  declare export default class Either<L, R> {
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
    bichain<M, L2, S, R2>(
      l: (x: L) => Either<L2, R2>,
      r: (x: R) => Either<M, S>,
    ): Either<M | L2, S | R2>,

    cond(fn: (x: R) => boolean): boolean,
    chainCond<M, S>(
      cond: (x: R) => boolean,
      pass: (x: R) => S,
      fail: (x: R) => M,
    ): Either<L | M, S>,
    logic<M, S>(pred: {
      cond(x: R): boolean,
      pass(x: R): S,
      fail(x: R): M,
    }): Either<L | M, S>,

    alt<M, S>(e: Either<M, S>): Either<M, R | S>,
    or<M, S>(e: Either<M, S>): Either<M, R | S>,
    and<M, S>(e: Either<M, S>): Either<L | M, S>,
    ap<M, S>(e: Either<M, (x: R) => S>): Either<L | M, S>,

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
    static Right<RR>(value: RR): Either<mixed, RR>,
    /**
     * Create left-handed value.
     *
     * Right-handed type is inferred from usage
     *
     * @template L
     * @param {L} value
     * @returns {Either<L, mixed>}
     */
    static Left<LL>(value: LL): Either<LL, mixed>,
    /**
     * Create pure right-handed value
     *
     * Left-handed type is empty
     *
     * @template R
     * @param {R} value
     * @returns {Either<empty, R>}
     */
    static of<RR>(value: RR): Either<mixed, RR>,
    /**
     * Checks whether an object is an instance of `Either`
     *
     * @param {*} value
     * @returns {boolean}
     */
    static is(value: any): boolean,
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
  declare export function Right<R>(value: R): Either<mixed, R>

  /**
   * Create left-handed value.
   *
   * Right-handed type is inferred from usage
   *
   * @template L
   * @param {L} value
   * @returns {Either<L, mixed>}
   */
  declare export function Left<L>(value: L): Either<L, mixed>

  /**
   * Create pure right-handed value
   *
   * Left-handed type is empty
   *
   * @template R
   * @param {R} value
   * @returns {Either<empty, R>}
   */
  declare export function of<R>(value: R): Either<mixed, R>

  /**
   * Checks whether an object is an instance of `Either`
   *
   * @param {*} value
   * @returns {boolean}
   */
  declare export function is(value: any): boolean
}
