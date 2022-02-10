export const isPrimitive = (data: any): boolean => data !== Object(data) || data instanceof Date
