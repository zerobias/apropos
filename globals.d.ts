
import * as React from 'react'

declare module 'react' {
  type Node = React.ReactNode
}

declare global {
  type $Shape<T> = T
  type $Exact<T> = T
  type $ReadOnlyArray<T> = Array<T>
  type $NonMaybeType<T> = T
  type $Subtype<T> = T
  type $Supertype<T> = T
  type React$Node = React.ReactNode
  type React$ComponentType<T> = React.ComponentType<T>
  type empty = never
  type mixed = any
  type React$ElementType = React.ReactElement<any>
  type React$ElementProps<C extends React.ReactElement<T>, T> = T
  type React$Element<T> = React.ReactElement<T>
  type $Diff<A, B> = A & B
  type $ElementType<T extends Object, K extends keyof T> = T[K]
  type $PropertyType<T extends Object, K extends keyof T> = T[K]
  type $Keys<T extends Object> = keyof T
  type Class<T, K = { new(...args: any[]): T }> = K
  type $Pred<N extends Number> = (value: any) => boolean
  type $ReadOnly<T> = T
  type $Refine<T, P, N extends Number> = T
  type $Call<
    F extends Function,
    A = void,
    R
  > = R

  interface $Iterator<Yield, Return, Next> {
    '@@iterator'(): $Iterator<Yield,Return,Next>;
    next(value?: Next): IteratorResult<Yield>
  }
}
