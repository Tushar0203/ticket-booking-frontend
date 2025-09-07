import React from "react";

interface InputSectionProps {
  title: string;
  placeholder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputSection = React.memo(
  ({ title, placeholder, type, onChange }: InputSectionProps) => {
    return (
      <div className="w-full flex flex-col gap-1 mt-3">
        <label className="text-sm font-medium">{title}</label>
        <input
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>
    );
  }
);
