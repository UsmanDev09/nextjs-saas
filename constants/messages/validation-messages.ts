const validationMessages = {
  comparePassword: 'Passwords must match.',
  password:
    'Must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character (ex: !@#$%)',
  username: 'Can only contain digits, characters and "_"',
  name: 'Can only contains alphabets and special characters',
  about: {
    required: 'This field is required.',
    min: 'The description must be at least 10 characters long.',
    max: 'The description must be no more than 500 characters long.',
    matches: 'The description contains invalid characters.',
  },
  region: {
    required: 'This field is required.',
    min: 'The region must be at least 2 characters long.',
    max: 'The region must be no more than 100 characters long.',
    matches: 'The region contains invalid characters.',
  },
  city: {
    required: 'This field is required.',
    min: 'The city must be at least 2 characters long.',
    max: 'The city must be no more than 100 characters long.',
    matches: 'The city contains invalid characters.',
  },
};

export default validationMessages;
