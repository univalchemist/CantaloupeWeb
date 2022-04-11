import {validatePassword} from '../../utils/formValidation';

// 1 uppercase letter
// 1 lowercase letter
// 1 number or special character
// must be at least 8 characters long
it('correctly validates against password formats', () => {
  expect(validatePassword('!12345Aa')).toBe(true);
  expect(validatePassword('!12345Aa$@.!%*#?&')).toBe(true);
  expect(validatePassword('!12345AaAadfskjf2323')).toBe(true);

  expect(validatePassword('!12345A')).toBe(false);
  expect(validatePassword('!12345a')).toBe(false);
  expect(validatePassword('!1234Aa')).toBe(false);
  expect(validatePassword('12345')).toBe(false);
  expect(validatePassword('abcde')).toBe(false);
  expect(validatePassword('ABCDEFGHIJK')).toBe(false);
  expect(validatePassword('abcdefghijk')).toBe(false);
  expect(validatePassword('!@#$%^&*()')).toBe(false);
});
