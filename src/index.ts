import { PasswordGeneratorPage } from "@src/pages/PasswordGeneratorPage/PasswordGeneratorPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const passwordGeneratorPage = PasswordGeneratorPage();
  app.appendChild(passwordGeneratorPage);
};

document.addEventListener("DOMContentLoaded", onInit);
