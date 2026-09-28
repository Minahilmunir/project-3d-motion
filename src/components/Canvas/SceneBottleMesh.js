// High-Artistry 3D Glass & Gold Perfume Bottle Mesh builder for Three.js Scene
import * as THREE from 'three';

export function createSceneBottle(customEngraving = "ÉTHER") {
  const group = new THREE.Group();

  // 1. Ultra-Luxury French Crystal Glass Material
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ffffff'),
    transmission: 0.96,
    opacity: 1.0,
    transparent: true,
    roughness: 0.035,
    ior: 1.54,
    thickness: 1.35,
    attenuationColor: new THREE.Color('#ff8426'),
    attenuationDistance: 2.4,
    specularIntensity: 1.0,
    specularColor: new THREE.Color('#ffffff'),
    envMapIntensity: 1.8,
  });

  // 2. Extrait 32% Amber Fragrance Liquid Core
  const liquidMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ff5400'),
    transmission: 0.84,
    opacity: 0.94,
    transparent: true,
    roughness: 0.06,
    ior: 1.38,
    attenuationColor: new THREE.Color('#b82800'),
    attenuationDistance: 1.3,
    emissive: new THREE.Color('#3d1100'),
    emissiveIntensity: 0.35,
  });

  // 3. 24K Molten Champagne Gold Material
  const goldMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffd066'),
    metalness: 0.96,
    roughness: 0.15,
    emissive: new THREE.Color('#4a2e05'),
    emissiveIntensity: 0.14,
  });

  // 4. Volcanic Obsidian Cap Material
  const obsidianMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#08080d'),
    metalness: 0.45,
    roughness: 0.10,
    envMapIntensity: 1.4,
  });

  // 5. Heavy Crystal Base Pedestal
  const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(2.38, 0.46, 1.42), glassMat);
  baseMesh.position.y = -1.76;
  group.add(baseMesh);

  // 6. Main Faceted Crystal Flacon Body
  const bodyMesh = new THREE.Mesh(new THREE.BoxGeometry(2.32, 2.38, 1.38), glassMat);
  bodyMesh.position.y = -0.36;
  group.add(bodyMesh);

  // 7. Suspended Amber Fragrance Core
  const liquidMesh = new THREE.Mesh(new THREE.BoxGeometry(1.92, 1.96, 0.96), liquidMat);
  liquidMesh.position.y = -0.40;
  group.add(liquidMesh);

  // 8. 24K Gold Shoulder Plaque & Bezel
  const shoulderTrim = new THREE.Mesh(new THREE.BoxGeometry(2.34, 0.22, 1.40), goldMat);
  shoulderTrim.position.y = 0.86;
  group.add(shoulderTrim);

  // 9. Gold Tapered Neck Bevel
  const neckTaper = new THREE.Mesh(new THREE.CylinderGeometry(0.50, 0.98, 0.32, 32), goldMat);
  neckTaper.position.y = 1.10;
  group.add(neckTaper);

  // 10. Gold Atomizer Collar & Sprayer
  const atomizerCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.34, 32), goldMat);
  atomizerCollar.position.y = 1.38;
  group.add(atomizerCollar);

  // 11. Magnetic Faceted Obsidian Crown Cap
  const capGroup = new THREE.Group();
  capGroup.position.y = 1.98;
  const capMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.60, 0.66, 0.98, 8), obsidianMat);
  capGroup.add(capMesh);

  const capGoldRing1 = new THREE.Mesh(new THREE.CylinderGeometry(0.67, 0.67, 0.08, 32), goldMat);
  capGoldRing1.position.y = -0.44;
  capGroup.add(capGoldRing1);

  const capGoldRing2 = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.08, 32), goldMat);
  capGoldRing2.position.y = 0.48;
  capGroup.add(capGoldRing2);

  group.add(capGroup);

  // 12. Soft Glowing Halo Ring Underneath the Flacon
  const ringMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#ffb03a'),
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const ringMesh = new THREE.Mesh(new THREE.RingGeometry(1.6, 3.0, 64), ringMat);
  ringMesh.position.y = -2.08;
  ringMesh.rotation.x = -Math.PI / 2;
  group.add(ringMesh);

  // 13. Front Inlaid Gold Plaque with Custom Engraving
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  function renderLabel(text) {
    ctx.fillStyle = '#060609';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = '#dfa248';
    ctx.lineWidth = 8;
    ctx.strokeRect(18, 18, 476, 476);

    ctx.strokeStyle = '#8e5e18';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, 452, 452);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px serif';
    ctx.textAlign = 'center';
    ctx.fillText('É T H E R', 256, 140);

    ctx.fillStyle = '#dfa248';
    ctx.font = '28px serif';
    ctx.fillText('PHOENIX NOIR', 256, 205);

    ctx.fillStyle = '#b8aa95';
    ctx.font = '16px sans-serif';
    ctx.fillText('EXTRAIT DE PARFUM', 256, 265);

    ctx.fillStyle = '#ffe29a';
    ctx.font = 'italic 26px serif';
    ctx.fillText(`“ ${text || "ÉTHER"} ”`, 256, 355);

    ctx.fillStyle = '#8e8270';
    ctx.font = '14px sans-serif';
    ctx.fillText('PARIS • 100 ML - 3.4 FL.OZ', 256, 420);
  }

  renderLabel(customEngraving);
  const labelTex = new THREE.CanvasTexture(canvas);
  const plaqueMat = new THREE.MeshStandardMaterial({
    map: labelTex,
    metalness: 0.28,
    roughness: 0.14,
  });
  const plaqueMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.52, 1.52), plaqueMat);
  plaqueMesh.position.set(0, -0.36, 0.70);
  group.add(plaqueMesh);

  group.scale.set(0.001, 0.001, 0.001);
  group.visible = false;

  return {
    group,
    updateEngraving: (newText) => {
      renderLabel(newText);
      labelTex.needsUpdate = true;
    }
  };
}
