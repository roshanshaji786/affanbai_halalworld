// Static light globe drawn at build time. Shown instantly, then cross-faded into the WebGL globe on capable devices.
import { Euler, Quaternion, Vector3 } from 'three';

import { LAND } from '../scripts/land-points';

const vec = (lat: number, lon: number) => {
  const phi = ((90 - lat) * Math.PI) / 180, theta = ((lon + 180) * Math.PI) / 180;
  return new Vector3(-Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta));
};

export function GET() {
  const S = 600, C = 300, R = 244;
  const f = vec(19, 58);
  const q = new Quaternion().setFromEuler(new Euler((19 * Math.PI) / 180, -Math.atan2(f.x, f.z), 0, 'XYZ'));
  const tilt = new Quaternion().setFromEuler(new Euler(0.18, 0, 0));
  const P = (v: Vector3) => v.clone().applyQuaternion(q).applyQuaternion(tilt);
  let dots = '', hot = '';
  const hotSpots = [vec(8.48, 76.92), vec(21.42, 39.83), vec(24.47, 39.61), vec(25.2, 55.27)];
  for (let i = 0; i < LAND.length; i += 2) {
    const v0 = vec(LAND[i] / 10, LAND[i + 1] / 10);
    const v = P(v0);
    if (v.z < 0.08) continue;
    const seg = `M${(C + v.x * R).toFixed(1)} ${(C - v.y * R).toFixed(1)}h0`;
    if (hotSpots.some((h) => h.distanceTo(v0) < 0.3)) hot += seg; else dots += seg;
  }
  const arcs = [[8.48, 76.92, 21.42, 39.83], [8.48, 76.92, 24.47, 39.61], [10.15, 76.4, 25.2, 55.27], [8.48, 76.92, 41, 28.97], [10.15, 76.4, 3.14, 101.69]]
    .map(([a1, o1, a2, o2]) => {
      const a = vec(a1, o1), b = vec(a2, o2), lift = 0.12 + a.angleTo(b) * 0.32;
      let d = '';
      for (let s = 0; s <= 30; s++) {
        const t = s / 30, p = P(a.clone().lerp(b, t).normalize().multiplyScalar(1 + Math.sin(Math.PI * t) * lift));
        d += `${s ? 'L' : 'M'}${(C + p.x * R).toFixed(1)} ${(C - p.y * R).toFixed(1)}`;
      }
      return `<path d="${d}"/>`;
    })
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}"><defs><radialGradient id="b" cx="50%" cy="38%" r="62%"><stop offset="0" stop-color="#f9f7f2"/><stop offset=".78" stop-color="#ece8e0"/><stop offset="1" stop-color="#d6d0c5"/></radialGradient></defs><circle cx="${C}" cy="${C}" r="${R}" fill="url(#b)"/><path d="${dots}" stroke="#4a453f" stroke-opacity=".42" stroke-width="2.8" stroke-linecap="round"/><path d="${hot}" stroke="#6e2416" stroke-opacity=".75" stroke-width="3" stroke-linecap="round"/><g fill="none" stroke="#6e2416" stroke-width="1.4" stroke-opacity=".5">${arcs}</g></svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}
