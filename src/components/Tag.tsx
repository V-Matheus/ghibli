import React, { ComponentProps } from 'react';

interface TagProps extends ComponentProps<'div'> {
  color: 'red' | 'green' | 'blue' | 'yellow' | 'purple';
  outline?: boolean;
}

export default function Tag({ color, outline = false, ...props }: TagProps) {
  return (
    <div
      className={`flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold gap-1 ${
        outline
          ? `bg-${color}-50 text-${color}-700`
          : `bg-${color}-700 text-white`
      } border-${color}-200`}
      {...props}
    />
  );
}
