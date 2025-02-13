import { parse, stringify } from 'qs';
import { keys } from 'ramda';
import {
  TypeOf,
  ZodBoolean,
  ZodEnum,
  ZodError,
  ZodNativeEnum,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodSchema,
  ZodString,
} from 'zod';
import { isBrowser } from '../../isBrowser';
import { AnyRecord, GetGeneric } from '~/shared/TypescriptUtilities';

interface NestedObjectString {
  [key: string]: string | undefined | NestedObjectString;
}

/**
 * Custom error class for UrlSearchParamsUtils that extends the base Error class.
 *
 * @class UrlSearchParamsUtilsError
 * @extends {Error}
 * @template T - The type of data associated with the error.
 */
export class UrlSearchParamsUtilsError<T extends AnyRecord> extends Error {
  /** The type of error, either 'ZOD' for Zod validation errors or 'UNCAUGHT' for uncaught errors. */
  public type: 'ZOD' | 'UNCAUGHT';
  /** Details associated with the error, including data and error type. */
  public detail: { data: T; type: UrlSearchParamsUtilsError<T>['type'] };

  constructor({ data, type }: { data: T; type: UrlSearchParamsUtilsError<T>['type'] }) {
    super();
    this.name = 'UrlSearchParamsUtilsError';
    this.type = type;
    this.detail = {
      data,
      type,
    };
  }

  /**
   * Overrides the default toString method to log error details based on the error type.
   *
   * @returns {void}
   */
  public override toString = (): void => {
    if (this.type === 'ZOD') {
      console.error('Data is invalid', this.detail.data);
    } else {
      console.error('Exception', this.detail.data);
    }
  };
}

/**
 * Utility class for handling URLSearchParams operations with Zod validation.
 *
 * @class UrlSearchParamsUtils
 * @template T - The type of data to be handled.
 */
export class UrlSearchParamsUtils<T extends AnyRecord> {
  /** The Zod schema used for data validation. */
  private _zodSchema?: ZodSchema<T>;
  /** Validate input with zod before encrypt & decrypt */
  private _strict: boolean;

  constructor({ zodSchema, strict }: { zodSchema: ZodSchema<T>; strict?: boolean }) {
    this._zodSchema = zodSchema;
    this._strict = !!strict;
  }

  private _matchParsedSearchParamsWithZodSchema = (
    zodObject: ZodSchema<any> | undefined,
    parsedObject: NestedObjectString | undefined,
  ): T => {
    if (!(zodObject instanceof ZodObject)) {
      return {} as T;
    }
    const shape = zodObject?.shape;
    const result: AnyRecord = {};
    keys(shape).forEach(key_ => {
      const key = key_ as keyof typeof result;
      const value = parsedObject?.[key];
      if (!value) {
        return;
      }

      const fieldSchema = shape[key];
      const fieldType = fieldSchema instanceof ZodOptional ? fieldSchema._def.innerType : fieldSchema;

      if (fieldType instanceof ZodObject) {
        try {
          result[key] = this._matchParsedSearchParamsWithZodSchema(
            fieldType,
            parsedObject?.[key] as NestedObjectString | undefined,
          );
        } catch {
          result[key] = undefined;
        }
      } else if (fieldType instanceof ZodNumber) {
        result[key] = Number(value);
      } else if (fieldType instanceof ZodString) {
        result[key] = String(value);
      } else if (fieldType instanceof ZodBoolean) {
        result[key] = value === 'true';
      } else if (fieldType instanceof ZodEnum || fieldType instanceof ZodNativeEnum) {
        result[key] = value;
      } else {
        result[key] = value;
      }
    });

    return result as T;
  };

  /**
   * Parses a URLSearchParams string into the specified data type.
   *
   * @private
   * @param {string} str - The URLSearchParams string to be parsed.
   * @returns {T} - The parsed data.
   */
  private _parseSearchParams = (str: string): T => {
    const parsedSearchParams = parse(str, {
      ignoreQueryPrefix: true,
      plainObjects: true,
      allowDots: true,
    }) as NestedObjectString | undefined;
    return this._matchParsedSearchParamsWithZodSchema(this._zodSchema, parsedSearchParams);
  };

  /**
   * Encrypts the provided data into a URLSearchParams string.
   *
   * @param {T} data - The data to be encrypted.
   * @returns {string} - The encrypted URLSearchParams string.
   * @throws {UrlSearchParamsUtilsError<T>} - Throws an error if data validation fails.
   */
  public encrypt = (data: T): string => {
    try {
      if (this._strict) {
        this._zodSchema?.parse(data);
      }
      const urlSearchParams = stringify(data, {
        addQueryPrefix: true,
        skipNulls: true,
        allowDots: true,
        allowEmptyArrays: false,
      });
      return urlSearchParams;
    } catch (error) {
      throw new UrlSearchParamsUtilsError<T>({
        data,
        type: error instanceof ZodError ? 'ZOD' : 'UNCAUGHT',
      });
    }
  };

  /**
   * Decrypts a URLSearchParams string or Request object into the specified data type.
   *
   * @param {string | Request} encryptData - The encrypted data as a URLSearchParams string or Request object.
   * @returns {T} - The decrypted data.
   * @throws {UrlSearchParamsUtilsError<T>} - Throws an error if data validation fails.
   */
  public decrypt = (encryptData: string | Request): T => {
    let data: T;
    if (typeof encryptData === 'string') {
      data = this._parseSearchParams(encryptData);
    } else {
      data = this._parseSearchParams(this.getUrlSearchParams(encryptData).toString());
    }

    try {
      if (this._strict) {
        this._zodSchema?.parse(data);
      }
      return data;
    } catch (error) {
      throw new UrlSearchParamsUtilsError<T>({
        data,
        type: error instanceof ZodError ? 'ZOD' : 'UNCAUGHT',
      });
    }
  };

  /**
   * Retrieves the URLSearchParams object from a Request object or the current window's location.
   *
   * @param {Request} [request] - The optional Request object to extract URLSearchParams from.
   * @returns {URLSearchParams} - The URLSearchParams object.
   */
  public getUrlSearchParams = (request?: Request): URLSearchParams => {
    if (request) {
      const url = new URL(request.url);
      return url.searchParams;
    }
    if (isBrowser()) {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  };
}

export type GetTypeOfSearchParamsFromUrlSearchParamsUtils<T extends UrlSearchParamsUtils<any>> = TypeOf<
  GetGeneric<
    // @ts-ignore
    Exclude<T['_zodSchema'], undefined>
  >
>;
