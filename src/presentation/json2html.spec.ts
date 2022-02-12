import { Json2Html } from './json2html'
import { ParserSpy } from './test/mock-parser'

interface SutTypes {
  data: any
  containerEl: HTMLElement
  parserSpy: ParserSpy
  sut: Json2Html
}

const makeSut = (): SutTypes => {
  const data = {}
  const containerEl = document.createElement('div')
  const parserSpy = new ParserSpy()
  const sut = new Json2Html(data, containerEl, parserSpy)

  return { data, containerEl, parserSpy, sut }
}

describe('Json2Html', () => {
  describe('execute', () => {
    it('Should call parser.execute with correct values', () => {
      const { sut, data, containerEl, parserSpy } = makeSut()

      sut.execute()

      expect(parserSpy.executeData).toBe(data)
      expect(parserSpy.executeContainerEl).toBe(containerEl)
    })
  })
})
