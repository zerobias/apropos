//@flow

import ExtendableError from './error-proto'

export interface TaggedError<-Tag = '', -Context = mixed> {
  -tag: Tag,
  -data: Context,
}

class AnnotatedError<-Context, -Tag = ''> extends ExtendableError implements TaggedError<Tag, Context> {
  -tag: Tag
  -data: Context
  constructor(context: Context, tag: Tag) {
    super(tag)
    this.tag = tag
    this.data = context
  }
}

export type MakeError<-Tag = ''> = <-Context>(data: Context) => TaggedError<Tag, Context>


/**
 * Create fabric for generating tagged error constructors
 *
 * Useful in `.mapL`
 *
 * @function makeError
 * @template Tag
 * @param {(Tag|String)} tag
 */
export const makeError = <-Tag>(tag: Tag): MakeError<Tag> => data => new AnnotatedError(tag, data)
