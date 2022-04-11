export interface Status {
  active: boolean;
  success: boolean;
  message: string;
}

export interface IPasswordMatch {
  [key: string]: Status;
  password: Status;
  confirmPassword: Status;
}
