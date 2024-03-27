import { useCallback } from 'react';
import * as Yup from 'yup';

export const useYupValidationResolver = (
  validationSchema: Yup.ObjectSchema<
    { email: string; password: string },
    Yup.AnyObject,
    { email: undefined; password: undefined },
    ''
  >
) =>
  useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (
              allErrors: any,
              currentError: { path: any; type: any; message: any }
            ) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );
