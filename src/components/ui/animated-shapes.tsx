'use client';

import { cn } from '@/lib/utils';

export interface AnimatedShapeProps {
  variant?: 'circle' | 'square' | 'star' | 'diamond' | 'hexagon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'french-rose' | 'carnation-pink' | 'orchid-pink' | 'misty-rose' | 'pink' | 'tickle-me-pink';
  animation?: 'float' | 'pulse' | 'bounce' | 'heartbeat' | 'morph' | 'shake';
  position?: string;
  className?: string;
}

const sizeVariants = {
  sm: 'w-8 h-8',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
};

const shapeVariants = {
  circle: 'rounded-full',
  square: 'rounded-lg',
  star: 'clip-star',
  diamond: 'clip-diamond rotate-45',
  hexagon: 'clip-hexagon',
};

const colorVariants = {
  'french-rose': 'bg-french-rose',
  'carnation-pink': 'bg-carnation-pink',
  'orchid-pink': 'bg-orchid-pink',
  'misty-rose': 'bg-misty-rose',
  'pink': 'bg-pink',
  'tickle-me-pink': 'bg-tickle-me-pink',
};

const animationVariants = {
  float: 'animate-float',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  heartbeat: 'animate-heartbeat',
  morph: 'animate-morph',
  shake: 'animate-shake',
};

export function AnimatedShape({
  variant = 'circle',
  size = 'md',
  color = 'french-rose',
  animation = 'float',
  position = 'absolute',
  className,
}: AnimatedShapeProps) {
  return (
    <div
      className={cn(
        position,
        sizeVariants[size],
        shapeVariants[variant],
        colorVariants[color],
        animationVariants[animation],
        className
      )}
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
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
      style={{ opacity }}
    >
      {Array.from({ length: shapes }).map((_, index) => (
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
          className={`
            ${index % 4 === 0 ? 'top-10 left-10' : ''}
            ${index % 4 === 1 ? 'top-20 right-20' : ''}
            ${index % 4 === 2 ? 'bottom-20 left-20' : ''}
            ${index % 4 === 3 ? 'bottom-10 right-10' : ''}
            ${index >= 4 ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}
          `}
        />
      ))}
    </div>
  );
} 