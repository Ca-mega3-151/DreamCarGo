import {
  ActionFunctionArgs as RRActionFunctionArgs,
  LoaderFunctionArgs as RRLoaderFunctionArgs,
} from 'react-router-dom';
import { AppData } from './data';
import { SerializeFrom } from './serialize';

/**
 * Arguments passed to a route `clientAction` function
 * @private Public API is exported from @remix-run/react
 */
export type ClientActionFunctionArgs = RRActionFunctionArgs<undefined> & {
  serverAction: <T = AppData>() => Promise<SerializeFrom<T>>;
};

/**
 * Arguments passed to a route `clientLoader` function
 * @private Public API is exported from @remix-run/react
 */
export type ClientLoaderFunctionArgs = RRLoaderFunctionArgs<undefined> & {
  serverLoader: <T = AppData>() => Promise<SerializeFrom<T>>;
};
