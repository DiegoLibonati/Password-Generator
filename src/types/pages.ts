export interface PageElement extends HTMLElement {
  cleanup?: () => void;
}
