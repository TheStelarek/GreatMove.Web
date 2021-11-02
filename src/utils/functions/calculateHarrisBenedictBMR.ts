export const calculateHarrisBenedictBMR = (gender: number, height: number, weight: number, age: number) => {
   if (gender === 1) {
      return 66.5 + 13.76 * weight + 5.003 * height - 6.775 * age;
   }

   return 655 + 9.563 * weight + 1.85 * height - 4.676 * age;
};
