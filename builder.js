const isString = (data) => typeof data === 'string'
const isArray = (data) => Array.isArray(data)
const isArrayEmpty = (arr) => arr.length === 0
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
      const objectContainer = this.#createObjectContainer()

      Object.entries(data).forEach((entry) => {
        const [key, value] = entry

        if (isString(value)) {
          const field = this.#createField(key, value)

          objectContainer.appendChild(field)
        } else if (isArray(value)) {
          const arrayContainer = this.#createArraySection(key)

          this.#execute(value, arrayContainer)

          objectContainer.appendChild(arrayContainer)
        }
      })

      containerEl.appendChild(objectContainer)
    } else if (isArray(data) && !isArrayEmpty(data)) {
      if (!isArrayEmpty(data)) {
        const arrayContainer = this.#createArrayContainer()
        const sampleItem = data[0]

        if (isString(sampleItem)) {
          for (const value of data) {
            arrayContainer.appendChild(this.#createValue(value))
          }
        } else if (isObject(sampleItem)) {
          for (const value of data) {
            this.#execute(value, arrayContainer)
          }
        }

        containerEl.appendChild(arrayContainer)
      }
    }
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
