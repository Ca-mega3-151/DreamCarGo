interface ZoomViewport {
  /** The zoom level to set for the viewport. */
  zoom: number;
}

/**
 * Adjusts the viewport zoom level of the page.
 *
 * This function updates the viewport meta tag to set the `initial-scale` and
 * `maximum-scale` properties to the specified zoom level. It also triggers a
 * resize event to prompt the browser to re-render the content according to
 * the new zoom settings. This method aims to ensure proper zoom behavior across
 * various devices, including mobile devices like iPhones.
 *
 * @param {ZoomViewport} params - The parameters object.
 * @param {number} params.zoom - The zoom level to apply to the viewport.
 *
 * @example
 * // Set the viewport zoom level to 80%
 * zoomViewport({ zoom: 0.8 });
 */
export const zoomViewport = ({ zoom }: ZoomViewport): void => {
  let viewport = document.querySelector('meta[name=viewport]') as HTMLMetaElement | null;
  if (viewport) {
    viewport.setAttribute(
      'content',
      `width=device-width, initial-scale=${zoom}, maximum-scale=${zoom}, user-scalable=no`,
    );
  } else {
    viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = `width=device-width, initial-scale=${zoom}, maximum-scale=${zoom}, user-scalable=no`;
    document.head.appendChild(viewport);
  }

  // Trigger a resize event to force the browser to re-render
  window.dispatchEvent(new Event('resize'));
};
