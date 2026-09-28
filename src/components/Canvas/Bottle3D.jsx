import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

export function Bottle3D({ progress = 0, rotation = { x: 0, y: 0 }, customEngraving = "ÉTHER" }) {
  const groupRef = useRef();
  const ringRef = useRef();

  // Opacity & visibility smoothly ramps from 0 at progress 0.70 to 1 at progress 0.88+
  const revealFactor = THREE.MathUtils.smoothstep(progress, 0.70, 0.88);

  // Materials
  const materials = useMemo(() => {
    // Luxury French crystal glass
    const glass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffffff'),
      transmission: 0.96,
      opacity: 1,
      transparent: true,
      roughness: 0.04,
      ior: 1.54,
      thickness: 1.4,
      attenuationColor: new THREE.Color('#ff8a24'),
      attenuationDistance: 2.2,
      specularIntensity: 1.0,
      specularColor: new THREE.Color('#ffffff'),
      envMapIntensity: 1.5,
    });

    // Amber fragrance liquid inside
    const liquid = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ff5d00'),
      transmission: 0.82,
      opacity: 0.9,
      transparent: true,
      roughness: 0.08,
      ior: 1.38,
      thickness: 0.8,
      attenuationColor: new THREE.Color('#d44200'),
      attenuationDistance: 1.5,
      emissive: new THREE.Color('#401200'),
      emissiveIntensity: 0.25,
    });

    // 24K Molten Gold inlays and collar
    const gold = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffd066'),
      metalness: 0.96,
      roughness: 0.16,
      envMapIntensity: 2.0,
      emissive: new THREE.Color('#553508'),
      emissiveIntensity: 0.15,
    });

    // Obsidian black faceted cap
    const obsidian = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0b0b10'),
      metalness: 0.4,
      roughness: 0.12,
      envMapIntensity: 1.2,
    });

    // Glowing base ring
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ffb03a'),
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });

    return { glass, liquid, gold, obsidian, ringMat };
  }, []);

  // Custom canvas texture for 24K Gold front label plaque
  const labelTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Dark obsidian glass plate background
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, 512, 512);

    // Gold decorative border
    ctx.strokeStyle = '#dfa248';
    ctx.lineWidth = 6;
    ctx.strokeRect(24, 24, 464, 464);

    ctx.strokeStyle = '#8e5e18';
    ctx.lineWidth = 2;
    ctx.strokeRect(36, 36, 440, 440);

    // Text: Brand & Product
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Cinzel", serif';
    ctx.textAlign = 'center';
    ctx.fillText('É T H E R', 256, 150);

    ctx.fillStyle = '#dfa248';
    ctx.font = '28px "Cinzel", serif';
    ctx.fillText('PHOENIX NOIR', 256, 210);

    ctx.fillStyle = '#a69d8d';
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('EXTRAIT DE PARFUM', 256, 270);

    // Custom engraving
    ctx.fillStyle = '#ffe29a';
    ctx.font = 'italic 24px "Playfair Display", serif';
    ctx.fillText(`“ ${customEngraving || "ÉTHER"} ”`, 256, 360);

    ctx.fillStyle = '#7a7060';
    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('PARIS • 100 ML - 3.4 FL.OZ', 256, 420);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [customEngraving]);

  const plaqueMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: labelTexture,
      metalness: 0.3,
      roughness: 0.2,
      transparent: true,
      opacity: 1,
    });
  }, [labelTexture]);

  if (revealFactor <= 0.001) return null;

  return (
    <group
      ref={groupRef}
      rotation={[rotation.x, rotation.y, 0]}
      scale={[revealFactor, revealFactor, revealFactor]}
    >
      {/* 1. Heavy Base Pedestal */}
      <mesh position={[0, -1.8, 0]} material={materials.glass}>
        <boxGeometry args={[2.3, 0.4, 1.35]} />
      </mesh>

      {/* 2. Main Crystal Flacon Body */}
      <mesh position={[0, -0.45, 0]} material={materials.glass}>
        <boxGeometry args={[2.25, 2.3, 1.3]} />
      </mesh>

      {/* 3. Inner Amber Perfume Liquid Chamber */}
      <mesh position={[0, -0.5, 0]} material={materials.liquid}>
        <boxGeometry args={[1.85, 1.9, 0.9]} />
      </mesh>

      {/* 4. Front Inlaid Gold Plaque */}
      <mesh position={[0, -0.45, 0.655]} material={plaqueMaterial}>
        <planeGeometry args={[1.5, 1.5]} />
      </mesh>

      {/* 5. 24K Gold Inlaid Shoulder Trim */}
      <mesh position={[0, 0.8, 0]} material={materials.gold}>
        <boxGeometry args={[2.26, 0.2, 1.31]} />
      </mesh>

      {/* 6. Gold Tapered Shoulders */}
      <mesh position={[0, 1.0, 0]} material={materials.gold}>
        <cylinderGeometry args={[0.45, 0.9, 0.25, 32]} />
      </mesh>

      {/* 7. Gold Atomizer Collar & Sprayer */}
      <mesh position={[0, 1.25, 0]} material={materials.gold}>
        <cylinderGeometry args={[0.32, 0.32, 0.3, 32]} />
      </mesh>

      {/* 8. Magnetic Faceted Obsidian Crown Cap */}
      <group position={[0, 1.85, 0]}>
        <mesh material={materials.obsidian}>
          <cylinderGeometry args={[0.55, 0.6, 0.95, 8]} />
        </mesh>
        {/* Gold Cap Accent Rings */}
        <mesh position={[0, -0.4, 0]} material={materials.gold}>
          <cylinderGeometry args={[0.61, 0.61, 0.08, 32]} />
        </mesh>
        <mesh position={[0, 0.45, 0]} material={materials.gold}>
          <cylinderGeometry args={[0.42, 0.42, 0.08, 32]} />
        </mesh>
      </group>

      {/* 9. Soft Glowing Ring Underneath the Bottle */}
      <mesh
        ref={ringRef}
        position={[0, -2.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.ringMat}
      >
        <ringGeometry args={[1.5, 2.8, 64]} />
      </mesh>
    </group>
  );
}
