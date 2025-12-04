'use client';

import { IconType } from 'react-icons/lib';
import { cn } from '@/lib/utils';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  className?: string;
  icon?: IconType;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  label,
  disabled,
  outline,
  small,
  className,
  icon: Icon,
  type,
  onClick
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        buttonStyles,
        outline && outlineStyles,
        small && smallStyles,
        className && className
      )}
    >
      {Icon && <Icon size={20} />}
      {label}
    </button>
  );
};

export default Button;

const buttonStyles =
  'disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-auto border-slate-300 border-2 flex items-center justify-center gap-2 py-3 px-5 my-2 bg-slate-700 text-white dark:border-slate-700';
const outlineStyles =
  'bg-transparent text-slate-700 dark:text-slate-300 dark:bg-transparent';
const smallStyles = 'text-sm py-1 px-2 border-[1px]';
