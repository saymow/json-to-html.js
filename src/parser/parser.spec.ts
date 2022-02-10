import { ParserElementsFactorySpy } from './test/mock-parser-elements-factory'
import { isPrimitive, isArray, isObject } from './helpers'
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

const makeFakeData = (): FakeData => ({
  primitive1: -11.492639,
  primitive2: '6205916b48f075831ce81ff3',
  array1: [1, 2, 3],
  array2: ['a', 'b', 'c'],
  obj1: {
    foo: 1,
    bar: 2
  },
  obj2: {
    lat: 2.684125,
    long: 135.424748
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

      const data = makeFakeData()
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

      const data = makeFakeData()
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

      const data = makeFakeData()
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

      const data = makeFakeData()
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
      sut.objectExecution({}, makeContainerEl())

      expect(createObjectContainerSpy).toHaveBeenCalledTimes(1)
    })
  })
})
