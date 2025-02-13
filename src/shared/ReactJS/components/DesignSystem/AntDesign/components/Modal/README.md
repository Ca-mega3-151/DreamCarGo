# Overview

The `Modal` component extends the functionality of the Ant Design Modal component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Modal component.

# Props

| Prop              | Type                                                     | Default                                | Description                                                                                      |
| ----------------- | -------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| open              | `boolean`                                                | -                                      | Whether the modal dialog is visible.                                                             |
| onCancel          | `() => void`                                             | -                                      | Callback function invoked when the cancel button is clicked or the modal is closed.              |
| onOk              | `() => void`                                             | -                                      | Callback function invoked when the OK button is clicked.                                         |
| afterClose        | `() => void`                                             | -                                      | Callback function invoked after the modal is completely closed.                                  |
| className         | `string`                                                 | -                                      | Custom CSS class for styling the modal.                                                          |
| cancelText        | `string`                                                 | -                                      | Text of the cancel button.                                                                       |
| okText            | `string`                                                 | -                                      | Text of the OK button.                                                                           |
| maskClosable      | `boolean`                                                | -                                      | Whether the modal can be closed by clicking the mask.                                            |
| zIndex            | `number`                                                 | -                                      | The z-index of the modal.                                                                        |
| width             | `string \| number`                                       | -                                      | The width of the modal dialog.                                                                   |
| okButtonProps     | `ButtonProps`                                            | -                                      | Properties for the OK button.                                                                    |
| cancelButtonProps | `ButtonProps`                                            | -                                      | Properties for the cancel button.                                                                |
| centered          | `boolean`                                                | -                                      | Whether to center the modal dialog vertically in the screen.                                     |
| closable          | `boolean`                                                | -                                      | Whether a close (x) button is visible on top right of the modal dialog.                          |
| confirmLoading    | `boolean`                                                | -                                      | Whether to apply a loading visual effect on the OK button while an operation is being performed. |
| children          | `ReactNode`                                              | -                                      | Content to be displayed inside the modal.                                                        |
| title             | `ReactNode \| string`                                    | -                                      | Title of the modal dialog.                                                                       |
| footer            | `ReactNode \| null`                                      | -                                      | Footer content of the modal dialog. Set to `null` to hide the default footer.                    |
| FooterLeft        | `ReactNode`                                              | -                                      | Content to be displayed on the left side of the footer.                                          |
| footerMode        | `'sticky' \| 'none'`                                     | -                                      | Mode of the footer, either 'sticky' or 'none'.                                                   |
| openVariant       | `'controlled-state' \| 'uncontrolled-state'`             | `'controlled-state'`                   | Determines whether the modal's open state is controlled externally or internally.                |
| loading           | `boolean \| { skeletonCount?: number; enable: boolean }` | Whether the modal is in loading state. |

# Usage

```jsx
import { Modal } from "path-to-Modal";

// Example usage
<Modal open={isVisible} onCancel={handleCancel} onOk={handleOk} className="custom-modal-class" cancelText="Cancel" okText="OK" maskClosable={false} zIndex={1000} width={600} okButtonProps={{ disabled: isSubmitting }} cancelButtonProps={{ disabled: isSubmitting }} centered closable confirmLoading={isSubmitting} title="Modal Title" footer={null}>
  <p>Modal Content</p>
</Modal>;
```
