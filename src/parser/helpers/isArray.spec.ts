import { isArray } from './isArray'
import faker from 'faker'

describe('isArray helper', () => {
  it('should return true for Array', () => {
    expect(isArray([faker.random.word(), faker.random.number()])).toBeTruthy()
  })

  it('should return false for string', () => {
    expect(isArray(faker.random.word())).toBeFalsy()
  })

  it('should return false for number', () => {
    expect(isArray(faker.random.number())).toBeFalsy()
  })

  it('should return false for null', () => {
    expect(isArray(null)).toBeFalsy()
  })

  it('should return false for undefined', () => {
    expect(isArray(undefined)).toBeFalsy()
  })

  it('should return false for Date', () => {
    expect(isArray(new Date())).toBeFalsy()
  })

  it('should return false for Symbol', () => {
    expect(isArray(Symbol(faker.random.word()))).toBeFalsy()
  })

  it('should return false for Object', () => {
    expect(isArray({
      [faker.random.word()]: faker.random.number(),
      [faker.random.word()]: faker.random.number(),
      [faker.random.word()]: faker.random.number()
    })).toBeFalsy()
  })

  it('should return false for Function', () => {
    expect(isArray(() => { })).toBeFalsy()
  })
})
