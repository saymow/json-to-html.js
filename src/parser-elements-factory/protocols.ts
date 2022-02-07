export interface IElementsFactory {
  createSection(): HTMLElement
  
  createSectionHeader(title: string): HTMLElement

  createContainer(): HTMLElement

  createField(key: string, value: any): HTMLElement

  createValue(value: any): HTMLElement
}