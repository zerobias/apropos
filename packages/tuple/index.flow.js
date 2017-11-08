//@flow

declare module '@apropos/tuple' {
  declare export default class Tuple<A, C> {
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

  /**
   * Create Tuple instance
   *
   * @template I
   * @template II
   * @param {I} first
   * @param {II} second
   * @returns {Tuple<I, II>}
   */
  declare export function of<I, II>(first: I, second: II): Tuple<I, II>
}
