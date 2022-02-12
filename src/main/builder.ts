import { Json2Html } from '../presentation/json2html'
import { DefaultElementsFactory } from '../default-elements-factory/default-elements-factory'
import { ParserElementsFactory } from '../parser-elements-factory/parser-elements-factory'
import { IElementsFactory } from '../parser-elements-factory/protocols'
import { Parser } from '../parser/parser'

export default class JsonToHtmlBuilder {
  private readonly elementsFactory: IElementsFactory = new DefaultElementsFactory()

  constructor (
    private readonly data: any,
    private readonly containerEl: HTMLElement
  ) { }

  withCreateSectionEl (createSection: IElementsFactory['createSection']): JsonToHtmlBuilder {
    this.elementsFactory.createSection = createSection
    return this
  }

  withCreateSectionHeaderEl (createSectionHeader: IElementsFactory['createSectionHeader']): JsonToHtmlBuilder {
    this.elementsFactory.createSectionHeader = createSectionHeader
    return this
  }

  withCreateContainerEl (createContainer: IElementsFactory['createContainer']): JsonToHtmlBuilder {
    this.elementsFactory.createContainer = createContainer
    return this
  }

  withCreateFieldEl (createField: IElementsFactory['createField']): JsonToHtmlBuilder {
    this.elementsFactory.createField = createField
    return this
  }

  withCreateValueEl (createValue: IElementsFactory['createValue']): JsonToHtmlBuilder {
    this.elementsFactory.createValue = createValue
    return this
  }

  build (): Json2Html {
    return new Json2Html(this.data, this.containerEl, new Parser(new ParserElementsFactory(this.elementsFactory)))
  }
}
