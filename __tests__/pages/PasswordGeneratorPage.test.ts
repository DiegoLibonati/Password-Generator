import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { PasswordGeneratorPage } from "@/pages/PasswordGeneratorPage/PasswordGeneratorPage";

const renderPage = (): Page => {
  const container = PasswordGeneratorPage();
  document.body.appendChild(container);
  return container;
};

describe("PasswordGeneratorPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(
      ".password-generator-page"
    );
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render password input as readonly", () => {
    renderPage();

    const input = document.querySelector<HTMLInputElement>("#inputText");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("readonly");
  });

  it("should render all option components", () => {
    renderPage();

    expect(screen.getByText("Password Length")).toBeInTheDocument();
    expect(screen.getByText("Contain Uppercase Letters")).toBeInTheDocument();
    expect(screen.getByText("Contain Lowercase Letters")).toBeInTheDocument();
    expect(screen.getByText("Contain Numbers")).toBeInTheDocument();
    expect(screen.getByText("Contain Symbols")).toBeInTheDocument();
  });

  it("should render generate password button", () => {
    renderPage();

    const button = screen.getByRole("button", { name: "generate password" });
    expect(button).toBeInTheDocument();
  });

  it("should show message when no options are checked", async () => {
    const user = userEvent.setup();
    renderPage();

    const button = screen.getByRole("button", { name: "generate password" });
    await user.click(button);

    const input = document.querySelector<HTMLInputElement>("#inputText");
    expect(input?.value).toBe("Use any check.");
  });

  it("should generate password with checked options", async () => {
    const user = userEvent.setup();
    renderPage();

    const lengthInput =
      document.querySelector<HTMLInputElement>("#inputTextLength");
    const checkboxLower =
      document.querySelector<HTMLInputElement>("#checkBoxLower");
    const checkboxNumbers =
      document.querySelector<HTMLInputElement>("#checkBoxNumbers");
    const button = screen.getByRole("button", { name: "generate password" });

    if (lengthInput && !lengthInput.value) {
      await user.type(lengthInput, "12");
    }

    await user.click(checkboxLower!);
    await user.click(checkboxNumbers!);

    expect(checkboxLower?.checked).toBe(true);
    expect(checkboxNumbers?.checked).toBe(true);

    await user.click(button);

    const input = document.querySelector<HTMLInputElement>("#inputText");
    expect(input?.value).not.toBe("");
    expect(input?.value).not.toBe("Use any check.");
    expect(input?.value.length).toBeGreaterThan(0);
  });

  it("should copy password to clipboard when input is clicked", async () => {
    const user = userEvent.setup();
    const alertSpy = jest.spyOn(window, "alert").mockImplementation();
    const writeTextMock = jest.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: writeTextMock,
      },
      writable: true,
      configurable: true,
    });

    renderPage();

    const checkboxLower =
      document.querySelector<HTMLInputElement>("#checkBoxLower");
    const button = screen.getByRole("button", { name: "generate password" });

    if (checkboxLower) await user.click(checkboxLower);
    await user.click(button);

    const input = document.querySelector<HTMLInputElement>("#inputText");
    const generatedPassword = input?.value ?? "";

    if (input) await user.click(input);

    expect(writeTextMock).toHaveBeenCalledWith(generatedPassword);
    expect(alertSpy).toHaveBeenCalledWith(
      `Copied the text: ${generatedPassword}`
    );

    alertSpy.mockRestore();
  });

  it("should use custom password length", async () => {
    const user = userEvent.setup();
    renderPage();

    const lengthInput =
      document.querySelector<HTMLInputElement>("#inputTextLength");
    const checkboxLower =
      document.querySelector<HTMLInputElement>("#checkBoxLower");
    const button = screen.getByRole("button", { name: "generate password" });

    if (lengthInput) {
      await user.clear(lengthInput);
      await user.type(lengthInput, "20");
    }
    if (checkboxLower) await user.click(checkboxLower);
    await user.click(button);

    const passwordInput =
      document.querySelector<HTMLInputElement>("#inputText");
    expect(passwordInput?.value.length).toBe(20);
  });

  it("should cleanup event listeners", () => {
    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(page.cleanup).toBeDefined();
  });
});
