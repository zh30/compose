export function isString(str: any): boolean {
  return typeof str === 'string'
}

export function isHtmlELement(ele: any): boolean {
  return ele instanceof HTMLElement
}
