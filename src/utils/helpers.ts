export function formatPhoneNumber(value: string): string {
  const numbers = value.replace(/\D/g, '');
  let result = '';
  if (numbers.length <= 3) {
    result = `(${numbers}`;
  } else if (numbers.length <= 6) {
    result = `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  } else {
    result = `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  }
  return result;
}
