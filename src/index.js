//@flow

import { type Apropos } from './index.h'
import { type TaggedError, type MakeError } from './error'
export type { Apropos, TaggedError, MakeError }

export { is, Right, Left, of, ofL } from './isomer'

export { makeError } from './error'

import { of } from './isomer'
export default of
