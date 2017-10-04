//@flow


export type TypedObject<+Name> = {
  +'@@signature': Signature<Name> // is a lie
}

export type Meta<+Name> = $Exact<{
  +name: Name,
  +scope: string,
}>

export type Signature<+Name> = $Exact<{
  +meta: Meta<Name>,
}>

export interface TypedClass<+Name> {
  +signature: Signature<Name>
}
