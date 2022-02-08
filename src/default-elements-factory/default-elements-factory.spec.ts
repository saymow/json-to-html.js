import { DefaultElementsFactory } from './default-elements-factory'

const makeSut = (): DefaultElementsFactory => {
  return new DefaultElementsFactory()
}

describe('DefaultElementsFactory', () => {
  describe("createSection()", () => {
    it('Should create a valid section element', () => {
      const sut = makeSut()
      const section = sut.createSection()

      expect(section.tagName.toLowerCase()).toEqual('section')
      expect(Array.from(section.classList)).toEqual(['section-container'])
    })
  })

  describe("createContainer()", () => {
    it('Should create a valid container element', () => {
      const sut = makeSut()
      const container = sut.createContainer()

      expect(container.tagName.toLowerCase()).toEqual('article')
      expect(Array.from(container.classList)).toEqual(['base-container'])
    })
  })

  describe("createSectionHeader()", () => {
    it('Should create a valid sectionHeader element', () => {
      const sut = makeSut()
      const title = "some-title"
      const header = sut.createSectionHeader(title)
      const headerTitle = header.querySelector('h2')

      expect(header.tagName.toLowerCase()).toEqual('header')
      expect(Array.from(header.classList)).toEqual(['section-header'])
      expect(headerTitle).toBeDefined()
      expect(headerTitle!.textContent).toBe(title)
    })
  })

  describe("createField()", () => {
    it('Should create a valid field element', () => {
      const sut = makeSut()
      const key = "some-key"
      const value = "some-value"
      const field = sut.createField(key, value)
      const fieldKey = field.querySelector('.key')
      const fieldValue = field.querySelector('.value')

      expect(field.tagName.toLowerCase()).toEqual('div')
      expect(Array.from(field.classList)).toEqual(['field-container'])

      expect(fieldKey).toBeDefined()
      expect(fieldKey!.tagName.toLowerCase()).toEqual('p')
      expect(fieldKey!.textContent).toEqual(`${key}:`)

      expect(fieldValue).toBeDefined()
      expect(fieldValue!.tagName.toLowerCase()).toEqual('p')
      expect(fieldValue!.textContent).toEqual(value)
    })
  })

  describe("createValue()", () => {
    it('Should create a valid value element', () => {
      const sut = makeSut()
      const value = sut.createValue("some-value")

      expect(value!.tagName.toLowerCase()).toEqual('p')
      expect(value!.textContent).toEqual("some-value")
    })
  })
})