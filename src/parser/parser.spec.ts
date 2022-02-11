import { ParserElementsFactorySpy } from './test/mock-parser-elements-factory'
import { isPrimitive, isArray, isObject } from './helpers'
import faker from 'faker'
import { Parser } from './parser'

const mockIsPrimitive = isPrimitive as jest.Mock
const mockIsArray = isArray as jest.Mock
const mockIsObject = isObject as jest.Mock

jest.mock('./helpers', () => ({
  isPrimitive: jest.fn(),
  isArray: jest.fn(),
  isObject: jest.fn()
}))

interface FakeData {
  primitive1: number
  primitive2: string
  array1: number[]
  array2: string[]
  obj1: {
    foo: number
    bar: number
  }
  obj2: {
    lat: number
    long: number
  }
}

const makeFakeObjectContainerData = (): FakeData => ({
  primitive1: faker.random.number(),
  primitive2: faker.random.word(),
  array1: [faker.random.number(), faker.random.number(), faker.random.number()],
  array2: [faker.random.word(), faker.random.word(), faker.random.word()],
  obj1: {
    foo: faker.random.number(),
    bar: faker.random.number()
  },
  obj2: {
    lat: faker.random.number(),
    long: faker.random.number()
  }
})

export const makeContainerEl = (): HTMLElement => {
  return document.createElement('div')
}

interface SutTypes {
  elementsFactorySpy: ParserElementsFactorySpy
  sut: Parser
}

const makeSut = (): SutTypes => {
  const elementsFactorySpy = new ParserElementsFactorySpy()
  const sut = new Parser(elementsFactorySpy)

  return { sut, elementsFactorySpy }
}

describe('Parser', () => {
  describe('execute', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('Should only call objectExecution only and if only isObject returns true', () => {
      const { sut } = makeSut()
      const primitiveExecutionSpy = jest.spyOn(sut, 'primitiveExecution').mockImplementationOnce(() => { })
      const arrayExecutionSpy = jest.spyOn(sut, 'arrayExecution').mockImplementationOnce(() => { })
      const objectExecutionSpy = jest.spyOn(sut, 'objectExecution').mockImplementationOnce(() => { })

      mockIsPrimitive.mockReturnValue(false)
      mockIsArray.mockReturnValue(false)
      mockIsObject.mockReturnValue(true)

      const data = makeFakeObjectContainerData()
      const containerEl = makeContainerEl()
      sut.execute(data, containerEl)

      expect(objectExecutionSpy).toHaveBeenCalledWith(data, containerEl)
      expect(primitiveExecutionSpy).not.toHaveBeenCalled()
      expect(arrayExecutionSpy).not.toHaveBeenCalled()
    })

    it('Should only call arrayExecution only and if only isArray returns true', () => {
      const { sut } = makeSut()
      const primitiveExecutionSpy = jest.spyOn(sut, 'primitiveExecution').mockImplementationOnce(() => { })
      const arrayExecutionSpy = jest.spyOn(sut, 'arrayExecution').mockImplementationOnce(() => { })
      const objectExecutionSpy = jest.spyOn(sut, 'objectExecution').mockImplementationOnce(() => { })

      mockIsPrimitive.mockReturnValue(false)
      mockIsArray.mockReturnValue(true)
      mockIsObject.mockReturnValue(false)

      const data = makeFakeObjectContainerData()
      const containerEl = makeContainerEl()
      sut.execute(data, containerEl)

      expect(arrayExecutionSpy).toHaveBeenCalledWith(data, containerEl)
      expect(primitiveExecutionSpy).not.toHaveBeenCalled()
      expect(objectExecutionSpy).not.toHaveBeenCalled()
    })

    it('Should only call primitiveExecution only and if only isPrimitive returns true', () => {
      const { sut } = makeSut()
      const primitiveExecutionSpy = jest.spyOn(sut, 'primitiveExecution').mockImplementationOnce(() => { })
      const arrayExecutionSpy = jest.spyOn(sut, 'arrayExecution').mockImplementationOnce(() => { })
      const objectExecutionSpy = jest.spyOn(sut, 'objectExecution').mockImplementationOnce(() => { })

      mockIsPrimitive.mockReturnValue(true)
      mockIsArray.mockReturnValue(false)
      mockIsObject.mockReturnValue(false)

      const data = makeFakeObjectContainerData()
      const containerEl = makeContainerEl()
      sut.execute(data, containerEl)

      expect(primitiveExecutionSpy).toHaveBeenCalledWith(data, containerEl)
      expect(arrayExecutionSpy).not.toHaveBeenCalled()
      expect(objectExecutionSpy).not.toHaveBeenCalled()
    })

    it('Should call nothing if and only if isPrimitive, isArray and isObject returns false', () => {
      const { sut } = makeSut()
      const primitiveExecutionSpy = jest.spyOn(sut, 'primitiveExecution').mockImplementationOnce(() => { })
      const arrayExecutionSpy = jest.spyOn(sut, 'arrayExecution').mockImplementationOnce(() => { })
      const objectExecutionSpy = jest.spyOn(sut, 'objectExecution').mockImplementationOnce(() => { })

      mockIsPrimitive.mockReturnValue(false)
      mockIsArray.mockReturnValue(false)
      mockIsObject.mockReturnValue(false)

      const data = makeFakeObjectContainerData()
      const containerEl = makeContainerEl()
      sut.execute(data, containerEl)

      expect(primitiveExecutionSpy).not.toHaveBeenCalled()
      expect(arrayExecutionSpy).not.toHaveBeenCalled()
      expect(objectExecutionSpy).not.toHaveBeenCalled()
    })
  })

  describe('objectExecution', () => {
    it('Should call elementsFactory.createObjectContainer once', () => {
      const { sut, elementsFactorySpy } = makeSut()
      const createObjectContainerSpy = jest.spyOn(elementsFactorySpy, 'createObjectContainer')
      sut.objectExecution(makeFakeObjectContainerData(), makeContainerEl())

      expect(createObjectContainerSpy).toHaveBeenCalledTimes(1)
    })

    it('Should append the objectContainer to the given container', () => {
      const { sut, elementsFactorySpy } = makeSut()
      const containerEl = makeContainerEl()
      sut.objectExecution(makeFakeObjectContainerData(), containerEl)

      expect(containerEl.children.length).toBe(1)
      expect(Array.from(containerEl.children).includes(elementsFactorySpy.createObjectContainerResult)).toBeTruthy()
    })

    it('Should only call (once for each object field) elementsFactory.createField, with correct values, and append its return element to objectContainer if isPrimitive returns true', () => {
      const { sut, elementsFactorySpy } = makeSut()
      const createFieldSpy = jest.spyOn(elementsFactorySpy, 'createField')
      const createArraySectionSpy = jest.spyOn(elementsFactorySpy, 'createArraySection')
      const createObjectSectionSpy = jest.spyOn(elementsFactorySpy, 'createObjectSection')

      mockIsPrimitive.mockReturnValue(true)
      mockIsArray.mockReturnValue(false)
      mockIsObject.mockReturnValue(false)

      const data = makeFakeObjectContainerData()
      sut.objectExecution(data, makeContainerEl())

      expect(createFieldSpy).toHaveBeenCalled()
      expect(createArraySectionSpy).not.toHaveBeenCalled()
      expect(createObjectSectionSpy).not.toHaveBeenCalled()

      expect(Object.entries(data)).toEqual(createFieldSpy.mock.calls)
      createFieldSpy.mock.results.forEach((createFieldResult) => {
        expect(elementsFactorySpy.createObjectContainerResult.contains(createFieldResult.value)).toBeTruthy()
      })
    })
  })
})
