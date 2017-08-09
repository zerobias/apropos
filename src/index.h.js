//@flow

/*::
type IsomerSign = 'left' | 'right'
export opaque type LeftIsomer: IsomerSign = 'left'
export opaque type RightIsomer: IsomerSign = 'right'
*/
export const leftIsomer: LeftIsomer = 'left'
export const rightIsomer: RightIsomer = 'right'

export interface Apropos<R, L> {
  map<R1>(fn: (x: R) => R1): Apropos<R1, L>,
  mapR<R1>(fn: (x: R) => R1): Apropos<R1, L>,
  mapL<L1>(fn: (x: L) => L1): Apropos<R, L1>,
  bimap<R1, L1>(r: (x: R) => R1, l: (x: L) => L1): Apropos<R1, L1>,


  tap(fn: (x: R) => any): Apropos<R, L>,
  tapR(fn: (x: R) => any): Apropos<R, L>,
  tapL(fn: (x: L) => any): Apropos<R, L>,
  bitap(r: (x: R) => any, l: (x: L) => any): Apropos<R, L>,


  chain<R1, L1>(fn: (x: R) => Apropos<R1, L1>): Apropos<R1, L | L1>,
  chainR<R1, L1>(fn: (x: R) => Apropos<R1, L1>): Apropos<R1, L | L1>,
  chainL<R1, L1>(fn: (x: L) => Apropos<R1, L1>): Apropos<R | R1, L1>,
  bichain<R1, R2, L1, L2>(
    r: (x: R) => Apropos<R1, L1>,
    l: (x: L) => Apropos<R2, L2>
  ): Apropos<R1 | R2, L1 | L2>,


  cond(fn: (x: R) => boolean): boolean,
  chainCond<R1, L1>(
    cond: (x: R) => boolean,
    pass: (x: R) => R1,
    fail: (x: R) => L1
  ): Apropos<R1, L | L1>,
  logic<R1, L1>({
    cond: (x: R) => boolean,
    pass: (x: R) => R1,
    fail: (x: R) => L1
  }): Apropos<R1, L | L1>,


  alt<R1, L1>(e: Apropos<R1, L1>): Apropos<R | R1, L1>,
  and<R1, L1>(e: Apropos<R1, L1>): Apropos<R1, L | L1>,
  ap<R1, L1>(e: Apropos<((x: R) => R1), L1>): Apropos<R1, L | L1>,


  thru<R1, L1>(fn: (x: Apropos<R, L>) => Apropos<R1, L1>): Apropos<R1, L1>,
  orElse(value: R): R,
  swap(): Apropos<L, R>,
  promise(): Promise<R>,
  fold<O>(r: (x: R) => O, l: (x: L) => O): O,


  isRight(): boolean,
  isLeft(): boolean,
}
