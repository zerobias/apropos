//@flow

declare module 'apropos' {
  declare export class Maybe<T> {
    map<S>(fn: (x: T) => S): Maybe<S>,
    chain<S>(fn: (x: T) => Maybe<S>): Maybe<S>,
    tap(fn: (x: T) => any): Maybe<T>,
    fold<O>(l: () => O, r: (x: T) => O): O,
    orElse(x: T): T,

    ap<S>(maybe: Maybe<((x: T) => S)>): Maybe<S>,

    alt<S>(maybe: Maybe<S>): Maybe<T | S>,
    both<S>(maybe: Maybe<S>): Maybe<[T, S]>,
    and<S>(maybe: Maybe<S>): Maybe<S>,

    match<J, N>(pred: {
      Just(x: T): J,
      Nothing(): N,
    }): J | N,

    chainCond<S>(cond: (x: T) => boolean, pass: (x: T) => S): Maybe<S>,
    logic<S>(pred: {
      cond(x: T): boolean,
      pass(x: T): S,
    }): Maybe<S>,
    pred(check: (x: T) => boolean): Maybe<T>,

    promise(): Promise<T>,
    equals(value: any): boolean,
    isJust(): boolean,
    isNothing(): boolean,
    static of<TT>(value: TT): Maybe<TT>,
    static Just<TT>(value: TT): Maybe<TT>,
    static Nothing<TT>(): Maybe<TT>,
    static fromNullable<TT>(value: TT | null | void): Maybe<TT>,
    static validate<TT>(
      validators: $ReadOnlyArray<((x: TT) => boolean)>
    ): ((x: TT) => Maybe<TT>),
  }

  /**
   * Either `Left` or `Right`
   *
   * @class Either
   * @template L
   * @template R
   */
  declare export class Either<L, R> {
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

  declare export class Tuple<A, C> {
    fst(): A,
    snd(): C,
    bimap<B, D>(f: (a: A) => B, g: (c: C) => D): Tuple<B, D>,
    map<D>(f: (c: C) => D): Tuple<A, D>,
    mapFirst<B>(f: (c: A) => B): Tuple<B, C>,
    curry<X>(f: (x: Tuple<A, C>) => X): X,
    uncurry<X>(f: (a: A, c: C) => X): X,
    extend<N>(f: (x: Tuple<A, C>) => N): Tuple<A, N>,
    extract(): C,
    swap(): Tuple<C, A>,
    foldl<X, Z>(f: (c: C, z: Z) => X, z: Z): X,
    foldr<X, Z>(f: (z: Z, c: C) => X, z: Z): X,
    equals<B, D>(tuple: Tuple<B, D>): boolean,
    static of<I, II>(first: I, second: II): Tuple<I, II>,
  }
}
