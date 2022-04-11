export const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

export const validatePassword = (pw: string): boolean => {
  // 1 uppercase letter
  // 1 lowercase letter
  // 1 number or special character
  // must be at least 8 characters long
  const re =
    // eslint-disable-next-line no-useless-escape
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@.!"%*#?&'()+,-\/;:<>={}|~\[\]\^\\])[A-Za-z\d$@.!"%*#?&'()+,-\/;:<>={}|~\[\]\^\\]{8,20}$/;

  return re.test(pw);
};
