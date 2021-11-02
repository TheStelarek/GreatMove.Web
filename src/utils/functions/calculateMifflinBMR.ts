export const calculateMifflinBMR = (gender: number, height: number, weight: number, age: number) => {
   if (gender === 1) {
      return 10 * weight + 6.25 * height - 5 * age - 5;
   }
   return 10 * weight + 6.25 * height - 5 * age - 161;
};
