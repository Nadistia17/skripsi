import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
  onStepClick?: (step: number) => void;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
  onStepClick,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, ((currentStep - 1) / (totalSteps - 1 || 1)) * 100));

  return (
    <div className={`w-full max-w-xl mx-auto ${className}`}>
      {/* Step Info */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="font-heading font-bold text-sm sm:text-base text-[#2E7D32]">
          Langkah {currentStep} dari {totalSteps}
        </span>
        {stepLabels && stepLabels[currentStep - 1] && (
          <span className="font-body font-semibold text-xs sm:text-sm text-[#5B6B82]">
            {stepLabels[currentStep - 1]}
          </span>
        )}
      </div>

      {/* Chunky Bar Container */}
      <div className="relative pt-6 pb-2">
        {/* Animated Mascot Riding the Progress Bar */}
        <div
          className="absolute -top-1 transition-all duration-500 ease-out z-20 pointer-events-none -translate-x-1/2"
          style={{ left: `${percentage}%` }}
        >
          <div className="relative w-9 h-9 animate-swim drop-shadow-sm">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              {/* Little Turtle Mini Pin */}
              <ellipse cx="50" cy="55" rx="30" ry="25" fill="#4CAF7A" stroke="#2E7D32" strokeWidth="3" />
              <ellipse cx="50" cy="55" rx="24" ry="20" fill="none" stroke="#66BB6A" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="50" cy="24" r="14" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="2.5" />
              <circle cx="45" cy="22" r="3" fill="#1F2A44" />
              <circle cx="55" cy="22" r="3" fill="#1F2A44" />
              <path d="M47 28 Q 50 32 53 28" stroke="#1F2A44" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M22 45 C 10 40, 10 55, 20 60" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="2.5" />
              <path d="M78 45 C 90 40, 90 55, 80 60" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        {/* Track Bar */}
        <div className="h-5 sm:h-6 bg-[#E8DFC8] rounded-full border-2 border-[#D5C7AB] overflow-hidden p-0.5 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#81C784] to-[#4CAF7A] rounded-full transition-all duration-500 ease-out border-b-[3px] border-[#2E7D32]"
            style={{ width: `${Math.max(6, percentage)}%` }}
          />
        </div>

        {/* Chunky Step Dots */}
        <div className="absolute top-6 left-0 right-0 h-6 flex justify-between items-center px-1 pointer-events-none">
          {Array.from({ length: totalSteps }).map((_, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum <= currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onStepClick && onStepClick(stepNum)}
                disabled={!onStepClick}
                className={`
                  w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-heading font-bold text-xs
                  transition-all duration-200 pointer-events-auto border-2
                  ${isCompleted
                    ? 'bg-[#FFD54F] border-[#FFA000] text-[#1F2A44] shadow-sm'
                    : 'bg-[#FFF9EC] border-[#D5C7AB] text-[#8C9AA9]'
                  }
                  ${isCurrent ? 'ring-3 ring-[#4CAF7A] scale-110' : ''}
                  ${onStepClick ? 'cursor-pointer hover:scale-115' : 'cursor-default'}
                `}
                aria-label={`Langkah ${stepNum}`}
              >
                {stepNum}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
