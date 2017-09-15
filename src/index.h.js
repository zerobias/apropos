//@flow

export interface Fold1<A> {
  fold<O>(a: (x: A) => O): O,
}

export interface Fold2<A, B> {
  fold<O>(a: (x: A) => O, b: (x: B) => O): O,
}

/**
 * Either `Left` or `Right`
 *
 * @interface Either
 * @template L
 * @template R
 */
export interface Either<L, R> extends Fold2<L, R> {
  map<R1>(fn: (x: R) => R1): Either<L, R1>,
  mapR<R1>(fn: (x: R) => R1): Either<L, R1>,
  mapL<L1>(fn: (x: L) => L1): Either<L1, R>,
  bimap<L1, R1>(l: (x: L) => L1, r: (x: R) => R1): Either<L1, R1>,


  tap(fn: (x: R) => any): Either<L, R>,
  tapR(fn: (x: R) => any): Either<L, R>,
  tapL(fn: (x: L) => any): Either<L, R>,
  bitap(l: (x: L) => any, r: (x: R) => any): Either<L, R>,


  chain<L1, R1>(fn: (x: R) => Either<L1, R1>): Either<L | L1, R1>,
  chainR<L1, R1>(fn: (x: R) => Either<L1, R1>): Either<L | L1, R1>,
  chainL<L1, R1>(fn: (x: L) => Either<L1, R1>): Either<L1, R | R1>,
  bichain<L1, L2, R1, R2>(
    l: (x: L) => Either<L2, R2>,
    r: (x: R) => Either<L1, R1>
  ): Either<L1 | L2, R1 | R2>,


  cond(fn: (x: R) => boolean): boolean,
  chainCond<L1, R1>(
    cond: (x: R) => boolean,
    pass: (x: R) => R1,
    fail: (x: R) => L1
  ): Either<L | L1, R1>,
  logic<L1, R1>({
    cond: (x: R) => boolean,
    pass: (x: R) => R1,
    fail: (x: R) => L1
  }): Either<L | L1, R1>,


  alt<L1, R1>(e: Either<L1, R1>): Either<L1, R | R1>,
  or<L1, R1>(e: Either<L1, R1>): Either<L1, R | R1>,
  and<L1, R1>(e: Either<L1, R1>): Either<L | L1, R1>,
  ap<L1, R1>(e: Either<L1, ((x: R) => R1)>): Either<L | L1, R1>,


  thru<L1, R1>(fn: (x: Either<L, R>) => Either<L1, R1>): Either<L1, R1>,
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

export type Apropos<L, R> = Either<L, R>

export interface Maybe<T> extends Fold2<void, T> {
  map<Tʹ>(fn: (x: T) => Tʹ): Maybe<Tʹ>,
  chain<Tʹ>(fn: (x: T) => Maybe<Tʹ>): Maybe<Tʹ>,
  tap(fn: (x: T) => any): Maybe<T>,
  fold<O>(l: () => O, r: (x: T) => O): O,
  orElse(x: T): T,

  ap<Tʹ>(maybe: Maybe<((x: T) => Tʹ)>): Maybe<Tʹ>,

  alt<S>(maybe: Maybe<S>): Maybe<T | S>,
  both<S>(maybe: Maybe<S>): Maybe<[T, S]>,
  and<S>(maybe: Maybe<S>): Maybe<S>,

  match<J, N>({
    Just: (x: T) => J,
    Nothing: () => N,
  }): J | N,

  chainCond<Tʹ>(
    cond: (x: T) => boolean,
    pass: (x: T) => Tʹ
  ): Maybe<Tʹ>,
  logic<Tʹ>({
    cond: (x: T) => boolean,
    pass: (x: T) => Tʹ
  }): Maybe<Tʹ>,
  pred(check: (x: T) => boolean): Maybe<T>,

  promise(): Promise<T>,
  equals(value: any): boolean,
  isJust(): boolean,
  isNothing(): boolean,
}

export interface Identity<T> extends Fold1<T> {
  map<O>(f: (x: T) => O): Identity<O>,
  ap<S>(id: Identity<((x: T) => S)>): Identity<S>,
  chain<Name, O>(fn: (x: T) => Identity<O>): Identity<O>,
  get(): T,
  equals(value: any): boolean,
  fold<O>(fn: (x: T) => O): O,
}

export interface Tuple<A, B> {
  fst(): A,
  snd(): B,
  bimap<Aʹ, Bʹ>(f: (a: A) => Aʹ, g: (b: B) => Bʹ): Tuple<Aʹ, Bʹ>,
  map<Bʹ>(f: (b: B) => Bʹ): Tuple<A, Bʹ>,
  curry<X>(f: (x: Tuple<A, B>) => X): X,
  uncurry<X>(f: (a: A, b: B) => X): X,
  extend<N>(f: (x: Tuple<A, B>) => N): Tuple<A, N>,
  extract(): B,
  foldl<X, Z>(f: (b: B, z: Z) => X, z: Z): X,
  foldr<X, Z>(f: (z: Z, b: B) => X, z: Z): X,
  equals<Aʹ, Bʹ>(tuple: Tuple<Aʹ, Bʹ>): boolean,
}
