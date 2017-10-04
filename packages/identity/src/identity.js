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

import {
  type ADT,
  type Chain,
  type Map,
} from '@apropos/typeclass'

const sign = classSignature({
  meta: {
    name : 'Identity',
    scope: 'apropos',
  },
})

@sanctuaryType`Identity`
// @className`Identity`
@fantasyType
@sign
export class Identity<T>
  extends Base<'Identity'>
  implements
    TypedClass<'Identity'>,
    // Identity<T>,
    ADT<'Identity', true, true, T, void, void>,
    Chain<'Identity', true, T, void, void>,
    Map<'Identity', T, void, void> {
  value: T
  length: number
  signature: Signature<'Identity'>
  constructor(value: T) {
    super()
    this.value = value
  }
  chain<Nameʹ, Mapʹ: true | false, Aʹ, Bʹ, Cʹ>(
    fn: (x: T) => Chain<Nameʹ, Mapʹ, Aʹ, Bʹ, Cʹ>
  ): Chain<Nameʹ, Mapʹ, Aʹ, Bʹ, Cʹ> {
    return fn(this.value)
  }
  map<O>(fn: (x: T) => O): Identity<O> {
    return new Identity(fn(this.value))
  }
  ap<Tʹ>(id: Identity<((x: T) => Tʹ)>): Chain<'Identity', true, Tʹ, void, void> {
    return id.chain(fn => this.map(fn))
  }
  fold<O>(fn: (x: T) => O): O {
    return fn(this.value)
  }
  get(): T {
    return this.value
  }
  equals(value: any): boolean {
    if (value instanceof Identity)
      return this.value === value.value
    return this.value === value
  }
  toString() {
    return `Identity(${ stringify(this.value) })`
  }
}

Object.defineProperties(Identity.prototype, {
  length: {
    value: 1
  }
})

// function refine<P: $Pred<1>>(v: mixed, cb: P): $Refine<Identity<mixed>, P, 1> {
//   if (cb(v)) {
//     return v
//   }
//   throw new Error()
// }

export function isIdentity(obj: mixed): boolean %checks {
  return obj instanceof Identity === true
}

export function is(obj: any): boolean {
  return obj instanceof Identity === true
}

export function empty(): Identity<void> {
  return new Identity(void 0)
}

export function of<T>(value: T): Identity<T> {
  return new Identity(value)
}
