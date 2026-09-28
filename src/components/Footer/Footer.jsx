import React, { useState } from 'react';
import { Flame, Sparkles, Send, Check } from 'lucide-react';
import { audioSystem } from '../../utils/audio';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    audioSystem.playChime(1318.5);
    setIsSubmitted(true);
  };

  return (
    <footer className="relative bg-noir-950 border-t border-gold-500/20 pt-20 pb-12 px-6 md:px-14 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* VIP Newsletter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-gold-500/15 pb-16">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-gold-400">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Private Salon Membership</span>
            </div>
            <h3 className="font-cinzel text-3xl md:text-4xl font-bold gold-text-gradient">
              RECEIVE PRIVATE ALLOCATIONS
            </h3>
            <p className="text-champagne-300 text-sm font-light leading-relaxed max-w-md">
              Gain exclusive access to limited botanical harvests, private batch releases, and invitations to ÉTHER salon soirées.
            </p>
          </div>

          <div className="lg:col-span-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your private email address"
                  required
                  className="flex-1 px-6 py-4 rounded-full bg-noir-900 border border-gold-500/30 text-champagne-100 font-sans text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all placeholder:text-champagne-400/40"
                />
                <button
                  type="submit"
                  className="btn-shimmer px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-flame-500 text-noir-950 font-bold uppercase tracking-[0.2em] text-xs shadow-lg shadow-flame-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Access</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-gold-500/15 border border-gold-400 text-gold-300 text-sm flex items-center gap-3">
                <Check className="w-5 h-5 text-gold-400 shrink-0" />
                <span>Your invitation request has been received by our Paris concierge.</span>
              </div>
            )}
          </div>
        </div>

        {/* Brand Information & Boutiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-champagne-300">
          
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm uppercase tracking-widest text-gold-400 font-bold">
              Flagship Salons
            </h4>
            <ul className="space-y-2 text-champagne-400">
              <li>Place Vendôme • Paris</li>
              <li>Mayfair, Bond St • London</li>
              <li>Ginza Six • Tokyo</li>
              <li>Dubai Mall Fashion Avenue</li>
              <li>Madison Avenue • New York</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-cinzel text-sm uppercase tracking-widest text-gold-400 font-bold">
              The Collections
            </h4>
            <ul className="space-y-2 text-champagne-400">
              <li>Phoenix Noir (Extrait 32%)</li>
              <li>Solar Solstice (Pure Parfum)</li>
              <li>Obsidian Oud (Private Reserve)</li>
              <li>Bespoke Crystal Flacons</li>
              <li>Extrait Discovery Set</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-cinzel text-sm uppercase tracking-widest text-gold-400 font-bold">
              Concierge
            </h4>
            <ul className="space-y-2 text-champagne-400">
              <li>VIP Allocation Inquiries</li>
              <li>Complimentary Engraving</li>
              <li>Worldwide DHL Courier</li>
              <li>Maison Authenticity Seal</li>
              <li>Private Scent Consultations</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-cinzel text-sm uppercase tracking-widest text-gold-400 font-bold">
              Maison ÉTHER
            </h4>
            <p className="text-champagne-400 text-xs font-light leading-relaxed">
              Founded on the alchemical principle that fragrance is spirit crystallized into matter. Crafted in France according to heritage Haute Parfumerie codes.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold-500/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-champagne-400/60">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-400 text-[10px] font-cinzel font-bold">
              É
            </div>
            <span>© 2026 MAISON ÉTHER PARIS. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex gap-6">
            <span className="hover:text-gold-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gold-400 transition-colors cursor-pointer">Terms of Allocation</span>
            <span className="hover:text-gold-400 transition-colors cursor-pointer">Legal Notice</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
