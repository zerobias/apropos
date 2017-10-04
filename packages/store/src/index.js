//@flow

export class Store<Get, Set> {
  get: () => Get
  set: (x: Get) => Set
  constructor(set: (x: Get) => Set, get: () => Get) {
    this.set = set
    this.get = get
  }
  extract(): Set {
    return this.set(this.get())
  }
  over(fn: (x: Get) => Get): Set {
    return this.set(fn(this.get()))
  }
  extend<Update>(fn: (x: Store<Get, Set>) => Update): Store<Get, Update> {
    return new Store(
      k => fn(new Store(this.set, () => k)),
      this.get
    )
  }
  map<Next>(fn: (x: Get) => Next): Store<Get, Next> {
    return this.extend(c => fn(this.get()))
  }
}

import { of, Identity } from '@apropos/identity'
import { chain } from '@apropos/typeclass'

const num = of(0)

const toStr = chain((x: number) => of(x.toString(10)))
toStr
num

const s = toStr(num)
s
