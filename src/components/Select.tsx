'use client';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { ComponentProps } from 'react';

interface OptionsProps {
  value: string;
  name: string;
}

interface SelectProps extends ComponentProps<'select'> {
  options: OptionsProps[];
  selectedOption: string;
}

export function Select({
  options,
  selectedOption,
  className,
  ...props
}: SelectProps) {
  return (
    <div className={`relative w-fit `}>
      <div
        className={clsx(
          'flex items-center gap-2 h-10 rounded-md border border-gray-200 px-3 py-2 pr-10 cursor-pointer text-sm text-gray-800 bg-white',
          className,
        )}
      >
        {props.children}

        <span className="ml-2">{selectedOption}</span>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
        />
      </div>

      <select
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        {...props}
      >
        {options.map((order, index) => (
          <option key={index} value={order.value}>
            {order.name}
          </option>
        ))}
      </select>
    </div>
  );
}
