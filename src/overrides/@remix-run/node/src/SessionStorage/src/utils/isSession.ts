import { Session } from '../types/Session';

export const isSession = (object: any): object is Session => {
  return (
    object != null &&
    typeof object.id === 'string' &&
    typeof object.data !== 'undefined' &&
    typeof object.has === 'function' &&
    typeof object.get === 'function' &&
    typeof object.set === 'function' &&
    typeof object.flash === 'function' &&
    typeof object.unset === 'function'
  );
};
