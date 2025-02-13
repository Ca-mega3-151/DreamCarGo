import { ResponseFailure } from '../types/Response';

export class ServiceException extends Error {
  public cause: ResponseFailure;
  constructor(message: string, cause: ResponseFailure) {
    super(message);
    this.name = 'ServiceException';
    this.cause = cause;
  }
}
