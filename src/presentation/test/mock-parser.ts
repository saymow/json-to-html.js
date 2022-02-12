import { IParser } from '../../domain/parser'

export class ParserSpy implements IParser {
  executeData?: any
  executeContainerEl?: HTMLElement

  execute (data: any, containerEl: HTMLElement): void {
    this.executeData = data
    this.executeContainerEl = containerEl
  }
}
