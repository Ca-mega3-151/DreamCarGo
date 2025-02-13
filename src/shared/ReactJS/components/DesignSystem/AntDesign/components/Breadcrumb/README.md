# Overview

The `Breadcrumb` component extends the functionality of the Ant Design Breadcrumb component. It allows for the rendering of breadcrumb items with stricter type checks compared to the standard Ant Design Breadcrumb component.

# Props

| Prop      | Type                                                                     | Default | Description                                  |
| --------- | ------------------------------------------------------------------------ | ------- | -------------------------------------------- |
| items     | `Array<{ title: ReactNode; onClick?: () => void; className?: string; }>` | -       | An array of breadcrumb items.                |
| className | `string`                                                                 | ''      | Custom CSS class for styling the component.  |
| separator | `ReactNode`                                                              | '/'     | Custom separator element for the breadcrumb. |

# Usage

```jsx
import { Breadcrumb } from "path-to-Breadcrumb";

// Example usage
<Breadcrumb items={[{ title: "Home" }, { title: "Products", onClick: handleProductsClick }, { title: "Details" }]} className="custom-breadcrumb" separator=">" />;
```
