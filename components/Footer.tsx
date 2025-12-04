import React from 'react';
import { Instagram, Linkedin, Twitter, Youtube, Send } from 'lucide-react';

// TextHover component for the links
const TextHover = ({ text }) => {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {text}
      </span>
      <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 text-[#ccff00]">
        {text}
      </span>
    </span>
  );
};

const Footer = () => {
  return (
    <footer className="relative bg-[#050505] text-white overflow-hidden pt-20 md:pt-32 pb-10 font-sans min-h-screen">
        {/* Background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
             <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            {/* CTA Section */}
            <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-20 mb-20 gap-10">
                <div className="text-center md:text-left">
                    <h2 className="text-5xl md:text-7xl font-bold font-display tracking-tighter mb-4">
                        Have an <span className="text-[#ccff00]">Idea?</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl font-light">Let's build something incredible together.</p>
                </div>
                
                <a href="#" className="group relative px-10 py-5 rounded-full bg-white text-black overflow-hidden transition-transform hover:scale-105 duration-300">
                    <div className="absolute inset-0 bg-[#ccff00] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"></div>
                    <span className="relative z-10 font-bold text-lg flex items-center gap-3">
                        {/* BUTTON LOGIC FIX:
                            Using CSS Grid to stack the text elements on top of each other in the same cell.
                            This ensures the container width is determined by the widest element ("Get in Touch"),
                            preventing the layout shift/jumping when switching to the shorter "Let's Talk".
                        */}
                        <span className="grid place-items-center">
                            <span className="col-start-1 row-start-1 transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
                                Get in Touch
                            </span>
                            <span className="col-start-1 row-start-1 transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                Let's Talk
                            </span>
                        </span>
                        <Send className="w-4 h-4" />
                    </span>
                </a>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 mb-24">
                
                {/* Brand - Reverted to original 'E' logo */}
                <div className="col-span-2 md:col-span-5 flex flex-col h-full space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#ccff00] to-lime-600 rounded-lg flex items-center justify-center text-black font-bold font-display text-xs">E</div>
                            <span className="font-display font-bold text-2xl tracking-tight">EDC NIT DGP</span>
                        </div>
                        <p className="text-gray-400 text-lg max-w-sm leading-relaxed font-light">
                            The Entrepreneurship Development Cell of NIT Durgapur. Igniting minds, cultivating leaders, and fostering the spirit of innovation since inception.
                        </p>
                    </div>
                </div>

                {/* Sitemap */}
                <div className="col-span-1 md:col-span-2 md:col-start-7">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">Sitemap</h4>
                    <ul className="space-y-4">
                        {['Home', 'About', 'Domains', 'Events', 'Team'].map(item => (
                            <li key={item}>
                                <a href="#" className="block text-xl font-display font-normal text-white hover:text-[#ccff00] transition-colors w-fit group">
                                     <TextHover text={item} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Socials */}
                <div className="col-span-1 md:col-span-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">Socials</h4>
                    <ul className="space-y-4">
                        {[
                            { name: 'Instagram', icon: Instagram },
                            { name: 'LinkedIn', icon: Linkedin },
                            { name: 'Twitter', icon: Twitter },
                            { name: 'YouTube', icon: Youtube }
                        ].map((social) => (
                            <li key={social.name}>
                                <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                                    <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#ccff00] group-hover:bg-[#ccff00] group-hover:text-black transition-all duration-300">
                                        <social.icon className="w-4 h-4" />
                                    </span>
                                    <span className="font-medium text-sm hidden lg:block"><TextHover text={social.name} /></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Credits */}
                <div className="col-span-2 md:col-span-3 flex flex-col items-start md:items-end justify-end">
                      <div className="text-left md:text-right space-y-1">
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Designed & Developed by</p>
                        <p className="text-white font-medium">WebTeam EDC</p>
                      </div>
                </div>
            </div>

            {/* Bottom Large Text */}
            <div className="border-t border-white/10 pt-16 pb-8">
                 <h1 className="font-display font-bold text-[13vw] leading-[0.8] text-center text-transparent bg-clip-text bg-gradient-to-b from-white/25 to-white/0 select-none tracking-tighter opacity-50">
                    EDC NIT DGP
                </h1>
                <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-gray-600 text-sm gap-4">
                    <p>© 2024 Entrepreneurship Development Cell. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;