'use client';

import React, { CSSProperties } from 'react';

export interface AnimatedShapeProps {
  variant?: 'circle' | 'square' | 'star' | 'diamond' | 'hexagon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'french-rose' | 'carnation-pink' | 'orchid-pink' | 'misty-rose' | 'pink' | 'tickle-me-pink';
  animation?: 'float' | 'pulse' | 'bounce' | 'heartbeat' | 'morph' | 'shake';
  position?: string;
  className?: string;
  style?: any;
}

const getSizeStyles = (size: string) => {
  switch (size) {
    case 'sm': return { width: '2rem', height: '2rem' };
    case 'md': return { width: '4rem', height: '4rem' };
    case 'lg': return { width: '6rem', height: '6rem' };
    case 'xl': return { width: '8rem', height: '8rem' };
    default: return { width: '4rem', height: '4rem' };
  }
};

const getShapeStyles = (variant: string) => {
  switch (variant) {
    case 'circle': return { borderRadius: '50%' };
    case 'square': return { borderRadius: '0.5rem' };
    case 'star': return { clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' };
    case 'diamond': return { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', transform: 'rotate(45deg)' };
    case 'hexagon': return { clipPath: 'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)' };
    default: return { borderRadius: '50%' };
  }
};

const getColorStyles = (color: string) => {
  switch (color) {
    case 'french-rose': return { backgroundColor: 'var(--french-rose)' };
    case 'carnation-pink': return { backgroundColor: 'var(--carnation-pink)' };
    case 'orchid-pink': return { backgroundColor: 'var(--orchid-pink)' };
    case 'misty-rose': return { backgroundColor: 'var(--misty-rose)' };
    case 'pink': return { backgroundColor: 'var(--pink)' };
    case 'tickle-me-pink': return { backgroundColor: 'var(--tickle-me-pink)' };
    default: return { backgroundColor: 'var(--french-rose)' };
  }
};

const getAnimationStyles = (animation: string) => {
  switch (animation) {
    case 'float': return { animation: 'float 3s ease-in-out infinite' };
    case 'pulse': return { animation: 'pulse 2s ease-in-out infinite' };
    case 'bounce': return { animation: 'bounce 1s ease-in-out infinite' };
    case 'heartbeat': return { animation: 'heartbeat 1s ease-in-out infinite' };
    case 'morph': return { animation: 'morph 4s ease-in-out infinite' };
    case 'shake': return { animation: 'shake 0.5s ease-in-out infinite' };
    default: return { animation: 'float 3s ease-in-out infinite' };
  }
};

export function AnimatedShape({
  variant = 'circle',
  size = 'md',
  color = 'french-rose',
  animation = 'float',
  position = 'absolute',
  className,
  style,
}: AnimatedShapeProps) {
  const combinedStyles = {
    position: position as any,
    ...getSizeStyles(size),
    ...getShapeStyles(variant),
    ...getColorStyles(color),
    ...getAnimationStyles(animation),
    ...style,
  };

  return (
    <div
      className={className}
      style={combinedStyles}
    />
  );
}

export interface FloatingShapesProps {
  density?: 'low' | 'medium' | 'high';
  opacity?: number;
  className?: string;
}

export function FloatingShapes({ 
  density = 'medium', 
  opacity = 0.15,
  className 
}: FloatingShapesProps) {
  const shapes = density === 'low' ? 3 : density === 'medium' ? 5 : 8;
  
  return (
    <div 
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity
      }}
    >
      {Array.from({ length: shapes }).map((_, index) => {
        const positions = [
          { top: '2.5rem', left: '2.5rem' },
          { top: '5rem', right: '5rem' },
          { bottom: '5rem', left: '5rem' },
          { bottom: '2.5rem', right: '2.5rem' },
          { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
          { top: '25%', left: '75%' },
          { top: '75%', left: '25%' },
          { top: '10%', left: '10%' },
        ];
        
        return (
          <AnimatedShape
            key={index}
            variant={['circle', 'star', 'diamond', 'hexagon'][index % 4] as any}
            size={['sm', 'md', 'lg'][index % 3] as any}
            color={[
              'french-rose',
              'carnation-pink', 
              'orchid-pink',
              'misty-rose',
              'pink',
              'tickle-me-pink'
            ][index % 6] as any}
            animation={['float', 'pulse', 'bounce', 'heartbeat'][index % 4] as any}
            className=""
            style={positions[index % positions.length]}
          />
        );
      })}
    </div>
  );
} 