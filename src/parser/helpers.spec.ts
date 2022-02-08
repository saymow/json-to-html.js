import { isPrimitive } from './helpers'
import faker from 'faker'

describe('Helpers', () => {
  describe('isPrimitive', () => {
    it('should return true for string', () => {
      expect(isPrimitive(faker.random.word()))
    })
  })
})
