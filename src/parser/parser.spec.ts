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

const makeFakeSimpleData = (): any => ({
  name: 'Gustavo',
  surname: 'Alves',
  age: 21,
  email: 'gustavo_alves2010@yahoo.com.br'
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

      const data = makeFakeSimpleData()
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

      const data = makeFakeSimpleData()
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

      const data = makeFakeSimpleData()
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

      const data = makeFakeSimpleData()
      const containerEl = makeContainerEl()
      sut.execute(data, containerEl)

      expect(primitiveExecutionSpy).not.toHaveBeenCalled()
      expect(arrayExecutionSpy).not.toHaveBeenCalled()
      expect(objectExecutionSpy).not.toHaveBeenCalled()
    })
  })
})
