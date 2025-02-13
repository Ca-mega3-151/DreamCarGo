import {
  Session,
  SessionIdStorageStrategy,
  SessionStorage,
  TypedResponse,
  createCookieSessionStorage,
  redirect,
} from '@remix-run/node';
import { isEmpty, keys } from 'ramda';

/**
 * Manages authentication-related sessions using Remix's session storage.
 */
export class AuthSessionStorage<Data extends Record<string, any>> {
  protected cookieKey: string = 'clientId';
  /** Remix session storage instance */
  private _storage: SessionStorage<Data, Data>;
  /** URL to redirect to upon login */
  private _loginUrl: string;

  constructor({ loginUrl = '/login', options }: { loginUrl?: string; options?: SessionIdStorageStrategy['cookie'] }) {
    this._loginUrl = loginUrl;
    this._storage = createCookieSessionStorage<Data, Data>({
      cookie: {
        ...options,
        name: options?.name ?? this.cookieKey,
      },
    });
  }

  /**
   * Retrieves the session based on the request.
   * @param request - The request object.
   * @returns A Promise resolving to the session data.
   */
  public getSession = (request: Request): Promise<Session<Data, Data>> => {
    const cookie = request.headers.get('Cookie');
    return this._storage.getSession(cookie);
  };

  /**
   * Commits the session and returns the session as a cookie string.
   * @param {Session<Data, Data>} session - The session object to be committed.
   * @returns {Promise<string>} A promise that resolves to the session as a cookie string.
   */
  public commitSessionAsCookieValue = (session: Session<Data, Data>): Promise<string> => {
    return this._storage.commitSession(session);
  };

  /**
   * Commits the session and returns the session as HTTP headers.
   * @param {Session<Data, Data>} session - The session object to be committed.
   * @returns {Promise<Headers>} A promise that resolves to the session as HTTP headers.
   */
  public commitSessionAsHeaders = async (session: Session<Data, Data>): Promise<Headers> => {
    const cookie = await this._storage.commitSession(session);
    const headers = new Headers();
    headers.append('Set-Cookie', cookie);
    return headers;
  };

  /**
   * Creates a new session or updates an existing session.
   * @param request - The request object.
   * @param sessionData - The data to be stored in the session.
   * @param remember - Indicates whether to remember the session.
   * @param redirectTo - URL to redirect to after session creation.
   * @returns A Promise resolving to void.
   * @throws Throws a redirect to the specified URL.
   */
  public createSession = async ({
    request,
    sessionData,
    remember,
    redirectTo,
  }: {
    request: Request;
    sessionData: Data;
    remember: boolean;
    redirectTo: string;
  }): Promise<TypedResponse<never>> => {
    const session = await this.getSession(request);
    keys(sessionData).forEach(key => {
      // @ts-ignore
      session.set(key, sessionData[key]);
    });
    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': await this._storage.commitSession(session, {
          maxAge: remember
            ? 60 * 60 * 24 * 7 // 7 days
            : undefined,
        }),
      },
    });
  };

  /**
   * Destroys the session and redirects to the login URL.
   * @param {Object} options - The options object.
   * @param {Request} options.request - The request object.
   * @param {function(string): string} [options.redirectUrl=(loginUrl) => loginUrl] - The function to generate the redirect URL. Defaults to the login URL.
   * @returns {Promise<TypedResponse<never>>} Redirect to login url
   */
  public destroySession = async ({
    redirectUrl = (loginUrl): string => {
      return loginUrl;
    },
    request,
  }: {
    request: Request;
    redirectUrl?: (loginUrl: string) => string;
  }): Promise<TypedResponse<never>> => {
    const session = await this.getSession(request);
    return redirect(redirectUrl(this._loginUrl), {
      headers: {
        'Set-Cookie': await this._storage.destroySession(session),
      },
    });
  };

  /**
   * Guards routes by checking session existence and validity based on a condition, then returns session data.
   *
   * @param {Object} params - The parameters object.
   * @param {Request} params.request - The request object.
   * @param {(session: Session<Data, Data>) => boolean} [params.condition] - The condition function to validate the session. Defaults to a function that always returns true.
   *
   * @returns {Promise<Omit<Session<Data, Data>, 'data'> & { data: Required<Session<Data, Data>['data']> }>} A Promise resolving to the session data if the session exists and passes the condition.
   *
   * @throws {Redirect} Throws a redirect to either the login URL with appropriate parameters if the session does not exist or does not meet the condition.
   */
  public guard = async ({
    request,
    condition = (): boolean => {
      return true;
    },
  }: {
    request: Request;
    condition?: (session: Session<Data, Data>) => boolean;
  }): Promise<Omit<Session<Data, Data>, 'data'> & { data: Required<Session<Data, Data>['data']> }> => {
    const session = await this.getSession(request);

    const { pathname } = new URL(request.url);

    if (isEmpty(session.data) || !condition(session)) {
      const searchParams = new URLSearchParams([['redirectTo', pathname]]);
      throw redirect(`${this._loginUrl}?${searchParams}`);
    } else {
      return session as Omit<Session<Data, Data>, 'data'> & { data: Required<Session<Data, Data>['data']> };
    }
  };
}
