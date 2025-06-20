import * as React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'pink' | 'gradient' | 'brutalist' | 'transparent';
  animation?: 'none' | 'hover' | 'float' | 'pulse' | 'heartbeat' | 'shake';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', animation = 'none', style, ...props }, ref) => {
    const getVariantStyles = () => {
      const baseStyles = {
        borderRadius: '12px',
        border: '1px solid',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        userSelect: 'none' as const,
      };

      const variantStyles = {
        default: {
          backgroundColor: 'white',
          borderColor: '#e5e7eb',
          color: 'black',
        },
        pink: {
          backgroundColor: '#dda0dd',
          borderColor: '#ff69b4',
          color: 'black',
        },
        gradient: {
          background: 'linear-gradient(135deg, #ff69b4, #e91e63, #9c27b0)',
          borderColor: '#e91e63',
          color: 'white',
        },
        brutalist: {
          backgroundColor: '#ffe4e1',
          borderColor: 'black',
          borderWidth: '4px',
          boxShadow: '8px 8px 0px rgba(0, 0, 0, 0.8)',
          color: 'black',
        },
        transparent: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          backdropFilter: 'blur(4px)',
        },
      };

      const animationStyles = {
        none: {},
        hover: {
          cursor: 'pointer',
        },
        float: {
          animation: 'float 3s ease-in-out infinite',
        },
        pulse: {
          cursor: 'pointer',
        },
        heartbeat: {
          cursor: 'pointer',
        },
        shake: {
          animation: 'shake 0.5s ease-in-out infinite',
        },
      };

      return {
        ...baseStyles,
        ...variantStyles[variant],
        ...animationStyles[animation],
      };
    };

    return (
      <div
        ref={ref}
        style={{ ...getVariantStyles(), ...style }}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.375rem',
      padding: '1.5rem',
      ...style
    }}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ style, ...props }, ref) => (
  <h3
    ref={ref}
    style={{
      fontWeight: '900',
      lineHeight: '1',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      ...style
    }}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ style, ...props }, ref) => (
  <p
    ref={ref}
    style={{
      fontSize: '0.875rem',
      fontWeight: 'bold',
      opacity: 0.8,
      ...style
    }}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <div 
    ref={ref} 
    style={{
      padding: '1.5rem',
      paddingTop: 0,
      ...style
    }} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '1.5rem',
      paddingTop: 0,
      ...style
    }}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } 