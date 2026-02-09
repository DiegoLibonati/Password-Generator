import "@/index.css";
import { PasswordGeneratorPage } from "@/pages/PasswordGeneratorPage/PasswordGeneratorPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const passwordGeneratorPage = PasswordGeneratorPage();
  app.appendChild(passwordGeneratorPage);
};

document.addEventListener("DOMContentLoaded", onInit);
