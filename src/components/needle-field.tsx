"use client";

import { useEffect, useRef } from "react";

type Tube = {
  ox: number;
  oy: number;
  oz: number;
  dx: number;
  dy: number;
  dz: number;
  shade: number;
};

function seedTubes(count: number): Tube[] {
  const tubes: Tube[] = [];
  for (let i = 0; i < count; i++) {
    const u = (i + 0.5) / count;
    const phi = Math.acos(1 - 2 * ((u * 1.6180339887) % 1));
    const theta = 2 * Math.PI * 1.6180339887 * i;
    const dx = Math.sin(phi) * Math.cos(theta);
    const dy = Math.cos(phi);
    const dz = Math.sin(phi) * Math.sin(theta);
    const cluster = i % 7 === 0 ? 0.08 : 0.42;
    const ox = (Math.sin(i * 12.9898) * 0.5 + 0.5 - 0.5) * cluster;
    const oy = (Math.sin(i * 78.233) * 0.5 + 0.5 - 0.5) * cluster * 0.6;
    const oz = (Math.sin(i * 45.164) * 0.5 + 0.5 - 0.5) * cluster;
    tubes.push({
      ox,
      oy,
      oz,
      dx,
      dy,
      dz,
      shade: 0.35 + (i % 5) * 0.12,
    });
  }
  return tubes;
}

export function NeedleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tubes = seedTubes(96);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    let raf = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (time: number) => {
      if (!running) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const t = reducedMotion ? 0.4 : time * 0.00012;
      const cos = Math.cos(t);
      const sin = Math.sin(t);

      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.58;
      const cy = h * 0.5;
      const scale = Math.min(w, h) * 0.42;

      const projected = tubes.map((tube) => {
        const x0 = tube.ox - tube.dx * 0.95;
        const y0 = tube.oy - tube.dy * 0.95;
        const z0 = tube.oz - tube.dz * 0.95;
        const x1 = tube.ox + tube.dx * 0.95;
        const y1 = tube.oy + tube.dy * 0.95;
        const z1 = tube.oz + tube.dz * 0.95;
        const rx0 = x0 * cos - z0 * sin;
        const rz0 = x0 * sin + z0 * cos;
        const rx1 = x1 * cos - z1 * sin;
        const rz1 = x1 * sin + z1 * cos;
        const p0 = 1.35 / (2.2 + rz0);
        const p1 = 1.35 / (2.2 + rz1);
        return {
          ax: cx + rx0 * scale * p0,
          ay: cy + y0 * scale * p0 * 1.05,
          bx: cx + rx1 * scale * p1,
          by: cy + y1 * scale * p1 * 1.05,
          depth: (rz0 + rz1) / 2,
          shade: tube.shade,
        };
      });

      projected.sort((a, b) => a.depth - b.depth);

      for (const line of projected) {
        const near = (line.depth + 1.4) / 2.8;
        const alpha = 0.18 + near * 0.55;
        ctx.beginPath();
        ctx.moveTo(line.ax, line.ay);
        ctx.lineTo(line.bx, line.by);
        ctx.strokeStyle = `rgba(${170 + line.shade * 40}, ${200 + line.shade * 20}, ${168}, ${alpha})`;
        ctx.lineWidth = 0.7 + near * 1.4;
        ctx.stroke();
      }

      frame += 1;
      if (!reducedMotion || frame < 2) {
        raf = window.requestAnimationFrame(draw);
      }
    };

    raf = window.requestAnimationFrame(draw);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="needle-field"
      aria-hidden="true"
    />
  );
}
