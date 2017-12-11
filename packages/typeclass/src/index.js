//@flow

export type Setoid<F> = {
  equals<A, B>(e1: $Call<F, A>, e2: $Call<F, B>): boolean,
}

export type Ord<F> = {
  equals<A, B>(e1: $Call<F, A>, e2: $Call<F, B>): boolean,
  lte<A, B>(e1: $Call<F, A>, e2: $Call<F, B>): boolean,
}

export type Semigroupoid<F> = {
  compose<A, B, C>(
    e1: $Call<F, ((x: A) => B)>,
    e2: $Call<F, ((x: B) => C)>
  ): $Call<F, ((x: A) => C)>
}

export type Category<F> = {
  compose<A, B, C>(
    e1: $Call<F, ((x: A) => B)>,
    e2: $Call<F, ((x: B) => C)>
  ): $Call<F, ((x: A) => C)>,
  id<A>(): $Call<F, ((x: A) => A)>
}

export type Semigroup<F> = {
  concat<A>(e1: $Call<F, A>, e2: $Call<F, A>): $Call<F, A>,
}

export type Monoid<F> = {
  concat<A>(e1: $Call<F, A>, e2: $Call<F, A>): $Call<F, A>,
  empty<A>(): $Call<F, A>,
}

export type Group<F> = {
  concat<A>(e1: $Call<F, A>, e2: $Call<F, A>): $Call<F, A>,
  empty<A>(): $Call<F, A>,
  invert<A>(e: $Call<F, A>): $Call<F, A>,
}

export type Functor<F> = {
  map<A, B>(f: (a: A) => B, fa: $Call<F, A>): $Call<F, B>,
}

export type Contravariant<F> = {
  map<A, B>(f: (a: B) => A, fa: $Call<F, A>): $Call<F, B>,
}

export type Apply<F> = {
  map<A, B>(f: (a: A) => B, fa: $Call<F, A>): $Call<F, B>,
  ap<A, B>(f: $Call<F, ((a: A) => B)>, fa: $Call<F, A>): $Call<F, B>,
}

export type Applicative<F> = {
  map<A, B>(f: (a: A) => B, fa: $Call<F, A>): $Call<F, B>,
  ap<A, B>(f: $Call<F, ((a: A) => B)>, fa: $Call<F, A>): $Call<F, B>,
  /*::+*/of: F,
}

export type Alt<F> = {
  map<A, B>(f: (a: A) => B, fa: $Call<F, A>): $Call<F, B>,
  alt<A>(e1: $Call<F, A>, e2: $Call<F, A>): $Call<F, A>,
}

export type Plus<F> = {
  map<A, B>(f: (a: A) => B, fa: $Call<F, A>): $Call<F, B>,
  alt<A>(e1: $Call<F, A>, e2: $Call<F, A>): $Call<F, A>,
  zero<A>(): $Call<F, A>,
}

export type Alternative<F> = {
  map<A, B>(f: (a: A) => B, fa: $Call<F, A>): $Call<F, B>,
  ap<A, B>(f: $Call<F, ((a: A) => B)>, fa: $Call<F, A>): $Call<F, B>,
  /*::+*/of: F,
  alt<A>(e1: $Call<F, A>, e2: $Call<F, A>): $Call<F, A>,
  zero<A>(): $Call<F, A>,
}

export type Foldable<F> = {
  reduce<A, B>(acc: B, f: (acc: B, value: A) => B, fa: $Call<F, A>): B,
}

export type Traversable<F> = {
  map<A, B>(f: (a: A) => B, fa: $Call<F, A>): $Call<F, B>,
  reduce<A, B>(acc: B, f: (acc: B, value: A) => B, fa: $Call<F, A>): B,
  traverse<A, B, TypeRep>(
    M: Applicative<TypeRep>,
    f: (x: A) => $Call<TypeRep, B>,
    fa: $Call<F, A>
  ): $Call<TypeRep, $Call<F, B>>,
}

export type Chain<F> = {
  map<A, B>(f: (a: A) => B, fa: $Call<F, A>): $Call<F, B>,
  ap<A, B>(f: $Call<F, ((a: A) => B)>, fa: $Call<F, A>): $Call<F, B>,
  chain<A, B>(f: (a: A) => $Call<F, B>, fa: $Call<F, A>): $Call<F, B>,
}

export type ChainRec<F> = {
  map<A, B>(f: (a: A) => B, fa: $Call<F, A>): $Call<F, B>,
  ap<A, B>(f: $Call<F, ((a: A) => B)>, fa: $Call<F, A>): $Call<F, B>,
  chain<A, B>(f: (a: A) => $Call<F, B>, fa: $Call<F, A>): $Call<F, B>,
  chainRec<A, B, C>(
    f: (next: (a: A) => C, done: (b: B) => C, a: A) => $Call<F, C>,
    a: A
  ): $Call<F, B>,
}

