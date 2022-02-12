import { ParserElementsFactorySpy } from './test/mock-parser-elements-factory'
import { isPrimitive, isArray, isObject } from './helpers'
import faker from 'faker'
import { Parser } from './parser'

const mockIsPrimitive = isPrimitive as jest.Mock
const mockIsArray = isArray as jest.Mock
const mockIsObject = isObject as jest.Mock

jest.mock('./helpers', () => ({
  isPrimitive: jest.fn(),
  isArray: jest.fn(),
  isObject: jest.fn()
}))

interface FakeData {
  primitive1: number
  primitive2: string
  array1: number[]
  array2: string[]
  obj1: {
    foo: number
    bar: number
  }
  obj2: {
    lat: number
    long: number
  }
}

const makeFakeObjectContainerData = (): FakeData => ({
  primitive1: faker.random.number(),
  primitive2: faker.random.word(),
  array1: [faker.random.number(), faker.random.number(), faker.random.number()],
  array2: [faker.random.word(), faker.random.word(), faker.random.word()],
  obj1: {
    foo: faker.random.number(),
    bar: faker.random.number()
  },
  obj2: {
    lat: faker.random.number(),
    long: faker.random.number()
  }
})

const makeFakeObjectContainerData2 = (): string[] => [faker.random.word(), faker.random.word(), faker.random.word()]

export const makeContainerEl = (): HTMLElement => {
  return makeRandomEl()
}

export const makeRandomEl = (): HTMLElement => {
  return document.createElement('div')
}

interface SutTypes {
  elementsFactorySpy: ParserElementsFactorySpy
  sut: Parser
}

const makeSut = (): SutTypes => {
  const elementsFactorySpy = new ParserElementsFactorySpy()
  const sut = new Parser(elementsFactorySpy)

  return { sut, elementsFactorySpy }
}

