# Overview

The `useZodForm` hook serves as a specialized type guard for React Hook Form, streamlining form management in React applications with a focus on Zod schema validation. It provides essential functions to manage form state, validate input, and efficiently handle dynamic arrays within your forms.

# Options

### Parameters

- **`validation`**: ZodType - The Zod validation schema for the form.
- **`defaultValues`**: `Partial<TypeOf<Validation>>` - Initial values for the form fields.
- **`onValid`**: `(data: TypeOf<Validation>) => void` - Callback function invoked when the form is valid.
- **`onInvalid`**: `(errors: FieldErrors<TypeOf<Validation>>) => void` - Callback function invoked when the form is invalid.

### Return Value

The `useZodForm` hook returns an object containing various functions and properties that can be used to manage and interact with the form.

- **`submit`**: `() => Promise<void>` - Submits the form asynchronously.
- **`watch`**: `UseFormWatch<TypeOf<Validation>>` - Watches changes in specified form fields.
- **`setValue`**: `UseFormSetValue<TypeOf<Validation>>` - Sets the value of a specific form field.
- **`setError`**: `UseFormSetError<TypeOf<Validation>>` - Sets validation error for a specific form field.
- **`trigger`**: `UseFormTrigger<TypeOf<Validation>>` - Manually triggers form validation.
- **`getValues`**: `UseFormGetValues<TypeOf<Validation>>` - Gets the current values of all form fields.
- **`reset`**: `UseFormReset<TypeOf<Validation>>` - Resets the form to its initial state.
- **`resetField`**: `UseFormResetField<TypeOf<Validation>>` - Resets a specific form field to its initial value.
- **`setFocus`**: `UseFormSetFocus<TypeOf<Validation>>` - Sets focus on a specific form field.
- **`clearErrors`**: `UseFormClearErrors<TypeOf<Validation>>` - Clears validation errors for all form fields.

- **`formErrors`**: `FieldErrors<TypeOf<Validation>>` - Object containing errors for each form field.
- **`formFieldsChanged`**: `Array<KeyOf<TypeOf<Validation>>>` - Array containing keys of form fields that have changed.

- **`arrays`**: Object containing methods for working with arrays in the form. Each array key corresponds to a form field that is an array.

# Usage

```typescript
import { FC } from 'react';
import { array, object, string } from 'zod';

const ComboSchema = object({
  code: string(),
  title: string(),
  description: string(),
  products: array(
    object({
      productCode: string(),
      productName: string(),
      productDescription: string(),
    }),
  ),
  tags: array(string()).optional(),
  metadatas: array(
    object({
      metadataCode: string(),
      metadataName: string(),
      metadataDescription: string(),
    }),
  ),
});

export const FormMutation: FC = () => {
  const { setValue, trigger, arrays, submit, watch, reset } = useZodForm({
    validation: ComboSchema,
    onInvalid: error => console.log('Invalid', error),
    onValid: values => console.log('Valid', values),
  });

  const comboData = watch();

  const handleAddProduct = () => {
    arrays.products.append({ productCode: '', productName: '', productDescription: '' });
  };

  const handleRemoveProduct = (index: number) => {
    arrays.products.remove(index);
  };

  const handleAddMetadata = () => {
    arrays.metadatas.append({ metadataCode: '', metadataName: '', metadataDescription: '' });
  };

  const handleRemoveMetadata = (index: number) => {
    arrays.metadatas.remove(index);
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        submit();
      }}
    >
      <div>
        <label>Code:</label>
        <input
          value={comboData.code}
          onChange={e => {
            setValue('code', e.target.value);
            trigger('code');
          }}
        />
      </div>
      <div>
        <label>Title:</label>
        <input
          value={comboData.title}
          onChange={e => {
            setValue('title', e.target.value);
            trigger('title');
          }}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          value={comboData.description}
          onChange={e => {
            setValue('description', e.target.value);
            trigger('description');
          }}
        />
      </div>
      <div>
        <label>Products:</label>
        {arrays.products.fields.map((product, index) => {
          return (
            <div key={index}>
              <label>Product Code:</label>
              <input
                value={product.productCode}
                onChange={e => {
                  arrays.products.update(index, {
                    ...product,
                    productCode: e.target.value,
                  });
                  trigger(`products.${index}.productCode`);
                }}
              />
              <label>Product Name:</label>
              <input
                value={product.productName}
                onChange={e => {
                  arrays.products.update(index, {
                    ...product,
                    productName: e.target.value,
                  });
                  trigger(`products.${index}.productName`);
                }}
              />
              <label>Product Description:</label>
              <input
                value={product.productDescription}
                onChange={e => {
                  arrays.products.update(index, {
                    ...product,
                    productDescription: e.target.value,
                  });
                  trigger(`products.${index}.productDescription`);
                }}
              />
              <button type="button" onClick={() => handleRemoveProduct(index)}>
                Remove Product
              </button>
            </div>
          );
        })}
        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
      <div>
        <label>Tags:</label>
      </div>
      <div>
        <label>Metadatas:</label>
        {arrays.metadatas.fields.map((metadata, index) => {
          return (
            <div key={index}>
              <label>Metadata Code:</label>
              <input
                value={metadata.metadataCode}
                onChange={e => {
                  arrays.metadatas.update(index, {
                    ...metadata,
                    metadataCode: e.target.value,
                  });
                  trigger(`metadatas.${index}.metadataCode`);
                }}
              />
              <label>Metadata Name:</label>
              <input
                value={metadata.metadataName}
                onChange={e => {
                  arrays.metadatas.update(index, {
                    ...metadata,
                    metadataName: e.target.value,
                  });
                  trigger(`metadatas.${index}.metadataName`);
                }}
              />
              <label>Metadata Description:</label>
              <input
                value={metadata.metadataDescription}
                onChange={e => {
                  arrays.metadatas.update(index, {
                    ...metadata,
                    metadataDescription: e.target.value,
                  });
                  trigger(`metadatas.${index}.metadataDescription`);
                }}
              />
              <button type="button" onClick={() => handleRemoveMetadata(index)}>
                Remove Metadata
              </button>
            </div>
          );
        })}
        <button type="button" onClick={handleAddMetadata}>
          Add Metadata
        </button>
      </div>
      <button type="reset" onClick={() => reset({})}>
        Reset
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};
```
