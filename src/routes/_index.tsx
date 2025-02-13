import { redirect } from '~/overrides/@remix-run/node';

export const loader = async () => {
  return redirect('/dashboard');
};

export const Page = () => {
  return null;
};

export default Page;
