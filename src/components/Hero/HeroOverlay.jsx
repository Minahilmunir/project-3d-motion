import React from 'react';
import { ArrowRight, Flame, Sparkles, Volume2, Globe, Compass, ChevronRight, MousePointer } from 'lucide-react';
import { audioSystem } from '../../utils/audio';

const PRODUCT_CARDS = [
  {
    id: 'phoenix-noir',
    title: 'PHOENIX NOIR',
    subtitle: 'Extrait 32%',
    price: '$380',
    icon: '🔥',
    tag: 'Signature'
  },
  {
    id: 'ember-crown',
    title: 'EMBER CROWN',
    subtitle: '24K Gold Flacon',
    price: '$450',
    icon: '👑',
    tag: 'Private Reserve'
  }
];

export function HeroOverlay({
  scrollProgress = 0,
  onSetPhase,
  onAddToCart,
  onExploreNotes
}) {
  let currentSection = 1;
  if (scrollProgress >= 0.78) currentSection = 5;
  else if (scrollProgress >= 0.60) currentSection = 4;
  else if (scrollProgress >= 0.48) currentSection = 3;
  else if (scrollProgress >= 0.30) currentSection = 2;

  const handlePreOrder = () => {
    audioSystem.playChime(1567.98); // G6
    if (onAddToCart) onAddToCart();
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-10 md:p-14 z-20 overflow-hidden">
      
      {/* ====================================================================
          1. GIANT EDITORIAL BACKGROUND TYPOGRAPHY ("I G N I T E" / "É T H E R")
          Layered in 3D space behind the Phoenix just like in the reference image!
          ==================================================================== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <div className="w-full flex justify-between px-6 sm:px-12 md:px-20 text-[18vw] font-cinzel font-black tracking-widest text-white/[0.07] leading-none">
          <span>I</span>
          <span>G</span>
          <span>N</span>
          <span>I</span>
          <span>T</span>
          <span>E</span>
        </div>
      </div>

      {/* Top spacer */}
      <div className="h-16" />

      {/* ====================================================================
          2. LEFT EDITORIAL CONTENT STACK (Matching Reference Image Exact Layout)
          ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto relative z-10">
        
        {/* Left Column: Heading, Subtitle & Fiery Pill Button */}
        <div className="lg:col-span-5 space-y-6 pointer-events-auto">
          
          {currentSection === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.1] drop-shadow-md">
                  FIRE-SHAPED <br />
                  <span className="gold-text-gradient">FRAGRANCES</span> <br />
                  BORN FROM <br />
                  PURE FLAME.
                </h1>
              </div>

              <p className="text-champagne-300/80 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
                Discover our blazing haute-forged extrait in Phoenix crystal with wild Assam oud, molten amber, and sacred solar bergamot.
              </p>

              {/* Glowing Fiery Pill Button (Matching Reference) */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={handlePreOrder}
                  className="btn-shimmer px-8 py-3.5 rounded-full bg-gradient-to-r from-flame-500 via-flame-600 to-flame-500 text-white font-cinzel font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-flame-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer border border-flame-400/40"
                >
                  <span>PRE ORDER</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          )}

          {currentSection === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-flame-400 block">
                02 • Sacred Disintegration
              </span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight leading-[1.1]">
                FEATHERS FRACTURE <br />
                <span className="flame-text-gradient">INTO COSMIC EMBERS</span>
              </h2>
              <p className="text-champagne-300 text-xs sm:text-sm font-light max-w-sm">
                16,000 molten particles physically dissolve from wingtip to heart into an accelerated gravitational vortex.
              </p>
            </div>
          )}

          {currentSection === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-gold-400 block">
                03 • Gravitational Singularity
              </span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight leading-[1.1]">
                THE CELESTIAL PORTAL <br />
                <span className="gold-text-gradient">CONDENSES ENERGY</span>
              </h2>
              <p className="text-champagne-300 text-xs sm:text-sm font-light max-w-sm">
                The glowing halo compresses the firebird’s thermal soul into a brilliant incandescent singularity.
              </p>
            </div>
          )}

          {currentSection === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-gold-400 block">
                04 • Alchemical Crystallization
              </span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight leading-[1.1]">
                MATTER REASSEMBLES <br />
                <span className="gold-text-gradient">INTO LUXURY GLASS</span>
              </h2>
              <p className="text-champagne-300 text-xs sm:text-sm font-light max-w-sm">
                The vortex particles continuously morph into the heavy crystal base, amber extrait body, and 24K gold flacon.
              </p>
            </div>
          )}

          {currentSection === 5 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <span className="font-cinzel text-xs uppercase tracking-[0.4em] text-champagne-400 block mb-1">
                  ÉTHER PARIS
                </span>
                <h1 className="font-cinzel text-3xl sm:text-5xl font-black gold-text-gradient uppercase tracking-tight">
                  PHOENIX NOIR
                </h1>
              </div>

              <p className="font-serif italic text-base sm:text-lg text-champagne-200">
                “Born from fire. Captured in fragrance.”
              </p>

              <div className="flex items-center gap-3 text-xs font-mono text-champagne-300 border-l-2 border-gold-500/40 pl-3">
                <span>Extrait 32%</span>
                <span>•</span>
                <span>100ml French Crystal</span>
                <span>•</span>
                <span className="text-gold-300 font-bold">$380 USD</span>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  onClick={handlePreOrder}
                  className="btn-shimmer px-8 py-3.5 rounded-full bg-gradient-to-r from-flame-500 via-flame-600 to-flame-500 text-white font-cinzel font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-flame-500/30 flex items-center gap-2 cursor-pointer border border-flame-400/40"
                >
                  <span>Acquire The Flacon</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onExploreNotes}
                  className="px-5 py-3.5 rounded-full border border-gold-500/40 hover:border-gold-400 bg-noir-900/60 text-champagne-200 text-xs uppercase font-cinzel tracking-wider cursor-pointer"
                >
                  Notes Dossier
                </button>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-noir-900/80 border border-gold-500/20 text-[11px] text-champagne-400">
                <MousePointer className="w-3.5 h-3.5 text-gold-400 animate-bounce" />
                <span>Move mouse Left / Right to physically examine flacon</span>
              </div>
            </div>
          )}

        </div>

        {/* Spacer */}
        <div className="hidden lg:block lg:col-span-3" />

        {/* ====================================================================
            3. BOTTOM-RIGHT FLOATING FROSTED PRODUCT CARDS (Matching Screenshot!)
            ==================================================================== */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-row gap-4 pointer-events-auto justify-end">
          {PRODUCT_CARDS.map((card, idx) => (
            <div
              key={card.id}
              onClick={() => onSetPhase && onSetPhase(0.90)}
              className="p-5 rounded-3xl bg-white/95 text-noir-950 shadow-2xl hover:scale-105 transition-all duration-400 cursor-pointer min-w-[150px] sm:min-w-[170px] relative group overflow-hidden border border-white/40"
            >
              {/* Corner Circular Cutout Badge Indicator (As in screenshot) */}
              <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-noir-950/10 flex items-center justify-center text-[10px] group-hover:bg-flame-500 group-hover:text-white transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </div>

              {/* Product Visual Icon / Badge */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center text-2xl shadow-inner mb-4">
                {card.icon}
              </div>

              {/* Card Titles */}
              <div className="space-y-0.5">
                <h4 className="font-cinzel text-xs font-black tracking-wider uppercase text-noir-950">
                  {card.title}
                </h4>
                <div className="flex justify-between items-center text-[10px] text-noir-800/70 font-mono">
                  <span>{card.subtitle}</span>
                  <span className="font-bold text-flame-600">{card.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ====================================================================
          4. BOTTOM BAR: Socials, Scroll Ring & Scrubber
          ==================================================================== */}
      <div className="flex items-center justify-between pointer-events-auto border-t border-white/10 pt-4 z-10">
        
        {/* Bottom Left Circular Controls (Matching screenshot circle icons) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => audioSystem.toggle()}
            className="w-8 h-8 rounded-full border border-white/20 bg-noir-900/60 hover:bg-gold-500/20 text-champagne-300 hover:text-gold-300 flex items-center justify-center transition-all text-xs"
            title="Audio Soundscape"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onExploreNotes}
            className="w-8 h-8 rounded-full border border-white/20 bg-noir-900/60 hover:bg-gold-500/20 text-champagne-300 hover:text-gold-300 flex items-center justify-center transition-all text-xs"
            title="Olfactory Pyramid"
          >
            <Compass className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Center Circular Scroll Indicator (Matching reference ring) */}
        <div
          onClick={() => onSetPhase && onSetPhase(currentSection === 5 ? 0.05 : scrollProgress + 0.25)}
          className="flex flex-col items-center gap-1 cursor-pointer group"
        >
          <div className="w-7 h-7 rounded-full border border-gold-400/50 group-hover:border-gold-300 flex items-center justify-center transition-all">
            <div className="w-2 h-2 rounded-full bg-flame-500 animate-ping" />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-champagne-400 group-hover:text-gold-300">
            Scroll {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        {/* Phase Quick Selector */}
        <div className="flex items-center gap-2 text-[10px] uppercase font-mono">
          {[
            { id: 1, label: 'Phoenix', progress: 0.05 },
            { id: 2, label: 'Vortex', progress: 0.48 },
            { id: 5, label: 'Flacon', progress: 0.90 },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onSetPhase && onSetPhase(item.progress)}
              className={`px-2.5 py-1 rounded-full border transition-all ${
                currentSection === item.id
                  ? 'border-flame-500 bg-flame-500/20 text-flame-400 font-bold'
                  : 'border-white/10 text-champagne-400/60 hover:text-champagne-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}
