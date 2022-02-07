import { DefaultElementsFactory } from "./default-elements-factory/default-elements-factory";
import { ParserElementsFactory } from "./parser-elements-factory/parser-elements-factory";
import { IElementsFactory } from "./parser-elements-factory/protocols";
import { Parser } from "./parser/parser";

export default class Json2HtmlBuilder {
  private elementsFactory: IElementsFactory = new DefaultElementsFactory()

  constructor(
    private readonly data: any,
    private readonly containerEl: HTMLElement
  ) { }

  withCreateSectionEl(createSection: IElementsFactory['createSection']): Json2HtmlBuilder {
    this.elementsFactory.createSection = createSection
    return this
  }

  withCreateSectionHeaderEl(createSectionHeader: IElementsFactory['createSectionHeader']): Json2HtmlBuilder {
    this.elementsFactory.createSectionHeader = createSectionHeader
    return this
  }

  withCreateContainerEl(createContainer: IElementsFactory['createContainer']): Json2HtmlBuilder {
    this.elementsFactory.createContainer = createContainer
    return this
  }

  withCreateFieldEl(createField: IElementsFactory['createField']): Json2HtmlBuilder {
    this.elementsFactory.createField = createField
    return this
  }

  withCreateValueEl(createValue: IElementsFactory['createValue']): Json2HtmlBuilder {
    this.elementsFactory.createValue = createValue
    return this
  }

  build() {
    return new Parser(this.data, this.containerEl, new ParserElementsFactory(this.elementsFactory))
  }
}