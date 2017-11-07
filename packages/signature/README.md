# @apropos/signature

## Typeclass metadata via signature symbol protocol

Motivation: provide unified way to store and access to metadata.
For example `fantasy-land` is used `fantasy-land/{method}` object property for each method, and `sanctuary-type-classes` forces to use `constructor` property to store its type signature, which is unacceptable.

## API

### signature

Signature symbol itself

```js
/**
 * @module ./typed-object.js
 */
import { signature } from '@apropos/signature'

export class TypedObject {
  get [signature]() {
    return {
      name:  'TypedObject',
      scope: 'typed-lib',
    }
  }
}


```

### hasSignature

> hasSignature(obj: any): boolean

Safely checks type signature existance

```js
import { hasSignature } from '@apropos/signature'
import { TypedObject } from './typed-object'

const typed = new TypedObject()

hasSignature(typed) // => true

hasSignature({}) // => false

```

### getSignature

> getSignature(obj: TypedObject): Signature

Get signature from typed object

```js
import { getSignature } from '@apropos/signature'
import { TypedObject } from './typed-object'

const typed = new TypedObject()

getSignature(typed) // => { name: 'TypedObject', scope: 'typed-lib' }

```
