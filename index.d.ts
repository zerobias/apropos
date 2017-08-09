
declare module 'apropos' {
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
    logic<R1, L1>(transformer: {
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

  export interface TaggedError<Tag, Context> {
    tag: Tag,
    data: Context,
  }

  class AnnotatedError<Context, Tag = ''> extends Error implements TaggedError<Tag, Context> {
    tag: Tag
    data: Context
  }

  export type MakeError<Tag = ''> = <Context>(data: Context) => AnnotatedError<Context, Tag>

  /**
   * Create fabric for generating tagged error constructors
   *
   * Useful in `.mapL`
   *
   * @function makeError
   * @template Tag
   * @param {(Tag|String)} tag
   */
  export function makeError<Tag>(tag: Tag): MakeError<Tag>

  /**
   * Create right-handed value.
   *
   * Left-handed type is inferred from usage
   *
   * @template R
   * @template L
   * @param {R} value
   * @returns {Apropos<R, L>}
   */
  export function Right<R, L>(value: R): Apropos<R, L>

  /**
   * Create left-handed value.
   *
   * Right-handed type is inferred from usage
   *
   * @template R
   * @template L
   * @param {L} value
   * @returns {Apropos<R, L>}
   */
  export function Left<R, L>(value: L): Apropos<R, L>

  /**
   * Create pure right-handed value
   *
   * Left-handed type is empty
   *
   * @template R
   * @param {R} value
   * @returns {Apropos<R, void>}
   */
  export function of<R>(value: R): Apropos<R, void>

  /**
   * Checks whether an object is an instance of `Apropos`
   *
   * @template T
   * @param {T} value
   * @returns {boolean}
   */
  export function is(value: any): boolean

  export default of
}
