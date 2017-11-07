//@flow
/*::
import { type TypedClass } from '@apropos/signature'
*/
function fantasyName(name: string) {
  return [name, `fantasy-land/${name}`]
}

export const staticMethods = [
  'id',
  'empty',
  'of',
  'zero',
  'chainRec',
]

export const instanceMethods = [
  'equals',
  'lte',
  'compose',
  'concat',
  'map',
  'contramap',
  'ap',
  'alt',
  'reduce',
  'traverse',
  'chain',
  'extend',
  'extract',
  'bimap',
  'promap',
]

const fantasyLandMethods = instanceMethods.map(fantasyName)
const fantasyLandStaticMethods = staticMethods.map(fantasyName)

function checkAddFL([typeName, fullName], klass) {
  const classStatic = /*::( */klass/*::, {}) */
  if (typeof classStatic[typeName] === 'function') {
    const fn = classStatic[typeName]
    Object.defineProperty(/*::( */klass/*::, {}) */, fullName, {
      value:        fn,
      enumerable:   false,
      writable:     true,
      configurable: true,
    })
  }
}

export function fantasyType<Name, T/*::: TypedClass<Name>*/>(klass: Class<T>): Class<T> {
  fantasyLandStaticMethods.forEach(names => checkAddFL(names, klass))
  fantasyLandMethods.forEach(names => checkAddFL(names, klass.prototype))
  return klass
}
