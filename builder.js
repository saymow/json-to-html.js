const isString = (data) => typeof data === 'string'
const isArray = (data) => Array.isArray(data)
const isObject = (data) =>
  typeof data === 'object' && !isArray(data) && data !== null

export class Builder {
  ClassNames = {
    Field: {
      Base: 'field-container',
      Key: 'key',
      Value: 'value',
    },
    Section: {
      Base: 'section-container',
      Object: 'object'
    },
  }

  /**
   * @param  {any} data
   * @param  {HTMLElement} containerEl
   */
  constructor(data, containerEl) {
    this.#execute(data, containerEl)
  }

  /**
   * @param  {any} data
   * @param  {HTMLElement} containerEl
   */
  #execute(data, containerEl) {
    if (isObject(data)) {
      const objectContainer = this.#createObjectSection()

      Object.entries(data).forEach((entry) => {
        const [key, value] = entry

        if (isString(value)) {
          const field = this.#createField(key, value)

          objectContainer.appendChild(field)
        }
      })

      containerEl.appendChild(objectContainer)
    }
  }

  /**
   * @returns HTMLElement
   */
  #createObjectSection() {
    const sectionEl = this.#createSection()

    sectionEl.classList.add(this.ClassNames.Section.Object)

    return sectionEl
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
   * @param  {string} key
   * @param  {string} value
   * @returns HTMLElement
   */
  #createField(key, value) {
    const containerEl = document.createElement('div')
    const keyEl = document.createElement('p')
    const valueEl = document.createElement('p')

    keyEl.textContent = `${key}:`
    valueEl.textContent = value

    containerEl.classList.add(this.ClassNames.Field.Base)
    keyEl.classList.add(this.ClassNames.Field.Key)
    valueEl.classList.add(this.ClassNames.Field.Value)

    containerEl.appendChild(keyEl)
    containerEl.appendChild(valueEl)

    return containerEl
  }
}
