/**
 * Transforms a nested array type into its corresponding union type, including all nested levels.
 *
 * @template T - The type of the nested array.
 * @param {T} list - The source array type containing nested arrays of literals.
 * @returns {Union} - A union type representing all the literals contained within the nested array.
 *
 * @example
 * ```typescript
 * type Case1 = DeepArrayToUnion<[1, 2, [3, 4], ['a'], ['b', 'c'], [['d']], [[[['e']]]]]>;
 * // Result: 1 | 2 | 3 | 4 | "a" | "b" | "c" | "d" | "e"
 *
 * type Case2 = DeepArrayToUnion<[1, 2, [3, 4]]>;
 * // Result: 1 | 2 | 3 | 4
 * ```
 */
export type DeepArrayToUnion<T extends any[]> = {
  [K in keyof T]: T[K] extends any[] ? DeepArrayToUnion<T[K]> : T[K];
}[number];
