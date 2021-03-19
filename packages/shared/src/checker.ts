class PrimitiveNumber {
  static [Symbol.hasInstance](value: any) {
    return typeof value === 'number'
  }
}

export function isNumber(num: any): boolean {
  return num instanceof PrimitiveNumber
}
