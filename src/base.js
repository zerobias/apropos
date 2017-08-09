//@flow

/*::
type IsomerSign = 'left' | 'right'
export opaque type LeftIsomer: IsomerSign = 'left'
export opaque type RightIsomer: IsomerSign = 'right'
*/
const leftIsomer: LeftIsomer = 'left'
const rightIsomer: RightIsomer = 'right'

export default class Isomer {
  -isomer: LeftIsomer | RightIsomer
}

export function makeRight(iso: typeof Isomer) {
  Object.defineProperty(iso.prototype, 'isomer', {
    value     : rightIsomer,
    enumerable: true,
    writable  : false,
  })
}

export function makeLeft(iso: typeof Isomer) {
  Object.defineProperty(iso.prototype, 'isomer', {
    value     : leftIsomer,
    enumerable: true,
    writable  : false,
  })
}
