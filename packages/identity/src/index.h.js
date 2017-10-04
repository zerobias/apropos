//@flow

export interface ADT<
  +Name,
  +Map: true | false,
  +Chain: true | false,
  A = void,
  B = void,
  C = void,
> {}

export interface Chainᐪ<
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
    fn: (x: A) => Chainᐪ<Nameʹ, Mapʹ, Aʹ, Bʹ, Cʹ>
  ): Chainᐪ<Nameʹ, Mapʹ, Aʹ, Bʹ, Cʹ>,
}

export interface Mapᐪ<
  +Name,
  A = void,
  B = void,
  C = void
> extends Chainᐪ<
  Name,
  true,
  A, B, C
> {
  map<Aʹ>(fn: (x: A) => Aʹ): Mapᐪ<Name, Aʹ, B, C>,
}

export interface Identity<T> {
  map<O>(f: (x: T) => O): Identity<O>,
  ap<S>(id: Identity<((x: T) => S)>): Identity<S>,
  chain<Name, O>(fn: (x: T) => Identity<O>): Identity<O>,
  get(): T,
  equals(value: any): boolean,
  fold<O>(fn: (x: T) => O): O,
}
