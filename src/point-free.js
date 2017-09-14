//@flow

/* eslint-disable no-redeclare,space-before-function-paren */

/*::
import { type Fold1, type Fold2 } from './index.h'
declare export function fold<O, A>(
  a: (x: A) => O,
  nob: void
): ((x: Fold1<A>) => O)

declare export function fold<O, A, B>(
  a: (x: A) => O,
  b: (x: B) => O
): ((x: Fold2<A, B>) => O)
*/

export function
/*:: noop() {}; const noa = */
fold
/*:: ; const nob = function*/
(...folds: any) {
  return function folding(x: any) {
    return x.fold(...folds)
  }
}
