
declare module 'apropos' {
  export interface Apropos<L, R> {
    map<R1>(fn: (x: R) => R1): Apropos<L, R1>,
    mapR<R1>(fn: (x: R) => R1): Apropos<L, R1>,
    mapL<L1>(fn: (x: L) => L1): Apropos<L1, R>,
    bimap<L1, R1>(l: (x: L) => L1, r: (x: R) => R1): Apropos<L1, R1>,


    tap(fn: (x: R) => any): Apropos<L, R>,
    tapR(fn: (x: R) => any): Apropos<L, R>,
    tapL(fn: (x: L) => any): Apropos<L, R>,
    bitap(l: (x: L) => any, r: (x: R) => any): Apropos<L, R>,


    chain<L1, R1>(fn: (x: R) => Apropos<L1, R1>): Apropos<L | L1, R1>,
    chainR<L1, R1>(fn: (x: R) => Apropos<L1, R1>): Apropos<L | L1, R1>,
    chainL<L1, R1>(fn: (x: L) => Apropos<L1, R1>): Apropos<L1, R | R1>,
    bichain<L1, L2, R1, R2>(
      l: (x: L) => Apropos<L2, R2>,
      r: (x: R) => Apropos<L1, R1>
    ): Apropos<L1 | L2, R1 | R2>,


    cond(fn: (x: R) => boolean): boolean,
    chainCond<L1, R1>(
      cond: (x: R) => boolean,
      pass: (x: R) => R1,
      fail: (x: R) => L1
    ): Apropos<L | L1, R1>,
    logic<L1, R1>(transformer: {
      cond: (x: R) => boolean,
      pass: (x: R) => R1,
      fail: (x: R) => L1
    }): Apropos<L | L1, R1>,


    alt<L1, R1>(e: Apropos<L1, R1>): Apropos<L1, R | R1>,
    and<L1, R1>(e: Apropos<L1, R1>): Apropos<L | L1, R1>,
    ap<L1, R1>(e: Apropos<L1, ((x: R) => R1)>): Apropos<L | L1, R1>,


    thru<L1, R1>(fn: (x: Apropos<L, R>) => Apropos<L1, R1>): Apropos<L1, R1>,
    orElse(value: R): R,
    swap(): Apropos<L, R>,
    promise(): Promise<R>,
    fold<O>(l: (x: L) => O, r: (x: R) => O): O,


    isRight(): boolean,
    isLeft(): boolean,
    equals(value: any): boolean,
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
   * @returns {Apropos<L, R>}
   */
  export function Right<L, R>(value: R): Apropos<L, R>

  /**
   * Create left-handed value.
   *
   * Right-handed type is inferred from usage
   *
   * @template R
   * @template L
   * @param {L} value
   * @returns {Apropos<L, R>}
   */
  export function Left<L, R>(value: L): Apropos<L, R>

  /**
   * Create pure right-handed value
   *
   * Left-handed type is empty
   *
   * @template R
   * @param {R} value
   * @returns {Apropos<void, R>}
   */
  export function of<R>(value: R): Apropos<void, R>

  /**
   * Create pure left-handed value
   *
   * Right-handed type is empty
   *
   * @template L
   * @param {L} value
   * @returns {Apropos<L, void>}
   */
  export function ofL<L>(value: L): Apropos<L, void>

  /**
   * Checks whether an object is an instance of `Apropos`
   *
   * @returns {boolean}
   */
  export function is(value: any): value is Apropos<any, any>

  export default of
}
