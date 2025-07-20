import React, { useState, useEffect } from 'react';
import blochSphereImage from '@/assets/bloch-sphere.png';

interface BlochSphereProps {
  isAnimating?: boolean;
  phase?: number;
  amplitude?: number;
  className?: string;
}

export const BlochSphere: React.FC<BlochSphereProps> = ({
  isAnimating = false,
  phase = 0,
  amplitude = 1,
  className = ""
}) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setRotation(prev => (prev + 2) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  // Calculate state vector position based on phase and amplitude
  const theta = Math.acos(amplitude);
  const phi = phase * 2 * Math.PI;
  
  // Convert spherical to Cartesian coordinates for visualization
  const x = Math.sin(theta) * Math.cos(phi);
  const y = Math.sin(theta) * Math.sin(phi);
  const z = Math.cos(theta);

  return (
    <div className={`relative w-32 h-32 mx-auto ${className}`}>
      {/* Bloch sphere background */}
      <img 
        src={blochSphereImage}
        alt="Bloch Sphere"
        className={`w-full h-full object-contain ${
          isAnimating ? 'animate-phase-rotate' : ''
        }`}
        style={{
          transform: `rotate(${rotation}deg)`,
          filter: isAnimating ? 'drop-shadow(0 0 10px hsl(var(--primary) / 0.5))' : 'none'
        }}
      />
      
      {/* State vector indicator */}
      <div 
        className="absolute w-2 h-2 bg-primary rounded-full shadow-lg border border-primary-foreground"
        style={{
          left: `${50 + x * 40}%`,
          top: `${50 - z * 40}%`,
          transform: 'translate(-50%, -50%)',
          boxShadow: isAnimating ? '0 0 8px hsl(var(--primary))' : '0 2px 4px rgba(0,0,0,0.3)'
        }}
      />
      
      {/* Phase indicator */}
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-accent rounded-full animate-quantum-pulse" />
        </div>
      )}
      
      {/* State labels */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-center">
        <div className="text-muted-foreground">|ψ⟩</div>
      </div>
    </div>
  );
};