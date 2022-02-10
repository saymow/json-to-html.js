import { isArray, isObject, isPrimitive } from './helpers'
import { IParserElementsFactory } from './protocols'
import { IParser } from '../domain/parser'

export class Parser implements IParser {
  constructor (
    private readonly elementsFactory: IParserElementsFactory
  ) { }

  execute (data: any, containerEl: HTMLElement): void {
    if (isObject(data)) {
      this.objectExecution(data, containerEl)
    } else if (isArray(data)) {
      this.arrayExecution(data, containerEl)
    } else if (isPrimitive(data)) {
      this.primitiveExecution(data, containerEl)
    }
  }

  objectExecution (data: Object, containerEl: HTMLElement): void {
    const objectContainer = this.elementsFactory.createObjectContainer()

    Object.entries(data).forEach((entry) => {
      const [key, value] = entry

      if (isPrimitive(value)) {
        objectContainer.appendChild(this.elementsFactory.createField(key, value))
      } else if (isArray(value)) {
        const arraySectionEl = this.elementsFactory.createArraySection(key)
        this.execute(value, arraySectionEl)

        objectContainer.appendChild(arraySectionEl)
      } else if (isObject(value)) {
        const objectSectionEl = this.elementsFactory.createObjectSection(key)
        this.execute(value, objectSectionEl)

        objectContainer.appendChild(objectSectionEl)
      }
    })

    containerEl.appendChild(objectContainer)
  }

  arrayExecution (data: any[], containerEl: HTMLElement): void {
    const arrayContainer = this.elementsFactory.createArrayContainer()

    for (const value of data) {
      this.execute(value, arrayContainer)
    }

    containerEl.appendChild(arrayContainer)
  }

  primitiveExecution (data: any, containerEl: HTMLElement): void {
    containerEl.appendChild(this.elementsFactory.createValue(data))
  }
}
