import React from 'react';
import { soundManager } from '../utils/audio';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'orange' | 'outline' | 'white';

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean;
  size?: 'normal' | 'large';
}

export const Button3D: React.FC<Button3DProps> = ({
  variant = 'primary',
  icon,
  children,
  fullWidth = false,
  size = 'normal',
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    soundManager.playPop();
    if (onClick) onClick(e);
  };

  const variantStyles: Record<ButtonVariant, { bg: string; border: string; text: string; shadow: string }> = {
    primary: {
      bg: 'bg-[#4CAF7A]',
      border: 'border-b-[5px] border-[#2E7D32]',
      text: 'text-white',
      shadow: 'hover:bg-[#43A047] active:border-b-[2px] active:translate-y-[3px]',
    },
    secondary: {
      bg: 'bg-[#4FC3F7]',
      border: 'border-b-[5px] border-[#0288D1]',
      text: 'text-[#1F2A44]',
      shadow: 'hover:bg-[#29B6F6] active:border-b-[2px] active:translate-y-[3px]',
    },
    accent: {
      bg: 'bg-[#FFD54F]',
      border: 'border-b-[5px] border-[#F57F17]',
      text: 'text-[#1F2A44]',
      shadow: 'hover:bg-[#FFCA28] active:border-b-[2px] active:translate-y-[3px]',
    },
    orange: {
      bg: 'bg-[#FF9F68]',
      border: 'border-b-[5px] border-[#E65100]',
      text: 'text-[#1F2A44]',
      shadow: 'hover:bg-[#FF8A50] active:border-b-[2px] active:translate-y-[3px]',
    },
    white: {
      bg: 'bg-white',
      border: 'border-b-[5px] border-[#D7CCC8]',
      text: 'text-[#1F2A44]',
      shadow: 'hover:bg-[#FFFDE7] active:border-b-[2px] active:translate-y-[3px]',
    },
    outline: {
      bg: 'bg-white',
      border: 'border-2 border-[#4CAF7A] border-b-[5px] border-b-[#2E7D32]',
      text: 'text-[#1F2A44]',
      shadow: 'hover:bg-[#E8F5E9] active:border-b-[2px] active:translate-y-[3px]',
    },
  };

  const current = variantStyles[variant];

  return (
    <button
      {...props}
      disabled={disabled}
      onClick={handleClick}
      className={`
        relative inline-flex items-center justify-center gap-3
        min-h-[60px] px-8 py-3.5
        rounded-full font-heading font-bold text-[20px] sm:text-[22px] tracking-wide
        transition-all duration-150 ease-out select-none
        cursor-pointer
        hover:-translate-y-0.5
        focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#4CAF7A]
        disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:active:border-b-[5px]
        ${current.bg} ${current.border} ${current.text} ${current.shadow}
        ${fullWidth ? 'w-full' : ''}
        ${size === 'large' ? 'min-h-[68px] px-10 text-[24px]' : ''}
        ${className}
      `}
    >
      {icon && <span className="shrink-0 flex items-center justify-center text-current">{icon}</span>}
      <span className="leading-tight text-center">{children}</span>
    </button>
  );
};
