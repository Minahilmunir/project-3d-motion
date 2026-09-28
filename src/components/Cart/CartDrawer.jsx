import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioSystem } from '../../utils/audio';

export function CartDrawer({ isOpen, onClose, cartItems = [], onRemoveItem, onClearCart }) {
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  const handleCheckout = () => {
    audioSystem.playChime(1567.98); // G6 chime
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffd066', '#ff5419', '#dfa248', '#ffffff'],
    });
    setIsOrdered(true);
  };

  const handleFinish = () => {
    setIsOrdered(false);
    if (onClearCart) onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-noir-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md h-full bg-noir-950 border-l border-gold-500/30 flex flex-col justify-between p-6 sm:p-8 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gold-500/20 pb-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-gold-400" />
            <h3 className="font-cinzel text-lg font-bold gold-text-gradient">
              PRIVATE ALLOCATION BAG
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gold-500/10 text-champagne-400 hover:text-gold-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!isOrdered ? (
          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto text-gold-400">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <p className="font-cinzel text-champagne-300 text-sm">
                  Your fragrance vault is empty.
                </p>
                <p className="text-xs text-champagne-400 max-w-xs mx-auto font-light">
                  Select a bespoke flacon from the studio to reserve your numbered allocation.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl glass-panel border border-gold-500/20 flex justify-between gap-4 relative group"
                  >
                    <div className="space-y-1">
                      <h4 className="font-cinzel text-sm font-bold text-champagne-100">
                        {item.name}
                      </h4>
                      <div className="text-xs font-mono text-gold-400 font-semibold">
                        ${item.price} USD
                      </div>

                      {/* Engraving Tag */}
                      {item.engraving && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-noir-900 border border-gold-500/30 text-[10px] font-mono text-gold-300 mt-2">
                          <Sparkles className="w-3 h-3 text-gold-400" />
                          <span>Engraving: “{item.engraving}”</span>
                        </div>
                      )}

                      {/* Gift Vault Badge */}
                      {item.giftVault && (
                        <div className="text-[10px] text-champagne-400 block pt-1">
                          + Obsidian Lacquer Gift Vault included
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onRemoveItem && onRemoveItem(idx)}
                      className="text-champagne-400 hover:text-flame-500 p-1 self-start transition-colors"
                      title="Remove flacon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Order Confirmation View */
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-5 py-8 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-400 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-400">
                Allocation Confirmed • Ref #ETH-{Math.floor(100000 + Math.random() * 900000)}
              </span>
              <h3 className="font-cinzel text-2xl font-bold gold-text-gradient">
                ATELIER ORDER DISPATCHED
              </h3>
            </div>

            <p className="text-xs text-champagne-300 font-light max-w-xs leading-relaxed">
              Your bespoke engraved flacon is now entering manual inspection and laser engraving in Paris. Tracking details have been sent to your VIP account.
            </p>

            <button
              onClick={handleFinish}
              className="px-8 py-3.5 rounded-full bg-gold-500/20 hover:bg-gold-500/30 border border-gold-400 text-gold-300 text-xs uppercase tracking-widest font-cinzel transition-all"
            >
              Return to Gallery
            </button>
          </div>
        )}

        {/* Footer & Checkout */}
        {!isOrdered && cartItems.length > 0 && (
          <div className="border-t border-gold-500/20 pt-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-champagne-400">
                <span>Estimated Subtotal</span>
                <span className="font-mono text-champagne-200">${subtotal} USD</span>
              </div>
              <div className="flex justify-between text-xs text-champagne-400">
                <span>Insured Express Courier</span>
                <span className="text-gold-400 font-mono">Complimentary</span>
              </div>
              <div className="flex justify-between text-base font-cinzel font-bold text-champagne-100 border-t border-gold-500/15 pt-2">
                <span>Total Due</span>
                <span className="text-gold-300 font-mono">${subtotal} USD</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="btn-shimmer w-full py-4 rounded-full bg-gradient-to-r from-gold-500 via-flame-500 to-gold-600 text-noir-950 font-bold uppercase tracking-[0.2em] text-xs shadow-xl shadow-flame-500/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Complete Private Allocation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-champagne-400/80 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>256-Bit Encrypted Alchemical Vault Checkout</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
