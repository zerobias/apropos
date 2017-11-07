# @apropos/core

## Core features for apropos data types

## API

### Base

> Base\<Name\>

Base class for data types.

```js
import { Base } from '@apropos/core'

export class TypedObject extends Base<'TypedObject'> {  }

```

### sanctuaryType

> sanctuaryType\<T\>(typeName: string|string[]): (T => T)

Sanctuary type annotations for interop


### fantasyType

> fantasyType\<T\>(dataClass: T): T

Fantasy-land type annotations for interop
