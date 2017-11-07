//@flow

/* eslint-disable no-whitespace-before-property */

import { signature } from './signature'
import type {
  TypedObject,
  Signature,
  TypedClass,
} from './index.h'

const sign = /*:: (*/ signature /*::, '@@signature' ) */

export function hasSignature(obj: Object): boolean {
  return obj != null && (typeof obj === 'object' || typeof obj === 'function') && (sign in obj)
}


export function getSignature<Name>(obj: TypedObject<Name>): Signature<Name> {
  return obj[sign]
}

function addClassSignature<Name, T/*::: TypedClass<Name>*/>(
  classSignature: Signature<Name>,
  klass: Class<T>
): Class<T> {
  /*:: (*/ klass.prototype /*::, {}) */ [sign] = classSignature
  return klass
}


/**
 * Decorator for type signature
 *
 * Usage:
 * ```javascript
 * import { type TypedClass, classSignature } from '@apropos/signature'
 * const decorate = classSignature({
 *   name : 'TypedFoo',
 *   scope: 'PackageBar',
 * })
 * const TypedFoo = decorate(class Foo implements TypedClass {
 * +signature: Signature
 * })
 *
 * ```
 *
 * @param {Signature} classSignature
 */
export function classSignature<Name>(classSignature: Signature<Name>) {
  return function<T/*::: TypedClass<Name>*/>(klass: Class<T>): Class<T> {
    return addClassSignature(classSignature, klass)
  }
}
