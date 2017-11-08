//@flow

export interface Maybe<T> {
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
}

