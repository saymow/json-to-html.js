import { IElementsFactory } from '../protocols'

export class ElementsFactorySpy implements IElementsFactory {
  createSectionResult = this.randomHtmlElement()
  createContainerResult = this.randomHtmlElement()
  createSectionHeaderPlainText?: string
  createSectionHeaderResult = this.randomHtmlElement()
  createFieldKey?: string
  createFieldValue?: string
  createFieldResult = this.randomHtmlElement()
  createValueValue?: string
  createValueResult = this.randomHtmlElement()

  createSection (): HTMLElement {
    return this.createSectionResult
  }

  createContainer (): HTMLElement {
    return this.createContainerResult
  }

  createSectionHeader (title: string): HTMLElement {
    this.createSectionHeaderPlainText = title
    return this.createSectionHeaderResult
  }

  createField (key: string, value: any): HTMLElement {
    this.createFieldKey = key
    this.createFieldValue = value
    return this.createFieldResult
  }

  createValue (value: any): HTMLElement {
    this.createValueValue = value
    return this.createValueResult
  }

  private randomHtmlElement (): HTMLElement {
    return document.createElement('div')
  }
}
