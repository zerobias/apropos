//@flow

/* eslint-disable no-unused-vars */

export class Base</*::-*/Name> {
  toString() {
    return 'Base()'
  }

  inspect() {
    return this.toString()
  }
}
