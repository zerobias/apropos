//@flow

export interface ADT<
  +Name,
  +Functor: true | false,
  +Apply: true | false,
  +Chain: true | false,
  A = void,
  B = void,
  C = void,
> {}

export interface Chain<
  +Name,
  +Map: true | false,
  +Apply: true | false,
  A = void,
  B = void,
  C = void
> extends ADT<
  Name,
  Map,
  Apply,
  true,
  A, B, C
> {
  chain<
    Nameʹ,
    Mapʹ: true | false,
    Applyʹ: true | false,
    Aʹ, Bʹ, Cʹ>(
    fn: (x: A) => Chain<Nameʹ, Mapʹ, Applyʹ, Aʹ, Bʹ, Cʹ>
  ): Chain<Nameʹ, Mapʹ, Applyʹ, Aʹ, Bʹ, Cʹ>,
}

export interface Functor<
  +Name,
  +Apply: true | false,
  +Chain: true | false,
  A = void,
  B = void,
  C = void
> extends ADT<
  Name,
  true,
  Apply,
  Chain,
  A, B, C
> {
  map<Aʹ>(fn: (x: A) => Aʹ): Functor<Name, Apply, Chain, Aʹ, B, C>,
}

export interface Apply<
  +Name,
  +Chain: true | false,
  A = void,
  B = void,
  C = void
> extends Functor<Name, true, Chain, A, B, C> {
  ap<Aʹ>(
    fnm: Apply<Name, Chain, ((x: A) => Aʹ), B, C>
  ): Apply<Name, Chain, Aʹ, B, C>,
  map<Aʹ>(fn: (x: A) => Aʹ): Apply<Name, Chain, Aʹ, B, C>,
}

export interface Applicative<
  +Name,
  +Chain: true | false,
  A = void,
  B = void,
  C = void
> extends Apply<Name, Chain, A, B, C>  {
  +statics: {
    of<S>(x: S): Applicative<S>,
  },
  ap<Aʹ>(
    fnm: Applicative<Name, Chain, ((x: A) => Aʹ), B, C>
  ): Applicative<Name, Chain, Aʹ, B, C>,
  map<Aʹ>(fn: (x: A) => Aʹ): Applicative<Name, Chain, Aʹ, B, C>,
}

// export interface Chain<
//   +Name,
//   +Map: true | false,
//   +Apply: true | false,
//   A = void,
//   B = void,
//   C = void
// > extends ADT<
//   Name,
//   Map,
//   Apply,
//   true,
//   A, B, C
// > {
//   chain<
//     Nameʹ,
//     Mapʹ: true | false,
//     Applyʹ: true | false,
//     Aʹ, Bʹ, Cʹ>(
//     fn: (x: A) => Chain<Nameʹ, Mapʹ, Applyʹ, Aʹ, Bʹ, Cʹ>
//   ): Chain<Nameʹ, Mapʹ, Applyʹ, Aʹ, Bʹ, Cʹ>,
// }

// import type {
//   ᐊ2,
//   ᐊ3,
// } from './variance'
//
// opaque type Chooseᐪ: 'Choose' = 'Choose'
// opaque type Trueʹ: true = true
// opaque type Falseʹ: false = false
//
// const ChooseTag: Chooseᐪ = 'Choose'
//
// const trueʹ: true = true
// const falseʹ: false = false
//
// // type Case2<+A, +B, +C: A | B> = ᐊ3<'Choose', ᐊ2<A, B>, C>
//
// // type Choose2<+A, +B, +C: A | B> =
//
// const Shape2 = a => b => ({ a, b, c: void 0, d: void 0 })
// // const Shape3 = a => b => c => ({ a, b, c, d: void 0 })
//
// const BoolShape: ᐊ2<true, false> = Shape2(trueʹ)(falseʹ)
//
// export type Bool<
//   +T: true | false
// > = ᐊ3<Chooseᐪ, ᐊ2<true, false>, T>
//
// export type Trueᐪ = Bool<true>
// export type Falseᐪ = Bool<false>
//
// export type TrueFalse = Trueᐪ | Falseᐪ

// export const False: Falseᐪ = {
//   a: ChooseTag,
//   b: BoolShape,
//   c: false,
//   d: void 0,
// }
// export const True: Trueᐪ = {
//   a: ChooseTag,
//   b: BoolShape,
//   c: true,
//   d: void 0,
// }
