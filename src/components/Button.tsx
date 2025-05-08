import { ComponentProps } from 'react';
import clsx from 'clsx';

export function Button({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className={clsx(
        'flex items-center justify-around cursor-pointer',
        className,
      )}
    />
  );
}
