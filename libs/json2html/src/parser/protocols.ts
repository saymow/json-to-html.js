export interface IParserElementsFactory {
  createArraySection(title: string): HTMLElement

  createObjectSection(title: string): HTMLElement

  createArrayContainer(): HTMLElement

  createObjectContainer(): HTMLElement

  createField(key: string, value: any): HTMLElement

  createValue(value: any): HTMLElement
}