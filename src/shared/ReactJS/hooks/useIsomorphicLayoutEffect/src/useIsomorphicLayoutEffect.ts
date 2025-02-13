import { useEffect, useLayoutEffect } from 'react';
import { isBrowser } from '~/shared/Utilities';

// https://github.com/facebook/react/blob/master/packages/shared/ExecutionEnvironment.js
// const canUseDOM =
//   typeof window !== 'undefined' &&
//   typeof window.document !== 'undefined' &&
//   typeof window.document.createElement !== 'undefined';

/**
 * Custom React hook that provides a cross-environment effect hook.
 * It automatically resolves to `useLayoutEffect` when running in a browser environment (client-side),
 * ensuring that effects are synchronized with the layout, but falls back to `useEffect` on the server-side
 * to avoid React hydration issues.
 *
 * @returns {Function} The appropriate effect hook based on the execution environment.
 */
export const useIsomorphicLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
