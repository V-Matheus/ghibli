import clsx from 'clsx';
import React, { ComponentProps } from 'react';

interface TagProps extends ComponentProps<'div'> {
  color: 'red' | 'green' | 'blue' | 'yellow' | 'purple';
  outline?: boolean;
  customStyles?: {
    bg?: string;
    text?: string;
    border?: string;
  };
}

const colorClasses = {
  red: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    solidBg: 'bg-red-700',
    solidText: 'text-white',
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    solidBg: 'bg-green-700',
    solidText: 'text-white',
  },
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    solidBg: 'bg-blue-700',
    solidText: 'text-white',
  },
  yellow: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    solidBg: 'bg-yellow-700',
    solidText: 'text-white',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    solidBg: 'bg-purple-700',
    solidText: 'text-white',
  },
};

export default function Tag({
  color,
  outline = false,
  customStyles = {},
  className,
  ...props
}: TagProps) {
  const classes = colorClasses[color];

  return (
    <div
      className={clsx(
        'flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold gap-1',
        outline
          ? `${customStyles.bg || classes.bg} ${
              customStyles.text || classes.text
            } ${customStyles.border || classes.border}`
          : `${customStyles.bg || classes.solidBg} ${
              customStyles.text || classes.solidText
            } ${customStyles.border || ''}`, // Aplica a borda personalizada mesmo sem outline
        className,
      )}
      {...props}
    />
  );
}
