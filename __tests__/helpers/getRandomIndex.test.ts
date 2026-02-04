import { getRandomIndex } from "@/helpers/getRandomIndex";

describe("getRandomIndex", () => {
  describe("return value", () => {
    it("should return a number", () => {
      const arr = [1, 2, 3];
      const result = getRandomIndex(arr);

      expect(typeof result).toBe("number");
    });

    it("should return an integer", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = getRandomIndex(arr);

      expect(Number.isInteger(result)).toBe(true);
    });

    it("should return index within array bounds", () => {
      const arr = ["a", "b", "c", "d", "e"];
      const result = getRandomIndex(arr);

      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(arr.length);
    });
  });

  describe("different array sizes", () => {
    it("should return 0 for single element array", () => {
      const arr = ["only"];
      const result = getRandomIndex(arr);

      expect(result).toBe(0);
    });

    it("should work with two element array", () => {
      const arr = [1, 2];
      const result = getRandomIndex(arr);

      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(2);
    });

    it("should work with large array", () => {
      const arr = Array.from({ length: 100 }, (_, i) => i);
      const result = getRandomIndex(arr);

      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(100);
    });
  });

  describe("randomness", () => {
    it("should return different values over multiple calls", () => {
      const arr = Array.from({ length: 10 }, (_, i) => i);
      const results = new Set<number>();

      for (let i = 0; i < 50; i++) {
        results.add(getRandomIndex(arr));
      }

      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe("different array types", () => {
    it("should work with string array", () => {
      const arr = ["a", "b", "c"];
      const result = getRandomIndex(arr);

      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(arr.length);
    });

    it("should work with number array", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = getRandomIndex(arr);

      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(arr.length);
    });

    it("should work with object array", () => {
      const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const result = getRandomIndex(arr);

      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(arr.length);
    });

    it("should work with mixed array", () => {
      const arr = [1, "two", { three: 3 }, [4]];
      const result = getRandomIndex(arr);

      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(arr.length);
    });
  });
});
