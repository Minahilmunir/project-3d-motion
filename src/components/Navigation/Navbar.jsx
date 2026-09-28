import React, { useState } from 'react';
import { Volume2, VolumeX, ShoppingBag, Sparkles, Compass } from 'lucide-react';
import { audioSystem } from '../../utils/audio';

export function Navbar({ cartCount = 0, onOpenCart, onOpenQuiz }) {
  const [isAudioActive, setIsAudioActive] = useState(false);

  const handleAudioToggle = () => {
    const active = audioSystem.toggle();
    setIsAudioActive(active);
    if (active) {
      audioSystem.playChime(1046.5); // C6 chime
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-5 flex items-center justify-between pointer-events-none">
      {/* Background blur pill */}
      <div className="absolute inset-x-6 md:inset-x-12 top-3 h-16 glass-panel rounded-full pointer-events-auto flex items-center justify-between px-6 md:px-10 border border-gold-500/20">
        
        {/* Left: Brand Monogram */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-flame-600 flex items-center justify-center shadow-lg shadow-flame-500/20">
            <span className="font-cinzel text-noir-950 font-bold text-lg">É</span>
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel tracking-[0.35em] text-sm md:text-base font-bold gold-text-gradient">
              ÉTHER
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-champagne-400 font-sans -mt-1">
              Haute Parfumerie • Paris
            </span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-champagne-300">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-gold-400 transition-colors duration-300 py-1 relative group"
          >
            Metamorphosis
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollToSection('notes-section')}
            className="hover:text-gold-400 transition-colors duration-300 py-1 relative group"
          >
            Olfactory Notes
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollToSection('flacon-section')}
            className="hover:text-gold-400 transition-colors duration-300 py-1 relative group"
          >
            The Flacon
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollToSection('ritual-section')}
            className="hover:text-gold-400 transition-colors duration-300 py-1 relative group"
          >
            The Ritual
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollToSection('engraving-section')}
            className="hover:text-gold-400 transition-colors duration-300 py-1 relative group"
          >
            Bespoke Atelier
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full" />
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Scent Quiz Trigger */}
          <button
            onClick={onOpenQuiz}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-medium text-gold-300 bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 transition-all duration-300"
          >
            <Compass className="w-3.5 h-3.5 text-gold-400" />
            <span>Scent Quiz</span>
          </button>

          {/* Soundscape Audio Toggle */}
          <button
            onClick={handleAudioToggle}
            title={isAudioActive ? "Mute Ambient Soundscape" : "Play Ambient Soundscape"}
            className="relative p-2 text-champagne-300 hover:text-gold-400 transition-colors duration-300 flex items-center gap-2"
          >
            {isAudioActive ? (
              <div className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-gold-400 animate-pulse" />
                <div className="flex items-end gap-[2px] h-3">
                  <span className="w-[2px] h-3 bg-gold-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-[2px] h-2 bg-gold-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-[2px] h-3.5 bg-gold-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            ) : (
              <VolumeX className="w-4 h-4 text-champagne-400" />
            )}
          </button>

          {/* Cart Bag Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-gold-500/10 hover:bg-gold-500/25 border border-gold-500/30 text-champagne-100 hover:text-gold-300 transition-all duration-300 flex items-center justify-center"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-flame-500 text-[9px] font-bold text-white flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
