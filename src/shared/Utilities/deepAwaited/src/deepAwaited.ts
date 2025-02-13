import { DeepAwaited } from '~/shared/TypescriptUtilities';

/**
 * Recursively awaits all promises within an object or value, returning the fully resolved structure.
 * This function handles nested objects and arrays, resolving all promises at any depth.
 *
 * @template T - The type of the input object or value.
 * @param obj - The object, array, or value that may contain promises.
 * @returns A promise that resolves to the same structure as `obj`, but with all promises deeply awaited.
 *
 * @example
 * ```typescript
 * const nestedObject = {
 *   a: Promise.resolve(1),
 *   b: {
 *     c: Promise.resolve(2),
 *     d: {
 *       e: Promise.resolve(3),
 *     },
 *   },
 * };
 *
 * const result = await deepAwaited(nestedObject);
 * // result: { a: 1, b: { c: 2, d: { e: 3 } } }
 * ```
 */
export const deepAwaited = async <T>(obj: T): Promise<DeepAwaited<T>> => {
  if (obj instanceof Promise) {
    const resolved = await obj;
    return deepAwaited(resolved as any) as Promise<DeepAwaited<T>>;
  }

  if (Array.isArray(obj)) {
    const resolvedArray = await Promise.all(
      obj.map(item => {
        return deepAwaited(item);
      }),
    );
    return resolvedArray as DeepAwaited<T>;
  }

  if (obj && typeof obj === 'object') {
    const entries = await Promise.all(
      Object.entries(obj).map(async ([key, value]) => {
        return [key, await deepAwaited(value)];
      }),
    );
    return Object.fromEntries(entries) as DeepAwaited<T>;
  }

  return obj as DeepAwaited<T>;
};
