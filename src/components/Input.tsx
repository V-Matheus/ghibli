'use client';
import { ComponentProps } from 'react';

export function InputRoot({ ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className="group flex w-full rounded-md border-2 border-gray-200 py-2 text-sm cursor-pointer focus-within:border-black focus-within:border-2 transition-all duration-200 ease-in-out"
      tabIndex={-1}
      onClick={(e) => {
        const input = e.currentTarget.querySelector('input');
        input?.focus();
      }}
    />
  );
}

export const InputIcon = (props: ComponentProps<'span'>) => {
  return <span className="text-gray-400 mx-3 p-1" {...props} />;
};

export const InputFild = (props: ComponentProps<'input'>) => {
  return (
    <input
      className="flex-1 outline-0 placeholder:text-gray-400 group-focus-within:outline-none"
      {...props}
    />
  );
};

export const InputCheckbox = (props: ComponentProps<'label'>) => {
  return (
    <label {...props} className="flex items-center gap-2">
      <input type="checkbox" />
      {props.children}
    </label>
  );
};
