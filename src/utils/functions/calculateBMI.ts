export const calculateBMI = (height: number, weight: number) =>
  +((weight / height / height) * 10000).toFixed(2);
