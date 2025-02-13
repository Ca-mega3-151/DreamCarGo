# Overview

The `Image` component extends the functionality of the Ant Design Image component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Image component.

# Props

| Prop        | Type               | Default  | Description                                                         |
| ----------- | ------------------ | -------- | ------------------------------------------------------------------- |
| className   | `string`           | -        | Custom CSS class for styling the image.                             |
| height      | `number \| string` | -        | The height of the image.                                            |
| src         | `string`           | -        | The source URL of the image.                                        |
| srcSet      | `string`           | -        | A set of source sizes for the image.                                |
| width       | `number \| string` | -        | The width of the image.                                             |
| loading     | `string`           | `'lazy'` | Indicates how the image should be loaded. Can be 'lazy' or 'eager'. |
| placeholder | `ReactNode`        | -        | Placeholder content to show while the image is loading.             |
| alt         | `string`           | -        | Alternate text description of the image.                            |
| fallback    | `string`           | -        | URL of the fallback image in case the primary image fails to load.  |
| preview     | `boolean`          | `true`   | Indicates whether the image can be previewed.                       |
| mask        | `ReactNode`        | -        | Thumbnail mask.                                                     |

# Usage

```jsx
import { Image } from "path-to-Image";

// Example usage
<Image className="custom-image" src="image-source.jpg" alt="Description of the image" width="100%" height="auto" loading="lazy" placeholder={<div>Loading...</div>} fallback="fallback-image.jpg" preview={false} />;
```
