import {validateEmail} from '../../utils/formValidation';

it('correctly validates against email formats', () => {
  expect(validateEmail('test@domain.com')).toBe(true);
  expect(validateEmail('lastname@domain.com')).toBe(true);
  expect(validateEmail('test.email.with+symbol@domain.com')).toBe(true);
  expect(validateEmail('a@domain.com')).toBe(true);
  expect(validateEmail('example-abc@abc-domain.com')).toBe(true);
  expect(validateEmail('#!$%&*+-/=?^_{}|~@domain.org')).toBe(true);
  expect(validateEmail('example@s.solutions')).toBe(true);

  expect(validateEmail('example.com')).toBe(false);
  expect(validateEmail('A@b@c@domain.com')).toBe(false);
  expect(validateEmail('test@domain..com')).toBe(false);
});
