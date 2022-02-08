import { IParserElementsFactory } from '../parser/protocols'
import { IElementsFactory } from './protocols'

export class ParserElementsFactory implements IParserElementsFactory {
  ClassNames = {
    Container: {
      Array: 'array',
      Object: 'object'
    },
    Section: {
      Object: 'object',
      Array: 'array'
    }
  }

  constructor (private readonly elementsFactory: IElementsFactory) { }

  createArraySection (title: string): HTMLElement {
    const sectionEl = this.elementsFactory.createSection()
    const sectionHeader = this.elementsFactory.createSectionHeader(title)

    sectionEl.classList.add(this.ClassNames.Section.Array)
    sectionEl.appendChild(sectionHeader)

    return sectionEl
  }

  createObjectSection (title: string): HTMLElement {
    const sectionEl = this.elementsFactory.createSection()
    const sectionHeader = this.elementsFactory.createSectionHeader(title)

    sectionEl.classList.add(this.ClassNames.Section.Object)
    sectionEl.appendChild(sectionHeader)

    return sectionEl
  }

  createArrayContainer (): HTMLElement {
    const sectionEl = this.elementsFactory.createContainer()

    sectionEl.classList.add(this.ClassNames.Container.Array)

    return sectionEl
  }

  createObjectContainer (): HTMLElement {
    const sectionEl = this.elementsFactory.createContainer()

    sectionEl.classList.add(this.ClassNames.Container.Object)

    return sectionEl
  }

  createField (key: string, value: any): HTMLElement {
    return this.elementsFactory.createField(key, value)
  }

  createValue (value: any): HTMLElement {
    return this.elementsFactory.createValue(value)
  }
}
