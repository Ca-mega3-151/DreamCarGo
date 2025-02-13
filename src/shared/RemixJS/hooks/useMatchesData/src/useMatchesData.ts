import { LoaderFunction } from '@remix-run/node';
import { useMatches } from '@remix-run/react';
import { useMemo } from 'react';
import { AnyRecord } from '~/shared/TypescriptUtilities';

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 * @example ```typescript

  const isUser = (user: unknown): user is User => {
    return (
      user != null &&
      typeof user === "object" &&
      "email" in user &&
      typeof user.email === "string"
    );
  }

  export const useOptionalUser = (): User | undefined => {
    const data = useMatchesData("root");
    if (!data || !isUser(data.user)) {
      return undefined;
    }
    return data.user;
  }

  export const useUser = (): User => {
    const maybeUser = useOptionalUser();
    if (!maybeUser) {
      throw new Error(
        "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.",
      );
    }
    return maybeUser;
  }


  export default const NotesPage = () => {
    const data = useLoaderData<typeof loader>();
    const user = useUser();

    return ...
  }
  ```
 */
export const useMatchesData = <T extends AnyRecord | LoaderFunction>(
  id: string,
): (T extends LoaderFunction ? ReturnType<T> : AnyRecord) | undefined => {
  const matchingRoutes = useMatches();
  const route = useMemo(() => {
    return matchingRoutes.find(route => {
      return route.id === id;
    });
  }, [matchingRoutes, id]);
  return route?.data as (T extends LoaderFunction ? ReturnType<T> : AnyRecord) | undefined;
};
