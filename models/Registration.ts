interface IRegistrationKeys {
  [key: string]: any;
}

export enum SocialAuthTypes {
  APPLE = 'apple',
  GOOGLE = 'google-oauth2',
  FACEBOOK = 'facebook',
}

export interface Registration extends IRegistrationKeys {
  email: string;
  password?: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  mobile?: string;
  address?: string;
  city?: string;
  state?: string;
  postal?: string;
  agreement?: boolean;
  socialAuthType?: SocialAuthTypes | undefined;
  canEditEmail?: boolean;
}
