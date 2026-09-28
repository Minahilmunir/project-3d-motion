import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navigation/Navbar';
import { MorphScene } from './components/Canvas/MorphScene';
import { HeroOverlay } from './components/Hero/HeroOverlay';
import { OlfactoryPyramid } from './components/Sections/OlfactoryPyramid';
import { FlaconCraftsmanship } from './components/Sections/FlaconCraftsmanship';
import { EngravingStudio } from './components/Sections/EngravingStudio';
import { AlchemicalRitual } from './components/Sections/AlchemicalRitual';
import { ScentQuizModal } from './components/Sections/ScentQuizModal';
import { CartDrawer } from './components/Cart/CartDrawer';
import { Footer } from './components/Footer/Footer';
import { CustomCursor } from './components/Navigation/CustomCursor';

export function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [customEngraving, setCustomEngraving] = useState('ÉTHER');
  const [cartItems, setCartItems] = useState([
    {
      id: 'phoenix-noir-100ml',
      name: 'PHOENIX NOIR — 100ml Signature Flacon',
      size: '100ml',
      price: 380,
      engraving: 'ÉTHER',
      giftVault: true,
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [noteFlareTrigger, setNoteFlareTrigger] = useState(0);

  const heroContainerRef = useRef(null);

  // Scroll listener for hero timeline
  useEffect(() => {
    const handleScroll = () => {
      const hero = heroContainerRef.current;
      if (!hero) return;

      const heroRect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight - window.innerHeight;

      if (heroHeight > 0) {
        // Calculate progress 0 to 1 inside the pinned hero area
        const currentScroll = -heroRect.top;
        const progress = Math.max(0, Math.min(1, currentScroll / heroHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Jump to specific phase in hero scroll timeline
  const handleSetPhase = (targetProgress) => {
    const hero = heroContainerRef.current;
    if (!hero) return;
    const heroHeight = hero.offsetHeight - window.innerHeight;
    const targetScrollY = hero.offsetTop + targetProgress * heroHeight;
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  const handleAddToCart = (newItem) => {
    if (newItem) {
      setCartItems((prev) => [...prev, newItem]);
    } else {
      // Default signature bottle from hero CTA
      setCartItems((prev) => [
        ...prev,
        {
          id: `phoenix-noir-hero-${Date.now()}`,
          name: 'PHOENIX NOIR — 100ml Signature Flacon',
          size: '100ml',
          price: 380,
          engraving: customEngraving,
          giftVault: true,
          quantity: 1
        }
      ]);
    }
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (idx) => {
    setCartItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleTriggerNoteFlare = () => {
    setNoteFlareTrigger((prev) => prev + 1);
  };

  const scrollToNotes = () => {
    const el = document.getElementById('notes-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-noir-950 text-champagne-100 selection:bg-gold-500 selection:text-noir-950">
      
      {/* Luxury Flame Cursor */}
      <CustomCursor />

      {/* Navigation Bar */}
      <Navbar
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* ========================================================
          PINNED HERO TRANSFORMATION TIMELINE (350vh SCROLL AREA)
          ======================================================== */}
      <div ref={heroContainerRef} className="relative h-[350vh] w-full">
        
        {/* Sticky WebGL Canvas & HUD Overlay */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          
          {/* Background Gradient & Subtle Vignette */}
          <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-10 opacity-70" />
          
          {/* Core WebGL 3D Particle Morphing Canvas */}
          <MorphScene
            scrollProgress={scrollProgress}
            customEngraving={customEngraving}
            noteFlareTrigger={noteFlareTrigger}
          />

          {/* Dynamic Storytelling HUD Overlay */}
          <HeroOverlay
            scrollProgress={scrollProgress}
            onSetPhase={handleSetPhase}
            onAddToCart={() => handleAddToCart()}
            onExploreNotes={scrollToNotes}
          />
        </div>
      </div>

      {/* ========================================================
          EXTENDED LUXURY PRODUCT & BRAND SECTIONS
          ======================================================== */}
      <main className="relative z-30 bg-noir-950">
        {/* Scent Pyramid Section */}
        <OlfactoryPyramid onTriggerNoteFlare={handleTriggerNoteFlare} />

        {/* Flacon Craftsmanship Section */}
        <FlaconCraftsmanship />

        {/* Bespoke Engraving Atelier Studio */}
        <EngravingStudio
          customEngraving={customEngraving}
          onUpdateEngraving={setCustomEngraving}
          onAddToCart={handleAddToCart}
        />

        {/* Alchemical Application Ritual */}
        <AlchemicalRitual />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Scent Signature Quiz Modal */}
      <ScentQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectResult={() => {
          handleAddToCart();
          setIsCartOpen(true);
        }}
      />

      {/* Sliding Luxury Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

export default App;
