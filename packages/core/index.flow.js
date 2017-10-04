//@flow

declare module '@apropos/core' {
  // Reexport from `signature`
  declare export type Meta<+Name> = $Exact<{
    +name: Name,
    +scope: string,
  }>
  declare export type Signature<+Name> = $Exact<{
    +meta: Meta<Name>,
  }>
  declare export type TypedObject<+Name> = {
    +'@@signature': Signature<Name> // is a lie
  }
  declare export interface TypedClass<+Name> {
    +signature: Signature<Name>,
  }
  declare export var signature: Symbol
  declare export function hasSignature(obj: Object): boolean
  declare export function getSignature<+Name>(
    obj: TypedObject<Name>
  ): Signature<Name>
  declare export function classSignature<+Name>(
    classSignature: Signature<Name>
  ): (<T: TypedClass<Name>>(klass: Class<T>) => Class<T>)

  // core

  declare export class Base<-Name> {
    toString(): string,
  }
  declare export function stringify<-T>(value: T): string
  declare export function fantasyType<T>(klass: Class<T>): Class<T>
  declare export function sanctuaryType(
    name: string | string[]
  ): (<+Name, T: TypedClass<Name>>(klass: Class<T>) => Class<T>)
  declare export function className(
    name: string | string[]
  ): (<+Name, T: TypedClass<Name>>(klass: Class<T>) => Class<T>)
}
