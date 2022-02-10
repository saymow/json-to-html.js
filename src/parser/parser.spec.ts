import { ParserElementsFactorySpy } from './mock-parser-elements-factory'
import { Parser } from './parser'

interface SutTypes {
  data: any
  containerEl: HTMLElement
  elementsFactorySpy: ParserElementsFactorySpy
  sut: Parser
}

const makeFakeSimpleData = (): any => ({
  name: 'Gustavo',
  surname: 'Alves',
  age: 21,
  email: 'gustavo_alves2010@yahoo.com.br'
})

const makeSut = (data: any): SutTypes => {
  const containerEl = document.createElement('div')
  const elementsFactorySpy = new ParserElementsFactorySpy()
  const sut = new Parser(data, containerEl, elementsFactorySpy)

  return { data, containerEl, elementsFactorySpy, sut }
}

describe('Parser', () => {
  describe('execute', () => {
    it('Should call executeHelper with correct values', () => {
      const { sut, data, containerEl } = makeSut(makeFakeSimpleData())
      const executeHelperSpy = jest.spyOn<any, any>(sut, 'executeHelper')
      sut.execute()

      expect(executeHelperSpy).toHaveBeenCalledWith(data, containerEl)
    })
  })
})
