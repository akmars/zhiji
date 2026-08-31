"use client";

import { useEffect, useRef } from "react";

function deltoid(t: number, scale: number) {
  return {
    x: scale * (2 * Math.cos(t) + Math.cos(2 * t)),
    y: scale * (2 * Math.sin(t) - Math.sin(2 * t)),
  };
}

export function DeltoidNeedle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
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
      const scale = Math.min(w, h) * 0.16;
      const cx = w * 0.5;
      const cy = h * 0.52;
      ctx.clearRect(0, 0, w, h);

      ctx.beginPath();
      for (let i = 0; i <= 180; i++) {
        const p = deltoid((i / 180) * Math.PI * 2, scale);
        if (i === 0) ctx.moveTo(cx + p.x, cy + p.y);
        else ctx.lineTo(cx + p.x, cy + p.y);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(125, 158, 116, 0.12)";
      ctx.strokeStyle = "rgba(200, 220, 196, 0.7)";
      ctx.lineWidth = 1.2;
      ctx.fill();
      ctx.stroke();

      const angle = reducedMotion ? Math.PI / 5 : (time * 0.00045) % Math.PI;
      const length = scale * 3;
      ctx.beginPath();
      ctx.moveTo(
        cx + Math.cos(angle) * length * 0.5,
        cy + Math.sin(angle) * length * 0.5,
      );
      ctx.lineTo(
        cx - Math.cos(angle) * length * 0.5,
        cy - Math.sin(angle) * length * 0.5,
      );
      ctx.strokeStyle = "#e8c2b8";
      ctx.lineWidth = 2;
      ctx.stroke();

      if (!reducedMotion) raf = window.requestAnimationFrame(draw);
    };

    raf = window.requestAnimationFrame(draw);
    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="deltoid-canvas" aria-hidden="true" />;
}
