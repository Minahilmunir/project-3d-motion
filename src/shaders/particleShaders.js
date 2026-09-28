// GLSL Custom Shaders for ÉTHER Phoenix Noir
// Anatomical Wing Kinematics, Anamorphic Starburst Core, Celestial Halo Ring & Bottle Morph

export const particleVertexShader = `
  uniform float uTime;
  uniform float uMorphProgress;
  uniform vec2 uMouse;
  uniform float uMouseVelocity;
  uniform float uPixelRatio;
  uniform vec2 uBottleRotation;
  uniform float uNoteFlare;

  attribute vec3 aTargetPhoenix;
  attribute vec3 aTargetVortex;
  attribute vec3 aTargetBottle;
  attribute vec3 aColor;
  attribute vec4 aRandom;      // [seed, sizeScale, flickerFreq, turbulenceSeed]
  attribute vec4 aAnatomyData; // [partType, featherPhase, wingSpanRatio, disintThresh]

  varying vec3 vColor;
  varying float vAlpha;
  varying float vMorphProgress;
  varying float vPartType;
  varying float vHeatIntensity;

  // 3D Rotation Matrices
  mat3 rotateY(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
      c, 0.0, -s,
      0.0, 1.0, 0.0,
      s, 0.0, c
    );
  }

  mat3 rotateX(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
      1.0, 0.0, 0.0,
      0.0, c, s,
      0.0, -s, c
    );
  }

  void main() {
    vColor = aColor;
    vMorphProgress = uMorphProgress;
    vPartType = aAnatomyData.x;
    vHeatIntensity = aColor.r * 0.5 + aColor.g * 0.35 + aColor.b * 0.15;

    float partType = aAnatomyData.x;
    float featherPhase = aAnatomyData.y;
    float wingSpanRatio = aAnatomyData.z;
    float disintThresh = aAnatomyData.w;

    // =======================================================================
    // 1. HIERARCHICAL PHOENIX ANATOMICAL FLIGHT KINEMATICS
    // =======================================================================
    vec3 phoenixPos = aTargetPhoenix;
    float wingSide = sign(phoenixPos.x);

    // Micro-turbulence: Liquid dancing fire along the feathers
    float fireJitter = sin(uTime * 4.8 + phoenixPos.x * 5.2 + aRandom.w) * 0.038;
    phoenixPos.y += fireJitter;
    phoenixPos.z += cos(uTime * 3.9 + phoenixPos.y * 4.2) * 0.028;

    if (partType == 9.0) {
      // Celestial Fire Halo Ring: Orbital rotation & burning solar corona
      float haloRot = uTime * 0.90;
      phoenixPos.xy = mat2(cos(haloRot), -sin(haloRot), sin(haloRot), cos(haloRot)) * (phoenixPos.xy - vec2(0.0, 1.18)) + vec2(0.0, 1.18);
      phoenixPos.z += sin(uTime * 2.8 + featherPhase * 14.0) * 0.09;
    } else if (partType == 0.0) {
      // Head & Beak: Poised aerodynamic forward alignment
      phoenixPos.y += sin(uTime * 1.8) * 0.06;
      phoenixPos.z += cos(uTime * 1.5) * 0.08;
    } else if (partType == 1.0) {
      // Crown Crest: 7 Fiery plumes whipping backward with lag
      float crestWave = sin(uTime * 2.8 - featherPhase * 3.5) * 0.22;
      phoenixPos.y += crestWave;
      phoenixPos.z -= abs(crestWave) * 0.48;
    } else if (partType == 2.0 || partType == 3.0) {
      // Neck, Chest & Talons: Breathing expansion & flight undulation
      float breath = sin(uTime * 2.0) * 0.09;
      phoenixPos.xy += normalize(phoenixPos.xy + vec2(0.001)) * breath;
      phoenixPos.z += sin(uTime * 1.8) * 0.12;
    } else if (partType == 4.0) {
      // Upper Wing Bone Spine: Primary driving arc
      float boneFlap = sin(uTime * 2.2) * wingSpanRatio * 0.98;
      phoenixPos.y += boneFlap;
      phoenixPos.z -= boneFlap * 0.35;
    } else if (partType == 5.0) {
      // Secondary Covert Feathers: Aerodynamic flexing
      float covertStroke = sin(uTime * 2.2 - wingSpanRatio * 0.7) * wingSpanRatio * 1.18;
      phoenixPos.y += covertStroke;
      phoenixPos.z -= covertStroke * 0.45;
    } else if (partType == 6.0) {
      // Primary Long Flight Quills: Shoulder -> wrist -> quill tip whip!
      float quillStroke = sin(uTime * 2.2 - wingSpanRatio * 0.85 - featherPhase * 0.95);
      float flapAmplitude = wingSpanRatio * (1.25 + featherPhase * 0.75);
      phoenixPos.y += quillStroke * flapAmplitude;
      phoenixPos.z -= quillStroke * flapAmplitude * 0.58;
      phoenixPos.x += cos(quillStroke) * 0.14 * wingSide;
    } else if (partType == 7.0) {
      // Cascading Tail Streamers: 9 Fluid serpentine flame plumes
      float tailWaveX = sin(uTime * 2.6 - featherPhase * 3.4) * (0.38 + featherPhase * 0.90);
      float tailWaveY = cos(uTime * 2.0 + featherPhase * 2.6) * (0.28 + featherPhase * 0.70);
      phoenixPos.x += tailWaveX;
      phoenixPos.y += tailWaveY;
    } else {
      // Detached Embers: Dynamic floating drift
      phoenixPos.y += sin(uTime * 3.2 + aRandom.w) * 0.28;
      phoenixPos.x += cos(uTime * 2.6 + aRandom.w) * 0.28;
    }

    // =======================================================================
    // 2. DYNAMIC 3D VORTEX SWIRL CALCULATIONS
    // =======================================================================
    vec3 vortexPos = aTargetVortex;
    float orbitalSpeed = 2.5 + length(vortexPos.xz) * 1.7;
    float vAngle = uTime * orbitalSpeed;
    vortexPos.xz = mat2(cos(vAngle), -sin(vAngle), sin(vAngle), cos(vAngle)) * vortexPos.xz;
    vortexPos.y += sin(uTime * 3.4 + vortexPos.x * 2.4) * 0.25;

    vec3 bottlePos = aTargetBottle;

    // =======================================================================
    // 3. CONTINUOUS PROGRESSIVE SCROLL TRANSFORMATION TIMELINE
    // =======================================================================
    vec3 currentPos = phoenixPos;

    if (uMorphProgress < 0.30) {
      currentPos = phoenixPos;
    } else if (uMorphProgress < 0.48) {
      if (uMorphProgress >= disintThresh) {
        float localT = smoothstep(disintThresh, 0.48, uMorphProgress);
        vec3 burstDir = normalize(phoenixPos + vec3(sin(aRandom.w), cos(aRandom.w), 0.5));
        vec3 burstOffset = burstDir * (sin(localT * 3.14159) * (1.7 + aRandom.x * 2.2));
        currentPos = mix(phoenixPos, vortexPos, localT) + burstOffset;
      } else {
        currentPos = phoenixPos;
      }
    } else if (uMorphProgress < 0.60) {
      float tVortex = smoothstep(0.48, 0.60, uMorphProgress);
      float compression = 1.0 - tVortex * 0.45;
      currentPos = vortexPos * compression;
    } else if (uMorphProgress < 0.78) {
      float tMorph = smoothstep(0.60, 0.78, uMorphProgress);
      float heightStagger = clamp(tMorph * 1.35 - (bottlePos.y + 2.0) * 0.075, 0.0, 1.0);
      heightStagger = smoothstep(0.0, 1.0, heightStagger);
      currentPos = mix(vortexPos * 0.55, bottlePos, heightStagger);
    } else {
      currentPos = bottlePos;
      currentPos.y += sin(uTime * 1.4 + aRandom.x * 6.28) * 0.035;
      currentPos = rotateY(uBottleRotation.y) * rotateX(uBottleRotation.x) * currentPos;
    }

    // =======================================================================
    // 4. MOUSE FORCE FIELD INTERACTION
    // =======================================================================
    if (uMorphProgress < 0.78) {
      vec2 mouseWorld = uMouse * vec2(4.5, 3.2);
      float distToMouse = length(currentPos.xy - mouseWorld);
      float mouseRadius = 2.5;

      if (distToMouse < mouseRadius) {
        float force = (1.0 - distToMouse / mouseRadius);
        vec2 repelDir = normalize(currentPos.xy - mouseWorld + vec2(0.0001));
        vec2 swirlDir = vec2(-repelDir.y, repelDir.x);

        currentPos.xy += repelDir * force * 0.75 + swirlDir * force * (0.50 + uMouseVelocity * 0.95);
        currentPos.z += force * 0.38;
      }
    }

    // Scent Note Flare
    if (uNoteFlare > 0.01) {
      currentPos += normalize(currentPos) * (sin(uTime * 20.0 + aRandom.x * 15.0) * uNoteFlare * 0.40);
    }

    // =======================================================================
    // 5. VIEWPORT PROJECTION & PARTICLE SIZING
    // =======================================================================
    vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float baseSize = (20.0 * aRandom.y + 12.0) * uPixelRatio;
    if (partType == 9.0) {
      baseSize *= 1.5;
    }
    if (partType == 4.0 || partType == 0.0) {
      baseSize *= 1.3;
    }
    if (uMorphProgress > 0.78) {
      baseSize *= 0.85;
    }
    gl_PointSize = baseSize / (-mvPosition.z);

    float flicker = sin(uTime * aRandom.z * 5.0 + aRandom.w) * 0.22 + 0.82;
    vAlpha = flicker * clamp(1.30 - uMorphProgress * 0.12, 0.48, 1.0);
  }
`;

