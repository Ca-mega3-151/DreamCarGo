/**
 * Extracts route parameters from a given string pattern.
 *
 * @param {string} path - The path pattern containing route parameters, e.g., `/posts/:postId/:commentId/:test/:test2/:test3`.
 *
 * @example
 * ```typescript
 * type RouteParams = ExtractRouteParams<'/posts/:postId/:commentId/:test/:test2/:test3'>;
 *
 * // Result type:
 * // {
 * //   postId: string;
 * //   commentId: string;
 * //   test: string;
 * //   test2: string;
 * //   test3: string;
 * // }
 * ```
 */
export type ExtractRouteParams<Path extends string> = Path extends `${infer _PathName}:${infer Param}/${infer Rest}`
  ? { [k in Param | keyof ExtractRouteParams<Rest>]: string }
  : Path extends `${infer _PathName}:${infer Param}`
    ? { [k in Param]: string }
    : {};
