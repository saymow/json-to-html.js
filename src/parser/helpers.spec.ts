import { isPrimitive, isArray } from './helpers'
import faker from 'faker'

describe('Helpers', () => {
  describe('isPrimitive', () => {
    it('should return true for string', () => {
      expect(isPrimitive(faker.random.word())).toBeTruthy()
    })

    it('should return true for number', () => {
      expect(isPrimitive(faker.random.number())).toBeTruthy()
    })

    it('should return true for null', () => {
      expect(isPrimitive(null)).toBeTruthy()
    })

    it('should return true for undefined', () => {
      expect(isPrimitive(undefined)).toBeTruthy()
    })

    it('should return true for Date', () => {
      expect(isPrimitive(new Date())).toBeTruthy()
    })

    it('should return true for Symbol', () => {
      expect(isPrimitive(Symbol(faker.random.word()))).toBeTruthy()
    })

    it('should return false for Array', () => {
      expect(isPrimitive([faker.random.word(), faker.random.number()])).toBeFalsy()
    })

    it('should return false for Object', () => {
      expect(isPrimitive({
        [faker.random.word()]: faker.random.number(),
        [faker.random.word()]: faker.random.number(),
        [faker.random.word()]: faker.random.number()
      })).toBeFalsy()
    })

    it('should return false for Function', () => {
      expect(isPrimitive(() => { })).toBeFalsy()
    })
  })

  describe('isArray', () => {
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
})
