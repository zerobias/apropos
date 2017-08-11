const { is, of, ofL, Left, Right, makeError } = require('../lib')



describe('smoke test', () => {
  test('Right value', () => {
    const data = {}
    const r = of(data)
    const r1 = Right(data)

    expect(r).toHaveProperty('value', data)
    expect(r.isRight()).toBe(true)
    expect(r.isLeft()).toBe(false)

    expect(r1).toHaveProperty('value', data)
    expect(r1.isRight()).toBe(true)
    expect(r1.isLeft()).toBe(false)
  })

  test('Left value', () => {
    const data = {}
    const l = Left(data)
    const l1 = ofL(data)

    expect(l).toHaveProperty('value', data)
    expect(l.isRight()).toBe(false)
    expect(l.isLeft()).toBe(true)

    expect(l1).toHaveProperty('value', data)
    expect(l1.isRight()).toBe(false)
    expect(l1.isLeft()).toBe(true)
  })


  test('toString', () => {
    const data = 10
    const r = of(data)
    const l = Left(data)
    expect(r.toString()).toBe(`Right( 10 )`)
    expect(l.toString()).toBe(`Left( 10 )`)
  })

})


test('is', () => {
  const data = {}
  const r = of(data)
  const l = Left(data)
  expect(is(r)).toBe(true)
  expect(is(l)).toBe(true)
  expect(is(data)).toBe(false)
})


test('annotated error', () => {
  const data = {}
  const createTaggedError = makeError('error with tag')
  const errorInstance = createTaggedError(data)
  expect(errorInstance).toMatchObject({
    name: 'AnnotatedError',
    tag : 'error with tag',
    data
  })
})
