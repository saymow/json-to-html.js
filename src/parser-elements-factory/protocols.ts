export interface IElementsFactory {
  createSection(): HTMLElement
  
  createContainer(): HTMLElement
  
  createSectionHeader(title: string): HTMLElement

  createField(key: string, value: any): HTMLElement

  createValue(value: any): HTMLElement
}