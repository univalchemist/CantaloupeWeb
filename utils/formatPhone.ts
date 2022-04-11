export const formatPhoneNumber = (phone: string) => {
  if (!phone) {
    return '';
  }
  let newPhone = phone.replace(/\D+/g, ''); // enforces numeric input
  const input = newPhone.substring(0, 10);
  const areaCode = input.substring(0, 3);
  const middle = input.substring(3, 6);
  const last = input.substring(6, 10);

  if (input.length > 6) {
    newPhone = `(${areaCode}) ${middle} - ${last}`;
  } else if (input.length > 3) {
    newPhone = `(${areaCode}) ${middle}`;
  } else if (input.length > 0) {
    newPhone = `(${areaCode}`;
  }

  return newPhone;
};

export const getOnlyNumbers = (phone: string): string | null => {
  const re = /\d+/g;
  const matches = phone.match(re);

  return matches && matches.length ? matches.join('') : null;
};
