'use client'

import React, { useRef, useEffect } from 'react';
import '../styles/animation.css'

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const col = (x: number, y: number, r: number, g: number, b: number) => {
      if (!context) return;
      context.fillStyle = `rgb(${r},${g},${b})`;
      context.fillRect(x, y, 1, 1);
    };

    const R = (x: number, y: number, t: number) => {
      return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t));
    };

    const G = (x: number, y: number, t: number) => {
      return 0; // Defina o componente verde (g) como 0
    };

    const B = (x: number, y: number, t: number) => {
      return Math.floor(192 + 64 * Math.sin(5 * Math.sin(t / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100));
    };

    let t = 0;

    const run = () => {
      for (let x = 0; x <= 35; x++) {
        for (let y = 0; y <= 35; y++) {
          col(x, y, R(x, y, t), 0, B(x, y, t));
        }
      }
      t += 0.02;
      window.requestAnimationFrame(run);
    };

    run();
  }, []);

  return (
    <div className='relative z-0'>
      <canvas
        width={20}
        height={17}
        ref={canvasRef}
        id='canvas'
      />
    </div>
  );
};

export default BackgroundAnimation;