# Overview

The `Pagination` component extends the functionality of the Ant Design Pagination component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Pagination component.

# Props

| Prop            | Type     | Default | Description                                                     |
| --------------- | -------- | ------- | --------------------------------------------------------------- |
| className       | string   | -       | Custom CSS class for styling the pagination component.          |
| currentPage     | number   | -       | The current page number.                                        |
| disabled        | boolean  | -       | Whether the pagination is disabled.                             |
| onChange        | function | -       | Callback function triggered when the page or page size changes. |
| pageSize        | number   | -       | The number of items per page.                                   |
| pageSizeOptions | number[] | []      | Custom page size options for the pagination.                    |
| pageSizeText    | string   | / page  | Custom text to display for page size.                           |
| showSizeChanger | boolean  | false   | Whether to show the size changer in pagination.                 |
| total           | number   | -       | The total number of items.                                      |
| size            | string   | -       | The size of pagination.                                         |

# Usage

```jsx
import { Pagination } from "path/to/Pagination";

// Example usage
<Pagination currentPage={1} pageSize={10} total={100} onChange={(page, pageSize) => console.log("Page:", page, "PageSize:", pageSize)} pageSizeOptions={[10, 20, 30, 40]} pageSizeText="/ page" showSizeChanger />;
```
