"use client";
import { useState, useEffect } from 'react';

export default function SecurityOverlay({ studentName, studentDni }) {
  const [position, setPosition] = useState({ top: '10%', left: '10%' });

  // Move the watermark randomly to prevent static recording
  useEffect(() => {
    const interval = setInterval(() => {
      const top = Math.floor(Math.random() * 80) + 10 + '%';
      const left = Math.floor(Math.random() * 80) + 10 + '%';
      setPosition({ top, left });
    }, 15000); // Changes every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {/* Dynamic Watermark */}
      <div 
        className="absolute text-white/20 text-[10px] md:text-xs font-mono whitespace-nowrap transition-all duration-[2000ms] ease-in-out uppercase tracking-widest"
        style={{ top: position.top, left: position.left }}
      >
        {studentName} • {studentDni} • PROJECT CONTROL AI
      </div>

      {/* Invisible blocker to prevent right-click and interaction with YT controls if needed */}
      <div 
        className="absolute inset-0 bg-transparent" 
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}
