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


const sign = classSignature({
  meta: {
    name:  'Tuple',
    scope: 'apropos',
  },
})


@sanctuaryType`Tuple`
@fantasyType
@sign
export default class Tuple<A, B> extends Base<'Tuple'> implements TypedClass<'Tuple'> {
  signature: Signature<'Tuple'>
  a: A
  b: B
  constructor(a: A, b: B) {
    super()
    this.a = a
    this.b = b
  }
  fst(): A {
    return this.a
  }
  snd(): B {
    return this.b
  }
  swap(): Tuple<B, A> {
    return new Tuple(this.snd(), this.fst())
  }
  bimap<A1, B1>(f: (a: A) => A1, g: (b: B) => B1): Tuple<A1, B1> {
    return new Tuple(f(this.fst()), g(this.snd()))
  }
  map<B1>(f: (b: B) => B1): Tuple<A, B1> {
    return new Tuple(this.fst(), f(this.snd()))
  }
  mapFirst<C>(f: (a: A) => C): Tuple<C, B> {
    return new Tuple(f(this.fst()), this.snd())
  }
  curry<X>(f: (x: Tuple<A, B>) => X): X {
    return f(this)
  }
  uncurry<X>(f: (a: A, b: B) => X): X {
    return f(this.fst(), this.snd())
  }
  extend<N>(f: (x: Tuple<A, B>) => N): Tuple<A, N> {
    return new Tuple(this.fst(), f(this))
  }
  extract(): B {
    return this.snd()
  }
  foldl<X, Z>(f: (b: B, z: Z) => X, z: Z): X {
    return f(this.snd(), z)
  }
  foldr<X, Z>(f: (z: Z, b: B) => X, z: Z): X {
    return f(z, this.snd())
  }
  foldMap<X>(f: (b: B) => X): X {
    return f(this.snd())
  }
  equals<A1, B1>(tuple: Tuple<A1, B1>): boolean {
    if (tuple instanceof Tuple) {
      return (
        this.fst() === tuple.fst()
        && this.snd() === tuple.snd()
      )
    }
    return false
  }
  toValue() {
    return [this.fst(), this.snd()]
  }
  toJSON() {
    return this.toValue()
  }
  toString() {
    return `Tuple( ${stringify(this.fst())}, ${stringify(this.snd())} )`
  }
  //$off
  * [Symbol.iterator]() {
    yield this.fst()
    yield this.snd()
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
  static of<I, II>(first: I, second: II): Tuple<I, II> {
    return new Tuple(first, second)
  }
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
export function of<I, II>(first: I, second: II): Tuple<I, II> {
  return new Tuple(first, second)
}
