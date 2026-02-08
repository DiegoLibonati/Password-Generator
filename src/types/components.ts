export interface Component {
  cleanup?: () => void;
}

export interface OptionCheckboxComponent extends Component, HTMLDivElement {}
export interface OptionNumberComponent extends Component, HTMLDivElement {}
