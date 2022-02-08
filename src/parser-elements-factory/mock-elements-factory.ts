import { IElementsFactory } from './protocols'

export class ElementsFactorySpy implements IElementsFactory {
  createSectionHeaderPlainText!: string
  createFieldKey!: string
  createFieldValue!: string
  createValueValue!: string

  createSection (): HTMLElement {
    return this.randomHtmlElement()
  }

  createContainer (): HTMLElement {
    return this.randomHtmlElement()
  }

  createSectionHeader (title: string): HTMLElement {
    this.createSectionHeaderPlainText = title
    return this.randomHtmlElement()
  }

  createField (key: string, value: any): HTMLElement {
    this.createFieldKey = key
    this.createFieldValue = value
    return this.randomHtmlElement()
  }

  createValue (value: any): HTMLElement {
    this.createValueValue = value
    return this.randomHtmlElement()
  }

  private randomHtmlElement (): HTMLElement {
    return document.createElement('div')
  }
}
