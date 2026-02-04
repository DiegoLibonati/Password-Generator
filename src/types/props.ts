interface DefaultProps {
  className?: string;
  children?: string;
}

export interface OptionCheckboxProps extends DefaultProps {
  id: string;
  label: string;
}

export interface OptionNumberProps extends DefaultProps {
  id: string;
  label: string;
  classNameLabel?: string;
}
