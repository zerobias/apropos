//@flow

declare module '@apropos/identity' {
  declare export class Identity<T> {
    map<O>(f: (x: T) => O): Identity<O>,
    ap<S>(id: Identity<((x: T) => S)>): Identity<S>,
    chain<Name, O>(fn: (x: T) => Identity<O>): Identity<O>,
    get(): T,
    equals(value: any): boolean,
    fold<O>(fn: (x: T) => O): O,
  }

  declare export function isIdentity(obj: mixed): boolean %checks (
    obj instanceof Identity
  )

  declare export function is(obj: any): boolean

  declare export function empty(): Identity<void>

  declare export function of<T>(value: T): Identity<T>
}

declare module '@apropos/typeclass' {
  import type { Identity } from '@apropos/identity'

  declare export function chain<I, O>(fn: (x: I) => Identity<O>): (
    (x: Identity<I>) => Identity<O>
  )
}
