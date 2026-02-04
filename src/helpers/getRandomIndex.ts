export const getRandomIndex = (array: unknown[]): number => {
  const randomNumber = Math.floor(Math.random() * array.length);

  return randomNumber;
};
