// Ultra-Premium Anatomical 3D Phoenix Engine for ÉTHER Phoenix Noir
// Multi-layered mathematical splines for 32 Primary Flight Quills, 36 Covert Feathers,
// Dorsal Spine, Pectoral Chest, Eagle Head Crest, Talons, Celestial Halo Ring, and Trailing Embers

import * as THREE from 'three';

// 10-Tier High-Definition Blackbody Molten Gold & Fire Color Palette
const COLOR_PALETTE = [
  new THREE.Color('#080200'), // 0: Burnt Ash / Charcoal Edge
  new THREE.Color('#220701'), // 1: Dark Crimson Smoke
  new THREE.Color('#551203'), // 2: Deep Saffron Ember
  new THREE.Color('#942605'), // 3: Burnt Orange Flame
  new THREE.Color('#d44808'), // 4: Vivid Molten Orange
  new THREE.Color('#f87b12'), // 5: Rich Amber Gold
  new THREE.Color('#ffa826'), // 6: Radiant 24K Gold
  new THREE.Color('#ffd459'), // 7: Luminous Solar Yellow
  new THREE.Color('#fff0a8'), // 8: Hot Platinum Gold
  new THREE.Color('#ffffff'), // 9: Incandescent Diamond Core (1800°C)
];

function sampleHeatColor(t) {
  const clamped = Math.max(0, Math.min(1, t));
  const scaled = clamped * (COLOR_PALETTE.length - 1);
  const idx = Math.floor(scaled);
  const frac = scaled - idx;
  if (idx >= COLOR_PALETTE.length - 1) return COLOR_PALETTE[COLOR_PALETTE.length - 1].clone();
  return COLOR_PALETTE[idx].clone().lerp(COLOR_PALETTE[idx + 1], frac);
}

