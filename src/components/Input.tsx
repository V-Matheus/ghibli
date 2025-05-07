import { ComponentProps } from 'react';

export function InputRoot({ ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className="flex h-10 w-full rounded-md border border-gray-400  py-2 text-sm focus:border-black focus:outline-none focus:ring-0"
    />
  );
}

export const InputIcon = (props: ComponentProps<'span'>) => {
  return <span className="text-gray-400 h-5 w-5 px-3" {...props} />;
};

export const InputFild = (props: ComponentProps<'input'>) => {
  return (
    <input className="flex-1 outline-0 placeholder:text-gray-400" {...props} />
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
