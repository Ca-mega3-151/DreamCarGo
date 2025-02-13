import { StatusCodeMappingToString } from '../constants/StringMappingToStatusCode';

export interface ResponseListSuccess<T> {
  code: number;
  data: {
    hits: T[];
    pagination: {
      totalRows: number;
      totalPages: number;
    };
  };
}

export interface ResponseDetailSuccess<T> {
  code: number;
  data: T;
}

export interface ResponseFailure {
  code: keyof typeof StatusCodeMappingToString;
  timestamp: string;
  path: string;
  message: string;
  errors: any[];
}
