# Overview

The `ImportData` component is a React component designed for importing and validating a file. It provides functionalities for users to upload a file, replace it if necessary, validate the uploaded file, and download a sample file. This component is ideal for applications that require users to upload and validate data files efficiently.

# Props

| Prop                      | Type                                    | Description                                 |
| ------------------------- | --------------------------------------- | ------------------------------------------- |
| `open`                    | `boolean`                               | Whether the modal is open.                  |
| `onCancel`                | `() => void`                            | Callback to handle the modal cancel action. |
| `accept`                  | `string`                                | File types that the input should accept.    |
| `value`                   | `File`                                  | The file that is currently selected.        |
| `onChange`                | `(file: File \| undefined) => void`     | Callback when the file changes.             |
| `isValidating`            | `boolean`                               | Whether the file is being validated.        |
| `onValidate`              | `(file: File) => void \| Promise<void>` | Callback to validate the file.              |
| `isDownloadingSample`     | `boolean`                               | Whether a sample file is being downloaded.  |
| `onDownloadSample`        | `() => void`                            | Callback to download a sample file.         |
| `texts`                   | `object`                                | Texts for various parts of the UI.          |
| `texts.okText`            | `string`                                | Text for the OK button.                     |
| `texts.cancelText`        | `string`                                | Text for the Cancel button.                 |
| `texts.downloadSample`    | `string`                                | Text for the Download Sample link.          |
| `texts.modalTitle`        | `string`                                | Title of the modal.                         |
| `texts.addFileButton`     | `string`                                | Text for the Add File button.               |
| `texts.replaceFileButton` | `string`                                | Text for the Replace File button.           |
