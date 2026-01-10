import React, { useEffect, useState } from 'react';
import { Terminal, X, Lock, Unlock } from 'lucide-react';

// this isnt mine chatgpt is for it just looked cool thats why in projrct nothing more can be removed

interface HackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HackerModal: React.FC<HackerModalProps> = ({ isOpen, onClose }) => {
  const [text, setText] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  
  const fullText = "> SYSTEM BREACH DETECTED...\n> ACCESS GRANTED: DEVELOPER PROTOCOL.\n> WELCOME TO THE INNER CIRCLE.\n> DECRYPTING SECURE MESSAGE...";

  useEffect(() => {
    if (isOpen) {
      setShowSecret(false);
      let index = 0;
      const interval = setInterval(() => {
        setText(fullText.slice(0, index));
        index++;
        if (index > fullText.length) {
            clearInterval(interval);
            setTimeout(() => setShowSecret(true), 500); // Reveal secret after typing
        }
      }, 30);
      return () => clearInterval(interval);
    } else {
      setText('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 font-mono">
      <div className="absolute inset-0 pointer-events-none opacity-20  bg-cover"></div>

      <div className="relative w-full max-w-2xl bg-black border border-[#CCFF00] shadow-[0_0_50px_rgba(34,197,94,0.2)] p-8 rounded-lg overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-green-900 pb-4 mb-6 relative z-10">
          <div className="flex items-center gap-3 text-green-500">
            <Terminal className="w-6 h-6 animate-pulse" />
            <span className="tracking-widest font-bold">TERMINAL_ROOT_ACCESS</span>
          </div>
          <button onClick={onClose} className="text-green-700 hover:text-green-500 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6 relative z-10">
          {/* Typing Text Area */}
          <div className="h-32 text-green-400 whitespace-pre-line leading-relaxed text-lg font-bold">
            {text}
            <span className="inline-block w-3 h-5 bg-green-500 ml-1 animate-pulse"></span>
          </div>

          {/* The Secret Reveal */}
          {showSecret && (
            <div className="border border-green-500/50 bg-green-900/10 p-6 rounded animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-2 text-yellow-400 mb-2 font-bold uppercase tracking-wider text-xs">
                <Unlock className="w-4 h-4" />
                Classified Intel
              </div>
              
              <p className="text-white text-xl md:text-2xl font-display font-bold leading-relaxed mb-4">
                "You know the rules, and so do I."
              </p>
              
              <div className="h-px w-full bg-green-900/50 my-4"></div>
              
              <p className="text-green-300 text-sm">
                ⚠ <span className="font-bold text-green-400">MEMORIZE THIS PHRASE.</span><br/>
                This is your passkey for <span className="text-white font-bold">Round 1</span> & <span className="text-white font-bold">Round 4</span> auditions. <br/>
                Do not share it. Good luck, candidate.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackerModal;