import { object, string } from 'yup';

export const emailSchema = object()
  .shape({
    email: string().trim().email().required(),
  })
  .required();
