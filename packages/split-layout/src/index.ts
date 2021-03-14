import test from './api'

export type ScopedId = symbol
declare type elements = Array<string | HTMLElement>
interface SplitOptions {
  type: 'flex' | 'grid'
  elemtns: elements
}
/**
 * useLayout
 * @public
 *  */
function useLayout(elements: elements, options: SplitOptions): void {
  console.log('useLayout', elements)
  test('api')
}
export default useLayout
