import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createProceduralPhoenixParticles } from '../../utils/particleGeometry';
import { createEmberParticleTexture } from '../../utils/particleTexture';
import { particleVertexShader, particleFragmentShader } from '../../shaders/particleShaders';
import { createSceneBottle } from './SceneBottleMesh';

export function MorphScene({
  scrollProgress = 0,
  customEngraving = "ÉTHER",
  noteFlareTrigger = 0,
  onCanvasLoaded
}) {
  const containerRef = useRef(null);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particleMaterialRef = useRef(null);
  const bottleHandleRef = useRef(null);
  const animFrameId = useRef(null);

  // Mouse physics & product inspection state
  const mouseState = useRef({
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    velocity: 0,
    prevX: 0,
    prevY: 0,
    bottleRotTarget: { x: 0, y: 0 },
    bottleRotCurrent: { x: 0, y: 0 },
  });

  const progressRef = useRef(scrollProgress);
  progressRef.current = scrollProgress;

  const noteFlareRef = useRef(0);

  useEffect(() => {
    if (noteFlareTrigger > 0) {
      noteFlareRef.current = 1.0;
    }
  }, [noteFlareTrigger]);

  useEffect(() => {
    if (bottleHandleRef.current) {
      bottleHandleRef.current.updateEngraving(customEngraving);
    }
  }, [customEngraving]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Atmosphere
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x050507, 0.032);

    // 2. Cinematic Perspective Camera (35-50mm equivalent)
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 9.8);
    cameraRef.current = camera;

    // 3. Renderer with ACES Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.0);
    scene.add(ambientLight);

    const warmKeyLight = new THREE.DirectionalLight(0xffb03a, 3.6);
    warmKeyLight.position.set(6, 7, 8);
    scene.add(warmKeyLight);

    const rimLight = new THREE.DirectionalLight(0xff5511, 4.0);
    rimLight.position.set(-6, 4, -4);
    scene.add(rimLight);

    const topWhiteLight = new THREE.PointLight(0xffffff, 2.6, 16);
    topWhiteLight.position.set(0, 5, 3);
    scene.add(topWhiteLight);

    // 5. Procedural Anatomical Phoenix Particle System
    const particleCount = window.innerWidth < 768 ? 9000 : 22000;
    const geometry = createProceduralPhoenixParticles(particleCount);
    const emberTexture = createEmberParticleTexture();

    const uniforms = {
      uPointTexture: { value: emberTexture },
      uTime: { value: 0 },
      uMorphProgress: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseVelocity: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uBottleRotation: { value: new THREE.Vector2(0, 0) },
      uNoteFlare: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    particleMaterialRef.current = material;

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 6. Add Physical 3D Bottle Mesh to Scene
    const bottleHandle = createSceneBottle(customEngraving);
    bottleHandleRef.current = bottleHandle;
    scene.add(bottleHandle.group);

    // 7. Ambient Floating Embers & Sparks
    const dustCount = 550;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i + 0] = (Math.random() - 0.5) * 18;
      dustPos[i + 1] = (Math.random() - 0.5) * 14;
      dustPos[i + 2] = (Math.random() - 0.5) * 12 - 2;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.08,
      map: emberTexture,
      color: new THREE.Color('#ffb03a'),
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustSystem = new THREE.Points(dustGeo, dustMat);
    scene.add(dustSystem);

    if (onCanvasLoaded) onCanvasLoaded();

    // 8. Mouse Physics Event Handler
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouseState.current.target.x = nx;
      mouseState.current.target.y = ny;

      const dx = nx - mouseState.current.prevX;
      const dy = ny - mouseState.current.prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      mouseState.current.velocity = Math.min(speed * 8.0, 3.0);
      mouseState.current.prevX = nx;
      mouseState.current.prevY = ny;

      // Product Inspection: Mouse X controls +-15 deg rotation, Mouse Y controls +-5 deg tilt
      mouseState.current.bottleRotTarget.y = nx * 0.26; // +-15 degrees
      mouseState.current.bottleRotTarget.x = -ny * 0.09; // +-5 degrees
    };

    const handleMouseLeave = () => {
      mouseState.current.target.x = 0;
      mouseState.current.target.y = 0;
      mouseState.current.bottleRotTarget.x = 0;
      mouseState.current.bottleRotTarget.y = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // 9. Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      if (material.uniforms.uPixelRatio) {
        material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
      }
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation & Render Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const p = progressRef.current;

      // Smooth mouse damping
      const ms = mouseState.current;
      ms.current.x += (ms.target.x - ms.current.x) * 0.06;
      ms.current.y += (ms.target.y - ms.current.y) * 0.06;
      ms.velocity += (0 - ms.velocity) * 0.05;

      ms.bottleRotCurrent.x += (ms.bottleRotTarget.x - ms.bottleRotCurrent.x) * 0.05;
      ms.bottleRotCurrent.y += (ms.bottleRotTarget.y - ms.bottleRotCurrent.y) * 0.05;

      // Flare decay
      if (noteFlareRef.current > 0.01) {
        noteFlareRef.current *= 0.94;
      } else {
        noteFlareRef.current = 0;
      }

      // Update shader uniforms
      if (material) {
        material.uniforms.uTime.value = elapsedTime;
        material.uniforms.uMorphProgress.value = p;
        material.uniforms.uMouse.value.set(ms.current.x, ms.current.y);
        material.uniforms.uMouseVelocity.value = ms.velocity;
        material.uniforms.uBottleRotation.value.set(ms.bottleRotCurrent.x, ms.bottleRotCurrent.y);
        material.uniforms.uNoteFlare.value = noteFlareRef.current;
      }

      // Update Physical 3D Bottle Mesh
      if (bottleHandle && bottleHandle.group) {
        if (p > 0.70) {
          bottleHandle.group.visible = true;
          const reveal = THREE.MathUtils.smoothstep(p, 0.70, 0.88);
          bottleHandle.group.scale.set(reveal, reveal, reveal);

          // Apply Left/Right mouse rotation + subtle ambient float
          bottleHandle.group.rotation.y = ms.bottleRotCurrent.y + (p > 0.78 ? Math.sin(elapsedTime * 0.4) * 0.03 : 0);
          bottleHandle.group.rotation.x = ms.bottleRotCurrent.x;
          bottleHandle.group.position.y = Math.sin(elapsedTime * 1.4) * 0.025;
        } else {
          bottleHandle.group.visible = false;
          bottleHandle.group.scale.set(0.001, 0.001, 0.001);
        }
      }

      // Cinematic Camera Progression & 3D Stereoscopic Parallax
      const targetCamZ = THREE.MathUtils.lerp(9.8, 6.8, Math.min(p * 1.25, 1.0));
      const targetCamY = THREE.MathUtils.lerp(0.2, 0.0, p) + ms.current.y * 0.25;
      const targetCamX = ms.current.x * 0.45;

      camera.position.z += (targetCamZ - camera.position.z) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;
      camera.position.x += (targetCamX - camera.position.x) * 0.06;

      camera.lookAt(0, 0.1, 0);

      // Rotate background embers
      dustSystem.rotation.y = elapsedTime * 0.03;
      dustSystem.position.y = Math.sin(elapsedTime * 0.8) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      emberTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ touchAction: 'none' }}
    />
  );
}
