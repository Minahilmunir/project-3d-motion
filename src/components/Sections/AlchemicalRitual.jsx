import React from 'react';
import { Flame, Droplets, Sparkles, Compass } from 'lucide-react';

const RITUAL_STEPS = [
  {
    step: '01',
    title: 'The Flame Dispersal',
    tag: 'Solar Awakening',
    desc: 'Depress the 24K gold atomizer 20cm before you into the open space. Step into the cloud of solar bergamot and saffron sparks to let the top notes envelop your aura.',
    icon: Flame,
  },
  {
    step: '02',
    title: 'Pulse Point Awakening',
    tag: 'Thermal Diffusion',
    desc: 'Apply a single drop onto warm arterial pulse points — the hollow of the throat, inner wrists, and behind the ears. Body warmth activates the molten amber resin heart.',
    icon: Droplets,
  },
  {
    step: '03',
    title: 'The Obsidian Sillage',
    tag: '24-Hour Resonance',
    desc: 'Lightly mist the nape of your neck or natural fibers (cashmere, silk). The wild Assam oud and bourbon vanilla base notes bond with fibers for an enduring sillage.',
    icon: Sparkles,
  },
];

export function AlchemicalRitual() {
  return (
    <section id="ritual-section" className="relative min-h-screen py-24 px-6 md:px-14 bg-noir-900 border-t border-gold-500/20">
      
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-[11px] uppercase tracking-[0.25em]">
            <Compass className="w-3.5 h-3.5 text-gold-400" />
            <span>The Application Protocol</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight gold-text-gradient">
            THE ALCHEMICAL RITUAL
          </h2>
          <p className="text-champagne-300 text-sm sm:text-base font-light leading-relaxed">
            How to command the transformation of heat, skin chemistry, and raw extrait de parfum into an irresistible signature aura.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RITUAL_STEPS.map(({ step, title, tag, desc, icon: Icon }, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass-panel glass-panel-hover border border-gold-500/20 flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 font-cinzel text-4xl font-bold text-gold-500/10 group-hover:text-gold-500/20 transition-colors">
                {step}
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:bg-gold-500/20 transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400">
                    {tag}
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-champagne-100">
                    {title}
                  </h3>
                </div>

                <p className="text-sm text-champagne-300 font-light leading-relaxed">
                  {desc}
                </p>
              </div>

              <div className="w-full h-[1px] bg-gradient-to-r from-gold-500/40 via-gold-500/10 to-transparent" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
