import { ReactNode, isValidElement } from 'react';

export const isReactNode = (prop: any): prop is ReactNode => {
  if (prop === null || typeof prop === 'undefined') {
    return true;
  }
  if (typeof prop === 'string' || typeof prop === 'number' || typeof prop === 'boolean') {
    return true;
  }
  if (Array.isArray(prop) && prop.every(isReactNode)) {
    return true;
  }
  if (isValidElement(prop)) {
    return true;
  }
  return false;
};
