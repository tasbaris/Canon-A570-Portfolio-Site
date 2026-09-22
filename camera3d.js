/**
 * Canon PowerShot A570 IS — Master 3D Photorealistic Camera Engine
 * Authentic 18,468-vertex 3D geometry with true chassis contours,
 * solid gapless viewfinder & flash window, pure satin silver lens barrels,
 * extended 2-stage telescoping lens (2.5cm travel), and Xenon strobe burst.
 */

(function () {
  'use strict';

  let scene, camera, renderer;
  let cameraRig, cameraModel;
  let lensStage1Group, lensStage2Group;
  let flashLight;
  let container, canvas;
  let isReady = false;
  let isFlashing = false;
  let animStartTime = 0;
  const introDuration = 2600; // 2.6s cinematic ease-out
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const baseRotY = -0.52; // ~-30 degrees showcase left tilt
  const baseRotX = 0.08;
  let introFiredFlash = false;

  // Extended Physical Lens Travel Distances
  const LENS_STAGE1_TRAVEL = 0.12; // Stage 1 outer barrel travel
  const LENS_STAGE2_TRAVEL = 0.25; // Stage 2 inner barrel travel (full extension)

  function createDataTexture(dataUri) {
    if (!dataUri) return null;
    const img = new Image();
    const tex = new THREE.Texture(img);
    img.onload = function () {
      tex.needsUpdate = true;
      if (renderer && scene && camera) renderer.render(scene, camera);
    };
    img.src = dataUri;
    tex.colorSpace = THREE.SRGBColorSpace || 'srgb';
    tex.anisotropy = 8;
    return tex;
  }

  function init() {
    container = document.getElementById('heroCameraStage');
    if (!container || typeof THREE === 'undefined') return;

    canvas = document.getElementById('camera3DCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'camera3DCanvas';
      canvas.className = 'camera-3d-canvas';
      container.insertBefore(canvas, container.firstChild);
    }

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 380;

    // 1. Scene & Perspective Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(32, width / height, 0.01, 50);
    camera.position.set(0, 0, 1.65); // High-impact close-up viewpoint

    // 2. High-Fidelity WebGL Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95; // Deep metallic tone, eliminates overexposed whites
    if (renderer.outputColorSpace) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    } else if (renderer.outputEncoding) {
      renderer.outputEncoding = THREE.sRGBEncoding;
    }

    // 3. Balanced Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.60);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 1.10);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.85);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.50);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 0.45);
    frontLight.position.set(0, 0, 4);
    scene.add(frontLight);

    // Xenon Flash Light Source
    flashLight = new THREE.PointLight(0xffffff, 0, 30, 2);
    flashLight.position.set(0.22, 0.18, 0.40);
    scene.add(flashLight);

    // 4. Build 3D Model
    buildTrue3DModel();

    // 5. Interaction Events
    window.addEventListener('resize', onResize, { passive: true });
    container.addEventListener('mousemove', onMouseMove, { passive: true });
    container.addEventListener('mouseleave', onMouseLeave, { passive: true });
    container.addEventListener('click', triggerFlash);
    container.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerFlash();
      }
    });

    animate();
  }

  function buildTrue3DModel() {
    const geomsData = window.CANON_3D_GEOMS;
    const textures = window.CANON_TEXTURES || {};

    if (!geomsData) {
      console.warn('CANON_3D_GEOMS not found');
      return;
    }

    // High-Resolution Enhanced Texture Maps
    const texFront = createDataTexture(textures.front);
    const texBack = createDataTexture(textures.back);
    const texLensFront = createDataTexture(textures.lens_front);
    const texTop = createDataTexture(textures.top);

    // Physical PBR Materials with Rich Metallic Depth
    const frontBodyMat = new THREE.MeshStandardMaterial({
      map: texFront,
      color: 0x909ba6, // Metallic silver alloy
      metalness: 0.68,
      roughness: 0.38
    });

    const backBodyMat = new THREE.MeshStandardMaterial({
      map: texBack,
      color: 0x909ba6,
      metalness: 0.55,
      roughness: 0.42
    });

    const topBodyMat = new THREE.MeshStandardMaterial({
      map: texTop,
      color: 0x909ba6,
      metalness: 0.68,
      roughness: 0.36
    });

    const chassisSilverMat = new THREE.MeshStandardMaterial({
      color: 0x828d98,
      metalness: 0.75,
      roughness: 0.32
    });

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x14181e,
      metalness: 0.90,
      roughness: 0.20
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xecf0f5,
      metalness: 0.96,
      roughness: 0.06
    });

    // Pure brushed silver metal for lens barrels (matching real camera, no black bands)
    const lensBarrelSilverMat = new THREE.MeshStandardMaterial({
      color: 0xa8b2bd,
      metalness: 0.85,
      roughness: 0.18
    });

    // Full circular front optics face (silver outer ring + black text + aperture)
    const lensOpticsFaceMat = new THREE.MeshStandardMaterial({
      map: texLensFront,
      color: 0xffffff,
      metalness: 0.30,
      roughness: 0.18
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      transmission: 0.95,
      opacity: 0.25,
      transparent: true,
      roughness: 0.02,
      ior: 1.55,
      metalness: 0.08
    });

    // Groups Hierarchy
    cameraRig = new THREE.Group();
    cameraModel = new THREE.Group();
    lensStage1Group = new THREE.Group(); // Stage 1 outer barrel
    lensStage2Group = new THREE.Group(); // Stage 2 inner barrel + optics + glass

    // Build each submesh
    Object.keys(geomsData).forEach(function (name) {
      const gData = geomsData[name];
      const geom = new THREE.BufferGeometry();

      geom.setAttribute('position', new THREE.Float32BufferAttribute(gData.positions, 3));
      geom.setAttribute('normal', new THREE.Float32BufferAttribute(gData.normals, 3));
      geom.setAttribute('uv', new THREE.Float32BufferAttribute(gData.uvs, 2));

      let mat = chassisSilverMat;

      if (name === 'mesh_6_front') {
        mat = frontBodyMat; // Gapless front face with Canon logo, 4x Zoom, flash, viewfinder
      } else if (name === 'mesh_6_back' || name === 'back_controls') {
        mat = backBodyMat; // Rear LCD screen + controls
      } else if (name === 'mesh_6_top') {
        mat = topBodyMat;
      } else if (name === 'mesh_6_sides') {
        mat = chassisSilverMat;
      } else if (name === 'shutter_dial_chrome') {
        mat = chromeMat;
      } else if (name === 'shutter_dial_dark') {
        mat = darkMetalMat;
      } else if (name === 'lens_stage1_barrel' || name === 'lens_stage2_barrel') {
        mat = lensBarrelSilverMat; // Pure brushed silver barrel
      } else if (name === 'lens_stage2_front') {
        mat = lensOpticsFaceMat; // Full circular optics face
      } else if (name === 'lens_stage2_glass') {
        mat = glassMat; // Optical glass dome
      }

      const mesh = new THREE.Mesh(geom, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Grouping
      if (name.startsWith('lens_stage1')) {
        lensStage1Group.add(mesh);
      } else if (name.startsWith('lens_stage2')) {
        lensStage2Group.add(mesh);
      } else {
        cameraModel.add(mesh);
      }
    });

    cameraModel.add(lensStage1Group);
    cameraModel.add(lensStage2Group);

    // Center and scale whole 3D camera (~40% larger for commanding presence)
    const box = new THREE.Box3().setFromObject(cameraModel);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetScale = 0.82 / maxDim;

    cameraModel.position.sub(center);
    cameraModel.scale.multiplyScalar(targetScale);

    cameraRig.add(cameraModel);
    scene.add(cameraRig);

    // Initial cinematic entrance position (starts from the back, rotates forward)
    cameraRig.position.set(0, 0, 0);
    cameraRig.rotation.set(0.18, Math.PI, 0);
    cameraRig.scale.set(0.78, 0.78, 0.78);

    animStartTime = performance.now();
    isReady = true;
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function easeOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  function triggerFlash() {
    if (isFlashing || !isReady) return;
    isFlashing = true;

    // HTML Flare Overlay
    const flare = document.getElementById('flashFlare');
    const beam = document.getElementById('flashBeam');
    if (flare) {
      flare.style.animation = 'none';
      void flare.offsetWidth;
      flare.style.animation = 'flashStrobe 0.7s cubic-bezier(0.1, 0.9, 0.2, 1) forwards';
    }
    if (beam) {
      beam.style.animation = 'none';
      void beam.offsetWidth;
      beam.style.animation = 'flashBeamBurst 0.6s cubic-bezier(0.1, 0.9, 0.2, 1) forwards';
    }

    // Micro Lens Autofocus Pop
    if (lensStage2Group) {
      lensStage2Group.position.z = LENS_STAGE2_TRAVEL + 0.02;
      setTimeout(function () {
        if (lensStage2Group) lensStage2Group.position.z = LENS_STAGE2_TRAVEL;
      }, 140);
    }

    // Instantaneous Xenon Flash Light Strobe (Turns off completely)
    const startTime = performance.now();
    const flashDuration = 260; // ms
    function animateFlash() {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(1, elapsed / flashDuration);
      if (progress < 0.12) {
        flashLight.intensity = (progress / 0.12) * 55;
      } else {
        flashLight.intensity = Math.max(0, (1 - (progress - 0.12) / 0.88) * 55);
      }
      if (progress < 1) {
        requestAnimationFrame(animateFlash);
      } else {
        flashLight.intensity = 0;
        isFlashing = false;
      }
    }
    animateFlash();

    // Shutter Sound via Web Audio API
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) {
        const ctx = new AC();
        if (ctx.state === 'suspended') ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(680, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch (e) { }
  }

  function animate() {
    requestAnimationFrame(animate);
    if (!isReady || !cameraRig) return;

    const now = performance.now();
    const elapsed = now - animStartTime;

    if (elapsed < introDuration) {
      // ══════ CINEMATIC 3D INTRO ══════
      const t = Math.min(1, elapsed / introDuration);
      const ease = easeOutCubic(t);

      // 1. Scale into view smoothly (centered)
      cameraRig.position.x = 0;
      cameraRig.scale.setScalar(0.78 + (0.22 * ease));

      // 2. Unidirectional forward rotation starting from back (Math.PI) to front showcase (-0.52)
      const startRotY = Math.PI;
      cameraRig.rotation.y = startRotY - ((startRotY - baseRotY) * ease);
      cameraRig.rotation.x = 0.18 - ((0.18 - baseRotX) * ease);

      // 3. Extended 2-Stage Physical Telescoping Lens Extension (Starts flush at z=0)
      if (t > 0.38) {
        // Stage 1 Outer Barrel: extends forward +0.12 (0.38 -> 0.72)
        const t1 = Math.min(1, (t - 0.38) / 0.34);
        const ease1 = easeOutBack(t1);
        if (lensStage1Group) {
          lensStage1Group.position.z = LENS_STAGE1_TRAVEL * ease1;
        }

        // Stage 2 Inner Barrel: extends forward +0.25 (0.50 -> 0.88, extending fully beyond Stage 1)
        if (t > 0.50 && lensStage2Group) {
          const t2 = Math.min(1, (t - 0.50) / 0.38);
          const ease2 = easeOutBack(t2);
          lensStage2Group.position.z = (LENS_STAGE1_TRAVEL * ease1) + ((LENS_STAGE2_TRAVEL - LENS_STAGE1_TRAVEL) * ease2);
        }
      }

      // 4. Instant Xenon Flash at 92%
      if (t > 0.90 && !introFiredFlash) {
        introFiredFlash = true;
        triggerFlash();
      }
    } else {
      // Lenses firmly at full extended resting positions
      if (lensStage1Group && lensStage1Group.position.z !== LENS_STAGE1_TRAVEL && !isFlashing) lensStage1Group.position.z = LENS_STAGE1_TRAVEL;
      if (lensStage2Group && lensStage2Group.position.z !== LENS_STAGE2_TRAVEL && !isFlashing) lensStage2Group.position.z = LENS_STAGE2_TRAVEL;

      // ══════ IDLE FLOATING & MOUSE 3D PARALLAX ══════
      const idleTime = (now - animStartTime - introDuration) * 0.0015;
      const floatY = Math.sin(idleTime) * 0.02;
      const floatRotY = Math.cos(idleTime * 0.8) * 0.035;
      const floatRotX = Math.sin(idleTime * 0.6) * 0.025;

      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      cameraRig.position.x = 0;
      cameraRig.position.y = floatY;
      cameraRig.rotation.y = baseRotY + floatRotY + (mouse.x * 0.42);
      cameraRig.rotation.x = baseRotX + floatRotX - (mouse.y * 0.30);
    }

    renderer.render(scene, camera);
  }

  function onMouseMove(e) {
    const rect = container.getBoundingClientRect();
    mouse.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouse.targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  }

  function onMouseLeave() {
    mouse.targetX = 0;
    mouse.targetY = 0;
  }

  function onResize() {
    if (!container || !renderer || !camera) return;
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 380;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
