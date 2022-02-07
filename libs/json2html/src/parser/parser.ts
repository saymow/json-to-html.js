import { isArray, isObject, isPrimitive } from './helpers'
import { IParserElementsFactory } from './protocols'

export class Parser {
  constructor(
    private readonly data: any,
    private readonly containerEl: HTMLElement,
    private readonly elementsFactory: IParserElementsFactory
  ) { }

  execute() {
    this.executeHelper(this.data, this.containerEl)
  }

  private executeHelper(data: any, containerEl: HTMLElement) {
    if (isObject(data)) {
      this.objectExecution(data, containerEl)
    } else if (isArray(data)) {
      this.arrayExecution(data, containerEl)
    } else if (isPrimitive(data)) {
      this.primitiveExecution(data, containerEl)
    }
  }

  private objectExecution(data: any, containerEl: HTMLElement) {
    const objectContainer = this.elementsFactory.createObjectContainer()

    Object.entries(data).forEach((entry) => {
      const [key, value] = entry

      if (isPrimitive(value)) {
        objectContainer.appendChild(this.elementsFactory.createField(key, value))
      } else if (isArray(value)) {
        const arraySectionEl = this.elementsFactory.createArraySection(key)
        this.executeHelper(value, arraySectionEl)

        objectContainer.appendChild(arraySectionEl)
      } else if (isObject(value)) {
        const objectSectionEl = this.elementsFactory.createObjectSection(key)
        this.executeHelper(value, objectSectionEl)

        objectContainer.appendChild(objectSectionEl)
      }
    })

    containerEl.appendChild(objectContainer)
  }

  private arrayExecution(data: any, containerEl: HTMLElement) {
    const arrayContainer = this.elementsFactory.createArrayContainer()

    for (const value of data) {
      this.executeHelper(value, arrayContainer)
    }

    containerEl.appendChild(arrayContainer)
  }

  private primitiveExecution(data: any, containerEl: HTMLElement) {
    containerEl.appendChild(this.elementsFactory.createValue(data))
  }
}