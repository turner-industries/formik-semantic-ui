type OmitKeys<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

declare module "formik-semantic-ui" {
  import {FormikConfig, FormikValues} from "formik";
  import * as React from "react";
  import {Fragment} from "react";
  import {
    DropdownItemProps,
    FormButtonProps,
    FormCheckboxProps,
    FormDropdownProps,
    FormFieldProps,
    FormGroup,
    FormInputProps,
    FormRadioProps,
    FormTextAreaProps,
    StrictFormProps
  } from "semantic-ui-react";

  export interface FormikComponentProps {
    name: string;
    id?: string;
    label?: React.ReactNode;
    validate?: ((value: any) => string | Promise<void> | undefined);
    fieldProps?: FormFieldProps;
    fast?: boolean;
  }

  export interface InputComponentProps extends FormikComponentProps {
    inputProps?: FormInputProps;
    inputRef?: (el: HTMLInputElement) => void;
  }

  export interface RadioComponentProps extends FormikComponentProps {
    inputProps?: FormRadioProps;
    inputRef?: (el: HTMLInputElement) => void;
  }

  export interface CheckboxComponentProps extends FormikComponentProps {
    inputProps?: FormCheckboxProps;
    inputRef?: (el: HTMLInputElement) => void;
  }

  export interface TextAreaComponentProps extends FormikComponentProps {
    inputProps?: FormTextAreaProps;
    inputRef?: (el: HTMLTextAreaElement) => void;
  }

  export interface DropdownComponentProps extends FormikComponentProps {
    inputProps?: FormDropdownProps;
    options?: DropdownItemProps[];
  }

  export interface DropdownSchema extends DropdownComponentProps {
    type: "dropdown";
    value?: any;
  }

  export interface TextAreaSchema extends TextAreaComponentProps {
    type: "textarea";
    value?: any;
  }

  export interface CheckboxSchema extends CheckboxComponentProps {
    type: "checkbox";
    value?: any;
  }

  export interface InputSchema extends InputComponentProps {
    type?: "string";
    value?: any;
    inputProps?: FormInputProps;
  }

  export class Form<Values = FormikValues> extends React.Component<OmitKeys<FormikConfig<Values>, "component"> |
    Pick<StrictFormProps, "className" | "inverted" | "size"> | {
    serverValidation?: boolean
    ignoreLoading?: boolean
    schema?: {
      [field: string]: DropdownSchema | TextAreaSchema | CheckboxSchema | InputSchema
    }
  }> {
    public static Children: typeof Fragment;
    public static Group: typeof FormGroup;
  }

  export class Input extends React.Component<InputComponentProps> {
  }

  export class Radio extends React.Component<RadioComponentProps> {
  }

  export class Checkbox extends React.Component<CheckboxComponentProps> {
  }

  export class TextArea extends React.Component<TextAreaComponentProps> {
  }

  export class Dropdown extends React.Component<DropdownComponentProps> {
  }

  class ButtonBase extends React.Component<OmitKeys<FormButtonProps, "type">> {
  }

  export class Button extends ButtonBase {
    public static Submit: typeof ButtonBase;
    public static Reset: typeof ButtonBase;
  }
}