describe('Parser', () => {
  beforeEach(() => {
    mockIsArray.mockClear()
    mockIsPrimitive.mockClear()
    mockIsObject.mockClear()
  })

  describe('execute', () => {
    it('Should call isPrimitive, isArray and isObject once and with correct value', () => {
      const { sut } = makeSut()

      mockIsPrimitive.mockReturnValue(false)
      mockIsArray.mockReturnValue(false)
      mockIsObject.mockReturnValue(false)

      const data = makeFakeObjectContainerData()
      const containerEl = makeContainerEl()
      sut.execute(data, containerEl)

      expect(mockIsPrimitive).toBeCalledTimes(1)
      expect(mockIsArray).toBeCalledTimes(1)
      expect(mockIsObject).toBeCalledTimes(1)

      expect(mockIsPrimitive.mock.calls[0]).toEqual([data])
      expect(mockIsArray.mock.calls[0]).toEqual([data])
      expect(mockIsObject.mock.calls[0]).toEqual([data])
    })

    it('Should only call objectExecution only and if only isObject returns true', () => {
      const { sut } = makeSut()
      const primitiveExecutionSpy = jest.spyOn(sut, 'primitiveExecution').mockImplementationOnce(() => { })
      const arrayExecutionSpy = jest.spyOn(sut, 'arrayExecution').mockImplementationOnce(() => { })
      const objectExecutionSpy = jest.spyOn(sut, 'objectExecution').mockImplementationOnce(() => { })

      mockIsPrimitive.mockReturnValue(false)
      mockIsArray.mockReturnValue(false)
      mockIsObject.mockReturnValue(true)

      const data = makeFakeObjectContainerData()
      const containerEl = makeContainerEl()
      sut.execute(data, containerEl)

      expect(objectExecutionSpy).toHaveBeenCalledWith(data, containerEl)
      expect(primitiveExecutionSpy).not.toHaveBeenCalled()
      expect(arrayExecutionSpy).not.toHaveBeenCalled()
    })

    it('Should only call arrayExecution only and if only isArray returns true', () => {
      const { sut } = makeSut()
      const primitiveExecutionSpy = jest.spyOn(sut, 'primitiveExecution').mockImplementationOnce(() => { })
      const arrayExecutionSpy = jest.spyOn(sut, 'arrayExecution').mockImplementationOnce(() => { })
      const objectExecutionSpy = jest.spyOn(sut, 'objectExecution').mockImplementationOnce(() => { })

      mockIsPrimitive.mockReturnValue(false)
      mockIsArray.mockReturnValue(true)
      mockIsObject.mockReturnValue(false)

      const data = makeFakeObjectContainerData()
      const containerEl = makeContainerEl()
      sut.execute(data, containerEl)

      expect(arrayExecutionSpy).toHaveBeenCalledWith(data, containerEl)
      expect(primitiveExecutionSpy).not.toHaveBeenCalled()
      expect(objectExecutionSpy).not.toHaveBeenCalled()
    })

    it('Should only call primitiveExecution only and if only isPrimitive returns true', () => {
      const { sut } = makeSut()
      const primitiveExecutionSpy = jest.spyOn(sut, 'primitiveExecution').mockImplementationOnce(() => { })
      const arrayExecutionSpy = jest.spyOn(sut, 'arrayExecution').mockImplementationOnce(() => { })
      const objectExecutionSpy = jest.spyOn(sut, 'objectExecution').mockImplementationOnce(() => { })

      mockIsPrimitive.mockReturnValue(true)
      mockIsArray.mockReturnValue(false)
      mockIsObject.mockReturnValue(false)

      const data = makeFakeObjectContainerData()
      const containerEl = makeContainerEl()
      sut.execute(data, containerEl)

      expect(primitiveExecutionSpy).toHaveBeenCalledWith(data, containerEl)
      expect(arrayExecutionSpy).not.toHaveBeenCalled()
      expect(objectExecutionSpy).not.toHaveBeenCalled()
    })

    it('Should call nothing if and only if isPrimitive, isArray and isObject returns false', () => {
      const { sut } = makeSut()
      const primitiveExecutionSpy = jest.spyOn(sut, 'primitiveExecution').mockImplementationOnce(() => { })
      const arrayExecutionSpy = jest.spyOn(sut, 'arrayExecution').mockImplementationOnce(() => { })
      const objectExecutionSpy = jest.spyOn(sut, 'objectExecution').mockImplementationOnce(() => { })

      mockIsPrimitive.mockReturnValue(false)
      mockIsArray.mockReturnValue(false)
      mockIsObject.mockReturnValue(false)

      const data = makeFakeObjectContainerData()
      const containerEl = makeContainerEl()
      sut.execute(data, containerEl)

      expect(primitiveExecutionSpy).not.toHaveBeenCalled()
      expect(arrayExecutionSpy).not.toHaveBeenCalled()
      expect(objectExecutionSpy).not.toHaveBeenCalled()
    })
  })

  describe('objectExecution', () => {
    it('Should call elementsFactory.createObjectContainer once', () => {
      const { sut, elementsFactorySpy } = makeSut()
      const createObjectContainerSpy = jest.spyOn(elementsFactorySpy, 'createObjectContainer')
      sut.objectExecution(makeFakeObjectContainerData(), makeContainerEl())

      expect(createObjectContainerSpy).toHaveBeenCalledTimes(1)
    })

    it('Should append the objectContainer to the given container', () => {
      const { sut, elementsFactorySpy } = makeSut()
      const containerEl = makeContainerEl()
      sut.objectExecution(makeFakeObjectContainerData(), containerEl)

      expect(containerEl.children.length).toBe(1)
      expect(Array.from(containerEl.children).includes(elementsFactorySpy.createObjectContainerResult)).toBeTruthy()
    })

    it('Should call (once for each object field) isPrimitive, isArray and isObject with correct value', () => {
      const { sut } = makeSut()

      mockIsPrimitive.mockReturnValue(false)
      mockIsArray.mockReturnValue(false)
      mockIsObject.mockReturnValue(false)

      const data = makeFakeObjectContainerData()
      const dataValues = Object.values(data)
      const containerEl = makeContainerEl()
      sut.objectExecution(data, containerEl)

      expect(mockIsPrimitive.mock.calls).toEqual(dataValues.map((value) => [value]))
      expect(mockIsArray.mock.calls).toEqual(dataValues.map((value) => [value]))
      expect(mockIsObject.mock.calls).toEqual(dataValues.map((value) => [value]))
    })

    describe('isPrimitive branch', () => {
      it('Should only call (once for each object field) elementsFactory.createField, with correct values, and append its return element to objectContainer if isPrimitive returns true', () => {
        const { sut, elementsFactorySpy } = makeSut()
        jest.spyOn(sut, 'execute').mockImplementation(() => { })
        const createFieldSpy = jest.spyOn(elementsFactorySpy, 'createField').mockImplementation(() => makeRandomEl())
        const createArraySectionSpy = jest.spyOn(elementsFactorySpy, 'createArraySection').mockImplementation(() => makeRandomEl())
        const createObjectSectionSpy = jest.spyOn(elementsFactorySpy, 'createObjectSection').mockImplementation(() => makeRandomEl())

        mockIsPrimitive.mockReturnValue(true)
        mockIsArray.mockReturnValue(false)
        mockIsObject.mockReturnValue(false)

        const data = makeFakeObjectContainerData()
        sut.objectExecution(data, makeContainerEl())

        expect(createFieldSpy).toHaveBeenCalled()
        expect(createArraySectionSpy).not.toHaveBeenCalled()
        expect(createObjectSectionSpy).not.toHaveBeenCalled()

        expect(Object.entries(data)).toEqual(createFieldSpy.mock.calls)
        createFieldSpy.mock.results.forEach((createFieldResult) => {
          expect(elementsFactorySpy.createObjectContainerResult.contains(createFieldResult.value)).toBeTruthy()
        })
      })
    })

    describe('isArray branch', () => {
      it('Should only call (once for each object field) elementsFactory.createArraySection, with correct values, and append its return element to objectContainer if isArray returns true', () => {
        const { sut, elementsFactorySpy } = makeSut()
        jest.spyOn(sut, 'execute').mockImplementation(() => { })
        const createFieldSpy = jest.spyOn(elementsFactorySpy, 'createField').mockImplementation(() => makeRandomEl())
        const createArraySectionSpy = jest.spyOn(elementsFactorySpy, 'createArraySection').mockImplementation(() => makeRandomEl())
        const createObjectSectionSpy = jest.spyOn(elementsFactorySpy, 'createObjectSection').mockImplementation(() => makeRandomEl())

        mockIsArray.mockReturnValue(true)
        mockIsPrimitive.mockReturnValue(false)
        mockIsObject.mockReturnValue(false)

        const data = makeFakeObjectContainerData()
        sut.objectExecution(data, makeContainerEl())

        expect(createArraySectionSpy).toHaveBeenCalled()
        expect(createFieldSpy).not.toHaveBeenCalled()
        expect(createObjectSectionSpy).not.toHaveBeenCalled()

        expect(Object.keys(data).map(key => [key])).toEqual(createArraySectionSpy.mock.calls)
        createArraySectionSpy.mock.results.forEach((createFieldResult) => {
          expect(elementsFactorySpy.createObjectContainerResult.contains(createFieldResult.value)).toBeTruthy()
        })
      })

      it('Should call execute, once, for each arraySection, with correct values if isArray returns true', () => {
        const { sut, elementsFactorySpy } = makeSut()
        const executeSpy = jest.spyOn(sut, 'execute').mockImplementation(() => { })
        const createArraySectionSpy = jest.spyOn(elementsFactorySpy, 'createArraySection').mockImplementation(() => makeRandomEl())

        mockIsArray.mockReturnValue(true)
        mockIsPrimitive.mockReturnValue(false)
        mockIsObject.mockReturnValue(false)

        const data = makeFakeObjectContainerData()
        sut.objectExecution(data, makeContainerEl())

        expect(Object.values(data).map((value: any, i: number) => [value, createArraySectionSpy.mock.results[i].value])).toEqual(executeSpy.mock.calls)
      })
    })

    describe('isObject branch', () => {
      it('Should only call (once for each object field) elementsFactory.createObjectSection, with correct values, and append its return element to objectContainer if isObject returns true', () => {
        const { sut, elementsFactorySpy } = makeSut()
        jest.spyOn(sut, 'execute').mockImplementation(() => { })
        const createFieldSpy = jest.spyOn(elementsFactorySpy, 'createField').mockImplementation(() => makeRandomEl())
        const createArraySectionSpy = jest.spyOn(elementsFactorySpy, 'createArraySection').mockImplementation(() => makeRandomEl())
        const createObjectSectionSpy = jest.spyOn(elementsFactorySpy, 'createObjectSection').mockImplementation(() => makeRandomEl())

        mockIsObject.mockReturnValue(true)
        mockIsArray.mockReturnValue(false)
        mockIsPrimitive.mockReturnValue(false)

        const data = makeFakeObjectContainerData()
        sut.objectExecution(data, makeContainerEl())

        expect(createObjectSectionSpy).toHaveBeenCalled()
        expect(createFieldSpy).not.toHaveBeenCalled()
        expect(createArraySectionSpy).not.toHaveBeenCalled()

        expect(Object.keys(data).map(key => [key])).toEqual(createObjectSectionSpy.mock.calls)
        createObjectSectionSpy.mock.results.forEach((createFieldResult) => {
          expect(elementsFactorySpy.createObjectContainerResult.contains(createFieldResult.value)).toBeTruthy()
        })
      })

      it('Should call execute, once, for each objectSection, with correct values if isObject returns true', () => {
        const { sut, elementsFactorySpy } = makeSut()
        const executeSpy = jest.spyOn(sut, 'execute').mockImplementation(() => { })
        const createObjectSectionSpy = jest.spyOn(elementsFactorySpy, 'createObjectSection').mockImplementation(() => makeRandomEl())

        mockIsObject.mockReturnValue(true)
        mockIsArray.mockReturnValue(false)
        mockIsPrimitive.mockReturnValue(false)

        const data = makeFakeObjectContainerData()
        sut.objectExecution(data, makeContainerEl())

        expect(Object.values(data).map((value: any, i: number) => [value, createObjectSectionSpy.mock.results[i].value])).toEqual(executeSpy.mock.calls)
      })
    })

    describe('unhandled branch', () => {
      it('Should call nothing (for each object field) if isPrimitive, isArray and isObject returns false', () => {
        const { sut, elementsFactorySpy } = makeSut()
        const executeSpy = jest.spyOn(sut, 'execute').mockImplementation(() => { })
        const createFieldSpy = jest.spyOn(elementsFactorySpy, 'createField').mockImplementation(() => makeRandomEl())
        const createArraySectionSpy = jest.spyOn(elementsFactorySpy, 'createArraySection').mockImplementation(() => makeRandomEl())
        const createObjectSectionSpy = jest.spyOn(elementsFactorySpy, 'createObjectSection').mockImplementation(() => makeRandomEl())

        mockIsObject.mockReturnValue(false)
        mockIsArray.mockReturnValue(false)
        mockIsPrimitive.mockReturnValue(false)

        sut.objectExecution(makeFakeObjectContainerData(), makeContainerEl())

        expect(executeSpy).not.toHaveBeenCalled()
        expect(createFieldSpy).not.toHaveBeenCalled()
        expect(createArraySectionSpy).not.toHaveBeenCalled()
        expect(createObjectSectionSpy).not.toHaveBeenCalled()
      })
    })
  })

  describe('arrayExecution', () => {
    it('Should call elementsFactory.createArrayContainer once', () => {
      const { sut, elementsFactorySpy } = makeSut()
      const createArrayContainerSpy = jest.spyOn(elementsFactorySpy, 'createArrayContainer')
      sut.arrayExecution(makeFakeObjectContainerData2(), makeContainerEl())

      expect(createArrayContainerSpy).toHaveBeenCalledTimes(1)
    })
  })
})
