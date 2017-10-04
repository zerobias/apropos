//@flow

import { type TypedClass } from '@apropos/signature'

export function className(nameRaw: string | string[]) {
  const name = Array.isArray(nameRaw)
    ? nameRaw[0] || ''
    : nameRaw
  return function<T: TypedClass>(klass: Class<T>): Class<T> {
    Object.defineProperty(/*::( */klass/*::, {}) */, 'name', {
      value       : name,
      enumerable  : false,
      writable    : true,
      configurable: true,
    })
    return klass
  }
}
