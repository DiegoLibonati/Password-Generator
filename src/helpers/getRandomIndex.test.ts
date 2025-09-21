import { getRandomIndex } from "@src/helpers/getRandomIndex";

describe("getRandomIndex.ts", () => {
  describe("General Tests.", () => {
    const arr = ["123", "32", "12"];

    test("It should return a random number within the possible range of the input array.", () => {
      const minIndex = 0;
      const maxIndex = arr.length - 1;
      const randomNumber = getRandomIndex<string>(arr);

      expect(randomNumber >= minIndex && randomNumber <= maxIndex).toBeTruthy();
    });
  });
});
