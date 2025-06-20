import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gradient' | 'brutalist';
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon';
  animation?: 'none' | 'hover' | 'heartbeat' | 'shake' | 'float';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', animation = 'none', asChild = false, style, ...props }, ref) => {
    const getButtonStyles = () => {
      const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap' as const,
        borderRadius: '6px',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        border: 'none',
        userSelect: 'none' as const,
      };

      const variantStyles = {
        default: {
          backgroundColor: '#e91e63',
          color: 'white',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        },
        destructive: {
          backgroundColor: '#ef4444',
          color: 'white',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        },
        outline: {
          border: '1px solid #e91e63',
          backgroundColor: 'transparent',
          color: '#e91e63',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        },
        secondary: {
          backgroundColor: '#ff69b4',
          color: 'black',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        },
        ghost: {
          backgroundColor: 'transparent',
          color: '#e91e63',
        },
        link: {
          backgroundColor: 'transparent',
          color: '#e91e63',
          textDecoration: 'underline',
          textUnderlineOffset: '4px',
        },
        gradient: {
          background: 'linear-gradient(135deg, #ff69b4, #e91e63, #9c27b0)',
          color: 'white',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        },
        brutalist: {
          backgroundColor: '#ffe4e1',
          color: 'black',
          fontWeight: '900',
          textTransform: 'uppercase' as const,
          letterSpacing: '0.1em',
          boxShadow: '8px 8px 0px rgba(0, 0, 0, 0.8)',
        },
      };

      const sizeStyles = {
        default: {
          height: '2.25rem',
          padding: '0.5rem 1rem',
        },
        sm: {
          height: '2rem',
          borderRadius: '6px',
          padding: '0 0.75rem',
          fontSize: '0.75rem',
        },
        lg: {
          height: '3rem',
          borderRadius: '8px',
          padding: '0 2rem',
          fontSize: '1.125rem',
          fontWeight: 'bold',
        },
        xl: {
          height: '4rem',
          borderRadius: '12px',
          padding: '0 3rem',
          fontSize: '1.25rem',
          fontWeight: '900',
        },
        icon: {
          height: '2.25rem',
          width: '2.25rem',
          padding: 0,
        },
      };

      const animationStyles = {
        none: {},
        hover: {},
        heartbeat: {
          animation: 'heartbeat 1.5s ease-in-out infinite',
        },
        shake: {},
        float: {
          animation: 'float 3s ease-in-out infinite',
        },
      };

      return {
        ...baseStyles,
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...animationStyles[animation],
      };
    };

    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        style={{ ...getButtonStyles(), ...style }}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button } 