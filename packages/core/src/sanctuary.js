//@flow

import { type TypedClass } from '@apropos/signature'

const packageVersion: string = preval`
  module.exports = require('../../../package.json').version || ''
`

const packageName: string = preval`
  module.exports = require('../../../package.json').name || ''
`
function versionRounding(version: string): string {
  if (version.length < 2) return version
  const splitted = version.split(/\./)
  const major = splitted[0] || ''
  const minor = splitted[1] || ''
  return major === '0'
    ? `0.${minor}`
    : major
}
const version = versionRounding(packageVersion)

function getType(objectName: string): string {
  return [packageName, '/', objectName, '@', version].join('')
}

export function sanctuaryType(nameRaw: string | string[]) {
  const name = Array.isArray(nameRaw)
    ? nameRaw[0] || ''
    : nameRaw
  return function<T: TypedClass>(klass: Class<T>): Class<T> {
    Object.defineProperty(/*::( */klass/*::, {}) */, '@@type', {
      value: getType(name)
    })
    return klass
  }
}
