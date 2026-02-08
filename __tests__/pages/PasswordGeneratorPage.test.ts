import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { PasswordGeneratorPage } from "@/pages/PasswordGeneratorPage/PasswordGeneratorPage";

const renderPage = (): Page => {
  const page = PasswordGeneratorPage();
  document.body.appendChild(page);
  return page;
};

describe("PasswordGeneratorPage", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(jest.fn());
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  describe("render", () => {
    it("should create a main element", () => {
      renderPage();

      const main = screen.getByRole("main");
      expect(main).toBeInTheDocument();
      expect(main.tagName).toBe("MAIN");
    });

    it("should have password-generator-page class", () => {
      renderPage();

      const main = screen.getByRole("main");
      expect(main).toHaveClass("password-generator-page");
    });

    it("should render password input field", () => {
      const page = renderPage();

      const input = page.querySelector<HTMLInputElement>(".card__form-input");
      expect(input).toBeInTheDocument();
    });

    it("should render generate password button", () => {
      renderPage();

      const button = screen.getByRole("button", { name: /generate password/i });
      expect(button).toBeInTheDocument();
    });

    it("should render password length option", () => {
      renderPage();

      const label = screen.getByText("Password Length");
      expect(label).toBeInTheDocument();
    });

    it("should render uppercase checkbox option", () => {
      renderPage();

      const label = screen.getByText("Contain Uppercase Letters");
      expect(label).toBeInTheDocument();
    });

    it("should render lowercase checkbox option", () => {
      renderPage();

      const label = screen.getByText("Contain Lowercase Letters");
      expect(label).toBeInTheDocument();
    });

    it("should render numbers checkbox option", () => {
      renderPage();

      const label = screen.getByText("Contain Numbers");
      expect(label).toBeInTheDocument();
    });

    it("should render symbols checkbox option", () => {
      renderPage();

      const label = screen.getByText("Contain Symbols");
      expect(label).toBeInTheDocument();
    });
  });

  describe("password generation", () => {
    it("should show error message when no checkbox is selected", async () => {
      const user = userEvent.setup();
      const page = renderPage();

      const button = screen.getByRole("button", { name: /generate password/i });
      const input = page.querySelector<HTMLInputElement>(".card__form-input");

      await user.click(button);

      expect(input).toHaveValue("Use any check.");
    });

    it("should generate password with uppercase letters", async () => {
      const user = userEvent.setup();
      const page = renderPage();

      const button = screen.getByRole("button", { name: /generate password/i });
      const input = page.querySelector<HTMLInputElement>(".card__form-input");
      const checkBoxUpper =
        page.querySelector<HTMLInputElement>("#checkBoxUpper");
      const inputTextLength =
        page.querySelector<HTMLInputElement>("#inputTextLength");

      await user.clear(inputTextLength!);
      await user.type(inputTextLength!, "10");
      await user.click(checkBoxUpper!);
      await user.click(button);

      expect(input?.value).toMatch(/^[A-Z]+$/);
      expect(input?.value).toHaveLength(10);
    });

    it("should generate password with lowercase letters", async () => {
      const user = userEvent.setup();
      const page = renderPage();

      const button = screen.getByRole("button", { name: /generate password/i });
      const input = page.querySelector<HTMLInputElement>(".card__form-input");
      const checkBoxLower =
        page.querySelector<HTMLInputElement>("#checkBoxLower");
      const inputTextLength =
        page.querySelector<HTMLInputElement>("#inputTextLength");

      await user.clear(inputTextLength!);
      await user.type(inputTextLength!, "10");
      await user.click(checkBoxLower!);
      await user.click(button);

      expect(input?.value).toMatch(/^[a-z]+$/);
      expect(input?.value).toHaveLength(10);
    });

    it("should generate password with numbers", async () => {
      const user = userEvent.setup();
      const page = renderPage();

      const button = screen.getByRole("button", { name: /generate password/i });
      const input = page.querySelector<HTMLInputElement>(".card__form-input");
      const checkBoxNumbers =
        page.querySelector<HTMLInputElement>("#checkBoxNumbers");
      const inputTextLength =
        page.querySelector<HTMLInputElement>("#inputTextLength");

      await user.clear(inputTextLength!);
      await user.type(inputTextLength!, "10");
      await user.click(checkBoxNumbers!);
      await user.click(button);

      expect(input?.value).toMatch(/^[0-9]+$/);
      expect(input?.value).toHaveLength(10);
    });

    it("should generate password with specified length", async () => {
      const user = userEvent.setup();
      const page = renderPage();

      const button = screen.getByRole("button", { name: /generate password/i });
      const input = page.querySelector<HTMLInputElement>(".card__form-input");
      const checkBoxUpper =
        page.querySelector<HTMLInputElement>("#checkBoxUpper");
      const inputTextLength =
        page.querySelector<HTMLInputElement>("#inputTextLength");

      await user.clear(inputTextLength!);
      await user.type(inputTextLength!, "20");
      await user.click(checkBoxUpper!);
      await user.click(button);

      expect(input?.value).toHaveLength(20);
    });

    it("should generate password with mixed characters", async () => {
      const user = userEvent.setup();
      const page = renderPage();

      const button = screen.getByRole("button", { name: /generate password/i });
      const input = page.querySelector<HTMLInputElement>(".card__form-input");
      const checkBoxUpper =
        page.querySelector<HTMLInputElement>("#checkBoxUpper");
      const checkBoxLower =
        page.querySelector<HTMLInputElement>("#checkBoxLower");
      const checkBoxNumbers =
        page.querySelector<HTMLInputElement>("#checkBoxNumbers");
      const inputTextLength =
        page.querySelector<HTMLInputElement>("#inputTextLength");

      await user.clear(inputTextLength!);
      await user.type(inputTextLength!, "15");
      await user.click(checkBoxUpper!);
      await user.click(checkBoxLower!);
      await user.click(checkBoxNumbers!);
      await user.click(button);

      expect(input?.value).toHaveLength(15);
      expect(input?.value).toMatch(/^[A-Za-z0-9]+$/);
    });
  });

  describe("copy functionality", () => {
    it("should call alert when input is clicked", async () => {
      const user = userEvent.setup();
      const page = renderPage();

      const input = page.querySelector<HTMLInputElement>(".card__form-input");

      const writeTextMock = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, "clipboard", {
        value: {
          writeText: writeTextMock,
        },
        writable: true,
        configurable: true,
      });

      if (input) input.value = "test-password";
      await user.click(input!);

      expect(window.alert).toHaveBeenCalledWith(
        "Copied the text: test-password"
      );
    });
  });

  describe("cleanup", () => {
    it("should have cleanup function", () => {
      const page = renderPage();

      expect(typeof page.cleanup).toBe("function");
    });

    it("should remove event listeners on cleanup", () => {
      const page = renderPage();

      const input = page.querySelector<HTMLInputElement>(".card__form-input");
      const button = page.querySelector<HTMLButtonElement>(
        ".card__btn-generate-password"
      );

      const inputRemoveSpy = jest.spyOn(input!, "removeEventListener");
      const buttonRemoveSpy = jest.spyOn(button!, "removeEventListener");

      page.cleanup?.();

      expect(inputRemoveSpy).toHaveBeenCalledWith(
        "click",
        expect.any(Function)
      );
      expect(buttonRemoveSpy).toHaveBeenCalledWith(
        "click",
        expect.any(Function)
      );
    });
  });
});
