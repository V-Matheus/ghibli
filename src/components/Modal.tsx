'use client';
import { ComponentProps, MouseEvent } from 'react';

interface ModalProps extends ComponentProps<'dialog'> {
  onClose?: () => void;
}

export function Modal({ onClose, ...props }: ModalProps) {
  const handleClickOutside = (event: MouseEvent<HTMLDialogElement>) => {
    const dialog = event.target as HTMLDialogElement;
    if (dialog.tagName === 'DIALOG' && event.target === dialog && onClose) {
      onClose();
    }
  };

  return (
    <dialog
      {...props}
      className="flex items-center justify-center fixed flex-1 w-full h-full inset-0 bg-black/35 z-50"
      onClick={handleClickOutside}
    >
      <article className="bg-white w-3/4 max-w-[660px] p-5 rounded-2xl border-1 border-gray-medium">
        {props.children}
      </article>
    </dialog>
  );
}
