export const handlePhoneNumberInput = (event) => {
  const phoneNumber = event.target.value;

  // Remove any characters that are not numbers or parentheses and hyphens
  const cleanPhoneNumber = phoneNumber.replace(/[^0-9-()]/g, '');

  // Update the value of the phone number field
  event.target.value = cleanPhoneNumber;
};
