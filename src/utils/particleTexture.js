// High-Definition Procedural HDR Fire Flare Particle Texture Generator
import * as THREE from 'three';

export function createEmberParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  const cx = 64;
  const cy = 64;

  // Clear
  ctx.clearRect(0, 0, 128, 128);

  // 1. Soft Outer Atmospheric Aura
  const auraGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 64);
  auraGradient.addColorStop(0, 'rgba(255, 180, 60, 0.45)');
  auraGradient.addColorStop(0.3, 'rgba(255, 100, 20, 0.25)');
  auraGradient.addColorStop(0.6, 'rgba(180, 40, 0, 0.08)');
  auraGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = auraGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, 64, 0, Math.PI * 2);
  ctx.fill();

  // 2. Anamorphic Horizontal & Vertical Star Spikes
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 240, 180, 0.6)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - 38, cy);
  ctx.lineTo(cx + 38, cy);
  ctx.moveTo(cx, cy - 38);
  ctx.lineTo(cx, cy + 38);
  ctx.stroke();

  // Diagonal micro-spikes
  ctx.strokeStyle = 'rgba(255, 200, 100, 0.35)';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(cx - 20, cy - 20);
  ctx.lineTo(cx + 20, cy + 20);
  ctx.moveTo(cx - 20, cy + 20);
  ctx.lineTo(cx + 20, cy - 20);
  ctx.stroke();
  ctx.restore();

  // 3. Intense Blazing Incandescent Core
  const coreGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
  coreGradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  coreGradient.addColorStop(0.2, 'rgba(255, 245, 200, 0.95)');
  coreGradient.addColorStop(0.5, 'rgba(255, 170, 50, 0.7)');
  coreGradient.addColorStop(1, 'rgba(255, 80, 0, 0)');
  ctx.fillStyle = coreGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, 18, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
