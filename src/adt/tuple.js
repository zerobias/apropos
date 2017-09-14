//@flow

/* eslint-disable no-whitespace-before-property */

import Base from '../base'
import { type Tuple } from '../index.h'
import { failSafeStringify, addInterop } from '../util'

export type { Tuple }

class Tupleʹ<A, B> extends Base implements Tuple<A, B> {
  length: number
  constructor(a: A, b: B): Tuple<A, B> {
    super()
    this /*::; noop */[0] = a
    this /*::; noop */[1] = b
    /*:: return this */
  }
  fst(): A {
    return (this /*::, noop */[0])
  }
  snd(): B {
    return (this /*::, noop */[1])
  }
  bimap<Aʹ, Bʹ>(f: (a: A) => Aʹ, g: (b: B) => Bʹ): Tuple<Aʹ, Bʹ> {
    return new Tupleʹ(f(this.fst()), g(this.snd()))
  }
  map<Bʹ>(f: (b: B) => Bʹ): Tuple<A, Bʹ> {
    return new Tupleʹ(this.fst(), f(this.snd()))
  }
  curry<X>(f: (x: Tuple<A, B>) => X): X {
    return f(this)
  }
  uncurry<X>(f: (a: A, b: B) => X): X {
    return f(this.fst(), this.snd())
  }
  extend<N>(f: (x: Tuple<A, B>) => N): Tuple<A, N> {
    return new Tupleʹ(this.fst(), f(this))
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
  equals<Aʹ, Bʹ>(tuple: Tuple<Aʹ, Bʹ>): boolean {
    if (tuple instanceof Tupleʹ) {
      return (
        this.fst() === tuple.fst()
        && this.snd() === tuple.snd()
      )
    }
    return false
    // this.eqFirst(tuple)
    //   && this.eqSecond(tuple)
  }
  // eqFirst<Aʹ, -Bʹ>(tuple: Tuple<Aʹ, Bʹ>): boolean {
  //   return eq(this.fst(), tuple.fst())
  // }
  // eqSecond<-Aʹ, Bʹ>(tuple: Tuple<Aʹ, Bʹ>): boolean {
  //   return eq(this.snd(), tuple.snd())
  // }
  toValue() {
    return [this.fst(), this.snd()]
  }
  toJSON() {
    return this.toValue()
  }
  toString() {
    return `Tuple( ${failSafeStringify(this.fst())}, ${failSafeStringify(this.snd())} )`
  }
  // static of<Aʹ, Bʹ>(a: Aʹ, b: Bʹ): Tuple<Aʹ, Bʹ> {
  //   return new Tupleʹ(a, b)
  // }
}

addInterop(Tupleʹ, 'Tuple')

/*::
const noop = {}
*/

const additionalProps = {
  length: {
    value: 2
  },
}

Object.defineProperties(Tupleʹ.prototype, additionalProps)

export function of<A, B>(a: A, b: B): Tuple<A, B> {
  return new Tupleʹ(a, b)
}

export function fst<A, B>(tuple: Tuple<A, B>): A {
  return tuple.fst()
}

export function snd<A, B>(tuple: Tuple<A, B>): B {
  return tuple.snd()
}
