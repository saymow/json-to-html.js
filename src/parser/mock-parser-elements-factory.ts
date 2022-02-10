import { IParserElementsFactory } from './protocols'

export class ParserElementsFactorySpy implements IParserElementsFactory {
  createArraySectionPlainText?: string
  createArraySectionResult = this.randomHtmlElement()
  createObjectSectionPlainText?: string
  createObjectSectionResult = this.randomHtmlElement()
  createArrayContainerResult = this.randomHtmlElement()
  createObjectContainerResult = this.randomHtmlElement()
  createFieldKey?: string
  createFieldValue?: string
  createFieldResult = this.randomHtmlElement()
  createValuePlaintext?: string
  createValueResult = this.randomHtmlElement()

  createArraySection (title: string): HTMLElement {
    this.createArraySectionPlainText = title
    return this.createArraySectionResult
  }

  createObjectSection (title: string): HTMLElement {
    this.createObjectSectionPlainText = title
    return this.createObjectSectionResult
  }

  createArrayContainer (): HTMLElement {
    return this.createArrayContainerResult
  }

  createObjectContainer (): HTMLElement {
    return this.createObjectContainerResult
  }

  createField (key: string, value: any): HTMLElement {
    this.createFieldKey = key
    this.createFieldValue = value
    return this.createFieldResult
  }

  createValue (value: any): HTMLElement {
    this.createValuePlaintext = value
    return this.createValueResult
  }

  private randomHtmlElement (): HTMLElement {
    return document.createElement('div')
  }
}
