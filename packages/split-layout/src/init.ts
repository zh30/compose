import test from './api'

export type ScopedId = symbol
declare type elements = Array<string | HTMLElement>

interface SplitOptions {
  type: 'flex' | 'grid',
  api?: string,
  elemtns: elements
}

/**
 * useLayout
 * @public
 *  */
export function useLayout(elements: elements, options: SplitOptions): void {
  if (options.api) test(options.api + 'log')
  else { test('api')}
}
