import { FieldError as BaseFieldError } from 'react-hook-form';

export type FieldError = Pick<BaseFieldError, 'message'>;
