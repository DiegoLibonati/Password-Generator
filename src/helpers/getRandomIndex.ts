export const getRandomIndex = <T>(array: T[]): number => {
  const randomNumber = Math.floor(Math.random() * array.length);

  return randomNumber;
};
