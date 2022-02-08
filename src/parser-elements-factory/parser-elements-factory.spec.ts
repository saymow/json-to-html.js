import { ElementsFactorySpy } from './mock-elements-factory'
import { ParserElementsFactory } from './parser-elements-factory'
import faker from 'faker'

interface SutTypes {
  elementsFactorySpy: ElementsFactorySpy
  sut: ParserElementsFactory
}

const makeSut = (): SutTypes => {
  const elementsFactorySpy = new ElementsFactorySpy()
  const sut = new ParserElementsFactory(elementsFactorySpy)

  return { sut, elementsFactorySpy }
}

describe('ParserElementsFactory', () => {
  describe('createArraySection', () => {
    it('Should call elementsFactory.createSection once', () => {
      const { sut, elementsFactorySpy } = makeSut()
      const createSectionSpy = jest.spyOn(elementsFactorySpy, 'createSection')
      const title = faker.random.word()
      sut.createArraySection(title)

      expect(createSectionSpy).toHaveBeenCalledTimes(1)
    })

    it('Should call elementsFactory.createSectionHeader with correct value', () => {
      const { sut, elementsFactorySpy } = makeSut()
      const title = faker.random.word()
      sut.createArraySection(title)

      expect(elementsFactorySpy.createSectionHeaderPlainText).toBe(title)
    })
  })
})
