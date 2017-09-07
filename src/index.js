//@flow

import { type Apropos } from './index.h'
import { type TaggedError, type MakeError } from './error'
export type { Apropos, TaggedError, MakeError }

export { is, Right, Left, of, ofL } from './isomer'

export { makeError } from './error'

import { of } from './isomer'
export default of

import * as Either from './isomer'
export { Either }

import * as Maybe from './maybe'
export { Maybe }
