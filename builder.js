const isString = (data) => typeof data === 'string'
const isArray = (data) => Array.isArray(data)
const isObject = (data) =>
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
  constructor(data, containerEl) {
    this.data = data
    this.containerEl = containerEl
  }

  execute() {
    this.#execute(this.data, this.containerEl)
  }

  /**
   * @param  {any} data
   * @param  {HTMLElement} containerEl
   */
  #execute(data, containerEl) {
    if (isObject(data)) {
      this.#objectExecution(data, containerEl)
    } else if (isArray(data)) {
      this.#arrayExecution(data, containerEl)
    } else if (isString(data)) {
      this.#stringExecution(data, containerEl)
    }
  }

  /**
   * @param  {any} data
   * @param  {HTMLElement} containerEl
   */
  #objectExecution(data, containerEl) {
    const objectContainer = this.#createObjectContainer()

    Object.entries(data).forEach((entry) => {
      const [key, value] = entry

      if (isString(value)) {
        objectContainer.appendChild(this.#createField(key, value))
      } else if (isArray(value)) {
        const arraySectionEl = this.#createArraySection(key)
        this.#execute(value, arraySectionEl)

        objectContainer.appendChild(arraySectionEl)
      } else if (isObject(value)) {
        const objectSectionEl = this.#createObjectSection(key)
        this.#execute(value, objectSectionEl)

        objectContainer.appendChild(objectSectionEl)
      }
    })

    containerEl.appendChild(objectContainer)
  }

  /**
   * @param  {any} data
   * @param  {HTMLElement} containerEl
   */
  #arrayExecution(data, containerEl) {
    const arrayContainer = this.#createArrayContainer()

    for (const value of data) {
      this.#execute(value, arrayContainer)
    }

    containerEl.appendChild(arrayContainer)
  }

  /**
   * @param  {any} data
   * @param  {HTMLElement} containerEl
   */
  #stringExecution(data, containerEl) {
    containerEl.appendChild(this.#createValue(data))
  }

  /**
   * @param {string} title
   * @returns HTMLElement
   */
  #createArraySection(title) {
    const sectionEl = this.#createSection()
    const sectionHeader = this.#createSectionHeader(title)

    sectionEl.classList.add(this.ClassNames.Section.Array)
    sectionEl.appendChild(sectionHeader)

    return sectionEl
  }

  /**
   * @param {string} title
   * @returns HTMLElement
   */
  #createObjectSection(title) {
    const sectionEl = this.#createSection()
    const sectionHeader = this.#createSectionHeader(title)

    sectionEl.classList.add(this.ClassNames.Section.Object)
    sectionEl.appendChild(sectionHeader)

    return sectionEl
  }

  /**
   * @returns HTMLElement
   */
  #createArrayContainer() {
    const sectionEl = this.#createContainer()

    sectionEl.classList.add(this.ClassNames.Container.Array)

    return sectionEl
  }

  /**
   * @returns HTMLElement
   */
  #createObjectContainer() {
    const sectionEl = this.#createContainer()

    sectionEl.classList.add(this.ClassNames.Container.Object)

    return sectionEl
  }

  /**
   * @returns HTMLElement
   */
  #createContainer() {
    const articleEl = document.createElement('article')

    articleEl.classList.add(this.ClassNames.Container.Base)

    return articleEl
  }

  /**
   * @returns HTMLElement
   */
  #createSection() {
    const sectionEl = document.createElement('section')

    sectionEl.classList.add(this.ClassNames.Section.Base)

    return sectionEl
  }

  /**
   * @param  {string} title
   * @returns HTMLElement
   */
  #createSectionHeader(title) {
    const headerEl = document.createElement('header')
    const titleEl = document.createElement('h2')

    titleEl.textContent = title
    headerEl.classList.add(this.ClassNames.Section.Header.Base)
    headerEl.appendChild(titleEl)

    return headerEl
  }

  /**
   * @param  {string} key
   * @param  {string} value
   * @returns HTMLElement
   */
  #createField(key, value) {
    const containerEl = document.createElement('div')
    const keyEl = document.createElement('p')
    const valueEl = this.#createValue(value)

    keyEl.textContent = `${key}:`

    containerEl.classList.add(this.ClassNames.Field.Base)
    keyEl.classList.add(this.ClassNames.Field.Key)

    containerEl.appendChild(keyEl)
    containerEl.appendChild(valueEl)

    return containerEl
  }

  /**
   * @param  {string} value
   * @returns HTMLElement
   */
  #createValue(value) {
    const valueEl = document.createElement('p')

    valueEl.textContent = value
    valueEl.classList.add(this.ClassNames.Value.Base)

    return valueEl
  }
}
