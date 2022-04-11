import {Click2PayCardBrands} from './enums/Click2PayCardBrands';
import {Click2PayCheckoutActionCode} from './enums/Click2PayCheckoutActionCode';
import {Click2PayValidationChannels} from './enums/Click2PayValidationChannels';

export interface IEmail {
  email: string;
}

export interface IOTPValue {
  value: string;
}

export interface IValidationChannels {
  requestedValidationChannelId: Click2PayValidationChannels;
}

export interface IEncryptCard {
  primaryAccountNumber: string;
  panExpirationMonth: string;
  panExpirationYear: string;
  cardSecurityCode: string;
  cardholderFirstName?: string;
  cardholderLastName?: string;
  billingAddress?: {
    name?: string;
    line1?: string;
    line2?: string;
    line3?: string;
    city?: string;
    state: string;
    zip?: string;
    countryCode?: string;
  };
}

export interface IEncryptCardResponse {
  encryptedCard: string;
  cardBrand: string;
}

export interface ICheckOutNewCard {
  encryptedCard: string | undefined;
  cardBrand: Click2PayCardBrands | undefined;
  windowRef?: Window;
  consumer?: {
    emailAddress: string;
    mobileNumber: {
      countryCode: string;
      phoneNumber: string;
    };
  };
}

export interface ICheckOutResponse {
  checkoutActionCode: Click2PayCheckoutActionCode;
  checkoutResponse: string;
  headers: {
    'merchant-transaction-id': string;
    'x-src-cx-flow-id': string;
  };
  network: string;
  idToken: string;
}
export interface ICheckOutCard {
  srcDigitalCardId: string;
  windowRef: Window;
}

export interface ICard {
  srcDigitalCardId: string | null;
  srcPaymentCardId: string | null;
  panBin: string | null;
  panLastFour: string | null;
  tokenLastFour: string | null;
  digitalCardData: {
    status: string | null;
    presentationName: string | null;
    descriptorName: string | null;
    artUri: string | null;
    artHeight: string | null;
    artWidth: string | null;
    pendingEvents: string | null;
    coBrandedName: string | null;
    isCoBranded: boolean;
  };
  digitalCardFeatures: [];
  panExpirationMonth: string | null;
  panExpirationYear: string | null;
  digitalCardRelatedData: string | null;
  countryCode: string | null;
  dcf: {
    type: string | null;
    uri: string | null;
    logoUri: string | null;
    name: string | null;
  };
  dateOfCardCreated: string | null;
  dateOfCardLastUsed: string | null;
  paymentCardDescriptor: string | null;
  tokenBinRange: string | null;
  maskedBillingAddress: {
    name: string | null;
    line1: string | null;
    line2: string | null;
    line3: string | null;
    city: string | null;
    state: string | null;
    countryCode: string | null;
    zip: string | null;
    addressId: string | null;
  };
}
export interface IClick2PayInstance {
  idLookup: (obj: IEmail) => {consumerPresent: boolean};
  getCards: () => [];
  initiateValidation: (obj?: IValidationChannels) => {
    maskedValidationChannel: string;
    network: string;
    supportedValidationChannels: [];
  };
  validate: (obj: IOTPValue) => ICard[];
  encryptCard: (obj: IEncryptCard) => IEncryptCardResponse;
  checkoutWithNewCard: (obj: ICheckOutNewCard) => any;
  checkoutWithCard: (obj: ICheckOutCard) => any;
}

export interface ISupportedValidationChannels {
  identityProvider: string;
  maskedValidationChannel: string;
  identityType: string;
  validationChannelId: string;
}

export interface IClick2Pay {
  instance: IClick2PayInstance | null;
  cards: ICard[] | null;
  idLookup: {consumerPresent: boolean} | null;
  isOTPVerified: boolean;
  disabled: boolean;
}

export interface IClick2PayCheckout {
  checkoutData: ICheckOutResponse | null;
  amount: number | null;
  replenishType: number | null;
  cvv: string | null;
}
