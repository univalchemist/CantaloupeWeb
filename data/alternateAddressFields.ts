export interface IAlternateAddressField {
  type: string;
  name: string;
  placeholder: string;
  enableValidationIcon: boolean;
  errorMsg: string;
  validate: (email: string) => boolean;
  header: string;
}

export const alternateAddressFields: IAlternateAddressField[] = [
  {
    type: 'text',
    name: 'address',
    placeholder: 'Enter Street Address',
    enableValidationIcon: false,
    errorMsg: 'Please enter your address.',
    validate: (values: any) => values.address.trim(),
    header: 'Street Address',
  },
  {
    type: 'text',
    name: 'city',
    placeholder: 'Enter City',
    enableValidationIcon: false,
    errorMsg: 'Please enter your city.',
    validate: (values: any) => values.city.trim(),
    header: 'City',
  },
  {
    type: 'text',
    name: 'state',
    placeholder: 'Enter State',
    enableValidationIcon: false,
    errorMsg: 'Please enter your state.',
    validate: (values: any) => values.state.trim(),
    header: 'State',
  },
  {
    type: 'text',
    name: 'postal',
    placeholder: 'ZIP Code',
    enableValidationIcon: false,
    errorMsg: 'Please enter your zip code.',
    validate: (values: any) => values.postal.trim(),
    header: 'ZIP Code',
  },
];
