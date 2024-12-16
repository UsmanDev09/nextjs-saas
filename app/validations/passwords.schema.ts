import { object, string } from 'yup';

import { PASSWORD_REGEX, validationMessages } from '@/constants';

export const passwordSchema = object()
  .shape({
    password: string()
      .min(8)
      .max(64)
      .matches(PASSWORD_REGEX, validationMessages.password)
      .required()
      .trim(),
  })
  .required();

export const confirmPasswordSchema = object()
  .shape({
    confirmPassword: string()
      .required('Confirm password is a required field')
      .trim(),
  })
  .required();
