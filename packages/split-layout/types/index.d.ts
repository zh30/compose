export declare type ScopedId = symbol;
declare type elements = Array<string | HTMLElement>;
interface SplitOptions {
    type: 'flex' | 'grid';
    elemtns: elements;
}
/**
 * useLayout
 * @public
 *  */
declare function useLayout(elements: elements, options: SplitOptions): void;
export default useLayout;
