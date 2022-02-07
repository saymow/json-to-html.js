export const isPrimitive = (data: any) => data !== Object(data)

export const isArray = (data: any) => Array.isArray(data)

export const isObject = (data: any) =>
  typeof data === 'object' && !isArray(data) && data !== null