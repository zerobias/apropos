//@flow

import { type Apropos } from './index.h'
import { type TaggedError, type MakeError } from './error'
export type { Apropos, TaggedError, MakeError }

export { is, Right, Left, of, ofL } from './adt/either'
export { fold } from './point-free'

export { makeError } from './error'

import { of } from './adt/either'
export default of

export * as Either from './adt/either'

export * as Maybe from './adt/maybe'

export * as Identity from './adt/identity'

export * as Tuple from './adt/tuple'