export const particleFragmentShader = `
  uniform sampler2D uPointTexture;
  uniform float uTime;
  uniform float uMorphProgress;
  uniform float uNoteFlare;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vMorphProgress;
  varying float vPartType;
  varying float vHeatIntensity;

  void main() {
    // Sample high-definition HDR anamorphic ember flare texture
    vec4 texColor = texture2D(uPointTexture, gl_PointCoord);
    
    if (texColor.a < 0.02) {
      discard;
    }

    vec3 col = vColor * texColor.rgb * 1.5;

    // Diamond flare boost for hot particles
    if (vHeatIntensity > 0.75) {
      col += vec3(0.35, 0.30, 0.20) * texColor.a;
    }

    // Transition to radiant champagne gold during bottle stage
    if (vMorphProgress > 0.60) {
      float bottleMix = smoothstep(0.60, 0.90, vMorphProgress);
      vec3 crystalGold = mix(vec3(1.0, 0.88, 0.52), vec3(1.0, 0.98, 0.92), texColor.a);
      col = mix(col, crystalGold, bottleMix * 0.65);
    }

    if (uNoteFlare > 0.01) {
      col += vec3(0.40, 0.26, 0.12) * uNoteFlare;
    }

    gl_FragColor = vec4(col, vAlpha * texColor.a);
  }
`;
