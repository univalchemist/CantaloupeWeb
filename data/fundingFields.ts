import {ISelect} from '../components/DropDown';

export interface IFundingField {
  type: string;
  name: string;
  placeholder: string;
  header: string;
  show?: boolean;
  isCurrency: boolean;
  autoComplete: string;
  errorMsg: string;
  validate: (email: string) => boolean;
  selectOptions?: ISelect[] | undefined;
  initialSelectValue?: string;
  isAutoReplenish: boolean;
  isManualReplenish: boolean;
  isClick2Pay: boolean;
}

const reloadOptions = [
  {name: '$10', value: '10'},
  {name: '$15', value: '15'},
  {name: '$20', value: '20'},
  {name: '$25', value: '25'},
  {name: '$50', value: '50'},
  {name: '$100', value: '100'},
];

export const fundingFields: IFundingField[] = [
  {
    type: 'select',
    name: 'replenish',
    placeholder: '0',
    header: 'Reload With:',
    show: true,
    isCurrency: true,
    autoComplete: '',
    errorMsg: 'Please enter a dollar amount to add to your account.',
    validate: (values: any) => values.replenish,
    selectOptions: reloadOptions,
    initialSelectValue: '25',
    isAutoReplenish: true,
    isManualReplenish: true,
    isClick2Pay: true,
  },
  {
    type: 'select',
    name: 'replenishMin',
    placeholder: '0',
    header: 'When Balance Falls Below:',
    show: true,
    isCurrency: true,
    autoComplete: '',
    errorMsg:
      'Please enter a minimum balance to trigger your account replenish.',
    validate: (values: any) => values.replenishMin,
    selectOptions: reloadOptions,
    initialSelectValue: '10',
    isAutoReplenish: true,
    isManualReplenish: false,
    isClick2Pay: false,
  },
  {
    type: 'text',
    name: 'cardnumber',
    placeholder: 'Enter credit card number',
    header: 'Bank Credit Card Number:',
    show: true,
    isCurrency: false,
    autoComplete: 'cc-number',
    errorMsg: 'Please enter your bank credit card number.',
    validate: (values: any) => values.cardnumber,
    isAutoReplenish: true,
    isManualReplenish: true,
    isClick2Pay: false,
  },
  {
    type: 'password',
    name: 'cvc',
    placeholder: 'Enter 3 or 4 digit code',
    header: 'Security Code:',
    show: true,
    isCurrency: false,
    autoComplete: 'cc-csc',
    errorMsg: 'Please enter a dollar amount to add to your account.',
    validate: (values: any) => {
      const cvcField = fundingFields.filter((field) => field.name === 'cvc');

      if (values.cvc.toString().length < 3) {
        cvcField[0].errorMsg = 'Please enter your security code.';

        return false;
      }

      if (values.cvc.toString().length > 4) {
        cvcField[0].errorMsg =
          'Please enter a valid security code, 3 or 4 digits only.';

        return false;
      }

      return true;
    },
    isAutoReplenish: true,
    isManualReplenish: true,
    isClick2Pay: false,
  },
];
