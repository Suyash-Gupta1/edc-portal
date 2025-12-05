import React from 'react';

const Marquee: React.FC = () => {
  const words = ["IDEATE", "INNOVATE", "INCUBATE"];
  
  const allItems = [...words, ...words, ...words, ...words];

  return (
    <div className="border-y border-white/5 bg-black py-12 overflow-hidden marquee-wrapper relative z-20">
      <div className="flex gap-24 whitespace-nowrap animate-marquee items-center">
        {allItems.map((text, index) => (
          <span key={index} className="text-5xl md:text-7xl font-black font-display text-white tracking-tighter uppercase select-none">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;