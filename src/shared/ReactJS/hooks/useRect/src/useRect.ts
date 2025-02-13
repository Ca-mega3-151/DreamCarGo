import { DependencyList, useCallback, useEffect, useState } from 'react';
import { getRect } from './utils/getRect';

/**
 * React hook that returns the dimensions and position of an element relative to the viewport.
 * The hook automatically updates the dimensions and position when the window is resized or scrolled.
 *
 * @function
 * @template T - A type extending from Element.
 * @param {Element | null} $el - The element for which to retrieve the dimensions and position.
 * @param {any} [refresher] - An optional dependency to trigger re-calculation of the rect when changed.
 * @returns {Object} An object containing the dimensions and position of the element.
 * @property {number} bottom - Y-coordinate, relative to the viewport origin, of the bottom of the element's box.
 * @property {number} height - Height of the element's box.
 * @property {number} left - X-coordinate, relative to the viewport origin, of the left of the element's box.
 * @property {number} right - X-coordinate, relative to the viewport origin, of the right of the element's box.
 * @property {number} top - Y-coordinate, relative to the viewport origin, of the top of the element's box.
 * @property {number} width - Width of the element's box.
 * @example ```jsx
  const MyComponent = () => {
    const myRef = useRef(null);
    const rect = useRect(myRef.current);
    return <div ref={myRef}>Dimensions: {rect.width}x{rect.height}</div>;
  };
  ```
 */
export const useRect = (
  $el: Element | null,
  refresher: DependencyList = [],
): {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
} => {
  const [dimensions, setDimensions] = useState(getRect($el));

  const handleUpdateRect = useCallback(() => {
    setDimensions(getRect($el));
  }, [$el]);

  useEffect(() => {
    handleUpdateRect();
    window.addEventListener('resize', handleUpdateRect);
    window.addEventListener('scroll', handleUpdateRect);
    return () => {
      window.removeEventListener('resize', handleUpdateRect);
      window.removeEventListener('scroll', handleUpdateRect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleUpdateRect, $el, ...refresher]);

  return dimensions;
};
