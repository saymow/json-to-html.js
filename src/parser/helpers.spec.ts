import { isPrimitive } from './helpers'
import faker from 'faker'

describe('Helpers', () => {
  describe('isPrimitive', () => {
    it('should return true for string', () => {
      expect(isPrimitive(faker.random.word()))
    })

    it('should return true for number', () => {
      expect(isPrimitive(faker.random.number()))
    })

    it('should return true for null', () => {
      expect(isPrimitive(null))
    })

    it('should return true for undefined', () => {
      expect(isPrimitive(undefined))
    })

    it('should return true for date', () => {
      expect(isPrimitive(faker.date))
    })
  })
})
