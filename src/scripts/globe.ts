/**
 * Hero globe (light theme): a paper-white dotted earth with fine maroon flight arcs from Kerala
 * to the holy cities and beyond.
 * Loaded lazily (after first paint) and only on capable devices. Tree-shaken three.js imports keep it small.
 */
import {
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  Group,
  Mesh,
  PerspectiveCamera,
  Points,
  Euler,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';
import { LAND } from './land-points';

type City = { name: string; lat: number; lon: number; label?: boolean; side?: 'left' | 'below' };

const ORIGINS: City[] = [
  { name: 'Thiruvananthapuram', lat: 8.48, lon: 76.92, label: true },
  { name: 'Kochi', lat: 10.15, lon: 76.4 },
];
const DESTS: (City & { from: number; h?: number })[] = [
  { name: 'Jeddah', lat: 21.54, lon: 39.17, from: 0 },
  { name: 'Makkah', lat: 21.42, lon: 39.83, from: 1, label: true, side: 'left' },
  { name: 'Madinah', lat: 24.47, lon: 39.61, from: 0, label: true },
  { name: 'Dubai', lat: 25.2, lon: 55.27, from: 1 },
  { name: 'Istanbul', lat: 41.0, lon: 28.97, from: 0 },
  { name: 'Kuala Lumpur', lat: 3.14, lon: 101.69, from: 1 },
  { name: 'Cairo', lat: 30.04, lon: 31.24, from: 1 },
  { name: 'Baku', lat: 40.41, lon: 49.87, from: 0 },
];

const ACCENT = new Color('#6e2416');
const INK = new Color('#4a453f');

export function vec(lat: number, lon: number, r = 1) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

/** Euler rotation that brings (lat, lon) to face the camera with north kept up. */
export function facing(lat: number, lon: number) {
  const f = vec(lat, lon);
  return new Euler((lat * Math.PI) / 180, -Math.atan2(f.x, f.z), 0, 'XYZ');
}

export function mount(host: HTMLElement) {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);

  const mobile = matchMedia('(max-width: 899px)').matches;
  const renderer = new WebGLRenderer({ canvas, antialias: !mobile, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.6 : 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 4.4);

  const world = new Group(); // receives drag + sway
  const globe = new Group(); // fixed orientation: Arabian Sea faces the camera
  world.add(globe);
  scene.add(world);
  globe.rotation.copy(facing(19, 58)); // north up, Arabian Sea centred
  world.rotation.x = 0.18;

  const uniforms = { uTime: { value: 0 }, uPixelRatio: { value: renderer.getPixelRatio() } };

  // Body of the globe: a soft paper sphere with a faint rim so it reads on a light page.
  const body = new Mesh(
    new SphereGeometry(0.995, 64, 48),
    new ShaderMaterial({
      vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
      fragmentShader: `varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1. - max(dot(vN, vV), 0.), 2.2); vec3 base = mix(vec3(0.925,0.91,0.88), vec3(0.975,0.968,0.952), vN.y*.5+.5); gl_FragColor = vec4(mix(base, vec3(0.83,0.8,0.75), f*0.8), 1.); }`,
    }),
  );
  globe.add(body);

  // Land dots. Dots near the routes turn maroon; the rest are soft ink.
  const n = LAND.length / 2;
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  const rnd = new Float32Array(n);
  const hot = [...ORIGINS, ...DESTS].map((c) => vec(c.lat, c.lon));
  const tmp = new Color();
  for (let i = 0; i < n; i++) {
    const v = vec(LAND[i * 2] / 10, LAND[i * 2 + 1] / 10, 1.002);
    pos.set([v.x, v.y, v.z], i * 3);
    let near = 0;
    for (const h of hot) near = Math.max(near, 1 - Math.min(v.distanceTo(h) / 0.35, 1));
    tmp.copy(INK).lerp(ACCENT, Math.min(1, near * 1.4));
    col.set([tmp.r, tmp.g, tmp.b], i * 3);
    rnd[i] = Math.random();
  }
  const dotsGeo = new BufferGeometry();
  dotsGeo.setAttribute('position', new BufferAttribute(pos, 3));
  dotsGeo.setAttribute('color', new BufferAttribute(col, 3));
  dotsGeo.setAttribute('aRnd', new BufferAttribute(rnd, 1));
  const dots = new Points(
    dotsGeo,
    new ShaderMaterial({
      uniforms,
      vertexShader: `uniform float uTime; uniform float uPixelRatio; attribute vec3 color; attribute float aRnd; varying vec3 vC; varying float vA;
        void main(){ vec4 mv = modelViewMatrix*vec4(position,1.); vec3 n = normalize((modelViewMatrix*vec4(position,0.)).xyz);
          float facing = smoothstep(-0.05, 0.45, n.z); vC = color; vA = facing*(0.42 + 0.18*sin(uTime*1.3 + aRnd*40.));
          gl_PointSize = (2.2 + aRnd*1.0) * uPixelRatio * (4.4 / -mv.z); gl_Position = projectionMatrix*mv; }`,
      fragmentShader: `varying vec3 vC; varying float vA; void main(){ float d = length(gl_PointCoord-.5); if(d>.5) discard; gl_FragColor = vec4(vC, vA*smoothstep(.5,.1,d)); }`,
      transparent: true,
      depthWrite: false,
    }),
  );
  globe.add(dots);

  // Flight arcs with a travelling comet of light.
  const arcMat = (offset: number, speed: number) =>
    new ShaderMaterial({
      uniforms: { uTime: uniforms.uTime, uOff: { value: offset }, uSpeed: { value: speed }, uColor: { value: ACCENT } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
      fragmentShader: `uniform float uTime; uniform float uOff; uniform float uSpeed; uniform vec3 uColor; varying vec2 vUv;
        void main(){ float head = fract(uTime*uSpeed + uOff); float x = vUv.x; float tail = smoothstep(head-0.28, head, x) * step(x, head);
          float base = 0.5; float a = base + tail*0.5; vec3 c = mix(uColor, vec3(.66,.52,.25), tail*tail*.6);
          float edge = smoothstep(0., .04, x)*smoothstep(1., .96, x); gl_FragColor = vec4(c, a*edge); }`,
      transparent: true,
      depthWrite: false,
    });

  DESTS.forEach((d, i) => {
    const a = vec(ORIGINS[d.from].lat, ORIGINS[d.from].lon).normalize();
    const b = vec(d.lat, d.lon).normalize();
    const ang = a.angleTo(b);
    const lift = 0.12 + ang * 0.32;
    const pts: Vector3[] = [];
    for (let s = 0; s <= 40; s++) {
      const t = s / 40;
      const p = new Vector3().copy(a).lerp(b, t).normalize(); // close enough to slerp for short arcs
      p.multiplyScalar(1 + Math.sin(Math.PI * t) * lift);
      pts.push(p);
    }
    const tube = new TubeGeometry(new CatmullRomCurve3(pts), 80, mobile ? 0.0065 : 0.0055, 6, false);
    globe.add(new Mesh(tube, arcMat(i * 0.17, 0.14 + (i % 3) * 0.03)));
  });

  // City markers: pulsing rings, brighter at the Kerala origins.
  const ringMat = (strength: number, phase: number) =>
    new ShaderMaterial({
      uniforms: { uTime: uniforms.uTime, uS: { value: strength }, uP: { value: phase }, uColor: { value: ACCENT } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
      fragmentShader: `uniform float uTime; uniform float uS; uniform float uP; uniform vec3 uColor; varying vec2 vUv;
        void main(){ vec2 p = vUv-.5; float r = length(p)*2.; float t = fract(uTime*.55 + uP);
          float ring = smoothstep(.09,0.,abs(r - t))*(1.-t); float core = smoothstep(.22,.0,r);
          float a = (ring*0.9 + core)*uS; if(a<.01) discard; gl_FragColor = vec4(uColor, a); }`,
      transparent: true,
      depthWrite: false,
    });
  const quad = new BufferGeometry();
  quad.setAttribute('position', new BufferAttribute(new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]), 3));
  quad.setAttribute('uv', new BufferAttribute(new Float32Array([0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1]), 2));
  const labelled: { el: HTMLElement; v: Vector3 }[] = [];
  [...ORIGINS.map((c) => ({ ...c, o: true })), ...DESTS.map((c) => ({ ...c, o: false }))].forEach((c, i) => {
    const v = vec(c.lat, c.lon, 1.006);
    const m = new Mesh(quad, ringMat(c.o ? 1 : 0.7, i * 0.21));
    const size = c.o ? 0.075 : 0.05;
    m.scale.setScalar(size);
    m.position.copy(v);
    m.lookAt(v.clone().multiplyScalar(2));
    globe.add(m);
    if (c.label) {
      const el = document.createElement('span');
      el.className = 'globe-label';
      if (c.side) el.dataset.side = c.side;
      el.textContent = c.name === 'Thiruvananthapuram' ? 'Trivandrum' : c.name;
      host.appendChild(el);
      labelled.push({ el, v });
    }
  });

  // Interaction: horizontal drag spins the globe; vertical swipes still scroll the page.
  let yaw = 0, vel = 0, dragging = false, lastX = 0, pointerY = 0, pointerX = 0;
  canvas.addEventListener('pointerdown', (e) => { dragging = true; lastX = e.clientX; canvas.style.cursor = 'grabbing'; });
  window.addEventListener('pointerup', () => { dragging = false; canvas.style.cursor = ''; });
  window.addEventListener('pointermove', (e) => {
    if (dragging) { const dx = e.clientX - lastX; lastX = e.clientX; vel = dx * 0.0045; yaw += vel; }
    if (!mobile) { pointerX = e.clientX / innerWidth - 0.5; pointerY = e.clientY / innerHeight - 0.5; }
  }, { passive: true });

  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(host);
  resize();

  let visible = true, raf = 0, last = performance.now(), t = 0;
  const proj = new Vector3();
  function frame(now: number) {
    raf = 0;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;
    uniforms.uTime.value = t;
    if (!dragging) { vel *= 0.94; yaw += vel; yaw *= 0.995; }
    const sway = Math.sin(t * 0.18) * 0.35;
    const scrollTilt = Math.min(window.scrollY / innerHeight, 1) * 0.35;
    world.rotation.y += (yaw + sway + pointerX * 0.25 - world.rotation.y) * 0.08;
    world.rotation.x += (0.18 + scrollTilt + pointerY * 0.12 - world.rotation.x) * 0.08;
    renderer.render(scene, camera);

    const w = host.clientWidth, h = host.clientHeight;
    for (const l of labelled) {
      proj.copy(l.v).applyMatrix4(globe.matrixWorld);
      const facing = proj.clone().normalize().z;
      proj.project(camera);
      l.el.style.transform = `translate(${((proj.x + 1) / 2) * w}px, ${((1 - proj.y) / 2) * h}px)`;
      l.el.style.opacity = String(Math.max(0, Math.min(1, (facing - 0.25) * 4)));
    }
    if (visible && !document.hidden) raf = requestAnimationFrame(frame);
  }
  const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }).observe(host);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && visible) start(); });

  // Fade in only once the first frame has been drawn.
  requestAnimationFrame((now) => { frame(now); host.classList.add('is-live'); });
}
