import React from 'react';

interface CardProps {
  children: React.ReactNode;
  borderStyle?: 'solid' | 'dashed';
  borderColor?: 'pastel' | 'green' | 'blue' | 'yellow' | 'orange';
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  borderStyle = 'solid',
  borderColor = 'pastel',
  className = '',
  onClick,
  interactive = false,
}) => {
  const borderColors = {
    pastel: 'border-[#E2D6C0]',
    green: 'border-[#A5D6A7]',
    blue: 'border-[#B3E5FC]',
    yellow: 'border-[#FFE082]',
    orange: 'border-[#FFCC80]',
  }[borderColor];

  const borderStyleClass = borderStyle === 'dashed' ? 'border-dashed' : 'border-solid';

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-[24px]
        border-[3px] ${borderColors} ${borderStyleClass}
        shadow-[0_8px_20px_-6px_rgba(46,77,59,0.08)]
        p-6 sm:p-8
        transition-all duration-200
        ${interactive ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_24px_-6px_rgba(46,77,59,0.15)] active:translate-y-0' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
