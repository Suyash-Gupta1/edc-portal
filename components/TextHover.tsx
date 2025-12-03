import React from 'react';

interface TextHoverProps {
  text: string;
  className?: string;
}

const TextHover: React.FC<TextHoverProps> = ({ text, className = '' }) => {
  return (
    <div className={`relative overflow-hidden inline-flex ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="relative inline-flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
          style={{ transitionDelay: `${i * 0.02}s` }}
        >
          <span>{char === ' ' ? '\u00A0' : char}</span>
          <span className="absolute top-full left-0">{char === ' ' ? '\u00A0' : char}</span>
        </span>
      ))}
    </div>
  );
};

export default TextHover;