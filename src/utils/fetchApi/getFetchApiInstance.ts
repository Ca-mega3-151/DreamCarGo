import { fetchApiClient } from './fetchApi.client';
import { fetchApiServer } from './fetchApi.server';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/@remix-run/node';

interface GetFetchApiInstance {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
}

export const getFetchApiInstance = async ({ remixRequest }: GetFetchApiInstance) => {
  return remixRequest ? await fetchApiServer(remixRequest) : fetchApiClient;
};
