import "@testing-library/jest-dom";

const mockWriteText = jest.fn();
const mockReadText = jest.fn();

Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: mockWriteText.mockResolvedValue(undefined),
    readText: mockReadText.mockResolvedValue(""),
  },
  writable: true,
  configurable: true,
});
