import { getElements } from "./getElements";

import { OFFICIAL_BODY } from "../tests/jest.constants";

describe("getElements.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must render the elements of the document that the 'getElements' function exports.", () => {
      const {
        btnGeneratePassword,
        checkBoxLower,
        checkBoxNumbers,
        checkBoxSymbols,
        checkBoxUpper,
        inputText,
        inputTextLength,
      } = getElements();

      expect(btnGeneratePassword).toBeInTheDocument();
      expect(checkBoxLower).toBeInTheDocument();
      expect(checkBoxNumbers).toBeInTheDocument();
      expect(checkBoxSymbols).toBeInTheDocument();
      expect(checkBoxUpper).toBeInTheDocument();
      expect(inputText).toBeInTheDocument();
      expect(inputTextLength).toBeInTheDocument();
    });
  });
});
