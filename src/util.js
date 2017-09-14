//@flow

export function failSafeStringify(value: any): string {
  try {
    return JSON.stringify(value)
  } catch (error) {
    return String(value)
  }
}

const sanctuaryType = (() => {
  const packageVersion: string = preval`
    module.exports = require('../package.json').version || ''
  `

  const packageName: string = preval`
    module.exports = require('../package.json').name || ''
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

  return function getType(objectName: string): string {
    return [packageName, '/', objectName, '@', version].join('')
  }
})()

function addSanctuaryType(name: string, proto: Object) {
  Object.defineProperty(/*::( */proto/*::, {}) */, '@@type', {
    value: sanctuaryType(name)
  })
}

const fantasyLandMethods = [
  'map',
  'chain',
  'equals',
  'ap',
  'of',
].map(name => [name, `fantasy-land/${name}`])

function checkAddFL([typeName, fullName], klass) {
  const classStatic = /*::( */klass/*::, {}) */
  if (typeof classStatic[typeName] === 'function') {
    const fn = classStatic[typeName]
    Object.defineProperty(/*::( */klass/*::, {}) */, fullName, {
      value       : fn,
      enumerable  : false,
      writable    : true,
      configurable: true,
    })
  }
  const proto = /*::( */klass.prototype/*::, {}) */
  if (proto != null && typeof proto[typeName] === 'function') {
    const fn = proto[typeName]
    Object.defineProperty(/*::( */proto/*::, {}) */, fullName, {
      value       : fn,
      enumerable  : false,
      writable    : true,
      configurable: true,
    })
  }
}

export function addInterop<T>(klass: Class<T>, name: string) {
  addSanctuaryType(name, klass)
  fantasyLandMethods.forEach(names => checkAddFL(names, klass))
}
