import React from "react";

export interface FormFieldProps {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  required,
  helperText,
  error,
  children
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && (
          <span className="ml-1 text-red-600">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p className="text-sm text-red-600">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-sm text-slate-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default FormField;
