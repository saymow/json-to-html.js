import { IElementsFactory } from "../parser-elements-factory/protocols";

export class DefaultElementsFactory implements IElementsFactory {
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
    },
    Section: {
      Header: {
        Base: 'section-header',
      },
      Base: 'section-container',
    },
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

  createContainer(): HTMLElement {
    const articleEl = document.createElement('article')

    articleEl.classList.add(this.ClassNames.Container.Base)

    return articleEl
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