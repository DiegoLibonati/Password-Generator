import { getRandomIndex } from "@/helpers/getRandomIndex";

describe("getRandomIndex", () => {
  it("should return a valid index within array bounds", () => {
    const array = ["a", "b", "c", "d", "e"];

    const index = getRandomIndex(array);

    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(array.length);
  });

  it("should return 0 for single element array", () => {
    const array = ["only"];
    const mathRandomSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);

    const index = getRandomIndex(array);

    expect(index).toBe(0);
    mathRandomSpy.mockRestore();
  });

  it("should handle empty array", () => {
    const array: string[] = [];

    const index = getRandomIndex(array);

    expect(index).toBe(0);
  });

  it("should return different indices for large arrays", () => {
    const array = Array.from({ length: 100 }, (_, i) => i);
    const indices = new Set<number>();

    for (let i = 0; i < 50; i++) {
      indices.add(getRandomIndex(array));
    }

    expect(indices.size).toBeGreaterThan(1);
  });
});
