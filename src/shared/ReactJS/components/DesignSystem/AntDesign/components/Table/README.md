# Overview

The `Table` component extends the functionality of the Ant Design Table component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Table component.

# Props

| Prop                      | Type                                          | Default            | Description                                                                                |
| ------------------------- | --------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------ |
| `className`               | `string`                                      | -                  | Custom CSS class for the table.                                                            |
| `dataSource`              | `Array<RecordType>`                           | `[]`               | The data source array to populate the table rows.                                          |
| `expandable`              | `Object`                                      | -                  | Configuration for rows that can be expanded to show additional content.                    |
| `direction`               | `'ltr' \| 'rtl'`                              | -                  | Specifies the table layout direction as `ltr` (left-to-right) or `rtl` (right-to-left).    |
| `indentSize`              | `number`                                      | -                  | The size of the indent for tree data or nested rows.                                       |
| `loading`                 | `boolean`                                     | -                  | Indicates whether the table is in a loading state, displaying a spinner when true.         |
| `recordKey`               | `string \| Function`                          | -                  | A unique key for each row, either as a string or a function returning a key.               |
| `size`                    | `'small' \| 'middle' \| 'large'`              | `'small'`          | The size of the table, controlling its padding and font sizes.                             |
| `tableLayout`             | `'fixed' \| 'auto'`                           | `'auto'`           | The table-layout attribute of table element.                                               |
| `currentPage`             | `number`                                      | `1`                | The current page number in pagination.                                                     |
| `pageSize`                | `number`                                      | `0`                | The number of items displayed per page.                                                    |
| `totalRecords`            | `number`                                      | `0`                | The total number of records in the data source.                                            |
| `plural`                  | `Function`                                    | -                  | A function that generates a plural label for the total count based on the visible range.   |
| `singular`                | `Function`                                    | -                  | A function that generates a singular label for the total count based on the visible range. |
| `paginationMode`          | `'sticky' \| 'none'`                          | `'sticky'`         | Determines how pagination behaves, with `sticky` keeping it visible.                       |
| `columns`                 | `Array`                                       | `[]`               | Defines the columns to be displayed in the table, including header and cell renderers.     |
| `nonePagination`          | `boolean`                                     | `false`            | Disables pagination entirely when set to true.                                             |
| `showSizeChanger`         | `boolean`                                     | `false`            | Enables a dropdown in the pagination controls to change the page size.                     |
| `paginationClassName`     | `string`                                      | -                  | Custom CSS class for the pagination controls.                                              |
| `sizeChangerOptions`      | `Array<number>`                               | `[]`               | Specifies available options for the page size dropdown in the pagination controls.         |
| `onPaginationChange`      | `Function`                                    | -                  | A callback function triggered when the current page or page size changes.                  |
| `onSortChange`            | `Function`                                    | -                  | A callback function triggered when the column sort order or values change.                 |
| `sortValues`              | `Object`                                      | -                  | An object representing the current sort state of columns.                                  |
| `onFilterChange`          | `Function`                                    | -                  | A callback function triggered when the filter values change.                               |
| `filterVariant`           | `'aside' \| 'overlay'`                        | `'overlay'`        | Variant for how filters are displayed. Can be 'overlay' or 'aside'.                        |
| `filterValues`            | `Object`                                      | -                  | An object representing the current filter values applied to columns.                       |
| `offsetHeader`            | `number`                                      | -                  | An offset, in pixels, for sticky headers to account for fixed elements above the table.    |
| `tableHeight`             | `number`                                      | -                  | Sets a fixed height for the table, making it scrollable vertically if necessary.           |
| `autoIndex`               | `boolean`                                     | `true`             | Automatically adds a row index as the first column in the table.                           |
| `renderStickyAction`      | `Function`                                    | -                  | A function to render a sticky action element based on the currently selected rows.         |
| `checkMode`               | `'autoClear' \| 'keepPagination'`             | `'keepPagination'` | Controls how row selection behaves across pagination: auto-clearing or persisting.         |
| `selectedRecordsState`    | `Array<RecordType>`                           | -                  | The current state of selected rows, typically used to persist selection across pages.      |
| `setSelectedRecordsState` | `Dispatch<SetStateAction<Array<RecordType>>>` | -                  | A setter function to update the selected rows' state.                                      |
| `recordSelectable`        | `Function`                                    | -                  | Determines if a row is selectable, based on a function returning true or false.            |
| `searchValue`             | `string`                                      | -                  | The current value for the search input field.                                              |
| `searchPlaceholder`       | `string`                                      | -                  | The placeholder text displayed in the search input field.                                  |
| `onSearch`                | `Function`                                    | -                  | A callback function triggered when the search input changes or a search is executed.       |
| `configViews`             | `Object`                                      | -                  | Configuration for the table's column visibility and state.                                 |
| `storageKey`              | `string`                                      | -                  | A key used to store the table's state (e.g., column settings) in local storage.            |
| `onChangeConfigViews`     | `Function`                                    | -                  | A callback function triggered when the column visibility configuration changes.            |
| `onRefresh`               | `Function`                                    | -                  | A callback function triggered when the table is refreshed.                                 |
| `onCreate`                | `Function`                                    | -                  | A callback function triggered to create a new item or row in the table.                    |
| `actions`                 | `Function`                                    | -                  | A custom rendering function for action elements like Refresh, Filter, and Columns.         |

# Usage

```jsx
import { Table } from "path/to/Table";

// Example usage
const dataSource = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

<Table currentPage={1} pageSize={10} totalRecords={100} dataSource={dataSource} columns={columns} onChange={(page, pageSize) => console.log(page, pageSize)} />;
```
