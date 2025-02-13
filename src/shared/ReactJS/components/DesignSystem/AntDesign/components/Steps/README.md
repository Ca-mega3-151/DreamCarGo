# Overview

The `Steps` component extends the functionality of the Ant Design Steps component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Steps component.

# Props

| Name           | Type                       | Description                                                |
| -------------- | -------------------------- | ---------------------------------------------------------- |
| className      | string                     | Custom CSS class for styling the steps component.          |
| current        | number                     | Index of the current step.                                 |
| onChange       | function                   | Callback function triggered when the current step changes. |
| type           | 'default' \| 'navigation'  | Type of the steps component. Default is 'default'.         |
| labelPlacement | 'horizontal' \| 'vertical' | Position of the step label. Default is 'horizontal'.       |
| currentPercent | number                     | Percentage of the current step progress.                   |
| size           | 'default' \| 'small'       | Size of the steps component. Default is 'default'.         |
| items          | Array<Object>              | Array of step items.                                       |

# Usage

```javascript
import React from "react";
import { Steps } from "./Steps";

const MyComponent = () => {
  const steps = [
    {
      title: "Step 1",
      description: "This is step 1",
      status: "finish",
    },
    {
      title: "Step 2",
      description: "This is step 2",
      status: "process",
    },
    {
      title: "Step 3",
      description: "This is step 3",
      status: "wait",
    },
  ];

  const handleChange = (current) => {
    console.log("Current step:", current);
  };

  return <Steps current={1} onChange={handleChange} items={steps} />;
};

export default MyComponent;
```
