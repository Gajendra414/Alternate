import { getCountryByCode } from "./countries";

export function trimDialCode(phoneNumber: string, countryCode: string): string {
  // Get the country by code
  const country = getCountryByCode(countryCode);

  if (!country) {
    return phoneNumber; // If no country found, return original number
  }

  // Remove the dial code from the phone number
  const dialCode = country.dialCode;

  // Check if the phone number starts with the dial code
  if (phoneNumber.startsWith(dialCode)) {
    return phoneNumber.slice(dialCode.length).trim(); // Return number without dial code
  }

  return phoneNumber; // Return original number if it doesn't start with dial code
}
