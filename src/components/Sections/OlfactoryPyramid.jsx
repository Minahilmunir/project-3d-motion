import React, { useState } from 'react';
import { Sparkles, Flame, Droplets, Wind, ShieldCheck } from 'lucide-react';
import { audioSystem } from '../../utils/audio';

const SCENT_NOTES = {
  top: {
    title: "Head Notes • The Solar Awakening",
    time: "First 15 — 30 minutes",
    description: "A blinding burst of solar citrus and precious saffron sparks representing the fiery bird taking flight.",
    items: [
      { name: "Solar Bergamot", origin: "Calabria, Italy", accord: "Luminous & Zesty", icon: "🍋" },
      { name: "Saffron Threads", origin: "Kashmir Valley", accord: "Warm Golden Spice", icon: "🌾" },
      { name: "Blood Mandarin", origin: "Sicily", accord: "Juicy Crimson Flame", icon: "🍊" },
    ]
  },
  heart: {
    title: "Heart Notes • The Molten Core",
    time: "2 — 6 hours",
    description: "The sacred rupture where velvety floral absolute meets incandescent amber resin in a vortex of warmth.",
    items: [
      { name: "Smoked Damask Rose", origin: "Isparta, Turkey", accord: "Dark Honeyed Floral", icon: "🌹" },
      { name: "Molten Amber Tears", origin: "Baltic Reserve", accord: "Opulent Balsamic Glow", icon: "✨" },
      { name: "Olibanum Sacred Resin", origin: "Dhofar, Oman", accord: "Ethereal Incense Smoke", icon: "🔥" },
    ]
  },
  base: {
    title: "Base Notes • The Eternal Ashes",
    time: "8 — 24+ hours",
    description: "Deep, hypnotic woods and rare dark resins anchoring the fragrance into timeless permanence.",
    items: [
      { name: "Wild Assam Oud", origin: "Northeast India", accord: "Smoky Leather & Earth", icon: "🪵" },
      { name: "Black Bourbon Vanilla", origin: "Madagascar", accord: "Creamy Dark Smoke", icon: "🍨" },
      { name: "Obsidian Atlas Cedar", origin: "Morocco", accord: "Noble Resinous Depth", icon: "🌲" },
      { name: "Golden Phoenix Musk", origin: "Ethical Botanical", accord: "Velvety Skin Radiance", icon: "🌌" },
    ]
  }
};

export function OlfactoryPyramid({ onTriggerNoteFlare }) {
  const [activeTier, setActiveTier] = useState('heart');
  const [selectedNote, setSelectedNote] = useState(SCENT_NOTES.heart.items[1]);

  const handleSelectNote = (tierKey, note) => {
    setActiveTier(tierKey);
    setSelectedNote(note);
    audioSystem.playChime(tierKey === 'top' ? 1174.7 : tierKey === 'heart' ? 880 : 440);
    if (onTriggerNoteFlare) onTriggerNoteFlare();
  };

  return (
    <section id="notes-section" className="relative min-h-screen py-24 px-6 md:px-14 bg-noir-950 border-t border-gold-500/20 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-flame-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-[11px] uppercase tracking-[0.25em]">
            <Droplets className="w-3.5 h-3.5 text-gold-400" />
            <span>The Olfactory Alchemistry</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight gold-text-gradient">
            PYRAMID OF FIRE & ASH
          </h2>
          <p className="text-champagne-300 text-sm sm:text-base font-light leading-relaxed">
            Crafted with rare natural absolutes harvested at peak solar alignment. Click any note to ignite its particle signature.
          </p>
        </div>

        {/* Tier Selector Pills */}
        <div className="flex justify-center gap-3 md:gap-6 font-cinzel text-xs md:text-sm uppercase tracking-[0.2em]">
          {[
            { key: 'top', label: '01 Top (Head)', icon: Wind },
            { key: 'heart', label: '02 Heart (Vortex)', icon: Flame },
            { key: 'base', label: '03 Base (Ash)', icon: Sparkles },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                setActiveTier(key);
                setSelectedNote(SCENT_NOTES[key].items[0]);
                audioSystem.playChime(660);
              }}
              className={`px-5 py-3 rounded-full border flex items-center gap-2 transition-all duration-300 ${
                activeTier === key
                  ? 'border-gold-400 bg-gold-500/20 text-gold-300 shadow-lg shadow-gold-500/15'
                  : 'border-white/10 hover:border-gold-500/30 text-champagne-400 hover:text-champagne-100 bg-noir-900/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Active Tier Accord Grid & Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Note Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-xl bg-noir-900/80 border border-gold-500/15 mb-6">
              <div className="flex justify-between items-center text-xs uppercase font-mono text-gold-400 tracking-wider">
                <span>{SCENT_NOTES[activeTier].title}</span>
                <span className="text-champagne-400">{SCENT_NOTES[activeTier].time}</span>
              </div>
              <p className="text-champagne-300 text-sm mt-2 font-light">
                {SCENT_NOTES[activeTier].description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SCENT_NOTES[activeTier].items.map((note, idx) => {
                const isSelected = selectedNote?.name === note.name;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectNote(activeTier, note)}
                    className={`p-5 rounded-xl cursor-pointer glass-panel glass-panel-hover border transition-all duration-300 ${
                      isSelected
                        ? 'border-gold-400 bg-gold-500/15 shadow-xl shadow-gold-500/20 ring-1 ring-gold-400/50'
                        : 'border-gold-500/15 hover:border-gold-400/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-2xl">{note.icon}</span>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400/80 px-2 py-0.5 rounded bg-noir-950/80 border border-gold-500/20">
                        {note.origin}
                      </span>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-cinzel text-base font-semibold text-champagne-100">
                        {note.name}
                      </h4>
                      <p className="text-xs text-champagne-400 mt-1 font-light">
                        Accord: {note.accord}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Note Alchemical Inspection Showcase */}
          <div className="lg:col-span-5 p-8 rounded-2xl glass-panel border border-gold-500/30 relative overflow-hidden space-y-6">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-flame-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-gold-500/20 pb-4">
              <span className="text-[11px] uppercase tracking-[0.25em] font-cinzel text-gold-400">
                Extraction Dossier
              </span>
              <span className="text-2xl">{selectedNote.icon}</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-cinzel text-2xl font-bold gold-text-gradient">
                {selectedNote.name}
              </h3>
              <p className="text-xs font-mono uppercase tracking-widest text-champagne-400">
                Origin: {selectedNote.origin}
              </p>
            </div>

            <p className="text-champagne-200 text-sm font-light leading-relaxed">
              Extracted via cold fractional distillation to capture the delicate, volatile top esters. Blended with the amber heart to create the signature Phoenix thermal resonance.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-xs font-mono text-champagne-300">
                <span>Thermal Intensity</span>
                <span className="text-gold-400">98.4%</span>
              </div>
              <div className="w-full h-1.5 bg-noir-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-gold-400 to-flame-500 rounded-full w-[94%]" />
              </div>
            </div>

            <button
              onClick={() => {
                audioSystem.playChime(1480);
                if (onTriggerNoteFlare) onTriggerNoteFlare();
              }}
              className="w-full py-3 rounded-xl bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/40 text-gold-300 text-xs uppercase font-cinzel tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Ignite Scent Particle Flare</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
