import { ReactNode } from 'react';
import { FieldError } from '../types/FieldError';

export const isReactHookFormFieldError = (error: ReactNode | FieldError): error is FieldError => {
  return !!(error && typeof error === 'object' && 'message' in error);
};
