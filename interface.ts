import { ChangeEvent } from "react";

export interface InputSectionType {
  title: string;
  placeholder: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface SigninInput {
  email: string;
  password: string;
}

export interface SingupInput {
  name: string;
  email: string;
  password: string;
}