import { Control, FieldPath, FieldValues } from "react-hook-form";
import { TextInputProps } from "react-native-paper";

export type CallerInfo = {
  name: string;
  phoneNumber: string;
  countryCode: string;
  appointment: string;
  city: string;
  iosRow: string;
};

export type Contact = {
  name: string;
  phoneNumber: string;
  countryCode: string;
  appointment: string;
  city: string;
  iosRow?: string;
};

export type ContactFormData = {
  name: string;
  phoneNumber: PhoneNumberData;
  appointment?: string;
  city?: string;
};

export type ListItem =
  | { type: "header"; letter: string }
  | { type: "item"; contact: Contact; index: number };

export type Country = {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
};

export type PhoneNumberData = {
  number: string;
  countryCode: string;
};

export interface PhoneNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<TextInputProps, "value" | "onChangeText"> {
  control: Control<TFieldValues>;
  name: TName;
  rules?: any;
}
