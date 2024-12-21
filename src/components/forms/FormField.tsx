import React from 'react';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  htmlFor: string;
}

export function FormField({ label, children, htmlFor }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        {children}
      </div>
    </div>
  );
}