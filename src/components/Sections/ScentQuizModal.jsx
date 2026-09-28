import React, { useState } from 'react';
import { X, Sparkles, Flame, Check, RefreshCw } from 'lucide-react';
import { audioSystem } from '../../utils/audio';

const QUIZ_QUESTIONS = [
  {
    question: "When do you command your greatest presence?",
    options: [
      { label: "Midnight Velvet", desc: "Intense evening gatherings, dark corridors, intimate encounters.", score: 'noir' },
      { label: "Golden Hour Solstice", desc: "Warm sunset lounges, amber glow, radiant magnetism.", score: 'amber' },
      { label: "Dawn Awakening", desc: "First light, crisp focus, vibrant energetic aura.", score: 'solar' },
    ]
  },
  {
    question: "Which elemental texture speaks to your soul?",
    options: [
      { label: "Burning Wild Oud & Smoke", desc: "Deep ancient woods aged in sacred temple braziers.", score: 'noir' },
      { label: "Molten Amber & Damask Rose", desc: "Rich balsamic warmth laced with velvety crimson petals.", score: 'amber' },
      { label: "Solar Bergamot & Saffron Fire", desc: "Sparkling citrus brilliance over rare Kashmiri spice.", score: 'solar' },
    ]
  },
  {
    question: "What impression do you leave behind in the room?",
    options: [
      { label: "An Unforgettable Enigma", desc: "People turn around wondering who just commanded the air.", score: 'noir' },
      { label: "Royal Warmth & Opulence", desc: "A comforting yet deeply seductive golden embrace.", score: 'amber' },
      { label: "Electrifying Charisma", desc: "Luminous, sharp, and magnetic presence.", score: 'solar' },
    ]
  }
];

export function ScentQuizModal({ isOpen, onClose, onSelectResult }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleSelectOption = (score) => {
    audioSystem.playChime(1046.5);
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate result
      setResult({
        title: "PHOENIX NOIR • EXTRAIT DE PARFUM",
        match: "98.7% Olfactory Affinity",
        description: "Your answers reveal an alchemical alignment with high-intensity thermal notes. The union of Wild Assam Oud, Smoked Damask Rose, and Saffron Threads is tuned to your skin chemistry.",
        notes: ["Wild Assam Oud", "Molten Amber Resin", "Solar Bergamot", "Black Vanilla"],
      });
      audioSystem.playChime(1318.5);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-xl p-8 rounded-3xl glass-panel border border-gold-500/40 shadow-2xl shadow-gold-500/20 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-noir-900/80 hover:bg-gold-500/20 text-champagne-400 hover:text-gold-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!result ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-400">
                Alchemical Profiling • Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <h3 className="font-cinzel text-xl md:text-2xl font-bold gold-text-gradient">
                {QUIZ_QUESTIONS[currentStep].question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.score)}
                  className="w-full text-left p-5 rounded-2xl border border-gold-500/20 hover:border-gold-400/60 bg-noir-900/60 hover:bg-gold-500/15 transition-all duration-300 group cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-base font-bold text-champagne-100 group-hover:text-gold-300">
                      {opt.label}
                    </span>
                    <Sparkles className="w-4 h-4 text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-champagne-400 font-light">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 pt-2">
              {QUIZ_QUESTIONS.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentStep === idx ? 'bg-gold-400 scale-125' : 'bg-noir-700'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-400 bg-gold-500/20 text-gold-300 text-xs uppercase font-mono tracking-widest">
              <Flame className="w-4 h-4 text-flame-400" />
              <span>{result.match}</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-champagne-400">
                Your Alchemical Signature
              </span>
              <h3 className="font-cinzel text-3xl font-bold gold-text-gradient">
                {result.title}
              </h3>
            </div>

            <p className="text-sm text-champagne-300 font-light leading-relaxed max-w-md mx-auto">
              {result.description}
            </p>

            <div className="p-4 rounded-2xl bg-noir-900/80 border border-gold-500/20">
              <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400 block mb-2">
                Dominant Scent Accords
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {result.notes.map((note, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-xs text-champagne-200">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  if (onSelectResult) onSelectResult();
                  onClose();
                }}
                className="btn-shimmer flex-1 py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-flame-500 to-gold-600 text-noir-950 font-bold uppercase tracking-[0.2em] text-xs shadow-lg shadow-flame-500/25"
              >
                Claim My Signature Flacon
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-3.5 rounded-full border border-gold-500/30 text-champagne-300 hover:text-gold-300 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
