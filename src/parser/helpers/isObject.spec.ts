import faker from 'faker'
import { isObject } from './isObject'

describe('isObject helper', () => {
  it('should return true for Object', () => {
    expect(isObject({
      [faker.random.word()]: faker.random.number(),
      [faker.random.word()]: faker.random.number(),
      [faker.random.word()]: faker.random.number()
    })).toBeTruthy()
  })

  it('should return false for Array', () => {
    expect(isObject([faker.random.word(), faker.random.number()])).toBeFalsy()
  })

  it('should return false for string', () => {
    expect(isObject(faker.random.word())).toBeFalsy()
  })

  it('should return false for number', () => {
    expect(isObject(faker.random.number())).toBeFalsy()
  })

  it('should return false for null', () => {
    expect(isObject(null)).toBeFalsy()
  })

  it('should return false for undefined', () => {
    expect(isObject(undefined)).toBeFalsy()
  })

  it('should return false for Date', () => {
    expect(isObject(new Date())).toBeFalsy()
  })

  it('should return false for Symbol', () => {
    expect(isObject(Symbol(faker.random.word()))).toBeFalsy()
  })

  it('should return false for Function', () => {
    expect(isObject(() => { })).toBeFalsy()
  })
})
