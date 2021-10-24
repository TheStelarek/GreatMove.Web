export const fieldMax = (value: number, max: number) => {
  if (value < 1) return ``;
  if (value > max) return max;
  return value;
};
