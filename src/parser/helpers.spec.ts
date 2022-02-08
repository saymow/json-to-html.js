import { isPrimitive } from './helpers'
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
      expect(isPrimitive(() => {})).toBeFalsy()
    })
  })
})
