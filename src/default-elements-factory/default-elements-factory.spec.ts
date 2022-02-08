import { DefaultElementsFactory } from './default-elements-factory'

const makeSut = (): DefaultElementsFactory => {
  return new DefaultElementsFactory()
}

describe('DefaultElementsFactory', () => {
  describe("createSection()", () => {
    it('Should create a valid section element', () => {
      const sut = makeSut()
      const element = sut.createSection()

      expect(element.tagName.toLowerCase()).toEqual('section')
      expect(Array.from(element.classList)).toEqual(['section-container'])
    })
  })
  
  describe("createContainer()", () => {
    it('Should create a valid container element', () => {
      const sut = makeSut()
      const element = sut.createContainer()

      expect(element.tagName.toLowerCase()).toEqual('article')
      expect(Array.from(element.classList)).toEqual(['base-container'])
    })
  })
})