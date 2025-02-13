# Overview

The `Tabs` component extends the functionality of the Ant Design Tabs component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Tabs component.

# Props

| Prop           | Type                                                                                                  | Default              | Description                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| `className`    | `string`                                                                                              | -                    | Custom CSS class for styling the tabs.                                                             |
| `tabs`         | `Array<{ key: string, label: ReactNode, children: ReactNode, disabled?: boolean, hidden?: boolean }>` | `[]`                 | Array of tab objects containing key, label, children, and optional disabled and hidden properties. |
| `tabActive`    | `string`                                                                                              | -                    | The key of the currently active tab.                                                               |
| `onChange`     | `function`                                                                                            | -                    | Callback function triggered when the active tab changes.                                           |
| `moreIcon`     | `ReactNode`                                                                                           | -                    | Icon for the "more" button.                                                                        |
| `tabPosition`  | `string`                                                                                              | `'top'`              | The position of the tabs.                                                                          |
| `autoFit`      | `boolean`                                                                                             | -                    | Whether the tabs should auto fit.                                                                  |
| `valueVariant` | `'controlled-state' \| 'uncontrolled-state'`                                                          | `'controlled-state'` | Determines if the tabs is in a controlled or uncontrolled state.                                   |

# Usage

```jsx
import { Tabs } from "path/to/Tabs";

// Example usage
<Tabs
  className="custom-tabs"
  tabs={[
    { key: "tab1", label: "Tab 1", children: <div>Content 1</div> },
    { key: "tab2", label: "Tab 2", children: <div>Content 2</div> },
  ]}
  tabActive="tab1"
  onChange={(key) => console.log("Active tab key:", key)}
  moreIcon={<Icon type="ellipsis" />}
  tabPosition="top"
  autoFit={true}
/>;
```
