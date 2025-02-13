import { ReactNode } from 'react';
import { UploadFileState } from '../../../Upload';

export interface Props<FileResponse extends { src: string }> {
  /** The current state of the image files being managed. */
  filesState: UploadFileState<FileResponse>[];
  /** Function to provide a fallback URL for images that might not be available. */
  fallback?: (fileState: UploadFileState<FileResponse>) => string;
  /** Function to render a custom placeholder for images while they are loading or unavailable. */
  placeholder?: (fileState: UploadFileState<FileResponse>) => ReactNode;
  /** Callback function triggered when an image file is deleted. */
  onDelete?: (fileState: UploadFileState<FileResponse>) => void;
  /** Callback function triggered when an image file is downloaded. */
  onDownload?: (fileState: UploadFileState<FileResponse>) => void;
}
