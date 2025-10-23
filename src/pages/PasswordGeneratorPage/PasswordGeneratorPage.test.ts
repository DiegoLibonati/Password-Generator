import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { PasswordGeneratorPage } from "@src/pages/PasswordGeneratorPage/PasswordGeneratorPage";

import { getRandomIndex } from "@src/helpers/getRandomIndex";

import {
  allLowerCaseLetters,
  allNumbers,
  allSymbols,
  allUpperCaseLetters,
} from "@src/constants/vars";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const container = PasswordGeneratorPage();
  document.body.appendChild(container);
  return { container: container };
};

jest.mock("@src/helpers/getRandomIndex");
jest.mock("@src/constants/vars", () => ({
  allUpperCaseLetters: ["A", "B", "C"],
  allLowerCaseLetters: ["a", "b", "c"],
  allNumbers: ["1", "2", "3"],
  allSymbols: ["!", "@", "#"],
}));

describe("PasswordGeneratorPage.ts", () => {
  let alertSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });

    (getRandomIndex as jest.Mock).mockReturnValue(0);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  describe("General Tests.", () => {
    test("It should render the main component structure", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLElement);
      expect(container.className).toBe("password-generator-page");
      expect(
        container.querySelector<HTMLElement>(".card-wrapper")
      ).toBeInTheDocument();
    });

    test("It should render card article", () => {
      renderComponent();

      const card = document.querySelector<HTMLElement>(".card");

      expect(card).toBeInTheDocument();
      expect(card?.tagName).toBe("ARTICLE");
    });

    test("It should render form with input", () => {
      renderComponent();

      const form = document.querySelector<HTMLFormElement>(".card__form");
      const input =
        document.querySelector<HTMLInputElement>(".card__form-input");

      expect(form).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });

    test("It should render generate password button", () => {
      renderComponent();

      const button = screen.getByRole("button", {
        name: /generate password/i,
      });

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("card__btn-generate-password");
    });

    test("It should render options container", () => {
      renderComponent();

      const optionsContainer =
        document.querySelector<HTMLDivElement>(".card__options");

      expect(optionsContainer).toBeInTheDocument();
    });
  });

  describe("Form Elements Tests.", () => {
    test("It should render input with correct type", () => {
      renderComponent();

      const input =
        document.querySelector<HTMLInputElement>(".card__form-input");

      expect(input?.type).toBe("text");
      expect(input?.id).toBe("inputText");
    });

    test("It should render form element", () => {
      renderComponent();

      const form = document.querySelector<HTMLFormElement>(".card__form");

      expect(form).toBeInstanceOf(HTMLFormElement);
      expect(form?.tagName).toBe("FORM");
    });

    test("It should render generate button with correct attributes", () => {
      renderComponent();

      const button = document.querySelector<HTMLButtonElement>(
        ".card__btn-generate-password"
      );

      expect(button?.getAttribute("type")).toBe("button");
      expect(button?.getAttribute("id")).toBe("btnGeneratePassword");
      expect(button?.textContent?.trim()).toBe("Generate Password");
    });
  });

  describe("Options Rendering Tests.", () => {
    test("It should render password length option", () => {
      renderComponent();

      const label = screen.getByText("Password Length");
      const input =
        document.querySelector<HTMLInputElement>("#inputTextLength");

      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });

    test("It should render uppercase checkbox option", () => {
      renderComponent();

      const label = screen.getByText("Contain Uppercase Letters");
      const checkbox =
        document.querySelector<HTMLInputElement>("#checkBoxUpper");

      expect(label).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
    });

    test("It should render lowercase checkbox option", () => {
      renderComponent();

      const label = screen.getByText("Contain Lowercase Letters");
      const checkbox =
        document.querySelector<HTMLInputElement>("#checkBoxLower");

      expect(label).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
    });

    test("It should render numbers checkbox option", () => {
      renderComponent();

      const label = screen.getByText("Contain Numbers");
      const checkbox =
        document.querySelector<HTMLInputElement>("#checkBoxNumbers");

      expect(label).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
    });

    test("It should render symbols checkbox option", () => {
      renderComponent();

      const label = screen.getByText("Contain Symbols");
      const checkbox =
        document.querySelector<HTMLInputElement>("#checkBoxSymbols");

      expect(label).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
    });

    test("It should append all options to options container", () => {
      renderComponent();

      const optionsContainer =
        document.querySelector<HTMLDivElement>(".card__options");
      const optionNumber =
        optionsContainer?.querySelector<HTMLDivElement>(".option-number");
      const optionCheckboxes =
        optionsContainer?.querySelectorAll<HTMLDivElement>(".option-checkbox");

      expect(optionNumber).toBeInTheDocument();
      expect(optionCheckboxes?.length).toBe(4);
    });
  });

  describe("Password Generation Tests.", () => {
    test("It should generate password when button is clicked", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const upperCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxUpper");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });
      const passwordInput =
        document.querySelector<HTMLInputElement>(".card__form-input");

      await user.type(lengthInput!, "5");
      await user.click(upperCheckbox!);
      await user.click(button);

      expect(passwordInput?.value).toBeTruthy();
      expect(passwordInput?.value.length).toBe(5);
    });

    test("It should generate password with uppercase letters only", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const upperCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxUpper");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });
      const passwordInput =
        document.querySelector<HTMLInputElement>(".card__form-input");

      await user.type(lengthInput!, "3");
      await user.click(upperCheckbox!);
      await user.click(button);

      expect(passwordInput?.value).toBe("AAA");
    });

    test("It should generate password with lowercase letters only", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const lowerCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxLower");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });
      const passwordInput =
        document.querySelector<HTMLInputElement>(".card__form-input");

      await user.type(lengthInput!, "3");
      await user.click(lowerCheckbox!);
      await user.click(button);

      expect(passwordInput?.value).toBe("aaa");
    });

    test("It should generate password with numbers only", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const numbersCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxNumbers");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });
      const passwordInput =
        document.querySelector<HTMLInputElement>(".card__form-input");

      await user.type(lengthInput!, "3");
      await user.click(numbersCheckbox!);
      await user.click(button);

      expect(passwordInput?.value).toBe("111");
    });

    test("It should generate password with symbols only", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const symbolsCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxSymbols");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });
      const passwordInput =
        document.querySelector<HTMLInputElement>(".card__form-input");

      await user.type(lengthInput!, "3");
      await user.click(symbolsCheckbox!);
      await user.click(button);

      expect(passwordInput?.value).toBe("!!!");
    });

    test("It should generate password with multiple character types", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const upperCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxUpper");
      const lowerCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxLower");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });
      const passwordInput =
        document.querySelector<HTMLInputElement>(".card__form-input");

      await user.type(lengthInput!, "4");
      await user.click(upperCheckbox!);
      await user.click(lowerCheckbox!);
      await user.click(button);

      expect(passwordInput?.value).toBeTruthy();
      expect(passwordInput?.value.length).toBe(4);
    });
  });

  describe("Password Generation Validation Tests.", () => {
    test("It should show warning when no checkboxes are selected", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });
      const passwordInput =
        document.querySelector<HTMLInputElement>(".card__form-input");

      await user.type(lengthInput!, "5");
      await user.click(button);

      expect(passwordInput?.value).toBe("Use any check.");
    });

    test("It should not generate password when no checkboxes are checked", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });

      await user.type(lengthInput!, "5");
      await user.click(button);

      expect(getRandomIndex).not.toHaveBeenCalled();
    });

    test("It should clear warning and generate password when checkbox is selected", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const upperCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxUpper");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });
      const passwordInput =
        document.querySelector<HTMLInputElement>(".card__form-input");

      await user.type(lengthInput!, "5");
      await user.click(button);
      expect(passwordInput?.value).toBe("Use any check.");

      await user.click(upperCheckbox!);
      await user.click(button);
      expect(passwordInput?.value).not.toBe("Use any check.");
    });
  });

  describe("Character Arrays Tests.", () => {
    test("It should use allUpperCaseLetters when uppercase is checked", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const upperCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxUpper");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });

      await user.type(lengthInput!, "2");
      await user.click(upperCheckbox!);
      await user.click(button);

      expect(getRandomIndex).toHaveBeenCalledWith(
        expect.arrayContaining(allUpperCaseLetters)
      );
    });

    test("It should use allLowerCaseLetters when lowercase is checked", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const lowerCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxLower");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });

      await user.type(lengthInput!, "2");
      await user.click(lowerCheckbox!);
      await user.click(button);

      expect(getRandomIndex).toHaveBeenCalledWith(
        expect.arrayContaining(allLowerCaseLetters)
      );
    });

    test("It should use allNumbers when numbers is checked", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const numbersCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxNumbers");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });

      await user.type(lengthInput!, "2");
      await user.click(numbersCheckbox!);
      await user.click(button);

      expect(getRandomIndex).toHaveBeenCalledWith(
        expect.arrayContaining(allNumbers)
      );
    });

    test("It should use allSymbols when symbols is checked", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const symbolsCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxSymbols");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });

      await user.type(lengthInput!, "2");
      await user.click(symbolsCheckbox!);
      await user.click(button);

      expect(getRandomIndex).toHaveBeenCalledWith(
        expect.arrayContaining(allSymbols)
      );
    });

    test("It should combine all checked character arrays", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const upperCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxUpper");
      const numbersCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxNumbers");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });

      await user.type(lengthInput!, "2");
      await user.click(upperCheckbox!);
      await user.click(numbersCheckbox!);
      await user.click(button);

      expect(getRandomIndex).toHaveBeenCalledWith(
        expect.arrayContaining([...allUpperCaseLetters, ...allNumbers])
      );
    });
  });

  describe("Copy Text Tests.", () => {
    test("It should copy password to clipboard when input is clicked", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const upperCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxUpper");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });
      const passwordInput =
        document.querySelector<HTMLInputElement>(".card__form-input");

      await user.type(lengthInput!, "5");
      await user.click(upperCheckbox!);
      await user.click(button);

      await user.click(passwordInput!);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        passwordInput?.value
      );
    });

    test("It should show alert when password is copied", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const upperCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxUpper");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });
      const passwordInput =
        document.querySelector<HTMLInputElement>(".card__form-input");

      await user.type(lengthInput!, "3");
      await user.click(upperCheckbox!);
      await user.click(button);

      await user.click(passwordInput!);

      expect(alertSpy).toHaveBeenCalledWith(
        `Copied the text: ${passwordInput?.value}`
      );
    });

    test("It should select text when input is clicked", async () => {
      renderComponent();

      const passwordInput =
        document.querySelector<HTMLInputElement>(".card__form-input");
      const selectSpy = jest.spyOn(passwordInput!, "select");

      await user.click(passwordInput!);

      expect(selectSpy).toHaveBeenCalled();
    });
  });

  describe("Password Length Tests.", () => {
    test("It should generate password of specified length", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const upperCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxUpper");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });
      const passwordInput =
        document.querySelector<HTMLInputElement>(".card__form-input");

      await user.type(lengthInput!, "10");
      await user.click(upperCheckbox!);
      await user.click(button);

      expect(passwordInput?.value.length).toBe(10);
    });

    test("It should parse input value to integer", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const upperCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxUpper");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });
      const passwordInput =
        document.querySelector<HTMLInputElement>(".card__form-input");

      lengthInput!.value = "7";
      await user.click(upperCheckbox!);
      await user.click(button);

      expect(passwordInput?.value.length).toBe(7);
    });

    test("It should call getRandomIndex correct number of times", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const upperCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxUpper");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });

      await user.type(lengthInput!, "5");
      await user.click(upperCheckbox!);
      await user.click(button);

      expect(getRandomIndex).toHaveBeenCalledTimes(5);
    });
  });

  describe("Multiple Generation Tests.", () => {
    test("It should generate different passwords on multiple clicks", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const upperCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxUpper");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });
      const passwordInput =
        document.querySelector<HTMLInputElement>(".card__form-input");

      await user.type(lengthInput!, "5");
      await user.click(upperCheckbox!);

      await user.click(button);
      const firstPassword = passwordInput?.value;

      await user.click(button);
      const secondPassword = passwordInput?.value;

      expect(firstPassword).toBeTruthy();
      expect(secondPassword).toBeTruthy();
    });

    test("It should replace previous password with new one", async () => {
      renderComponent();

      const lengthInput =
        document.querySelector<HTMLInputElement>("#inputTextLength");
      const upperCheckbox =
        document.querySelector<HTMLInputElement>("#checkBoxUpper");
      const button = screen.getByRole("button", {
        name: /generate password/i,
      });
      const passwordInput =
        document.querySelector<HTMLInputElement>(".card__form-input");

      await user.type(lengthInput!, "3");
      await user.click(upperCheckbox!);
      await user.click(button);

      expect(passwordInput?.value).toBe("AAA");

      await user.click(button);

      expect(passwordInput?.value).toBe("AAA");
    });
  });

  describe("DOM Structure Tests.", () => {
    test("It should have correct section structure", () => {
      const { container } = renderComponent();

      const section = container.querySelector<HTMLElement>(".card-wrapper");
      const article = section?.querySelector<HTMLElement>(".card");

      expect(section?.tagName).toBe("SECTION");
      expect(article?.tagName).toBe("ARTICLE");
    });

    test("It should nest form inside card", () => {
      renderComponent();

      const card = document.querySelector<HTMLElement>(".card");
      const form = card?.querySelector<HTMLFormElement>(".card__form");

      expect(form).toBeInTheDocument();
    });

    test("It should nest options inside card", () => {
      renderComponent();

      const card = document.querySelector<HTMLElement>(".card");
      const options = card?.querySelector<HTMLDivElement>(".card__options");

      expect(options).toBeInTheDocument();
    });

    test("It should nest buttons container inside card", () => {
      renderComponent();

      const card = document.querySelector<HTMLElement>(".card");
      const btnsContainer = card?.querySelector<HTMLDivElement>(".card__btns");

      expect(btnsContainer).toBeInTheDocument();
    });
  });
});
