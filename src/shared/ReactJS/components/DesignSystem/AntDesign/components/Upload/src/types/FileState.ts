export interface FileState<Response> {
  /** The current status of the file upload */
  status: 'loading' | 'success' | 'failure';
  /** The progress percentage of the upload */
  progressPercent?: number;
  /** The unique identifier for the file */
  uid: string;
  /** The file details */
  file: {
    /** The name of the file */
    name: string;
    /** The size of the file */
    size: number;
    /** The original file object */
    originalFile?: File;
  };
  /** The response from the upload request */
  response?: Response;
}