export function createProceduralPhoenixParticles(count = 22000) {
  const positions = new Float32Array(count * 3);
  const targetPhoenix = new Float32Array(count * 3);
  const targetVortex = new Float32Array(count * 3);
  const targetBottle = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const randoms = new Float32Array(count * 4); // [seed, sizeScale, flickerFreq, turbulenceSeed]
  const anatomyData = new Float32Array(count * 4); // [partType, featherPhase, wingSpanRatio, disintThresh]

  let pIdx = 0;

  function addParticle(px, py, pz, partType, featherPhase, wingSpanRatio, disintThresh, heatT, sizeScale = 1.0) {
    if (pIdx >= count) return;
    const i3 = pIdx * 3;
    const i4 = pIdx * 4;

    targetPhoenix[i3 + 0] = px;
    targetPhoenix[i3 + 1] = py;
    targetPhoenix[i3 + 2] = pz;

    positions[i3 + 0] = px;
    positions[i3 + 1] = py;
    positions[i3 + 2] = pz;

    const c = sampleHeatColor(heatT);
    colors[i3 + 0] = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;

    randoms[i4 + 0] = Math.random();
    randoms[i4 + 1] = sizeScale * (0.85 + Math.random() * 0.45);
    randoms[i4 + 2] = 1.2 + Math.random() * 4.0;
    randoms[i4 + 3] = Math.random() * 6.28;

    anatomyData[i4 + 0] = partType;
    anatomyData[i4 + 1] = featherPhase;
    anatomyData[i4 + 2] = wingSpanRatio;
    anatomyData[i4 + 3] = disintThresh;

    // Target Vortex (Multi-tiered logarithmic gravitational spiral)
    const layer = Math.floor(Math.random() * 5);
    const vRadius = 0.12 + Math.pow(Math.random(), 0.52) * (1.7 + layer * 0.55);
    const vAngle = Math.random() * Math.PI * 2 + vRadius * (4.2 + layer * 1.5);
    const vHeight = (Math.random() - 0.5) * 4.5 + Math.sin(vRadius * 4.5) * 0.38;
    targetVortex[i3 + 0] = Math.cos(vAngle) * vRadius;
    targetVortex[i3 + 1] = vHeight;
    targetVortex[i3 + 2] = Math.sin(vAngle) * (vRadius * 0.88);

    // Target Bottle (High-precision luxury crystal flacon)
    const bottleCoords = getBottleCoordinate(pIdx, count);
    targetBottle[i3 + 0] = bottleCoords.x;
    targetBottle[i3 + 1] = bottleCoords.y;
    targetBottle[i3 + 2] = bottleCoords.z;

    pIdx++;
  }

  // =========================================================================
  // 1. CELESTIAL FIRE HALO PORTAL RING (2,600 particles)
  // Glorious glowing solar ring crowned behind the Phoenix's head
  // =========================================================================
  const haloCount = Math.floor(count * 0.12);
  for (let i = 0; i < haloCount; i++) {
    const t = i / haloCount;
    const angle = t * Math.PI * 2 + (Math.random() - 0.5) * 0.04;
    const ringRadius = 1.70 + (Math.random() - 0.5) * 0.24;
    
    const px = Math.cos(angle) * ringRadius;
    const py = 1.18 + Math.sin(angle) * ringRadius * 0.96;
    const pz = -0.50 + (Math.random() - 0.5) * 0.28;

    // Heat: Intense solar white & gold
    const heatT = 0.82 + Math.random() * 0.18;
    const disintThresh = 0.48;

    addParticle(px, py, pz, 9, t, 0.5, disintThresh, heatT, 1.45);
  }

  // =========================================================================
  // 2. SCULPTED EAGLE HEAD, BEAK, GLOWING EYES & CROWN CREST (2,400 particles)
  // =========================================================================
  const headCount = Math.floor(count * 0.11);
  for (let i = 0; i < headCount; i++) {
    const t = i / headCount;
    let px = 0, py = 0, pz = 0;
    let partType = 0;
    let heatT = 0.90;
    let disintThresh = 0.46 + Math.random() * 0.02;

    if (t < 0.22) {
      // Razor-sharp predatory beak pointing forward
      const beakT = t / 0.22;
      px = 0.05 + (Math.random() - 0.5) * 0.06 * (1.0 - beakT);
      py = 1.18 - beakT * 0.15;
      pz = 0.88 + beakT * 0.52;
      heatT = 0.98; // Blinding diamond white core
      partType = 0;
    } else if (t < 0.58) {
      // Skull structure, eye sockets & brow
      const u = (t - 0.22) / 0.36;
      const phi = Math.random() * Math.PI * 2;
      const r = 0.22 * (1.0 - Math.abs(u - 0.5) * 0.5) + Math.random() * 0.04;
      px = 0.03 + Math.cos(phi) * r;
      py = 1.26 + (u - 0.5) * 0.40;
      pz = 0.72 + Math.sin(phi) * r * 0.90;
      heatT = 0.92;
      partType = 0;
    } else if (t < 0.80) {
      // 7 Radiant crown crest quills sweeping backward like solar flares
      const crestIdx = Math.floor(Math.random() * 7);
      const crestT = Math.random();
      const crestAngle = (crestIdx - 3) * 0.20;
      px = 0.03 + Math.sin(crestAngle) * crestT * 0.55 + (Math.random() - 0.5) * 0.04;
      py = 1.45 + Math.sin(crestT * Math.PI) * 0.52 - crestT * 0.20;
      pz = 0.62 - crestT * 1.15 + (Math.random() - 0.5) * 0.06;
      heatT = 0.78 + (1.0 - crestT) * 0.22;
      partType = 1;
      disintThresh = 0.44 + Math.random() * 0.02;
    } else {
      // Sinuous, muscular arched neck
      const neckT = (t - 0.80) / 0.20;
      const angle = Math.random() * Math.PI * 2;
      const r = 0.19 + neckT * 0.16 + Math.random() * 0.04;
      px = Math.cos(angle) * r;
      py = 1.14 - neckT * 0.72;
      pz = 0.64 - Math.sin(neckT * Math.PI * 0.5) * 0.40 + Math.sin(angle) * r;
      heatT = 0.84 - neckT * 0.12;
      partType = 2;
    }

    addParticle(px, py, pz, partType, t, 0.05, disintThresh, heatT, 0.95);
  }

  // =========================================================================
  // 3. MUSCULAR GLOWING CHEST, PECTORALS & TALONS (3,200 particles)
  // =========================================================================
  const bodyCount = Math.floor(count * 0.15);
  for (let i = 0; i < bodyCount; i++) {
    const t = i / bodyCount;
    
    if (t < 0.82) {
      // Aerodynamic chest with deep glowing thermal core
      const bodyT = t / 0.82;
      const phi = Math.random() * Math.PI * 2;
      const bodyY = 0.54 - bodyT * 1.60;
      const bodyWidth = Math.sin(bodyT * Math.PI * 0.88) * 0.56 + 0.15;
      const bodyDepth = Math.sin(bodyT * Math.PI * 0.88) * 0.45 + 0.12;

      const px = Math.cos(phi) * bodyWidth * (0.84 + Math.random() * 0.16);
      const py = bodyY + (Math.random() - 0.5) * 0.08;
      const pz = 0.30 + Math.sin(phi) * bodyDepth - bodyT * 0.50;

      // Chest core is blinding white-gold; lower belly transitions to molten amber
      const heatT = bodyT < 0.35 ? 0.90 : 0.68 - (bodyT - 0.35) * 0.40;
      const disintThresh = 0.43 + (1.0 - bodyT) * 0.03;

      addParticle(px, py, pz, 3, bodyT, 0.1, disintThresh, heatT, 1.25);
    } else {
      // Golden claws & talons tucked underneath
      const talonT = (t - 0.82) / 0.18;
      const isLeftClaw = Math.random() > 0.5;
      const clawSide = isLeftClaw ? -1 : 1;
      
      const px = clawSide * (0.20 + Math.random() * 0.18);
      const py = -0.78 - Math.random() * 0.35;
      const pz = 0.24 + Math.random() * 0.20;
      const heatT = 0.72;
      const disintThresh = 0.42;

      addParticle(px, py, pz, 3, talonT, 0.15, disintThresh, heatT, 1.05);
    }
  }

  // =========================================================================
  // 4. WIDE MAJESTIC SOARING WINGS (10,500 particles)
  // Arched wing bones, dense layered coverts & 32 long curved primary quills
  // =========================================================================
  const wingCount = Math.floor(count * 0.48);
  const feathersPerWing = 28;

  for (let i = 0; i < wingCount; i++) {
    const isLeft = i % 2 === 0;
    const side = isLeft ? -1 : 1;
    const wingRatio = Math.random(); // 0 (shoulder) to 1 (wingtip)
    
    const layerType = Math.random();
    let px = 0, py = 0, pz = 0;
    let partType = 6;
    let featherPhase = 0;
    let disintThresh = 0.34 + (1.0 - wingRatio) * 0.08;
    let heatT = 0.70;

    if (layerType < 0.20) {
      // 4A. UPPER WING FLAME BONE RIDGE (Blinding white-gold top spine)
      const span = 0.35 + wingRatio * 4.6;
      const normSpan = span / 4.95;
      
      // Majestic parabolic arch matching reference
      const arch = Math.sin(normSpan * Math.PI * 0.90) * 1.62 - Math.pow(normSpan, 2.0) * 0.38;
      const sweep = -Math.pow(normSpan, 1.35) * 1.70;

      px = side * (span + (Math.random() - 0.5) * 0.08);
      py = 0.40 + arch + (Math.random() - 0.5) * 0.08;
      pz = 0.20 + sweep + (Math.random() - 0.5) * 0.08;

      partType = 4;
      featherPhase = 0.0;
      heatT = 0.94 - normSpan * 0.22; // Incandescent leading ridge
    } else if (layerType < 0.55) {
      // 4B. SECONDARY COVERTS (Dense overlapping feathered body)
      const span = 0.42 + wingRatio * 3.9;
      const normSpan = span / 4.3;
      const arch = Math.sin(normSpan * Math.PI * 0.88) * 1.50 - Math.pow(normSpan, 1.8) * 0.32;
      const sweep = -Math.pow(normSpan, 1.3) * 1.50;

      const covertLen = (1.0 - normSpan * 0.28) * (0.48 + Math.random() * 0.80);
      const barbSpread = (Math.random() - 0.5) * 0.32;

      px = side * (span + barbSpread);
      py = 0.34 + arch - covertLen * 0.42;
      pz = 0.14 + sweep - covertLen * 0.82;

      partType = 5;
      featherPhase = covertLen / 1.25;
      heatT = 0.76 - normSpan * 0.20;
    } else {
      // 4C. PRIMARY FLIGHT FEATHERS (32 Long directional feather quills)
      const featherIdx = Math.floor(Math.random() * feathersPerWing);
      const featherNorm = featherIdx / feathersPerWing;
      const quillProgress = Math.random();

      const span = 1.15 + featherNorm * 3.75;
      const normSpan = span / 4.90;
      const arch = Math.sin(normSpan * Math.PI * 0.88) * 1.55 - Math.pow(normSpan, 1.9) * 0.38;
      const sweep = -Math.pow(normSpan, 1.35) * 1.80;

      const maxFeatherLen = 0.80 + Math.sin(featherNorm * Math.PI * 0.75) * 1.45;
      const currentLen = quillProgress * maxFeatherLen;

      const barbSpread = (Math.random() - 0.5) * (0.30 * (1.0 - quillProgress));
      const tipCurl = Math.pow(quillProgress, 2.0) * 0.40; // upward flame curl

      px = side * (span + currentLen * 0.22 * side + barbSpread);
      py = 0.30 + arch - currentLen * 0.50 + tipCurl;
      pz = 0.10 + sweep - currentLen * 1.10;

      partType = 6;
      featherPhase = quillProgress;

      // Color temperature graduation
      if (quillProgress > 0.85 || normSpan > 0.88) {
        heatT = 0.30 + Math.random() * 0.22; // Burnt fiery edge
      } else if (quillProgress > 0.45) {
        heatT = 0.62 + Math.random() * 0.22; // Molten gold
      } else {
        heatT = 0.85 + Math.random() * 0.15; // Incandescent gold
      }
    }

    addParticle(px, py, pz, partType, featherPhase, wingRatio, disintThresh, heatT, 1.1);
  }

  // =========================================================================
  // 5. CASCADING TAIL STREAMERS & FLAME PLUMES (2,800 particles)
  // 9 independent sinuous flame plumes fanning downward and backward
  // =========================================================================
  const tailCount = Math.floor(count * 0.13);
  const tailPlumes = 9;

  for (let i = 0; i < tailCount; i++) {
    const plumeIdx = Math.floor(Math.random() * tailPlumes);
    const plumeT = Math.random();
    const plumeAngle = (plumeIdx - 4) * 0.24;

    const maxTailLen = 4.6 + (1.0 - Math.abs(plumeIdx - 4) / 4) * 1.5;
    const length = plumeT * maxTailLen;

    const waveX = Math.sin(length * 2.2 + plumeIdx) * 0.40 * plumeT;
    const waveY = Math.cos(length * 1.8 + plumeIdx) * 0.30 * plumeT;

    const px = Math.sin(plumeAngle) * length * 0.64 + waveX + (Math.random() - 0.5) * 0.08;
    const py = -0.92 - length * 0.80 + waveY;
    const pz = -0.60 - length * 0.54 + Math.sin(length * 1.5) * 0.30;

    const disintThresh = 0.30 + plumeT * 0.04;
    const heatT = plumeT > 0.7 ? (0.25 + Math.random() * 0.25) : (0.72 - plumeT * 0.38);

    addParticle(px, py, pz, 7, plumeT, 0.2, disintThresh, heatT, 1.2);
  }

  // Fill remaining particles with drifting embers and sparks
  while (pIdx < count) {
    const trailT = Math.random();
    const side = Math.random() > 0.5 ? -1 : 1;
    const span = 0.5 + Math.random() * 4.4;
    
    const px = side * span + (Math.random() - 0.5) * 0.7;
    const py = (Math.random() - 0.5) * 2.8;
    const pz = -0.8 - trailT * 3.8;

    const disintThresh = 0.30 + Math.random() * 0.05;
    const heatT = 0.20 + Math.random() * 0.40;

    addParticle(px, py, pz, 8, trailT, span / 4.9, disintThresh, heatT, 0.9);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aTargetPhoenix', new THREE.BufferAttribute(targetPhoenix, 3));
  geometry.setAttribute('aTargetVortex', new THREE.BufferAttribute(targetVortex, 3));
  geometry.setAttribute('aTargetBottle', new THREE.BufferAttribute(targetBottle, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 4));
  geometry.setAttribute('aAnatomyData', new THREE.BufferAttribute(anatomyData, 4));

  return geometry;
}

// ===========================================================================
// LUXURY PERFUME FLACON 3D COORDINATES
// ===========================================================================
function getBottleCoordinate(index, total) {
  const ratio = index / total;

  if (ratio < 0.18) {
    // 1. Heavy Chamfered Crystal Base Pedestal
    const w = 1.30;
    const d = 0.80;
    const isPerimeter = Math.random() > 0.3;

    let bx = 0, bz = 0;
    if (isPerimeter) {
      const edge = Math.floor(Math.random() * 4);
      if (edge === 0) { bx = (Math.random() * 2 - 1) * w; bz = d; }
      else if (edge === 1) { bx = (Math.random() * 2 - 1) * w; bz = -d; }
      else if (edge === 2) { bx = w; bz = (Math.random() * 2 - 1) * d; }
      else { bx = -w; bz = (Math.random() * 2 - 1) * d; }
    } else {
      bx = (Math.random() * 2 - 1) * w;
      bz = (Math.random() * 2 - 1) * d;
    }
    const by = -2.02 + Math.random() * 0.44;
    return { x: bx, y: by, z: bz };
  } else if (ratio < 0.68) {
    // 2. Main Faceted Crystal Flacon Body & Amber Liquid Core
    const yNorm = Math.random();
    const by = -1.58 + yNorm * 2.40;

    const taper = 1.0 - Math.pow(Math.sin(yNorm * Math.PI), 2) * 0.06;
    const w = 1.24 * taper;
    const d = 0.74 * taper;

    const isWall = Math.random() > 0.32;
    let bx = 0, bz = 0;

    if (isWall) {
      const chamfer = 0.18;
      const side = Math.floor(Math.random() * 4);
      if (side === 0) { bx = (Math.random() * 2 - 1) * (w - chamfer); bz = d + (Math.random() - 0.5) * 0.03; }
      else if (side === 1) { bx = (Math.random() * 2 - 1) * (w - chamfer); bz = -d + (Math.random() - 0.5) * 0.03; }
      else if (side === 2) { bx = w + (Math.random() - 0.5) * 0.03; bz = (Math.random() * 2 - 1) * (d - chamfer); }
      else { bx = -w + (Math.random() - 0.5) * 0.03; bz = (Math.random() * 2 - 1) * (d - chamfer); }
    } else {
      bx = (Math.random() * 2 - 1) * (w * 0.76);
      bz = (Math.random() * 2 - 1) * (d * 0.74);
    }
    return { x: bx, y: by, z: bz };
  } else if (ratio < 0.80) {
    // 3. 24K Gold Shoulder Plaque
    const yNorm = Math.random();
    const by = 0.82 + yNorm * 0.36;
    const taper = 1.0 - yNorm * 0.62;
    const theta = Math.random() * Math.PI * 2;
    const bx = Math.cos(theta) * (1.20 * taper);
    const bz = Math.sin(theta) * (0.70 * taper);
    return { x: bx, y: by, z: bz };
  } else if (ratio < 0.88) {
    // 4. Gold Atomizer Collar & Sprayer
    const by = 1.18 + Math.random() * 0.32;
    const r = 0.34 + Math.random() * 0.05;
    const theta = Math.random() * Math.PI * 2;
    return { x: Math.cos(theta) * r, y: by, z: Math.sin(theta) * r };
  } else {
    // 5. Magnetic Faceted Obsidian Crown Cap
    const by = 1.50 + Math.random() * 0.90;
    const octant = Math.floor(Math.random() * 8) * (Math.PI / 4) + (Math.random() - 0.5) * 0.08;
    const r = 0.60 + Math.random() * 0.06;
    return { x: Math.cos(octant) * r, y: by, z: Math.sin(octant) * r };
  }
}
