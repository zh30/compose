declare type element = string | Element
declare type elements = Array<element>

interface SplitOptions {
  row?: boolean,
  autoHide?: boolean
}

const defaultOptions: SplitOptions = {
  row: true,
  autoHide: true
}

function genElement(ele: element): Element {
  let node = ele
  if (typeof ele === 'string') {
    node = document.querySelector(ele) as Element
  }
  if (node instanceof Element) return node
  else {
    throw new Error('arguments must be ')
  }
}

function genElementNodes(elements: elements): Array<Element> {
  return elements.map(genElement)
}

/**
 * useLayout
 * @public
 *  */
export function useLayout(
  elements: elements, options: SplitOptions = defaultOptions): void {
  if (!elements || !(elements instanceof Array)) {
    throw new Error(
      'invalid arguments elements, '
      + 'elements must be an Array of string selector or HTMLElement')
  }
  const elementNodes = genElementNodes(elements)
  console.log('elementNodes', elementNodes)

}

