import { redirect } from '~/overrides/@remix-run/node';

interface IsCanAccess {}

export const isCanAccess = (_: IsCanAccess) => {
  const accessable = true;
  if (!accessable) {
    return redirect('/403');
  }
  return true;
};
