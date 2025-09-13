export const CONFIG = {
  TAX: 0.05,
  K: 0.35,
  SMOOTH: 0.25,
};

export function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
