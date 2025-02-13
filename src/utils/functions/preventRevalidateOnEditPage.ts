import { ShouldRevalidateFunction } from '~/overrides/@remix-run/react';

const paths: string[] = [];

export const preventRevalidateOnEditPage: ShouldRevalidateFunction = ({ currentUrl }) => {
  if (
    paths.find(item => {
      return item === currentUrl.pathname;
    })
  ) {
    return true;
  }
  return false;
};
