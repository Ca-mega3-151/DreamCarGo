import { zodResolver } from '@hookform/resolvers/zod';
import { keys } from 'ramda';
import {
  ArrayPath,
  FieldArrayMethodProps,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  UseFieldArraySwap,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormReset,
  UseFormResetField,
  UseFormSetError,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { TypeOf, ZodArray, ZodObject, ZodType } from 'zod';
import { useDeepCompareMemo } from '../../useDeepCompareMemo';
import { GetKeyWithTypes, KeyOf } from '~/shared/TypescriptUtilities';

export interface UseZodForm<Validation extends ZodType> {
  /** The Zod validation schema for the form data. */
  validation: Validation;

  /**
   * Optional: Default values for the form fields.
   * These values will be used to initialize the form.
   */
  defaultValues?: Partial<TypeOf<Validation>>;

  /**
   * Callback function invoked when the form data is valid.
   */
  onValid?: (data: TypeOf<Validation>) => void;

  /**
   * Callback function invoked when the form data is invalid.
   */
  onInvalid?: (errors: FieldErrors<TypeOf<Validation>>) => void;
}

export const useZodForm = <Validation extends ZodType>({
  validation,
  defaultValues,
  onInvalid = (): void => {
    return undefined;
  },
  onValid = (): void => {
    return undefined;
  },
}: UseZodForm<Validation>): {
  /**
   * Function to submit the form.
   * Returns a Promise that resolves once the submission is complete.
   */
  submit: () => Promise<void>;

  /**
   * Watch function to observe changes in specified form fields.
   */
  watch: UseFormWatch<TypeOf<Validation>>;

  /**
   * Set the value of a specific form field.
   */
  setValue: UseFormSetValue<TypeOf<Validation>>;

  /**
   * Set the validation error for a specific form field.
   */
  setError: UseFormSetError<TypeOf<Validation>>;

  /**
   * Trigger the form validation manually.
   */
  trigger: UseFormTrigger<TypeOf<Validation>>;

  /**
   * Get the current values of all form fields.
   */
  getValues: UseFormGetValues<TypeOf<Validation>>;

  /**
   * Reset the form to its initial state.
   */
  reset: UseFormReset<TypeOf<Validation>>;

  /**
   * Reset a specific form field to its initial value.
   */
  resetField: UseFormResetField<TypeOf<Validation>>;

  /**
   * Set focus on a specific form field.
   */
  setFocus: UseFormSetFocus<TypeOf<Validation>>;

  /**
   * Clear validation errors for all form fields.
   */
  clearErrors: UseFormClearErrors<TypeOf<Validation>>;

  /**
   * Object containing errors for each form field.
   */
  formErrors: FieldErrors<TypeOf<Validation>>;

  /**
   * Array containing keys of form fields that have changed.
   */
  formFieldsChanged: Array<KeyOf<TypeOf<Validation>>>;

  /**
   * Object containing methods for working with arrays in the form.
   * Each array key corresponds to a form field that is an array.
   */
  arrays: {
    [x in GetKeyWithTypes<TypeOf<Validation>, Array<Record<string, any>>>]: {
      /** Swap two elements in the array. */
      swap: UseFieldArraySwap;

      /** Move an element within the array. */
      move: UseFieldArrayMove;

      /** Append a value to the array. */
      append: (value: TypeOf<Validation>[x][number], options?: FieldArrayMethodProps) => void; // UseFieldArrayAppend

      /** Remove an element from the array. */
      remove: UseFieldArrayRemove;

      /** Update the value of an element in the array. */
      update: (index: number, value: TypeOf<Validation>[x][number]) => void; // UseFieldArrayUpdate

      /** Array of objects representing fields in the array, each with a unique identifier. */
      // @ts-ignore ==> Unfixable
      fields: Array<FieldArrayWithId<TypeOf<Validation>, x>>;
    };
  };
} => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    getValues,
    setError,
    reset,
    resetField,
    setFocus,
    clearErrors,
    formState: { errors, dirtyFields },
  } = useForm<TypeOf<Validation>>({
    defaultValues: defaultValues as TypeOf<Validation>,
    resolver: zodResolver(validation),
  });

  /** Get all keys in array format  */
  const arrayKeys: GetKeyWithTypes<TypeOf<Validation>, Array<Record<string, any>>>[] = useDeepCompareMemo(() => {
    if (validation instanceof ZodObject) {
      return keys(validation.shape).filter(item => {
        if (validation.shape[item] instanceof ZodArray && validation.shape[item].element instanceof ZodObject) {
          return true;
        }
        return false;
      }) as GetKeyWithTypes<TypeOf<Validation>, Array<Record<string, any>>>[];
    }
    return [];
  }, [validation]);

  /** Create object containing methods for working with arrays in the form. */
  const arrays = arrayKeys.reduce<{
    [x in GetKeyWithTypes<TypeOf<Validation>, Array<Record<string, any>>>]: {
      swap: UseFieldArraySwap;
      move: UseFieldArrayMove;
      append: (value: TypeOf<Validation>[x][number], options?: FieldArrayMethodProps) => void; // UseFieldArrayAppend
      remove: UseFieldArrayRemove;
      update: (index: number, value: TypeOf<Validation>[x][number]) => void; // UseFieldArrayUpdate
      // @ts-ignore: Unfixable
      fields: Array<FieldArrayWithId<TypeOf<Validation>, x>>;
    };
  }>(
    (result, arrayKey) => {
      const arrayKey_ = arrayKey as GetKeyWithTypes<TypeOf<Validation>, Array<Record<string, any>>>;
      return {
        ...result,
        // eslint-disable-next-line react-hooks/rules-of-hooks
        [arrayKey]: useFieldArray({
          name: arrayKey_ as ArrayPath<TypeOf<Validation>>,
          control,
        }),
      };
    },
    {} as {
      [x in GetKeyWithTypes<TypeOf<Validation>, Array<Record<string, any>>>]: {
        swap: UseFieldArraySwap;
        move: UseFieldArrayMove;
        append: (value: TypeOf<Validation>[x][number], options?: FieldArrayMethodProps) => void; // UseFieldArrayAppend
        remove: UseFieldArrayRemove;
        update: (index: number, value: TypeOf<Validation>[x][number]) => void; // UseFieldArrayUpdate
        // @ts-ignore: Unfixable
        fields: Array<FieldArrayWithId<TypeOf<Validation>, x>>;
      };
    },
  );

  const submit = (): Promise<void> => {
    return handleSubmit(onValid, onInvalid)();
  };

  return {
    submit,
    watch,
    setValue,
    trigger,
    getValues,
    setError,
    reset,
    resetField,
    setFocus,
    clearErrors,
    formFieldsChanged: typeof dirtyFields === 'object' ? keys(dirtyFields) : [],
    formErrors: errors,
    arrays,
  };
};
