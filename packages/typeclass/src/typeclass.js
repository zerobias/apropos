//@flow

/* eslint-disable no-unused-vars */

import { type ᐊ2, type ᐊ3 } from './variance'

// export opaque type 

//eslint-disable-next-line
export opaque type Type0<+Type> = Type



export type Type1<+Type, -A> = Type0<Type>
export type Type2<+Type, -A, -B> = Type1<Type, ᐊ2<A, B>>
export type Type3<+Type, -A, -B, -C> = Type1<Type, ᐊ3<A, B, C>>

export type Typeclass<+Name, -Type> = Name

export type λMap<-Type> = Typeclass<'Map', Type>
