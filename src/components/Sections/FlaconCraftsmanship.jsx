import React, { useState } from 'react';
import { Shield, Sparkles, Gem, Compass, CheckCircle2 } from 'lucide-react';
import { audioSystem } from '../../utils/audio';

const CRAFT_PILLARS = [
  {
    id: 'crystal',
    title: 'Hand-Blown French Crystal',
    subtitle: 'Verreries de Haute Parfumerie',
    desc: 'Each flacon is individually blown from ultra-clear French crystal, annealed over 48 hours to create exceptional optical refraction and structural density.',
    specs: ['Ultra-dense 480g crystal mass', 'Diamond-beveled chamfers', 'Flawless optical transparency']
  },
  {
    id: 'gold',
    title: '24K Molten Gold Inlay',
    subtitle: 'Hand-applied Gilding Atelier',
    desc: 'The front plaque and shoulder bezel are electroplated with 24-karat pure gold, hand-burnished with agate stones to achieve a radiant, scratch-resistant mirror luster.',
    specs: ['24-Karat pure gold plating', 'Agate stone burnishing', 'Individually numbered atelier hallmark']
  },
  {
    id: 'cap',
    title: 'Magnetic Obsidian Crown',
    subtitle: 'Precision Engineered Closure',
    desc: 'Weighted octagonal crown sculpted from high-density black volcanic obsidian composite with a neodymium magnetic locking snap calibrated to 1.8 Newtons.',
    specs: ['Neodymium magnetic snap', 'Volcanic obsidian composite', 'Laser-engraved ÉTHER monogram']
  },
  {
    id: 'concentration',
    title: '32% Pure Extrait de Parfum',
    subtitle: 'Peak Sillage & 24h Longevity',
    desc: 'Macerated for six months in dark oak casks, achieving the rarest category of Haute Parfumerie with exceptional sillage and skin longevity exceeding 24 hours.',
    specs: ['32% Pure fragrance oils', '6-Month dark oak cask aging', 'Zero synthetic phthalates']
  }
];

export function FlaconCraftsmanship() {
  const [activePillar, setActivePillar] = useState(CRAFT_PILLARS[0]);

  const handleSelect = (pillar) => {
    setActivePillar(pillar);
    audioSystem.playChime(987.77); // B5
  };

  return (
    <section id="flacon-section" className="relative min-h-screen py-24 px-6 md:px-14 bg-noir-900 border-t border-gold-500/20">
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-[11px] uppercase tracking-[0.25em]">
            <Gem className="w-3.5 h-3.5 text-gold-400" />
            <span>The Sacred Vessel</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight gold-text-gradient">
            HAUTE CRAFTSMANSHIP
          </h2>
          <p className="text-champagne-300 text-sm sm:text-base font-light leading-relaxed">
            Every bottle is an architectural sculpture engineered to preserve volatile natural absolutes in eternal suspension.
          </p>
        </div>

        {/* Interactive Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive Navigation Cards */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            {CRAFT_PILLARS.map((pillar) => {
              const isSelected = activePillar.id === pillar.id;
              return (
                <div
                  key={pillar.id}
                  onClick={() => handleSelect(pillar)}
                  className={`p-6 rounded-2xl cursor-pointer glass-panel transition-all duration-400 border ${
                    isSelected
                      ? 'border-gold-400 bg-gold-500/15 shadow-xl shadow-gold-500/20 translate-x-2'
                      : 'border-gold-500/15 hover:border-gold-400/40 hover:bg-noir-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400">
                        {pillar.subtitle}
                      </span>
                      <h3 className="font-cinzel text-lg md:text-xl font-bold text-champagne-100 mt-1">
                        {pillar.title}
                      </h3>
                    </div>
                    <div className={`w-3 h-3 rounded-full border ${isSelected ? 'bg-gold-400 border-gold-300 shadow-md shadow-gold-400' : 'border-champagne-400/40'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Dossier Panel */}
          <div className="lg:col-span-6 p-8 md:p-10 rounded-3xl glass-panel border border-gold-500/30 flex flex-col justify-between space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold-400 border-b border-gold-500/20 pb-2">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>Atelier Architecture Dossier</span>
              </div>

              <h3 className="font-cinzel text-3xl md:text-4xl font-bold gold-text-gradient">
                {activePillar.title}
              </h3>

              <p className="text-champagne-200 text-base font-light leading-relaxed">
                {activePillar.desc}
              </p>
            </div>

            {/* Specifications Checklist */}
            <div className="space-y-3 bg-noir-950/60 p-6 rounded-2xl border border-gold-500/20">
              <span className="text-[11px] uppercase tracking-widest font-mono text-gold-400 block mb-2">
                Master Artisan Specs:
              </span>
              {activePillar.specs.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-champagne-200">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-champagne-400 pt-2 border-t border-gold-500/15">
              <span>Origin: Grasse & Paris, France</span>
              <span className="text-gold-400">Certification ISO 22716</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
