const isPrimitive = (data: any) => data !== Object(data)
const isArray = (data: any) => Array.isArray(data)
const isObject = (data: any) =>
  typeof data === 'object' && !isArray(data) && data !== null

export class Builder {
  ClassNames = {
    Value: {
      Base: 'value',
    },
    Field: {
      Base: 'field-container',
      Key: 'key',
    },
    Container: {
      Base: 'base-container',
      Array: 'array',
      Object: 'object',
    },
    Section: {
      Header: {
        Base: 'section-header',
      },
      Base: 'section-container',
      Object: 'object',
      Array: 'array',
    },
  }

  /**
   * @param  {any} data
   * @param  {HTMLElement} containerEl
   */
  constructor(
    private readonly data: any,
    private readonly containerEl: HTMLElement
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
    const objectContainer = this.createObjectContainer()

    Object.entries(data).forEach((entry) => {
      const [key, value] = entry

      if (isPrimitive(value)) {
        objectContainer.appendChild(this.createField(key, value))
      } else if (isArray(value)) {
        const arraySectionEl = this.createArraySection(key)
        this.executeHelper(value, arraySectionEl)

        objectContainer.appendChild(arraySectionEl)
      } else if (isObject(value)) {
        const objectSectionEl = this.createObjectSection(key)
        this.executeHelper(value, objectSectionEl)

        objectContainer.appendChild(objectSectionEl)
      }
    })

    containerEl.appendChild(objectContainer)
  }

  private arrayExecution(data: any, containerEl: HTMLElement) {
    const arrayContainer = this.createArrayContainer()

    for (const value of data) {
      this.executeHelper(value, arrayContainer)
    }

    containerEl.appendChild(arrayContainer)
  }

  private primitiveExecution(data: any, containerEl: HTMLElement) {
    containerEl.appendChild(this.createValue(data))
  }

  private createArraySection(title: string): HTMLElement {
    const sectionEl = this.createSection()
    const sectionHeader = this.createSectionHeader(title)

    sectionEl.classList.add(this.ClassNames.Section.Array)
    sectionEl.appendChild(sectionHeader)

    return sectionEl
  }

  private createObjectSection(title: string): HTMLElement {
    const sectionEl = this.createSection()
    const sectionHeader = this.createSectionHeader(title)

    sectionEl.classList.add(this.ClassNames.Section.Object)
    sectionEl.appendChild(sectionHeader)

    return sectionEl
  }

  private createArrayContainer(): HTMLElement {
    const sectionEl = this.createContainer()

    sectionEl.classList.add(this.ClassNames.Container.Array)

    return sectionEl
  }

  private createObjectContainer(): HTMLElement {
    const sectionEl = this.createContainer()

    sectionEl.classList.add(this.ClassNames.Container.Object)

    return sectionEl
  }

  private createContainer(): HTMLElement {
    const articleEl = document.createElement('article')

    articleEl.classList.add(this.ClassNames.Container.Base)

    return articleEl
  }

  createSection(): HTMLElement {
    const sectionEl = document.createElement('section')

    sectionEl.classList.add(this.ClassNames.Section.Base)

    return sectionEl
  }

  createSectionHeader(title: string): HTMLElement {
    const headerEl = document.createElement('header')
    const titleEl = document.createElement('h2')

    titleEl.textContent = title
    headerEl.classList.add(this.ClassNames.Section.Header.Base)
    headerEl.appendChild(titleEl)

    return headerEl
  }

  createField(key: string, value: any): HTMLElement {
    const containerEl = document.createElement('div')
    const keyEl = document.createElement('p')
    const valueEl = this.createValue(value)

    keyEl.textContent = `${key}:`

    containerEl.classList.add(this.ClassNames.Field.Base)
    keyEl.classList.add(this.ClassNames.Field.Key)

    containerEl.appendChild(keyEl)
    containerEl.appendChild(valueEl)

    return containerEl
  }

  createValue(value: any): HTMLElement {
    const valueEl = document.createElement('p')

    valueEl.textContent = value
    valueEl.classList.add(this.ClassNames.Value.Base)

    return valueEl
  }
}
