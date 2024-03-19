const phonePattern = /^[0-9]{2,4}-[0-9]{3,4}-[0-9]{4}$/;

export const checkRightNumber = (phoneNumber: string) => {
  return phonePattern.test(phoneNumber);
};
