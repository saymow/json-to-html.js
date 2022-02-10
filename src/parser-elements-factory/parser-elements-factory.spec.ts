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

    it('Should create a valid arraySection', () => {
      const { sut, elementsFactorySpy } = makeSut()
      const arraySection = sut.createArraySection(faker.random.word())

      expect(arraySection).toBe(elementsFactorySpy.createSectionResult)
      expect(Array.from(arraySection.classList).includes('array')).toBeTruthy()
      expect(arraySection.contains(elementsFactorySpy.createSectionHeaderResult)).toBeTruthy()
    })
  })

  describe('createObjectSection', () => {
    it('Should call elementsFactory.createSection once', () => {
      const { sut, elementsFactorySpy } = makeSut()
      const createSectionSpy = jest.spyOn(elementsFactorySpy, 'createSection')
      const title = faker.random.word()
      sut.createObjectSection(title)

      expect(createSectionSpy).toHaveBeenCalledTimes(1)
    })

    it('Should call elementsFactory.createSectionHeader with correct value', () => {
      const { sut, elementsFactorySpy } = makeSut()
      const title = faker.random.word()
      sut.createObjectSection(title)

      expect(elementsFactorySpy.createSectionHeaderPlainText).toBe(title)
    })

    it('Should create a valid objectSection', () => {
      const { sut, elementsFactorySpy } = makeSut()
      const arraySection = sut.createObjectSection(faker.random.word())

      expect(arraySection).toBe(elementsFactorySpy.createSectionResult)
      expect(Array.from(arraySection.classList).includes('object')).toBeTruthy()
      expect(arraySection.contains(elementsFactorySpy.createSectionHeaderResult)).toBeTruthy()
    })
  })

  describe('createArrayContainer', () => {
    it('Should call elementsFactory.createContainer once', () => {
      const { sut, elementsFactorySpy } = makeSut()
      const createContainerSpy = jest.spyOn(elementsFactorySpy, 'createContainer')
      sut.createArrayContainer()

      expect(createContainerSpy).toHaveBeenCalledTimes(1)
    })

    it('Should create a valid arrayContainer', () => {
      const { sut, elementsFactorySpy } = makeSut()
      const arrayContainer = sut.createArrayContainer()

      expect(arrayContainer).toBe(elementsFactorySpy.createContainerResult)
      expect(Array.from(arrayContainer.classList).includes('array'))
    })
  })

  describe('createObjectContainer', () => {
    it('Should call elementsFactory.createContainer once', () => {
      const { sut, elementsFactorySpy } = makeSut()
      const createContainerSpy = jest.spyOn(elementsFactorySpy, 'createContainer')
      sut.createObjectContainer()

      expect(createContainerSpy).toHaveBeenCalledTimes(1)
    })
  })
})
