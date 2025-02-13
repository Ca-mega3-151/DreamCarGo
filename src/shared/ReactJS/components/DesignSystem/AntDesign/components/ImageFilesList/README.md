# Overview

The `ImageFilesList` component is designed to display and manage a list of image files within upload components.

# Props

| Name          | Type                                                         | Description                                                                               |
| ------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `filesState`  | `UploadFileState<{ src: string }>[]`                         | The current state of the image files being managed.                                       |
| `fallback`    | `(fileState: UploadFileState<{ src: string }>) => string`    | Function to provide a fallback URL for images that might not be available.                |
| `placeholder` | `(fileState: UploadFileState<{ src: string }>) => ReactNode` | Function to render a custom placeholder for images while they are loading or unavailable. |
| `onDelete`    | `(fileState: UploadFileState<{ src: string }>) => void`      | Callback function triggered when an image file is deleted.                                |
| `onDownload`  | `(fileState: UploadFileState<{ src: string }>) => void`      | Callback function triggered when an image file is downloaded.                             |

# Usage

```tsx
import React from "react";
import { UploadFileState } from "./types";

const imageFiles: UploadFileState<{ src: string }>[] = [
  { file: new File(["content"], "image1.png"), status: "uploaded", data: { src: "path/to/image1.png" } },
  { file: new File(["content"], "image2.jpg"), status: "uploaded", data: { src: "path/to/image2.jpg" } },
];

const handleFallback = (fileState: UploadFileState<{ src: string }>) => {
  return "path/to/fallback.jpg";
};

const handlePlaceholder = (fileState: UploadFileState<{ src: string }>) => {
  return <div>Loading...</div>;
};

const handleDownload = (fileState: UploadFileState<{ src: string }>) => {
  console.log("Downloading image:", fileState.file.name);
};

const handleDelete = (fileState: UploadFileState<{ src: string }>) => {
  console.log("Deleting image:", fileState.file.name);
};

const App = () => (
  <div>
    <h1>Image List</h1>
    <ImageFilesListHorizontal filesState={imageFiles} fallback={handleFallback} placeholder={handlePlaceholder} onDownload={handleDownload} onDelete={handleDelete} />
    <ImageFilesListVertical filesState={imageFiles} fallback={handleFallback} placeholder={handlePlaceholder} onDownload={handleDownload} onDelete={handleDelete} />
  </div>
);

export default App;
```
