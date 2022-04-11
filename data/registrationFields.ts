import {validateEmail, validatePassword} from '../utils/formValidation';

export interface IField {
  type: string;
  name: string;
  placeholder: string;
  enableValidationIcon: boolean;
  errorMsg: string;
  validate: (email: string) => boolean;
  header?: string;
  step: number;
}

export const fields: IField[] = [
  {
    type: 'email',
    name: 'email',
    placeholder: 'Enter your email*',
    enableValidationIcon: true,
    errorMsg: 'Please enter a valid email address.', // how to make this dependent on the outcome of validate?
    validate: (values: any) => values.email && validateEmail(values.email),
    step: 2,
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'Create Password*',
    enableValidationIcon: false,
    errorMsg:
      'Password must be between 8 and 20 characters. It must contain at least 1 uppercase letter, 1 lowercase letter, and a special character from this list: [!-@\\\\[-^`{-~]',
    validate: (values: any) =>
      values.password && validatePassword(values.password),
    header: 'Secure your account',
    step: 3,
  },
  {
    type: 'password',
    name: 'confirmPassword',
    placeholder: 'Confirm Password*',
    enableValidationIcon: false,
    errorMsg: 'Passwords do not match.',
    validate: (values: any) =>
      values.confirmPassword && values.confirmPassword === values.password,
    step: 3,
  },
  {
    type: 'text',
    name: 'firstName',
    placeholder: 'First name*',
    enableValidationIcon: false,
    errorMsg: 'Please enter your first name.',
    validate: (values: any) => values.firstName.trim(),
    header: 'Enter personal details',
    step: 3,
  },
  {
    type: 'text',
    name: 'lastName',
    placeholder: 'Last name*',
    enableValidationIcon: false,
    errorMsg: 'Please enter your last name.',
    validate: (values: any) => values.lastName.trim(),
    step: 3,
  },
  {
    type: 'text',
    name: 'mobile',
    placeholder: 'Mobile number*',
    enableValidationIcon: true,
    errorMsg: 'Invalid mobile number.',
    validate: (values: any) => values.mobile && values.mobile.length === 16,
    step: 3,
  },
  {
    type: 'text',
    name: 'address',
    placeholder: 'Street address*',
    enableValidationIcon: false,
    errorMsg: 'Please enter your address.',
    validate: (values: any) => values.address.trim(),
    step: 3,
  },
  {
    type: 'text',
    name: 'city',
    placeholder: 'City*',
    enableValidationIcon: false,
    errorMsg: 'Please enter your city.',
    validate: (values: any) => values.city.trim(),
    step: 3,
  },
  {
    type: 'text',
    name: 'state',
    placeholder: 'State*',
    enableValidationIcon: false,
    errorMsg: 'Please enter your state.',
    validate: (values: any) => values.state.trim(),
    step: 3,
  },
  {
    type: 'text',
    name: 'postal',
    placeholder: 'ZIP / postal code*',
    enableValidationIcon: false,
    errorMsg: 'Please enter your zip code.',
    validate: (values: any) => values.postal.trim(),
    step: 3,
  },
  // removed for POC
  // {
  //   type: 'text',
  //   name: 'country',
  //   placeholder: 'Country*',
  //   enableValidationIcon: false,
  //   step: 3,
  // },
];
