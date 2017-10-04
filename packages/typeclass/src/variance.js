//@flow

export type ᐅ<
  -A = void,
  -B = void,
  -C = void,
  -D = void
> = $Exact<{
  -a: A,
  -b: B,
  -c: C,
  -d: D,
}>

type ᐊABᐅCD<
  +A = void,
  +B = void,
  -C = void,
  -D = void
> = $Exact<{
  +a: A,
  +b: B,
  -c: C,
  -d: D,
}>

export type ᐊ<
  +A = void,
  +B = void,
  +C = void,
  +D = void
> = $Exact<{
  +a: A,
  +b: B,
  +c: C,
  +d: D,
}>

export type ᐃ<
  A = void,
  B = void,
  C = void,
  D = void
> = $Exact<{
  a: A,
  b: B,
  c: C,
  d: D,
}>

export type Shape<
  A = void,
  B = void,
  C = void,
  D = void
> = (a: A, b: B, c: C, d: D) => ᐃ<A, B, C, D>

export type Shapeᐊ<
  A = void,
  B = void,
  C = void,
  D = void
> = (a: A, b: B, c: C, d: D) => ᐊ<A, B, C, D>

export type ShapeCᐅ<
  -A = void,
  -B = void,
  -C = void,
  -D = void
> = (a: A) => (b: B) => (c: C) => (d: D) => ᐅ<A, B, C, D>

export type ᕈᐊABᐅC<
  +A = void,
  +B = void,
  -C = void
> = (c: C) => ᐊABᐅCD<A, B, C>

export type ᕈᐊABᐅCD<
  +A = void,
  +B = void,
  -C = void,
  -D = void,
> = (c: C, d: D) => ᐊABᐅCD<A, B, C, D>

export type ᐅ0 = ᐅ<>
export type ᐊ0 = ᐊ<>
export type ᐃ0 = ᐃ<>

export type ᐅ1<-A> = ᐅ<A>
export type ᐊ1<+A> = ᐊ<A>
export type ᐃ1<A> = ᐃ<A>

export type ᐅ2<-A, -B> = ᐅ<A, B>
export type ᐊ2<+A, +B> = ᐊ<A, B>
export type ᐃ2<A, B> = ᐃ<A, B>

export type ᐅ3<-A, -B, -C> = ᐅ<A, B, C>
export type ᐊ3<+A, +B, +C> = ᐊ<A, B, C>
export type ᐃ3<A, B, C> = ᐃ<A, B, C>
