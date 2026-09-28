import React, { useState } from 'react';
import { Sparkles, Gift, ShieldCheck, Check, ShoppingBag } from 'lucide-react';
import { audioSystem } from '../../utils/audio';

const BOTTLE_SIZES = [
  { id: '50ml', name: '50ml Discovery Flacon', price: 290, desc: 'Compact travel flacon with magnetic atomizer.' },
  { id: '100ml', name: '100ml Signature Flacon', price: 380, desc: 'The iconic heavy crystal sculpture with 24K gold plaque.', popular: true },
  { id: '250ml', name: '250ml Grand Flacon de Salon', price: 750, desc: 'Monumental collector piece with glass dip wand.' },
];

export function EngravingStudio({ customEngraving, onUpdateEngraving, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(BOTTLE_SIZES[1]);
  const [includeGiftVault, setIncludeGiftVault] = useState(true);

  const handleInputChange = (e) => {
    const val = e.target.value.slice(0, 16).toUpperCase();
    onUpdateEngraving(val);
  };

  const handleAdd = () => {
    audioSystem.playChime(1567.98); // G6 chime
    if (onAddToCart) {
      onAddToCart({
        id: `phoenix-noir-${selectedSize.id}`,
        name: `PHOENIX NOIR — ${selectedSize.name}`,
        size: selectedSize.id,
        price: selectedSize.price + (includeGiftVault ? 45 : 0),
        engraving: customEngraving || "ÉTHER",
        giftVault: includeGiftVault,
      });
    }
  };

  return (
    <section id="engraving-section" className="relative min-h-screen py-24 px-6 md:px-14 bg-noir-950 border-t border-gold-500/20">
      
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-[11px] uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Personalized Atelier</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight gold-text-gradient">
            BESPOKE ENGRAVING STUDIO
          </h2>
          <p className="text-champagne-300 text-sm sm:text-base font-light leading-relaxed">
            Inscribe your initials or moniker onto the 24K gold flacon plaque. Live updates on the 3D WebGL bottle above.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Customization Form */}
          <div className="lg:col-span-7 space-y-8 glass-panel p-8 md:p-10 rounded-3xl border border-gold-500/30">
            
            {/* Live Engraving Input */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="font-cinzel text-sm uppercase tracking-wider text-champagne-100 flex items-center gap-2">
                  <span>Custom Flacon Inscription</span>
                  <span className="text-[10px] text-gold-400 font-mono font-normal">(Complimentary)</span>
                </label>
                <span className="text-[11px] font-mono text-champagne-400">
                  {customEngraving.length}/16 Characters
                </span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={customEngraving}
                  onChange={handleInputChange}
                  placeholder="E.G. ARSH / PHOENIX"
                  maxLength={16}
                  className="w-full px-5 py-4 rounded-xl bg-noir-900 border border-gold-500/40 text-gold-300 font-cinzel text-lg tracking-[0.2em] focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all placeholder:text-champagne-400/40"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono uppercase tracking-widest text-gold-400/80 bg-noir-950 px-2.5 py-1 rounded border border-gold-500/20">
                  Live 3D Preview
                </span>
              </div>
            </div>

            {/* Flacon Size Selection */}
            <div className="space-y-3">
              <label className="font-cinzel text-sm uppercase tracking-wider text-champagne-100 block">
                Select Flacon Volume
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {BOTTLE_SIZES.map((size) => {
                  const isSelected = selectedSize.id === size.id;
                  return (
                    <div
                      key={size.id}
                      onClick={() => {
                        setSelectedSize(size);
                        audioSystem.playChime(784); // G5
                      }}
                      className={`p-4 rounded-2xl cursor-pointer border transition-all duration-300 relative ${
                        isSelected
                          ? 'border-gold-400 bg-gold-500/20 shadow-lg shadow-gold-500/20'
                          : 'border-gold-500/15 hover:border-gold-400/40 bg-noir-900/60'
                      }`}
                    >
                      {size.popular && (
                        <span className="absolute -top-2.5 right-3 text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-flame-500 text-white font-bold">
                          Signature
                        </span>
                      )}
                      <span className="font-cinzel text-lg font-bold text-champagne-100 block">
                        {size.id}
                      </span>
                      <span className="text-xs text-gold-300 font-mono font-semibold block mt-1">
                        ${size.price} USD
                      </span>
                      <span className="text-[11px] text-champagne-400 font-light block mt-2 leading-tight">
                        {size.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bespoke Gift Box Option */}
            <div
              onClick={() => setIncludeGiftVault(!includeGiftVault)}
              className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all duration-300 ${
                includeGiftVault
                  ? 'border-gold-400 bg-gold-500/10'
                  : 'border-gold-500/15 bg-noir-900/40 hover:border-gold-500/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-gold-400" />
                <div>
                  <span className="font-cinzel text-sm font-semibold text-champagne-100 block">
                    Obsidian Lacquer Gift Vault (+$45)
                  </span>
                  <span className="text-xs text-champagne-400 font-light">
                    Handcrafted velvet-lined wooden vault with red wax seal & certificate.
                  </span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${includeGiftVault ? 'bg-gold-500 border-gold-400' : 'border-champagne-400/40'}`}>
                {includeGiftVault && <Check className="w-3.5 h-3.5 text-noir-950 font-bold" />}
              </div>
            </div>

            {/* Add to Bag CTA */}
            <button
              onClick={handleAdd}
              className="btn-shimmer w-full py-4 rounded-full bg-gradient-to-r from-gold-500 via-flame-500 to-gold-600 text-noir-950 font-bold uppercase tracking-[0.25em] text-xs shadow-xl shadow-flame-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                Acquire Bespoke Flacon • ${selectedSize.price + (includeGiftVault ? 45 : 0)} USD
              </span>
            </button>
          </div>

          {/* Right: Atelier Guarantee & Real-time Engraving Plaque Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Engraving Preview Plaque */}
            <div className="p-8 rounded-3xl glass-panel border border-gold-500/40 relative overflow-hidden text-center space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-400">
                24K Gold Plaque Inscription Preview
              </div>

              <div className="p-6 rounded-2xl bg-noir-900 border-2 border-gold-500/50 shadow-inner space-y-2">
                <div className="font-cinzel text-lg tracking-[0.35em] text-white font-bold">
                  É T H E R
                </div>
                <div className="font-cinzel text-xs tracking-[0.25em] text-gold-400">
                  PHOENIX NOIR
                </div>
                <div className="py-3">
                  <span className="font-serif italic text-2xl text-gold-300 tracking-wider">
                    “ {customEngraving || "ÉTHER"} ”
                  </span>
                </div>
                <div className="text-[9px] font-mono text-champagne-400 tracking-widest uppercase">
                  PARIS • {selectedSize.id.toUpperCase()} EXTRAIT
                </div>
              </div>

              <p className="text-xs text-champagne-300 font-light">
                Laser-micro-etched by master engravers in our Paris atelier.
              </p>
            </div>

            {/* Concierge Guarantees */}
            <div className="p-6 rounded-2xl bg-noir-900/80 border border-gold-500/20 space-y-3 text-xs text-champagne-300">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Complimentary insured DHL Express worldwide delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Gift className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Includes 2 complimentary 2ml extrait discovery samples</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
                <span>30-Day risk-free trial: test sample first before breaking bottle seal</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
