import { ParserElementsFactorySpy } from './test/mock-parser-elements-factory'
import { Parser } from './parser'
import { isObject, isArray, isPrimitive } from './helpers'

interface SutTypes {
  elementsFactorySpy: ParserElementsFactorySpy
  sut: Parser
}

const makeFakeSimpleData = (): any => ({
  name: 'Gustavo',
  surname: 'Alves',
  age: 21,
  email: 'gustavo_alves2010@yahoo.com.br'
})

export const makeContainerEl = (): HTMLElement => {
  return document.createElement('div')
}

const makeSut = (): SutTypes => {
  const elementsFactorySpy = new ParserElementsFactorySpy()
  const sut = new Parser(elementsFactorySpy)

  return { sut, elementsFactorySpy }
}

describe('Parser', () => {
  describe('execute', () => {
    it('Should only call objectExecution only and if only isObject returns true', () => {
      const { sut } = makeSut()
      const primitiveExecutionSpy = jest.spyOn(sut, 'primitiveExecution')
      const arrayExecutionSpy = jest.spyOn(sut, 'arrayExecution')
      const objectExecutionSpy = jest.spyOn(sut, 'objectExecution')

      jest.fn(isObject).mockReturnValueOnce(true)
      jest.fn(isArray).mockReturnValueOnce(false)
      jest.fn(isPrimitive).mockReturnValueOnce(false)

      const data = makeFakeSimpleData()
      const containerEl = makeContainerEl()
      sut.execute(data, containerEl)

      expect(objectExecutionSpy).toHaveBeenCalledWith(data, containerEl)
      expect(primitiveExecutionSpy).not.toHaveBeenCalled()
      expect(arrayExecutionSpy).not.toHaveBeenCalled()
    })
  })
})
