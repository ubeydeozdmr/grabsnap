import { getUsers } from '../api/data';

export const doPasswordsMatch = (password: string, passwordRepeat: string) => {
  return password === passwordRepeat;
};

export const isPasswordValid = (password: string) => {
  const allNumericRegex = /^\d+$/;

  if (password.length < 8) return false;
  if (allNumericRegex.test(password)) return false;

  return true;
};

export const isEmailValid = (email: string) => {
  // Basic format control
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // No double dots or special characters at the beginning or end of the domain name.
  const domainPart = email.split('@')[1];
  if (
    !domainPart ||
    domainPart.startsWith('.') ||
    domainPart.endsWith('.') ||
    domainPart.includes('..')
  ) {
    return false;
  }

  return regex.test(email);
};

export const isPhoneNumberValid = (phoneNumber: number) => {
  // Check if the phone number is 11 digits and only consists of numbers
  const phoneRegex = /^[0-9]{11}$/;
  return phoneRegex.test(phoneNumber.toString());
};

// Check Email
export const isEmailTaken = async (email: string) => {
  const users = await getUsers();
  return users.some((user) => user.email === email);
};

// Check Password
export const isPasswordCorrect = async (password: string) => {
  const users = await getUsers();
  return users.some((user) => user.password === password);
};

// Check Verification Code
export const isCodeCorrect = async (code: string) => {
  return code === '123456';
  /*   const users = await getUsers();
  return users.some((user) => user.verificationCode === code); */
};
