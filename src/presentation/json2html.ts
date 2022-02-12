import { IParser } from '../domain/parser'

export class Json2Html {
  constructor (
    private readonly data: any,
    private readonly containerEl: any,
    private readonly parser: IParser
  ) {}

  execute (): void {
    this.parser.execute(this.data, this.containerEl)
  }
}
