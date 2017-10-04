//@flow

declare module '@apropos/typeclass' {
  declare export interface ADT<
    +Name,
    +Map: true | false,
    +Chain: true | false,
    A = void,
    B = void,
    C = void,
  > {}

  declare export interface Chain<
    +Name,
    +Map: true | false,
    A = void,
    B = void,
    C = void
  > extends ADT<
    Name,
    Map,
    true,
    A, B, C
  > {
    chain<Nameʹ, Mapʹ: true | false, Aʹ, Bʹ, Cʹ>(
      fn: (x: A) => Chain<Nameʹ, Mapʹ, Aʹ, Bʹ, Cʹ>
    ): Chain<Nameʹ, Mapʹ, Aʹ, Bʹ, Cʹ>,
  }

  declare export interface Map<
    +Name,
    A = void,
    B = void,
    C = void
  > extends Chain<
    Name,
    true,
    A, B, C
  > {
    map<Aʹ>(fn: (x: A) => Aʹ): Map<Name, Aʹ, B, C>,
  }

  declare type ChainArray<I, O> = (x: I[]) => O[]
  declare export function chain<I, O>(fn: (x: I) => O[]): ((x: I[]) => O[])
}
