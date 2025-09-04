import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { OFFICIAL_BODY } from "../tests/jest.constants";

describe("index.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must render the input text, the input length, all the checkboxes and the 'Generate Password' button.", () => {
      const inputText = screen.getByRole("textbox");
      const inputLength = document.getElementById(
        "inputTextLength"
      ) as HTMLInputElement;
      const checkboxs = screen.getAllByRole("checkbox");
      const checkboxUpper = checkboxs.find(
        (checkbox) => checkbox.id === "checkBoxUpper"
      );
      const checkboxLower = checkboxs.find(
        (checkbox) => checkbox.id === "checkBoxLower"
      );
      const checkboxNumbers = checkboxs.find(
        (checkbox) => checkbox.id === "checkBoxNumbers"
      );
      const checkboxSymbols = checkboxs.find(
        (checkbox) => checkbox.id === "checkBoxSymbols"
      );
      const btnGeneratePassword = screen.getByRole("button", {
        name: /generate password/i,
      });

      expect(inputText).toBeInTheDocument();
      expect(inputLength).toBeInTheDocument();
      expect(checkboxUpper).toBeInTheDocument();
      expect(checkboxLower).toBeInTheDocument();
      expect(checkboxNumbers).toBeInTheDocument();
      expect(checkboxSymbols).toBeInTheDocument();
      expect(btnGeneratePassword).toBeInTheDocument();
    });

    test("It should render the input text with 'Use any check' when clicking on 'Generate Password' when no checkbox is touched.", async () => {
      const inputText = screen.getByRole("textbox");
      const btnGeneratePassword = screen.getByRole("button", {
        name: /generate password/i,
      });

      expect(inputText).toBeInTheDocument();
      expect(inputText).not.toHaveValue();
      expect(btnGeneratePassword).toBeInTheDocument();

      await user.click(btnGeneratePassword);

      expect(inputText).toHaveValue("Use any check.");
    });

    test("It must render a 15-character password.", async () => {
      const inputText = screen.getByRole("textbox") as HTMLInputElement;
      const inputLength = document.getElementById(
        "inputTextLength"
      ) as HTMLInputElement;
      const checkboxs = screen.getAllByRole("checkbox");
      const checkboxUpper = checkboxs.find(
        (checkbox) => checkbox.id === "checkBoxUpper"
      );
      const btnGeneratePassword = screen.getByRole("button", {
        name: /generate password/i,
      });

      expect(inputText).toBeInTheDocument();
      expect(inputText).not.toHaveValue();
      expect(inputLength).not.toHaveValue();
      expect(checkboxUpper).toBeInTheDocument();
      expect(checkboxUpper).not.toBeChecked();
      expect(btnGeneratePassword).toBeInTheDocument();

      await user.click(inputLength);
      await user.keyboard("15");
      await user.click(checkboxUpper!);

      expect(checkboxUpper).toBeChecked();
      expect(inputLength).toHaveValue(15);

      await user.click(btnGeneratePassword);

      expect(inputText.value).toHaveLength(15);
    });
  });
});
