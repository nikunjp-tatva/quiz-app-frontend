export interface FormInputProps {
  name: string;
  control: any;
  label?: string;
  setValue?: any;
  type?: string;
  clearError?: () => void;
  values?: object[];
  options?: {
    label: string;
    value: string;
  }[];
}
