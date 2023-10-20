export const trimmingString = (element) => {
  if (element && typeof element.value === 'string') {
    return element.value.trim();
  }
  return element;
};