export type Monad<F> = {
  map<A, B>(f: (a: A) => B, fa: $Call<F, A>): $Call<F, B>,
  ap<A, B>(f: $Call<F, ((a: A) => B)>, fa: $Call<F, A>): $Call<F, B>,
  /*::+*/of: F,
  chain<A, B>(f: (a: A) => $Call<F, B>, fa: $Call<F, A>): $Call<F, B>,
}

export type Extend<F> = {
  map<A, B>(f: (a: A) => B, fa: $Call<F, A>): $Call<F, B>,
  extend<A, B>(f: (fa: $Call<F, A>) => B, fa: $Call<F, A>): $Call<F, B>,
}

export type Comonad<F> = {
  map<A, B>(f: (a: A) => B, fa: $Call<F, A>): $Call<F, B>,
  extend<A, B>(f: (fa: $Call<F, A>) => B, fa: $Call<F, A>): $Call<F, B>,
  extract<A>(fa: $Call<F, A>): A,
}

export type Bifunctor<F> = {
  map<A, B>(f: (a: A) => B, fa: $Call<F, A>): $Call<F, B>,
  bimap<A, B, C, D>(
    f1: (a: A) => C,
    f2: (b: B) => D,
    fa: $Call<F, [A, B]>
  ): $Call<F, [C, D]>
}

export type Profunctor<F> = {
  map<A, B>(f: (a: A) => B, fa: $Call<F, A>): $Call<F, B>,
  promap<A, B, C, D>(
    f1: (a: A) => B,
    f2: (c: C) => D,
    fa: $Call<F, [B, C]>
  ): $Call<F, [A, D]>
}



export interface SetoidType<F> {
  equals<B>(e2: $Call<F, B>): boolean,
}

export interface OrdType<F> extends SetoidType<F> {
  lte<B>(e2: $Call<F, B>): boolean,
}

export interface SemigroupoidType<F, A> {
  compose<B, C>(e2: $Call<F, ((x: B) => C)>): $Call<F, ((x: A) => C)>,
}

export interface CategoryType<F, A> extends SemigroupoidType<F, A> {
}

export interface SemigroupType<F, A> {
  concat(e2: $Call<F, A>): $Call<F, A>,
}

export interface MonoidType<F, A> extends SemigroupType<F, A> {
}

export interface GroupType<F, A> extends MonoidType<F, A> {
  invert(): $Call<F, A>,
}

export interface FunctorType<F, A> {
  map<B>(f: (x: A) => B): $Call<F, B>,
}

export interface ContravariantType<F, A> {
  map<B>(f: (x: B) => A): $Call<F, B>,
}

export interface ApplyType<F, A> extends FunctorType<F, A> {
  ap<B>(f: $Call<F, ((a: A) => B)>): $Call<F, B>,
}

export interface ApplicativeType<F, A> extends ApplyType<F, A> {
}

export interface AltType<F, A> extends FunctorType<F, A> {
  alt(e2: $Call<F, A>): $Call<F, A>,
}

export interface PlusType<F, A> extends AltType<F, A> {
}

export interface AlternativeType<F, A> extends PlusType<F, A>, ApplicativeType<F, A> {
}

export interface FoldableType<F, A> {
  reduce<B>(f: (acc: B, value: A) => B, acc: B): B,
}

export interface TraversableType<F, A> extends FoldableType<F, A>, FunctorType<F, A> {
  traverse<A, B, TypeRep>(
    M: Applicative<TypeRep>,
    f: (x: A) => $Call<TypeRep, B>
  ): $Call<TypeRep, $Call<F, B>>,
}

export interface ChainType<F, A> extends ApplyType<F, A> {
  chain<B>(f: (a: A) => $Call<F, B>): $Call<F, B>,
}

export interface ChainRecType<F, A> extends ChainType<F, A> {
}

export interface MonadType<F, A> extends ChainType<F, A>, ApplicativeType<F, A> {
}

export interface ExtendType<F, A> extends FunctorType<F, A> {
  extend<B>(f: (fa: $Call<F, A>) => B): $Call<F, B>,
}

export interface ComonadType<F, A> extends ExtendType<F, A> {
  extract(): A,
}

export interface BifunctorType<F, A, B> extends FunctorType<F, [A, B]> {
  bimap<C, D>(
    f1: (a: A) => C,
    f2: (b: B) => D
  ): $Call<F, [C, D]>
}

export interface ProfunctorType<F, B, C> extends FunctorType<F, [B, C]> {
  promap<A, D>(
    f1: (a: A) => B,
    f2: (c: C) => D
  ): $Call<F, [A, D]>
}

