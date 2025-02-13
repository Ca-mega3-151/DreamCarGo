import { isBrowser } from '~/shared/Utilities';

/**
 * Retrieves the dimensions and position of an element relative to the viewport.
 * If no element is provided, returns an object with all properties set to 0.
 *
 * @function
 * @template T - A type extending from Element.
 * @param {T} [element] - The element for which to retrieve the dimensions and position.
 * @returns {Object} An object containing the dimensions and position of the element.
 * @property {number} bottom - Y-coordinate, relative to the viewport origin, of the bottom of the element's box.
 * @property {number} height - Height of the element's box.
 * @property {number} left - X-coordinate, relative to the viewport origin, of the left of the element's box.
 * @property {number} right - X-coordinate, relative to the viewport origin, of the right of the element's box.
 * @property {number} top - Y-coordinate, relative to the viewport origin, of the top of the element's box.
 * @property {number} width - Width of the element's box.
 * @example ```typescript
  const rect = getRect(document.getElementById('myElement'));
  console.log(`Element dimensions: ${rect.width}x${rect.height}`);
  ```
 */
export const getRect = <T extends Element>(
  element?: T | undefined | null,
): {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
} => {
  if (element && isBrowser()) {
    const domRect: DOMRect = element.getBoundingClientRect();
    return {
      bottom: domRect.bottom,
      height: domRect.height,
      left: domRect.left,
      right: domRect.right,
      top: domRect.top,
      width: domRect.width,
    };
  }
  return {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  };
};
