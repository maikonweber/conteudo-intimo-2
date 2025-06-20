'use client';

import * as React from "react"
import { X } from "lucide-react"
import * as ToastPrimitives from "@radix-ui/react-toast"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    style={{
      position: 'fixed',
      top: 0,
      zIndex: 100,
      display: 'flex',
      maxHeight: '100vh',
      width: '100%',
      flexDirection: 'column-reverse',
      padding: '1rem',
      ...className && {}
    }}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> {
  variant?: 'default' | 'destructive' | 'success' | 'warning';
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(({ className, variant = 'default', ...props }, ref) => {
  const getVariantStyles = () => {
    const baseStyles = {
      pointerEvents: 'auto' as const,
      position: 'relative' as const,
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.5rem',
      overflow: 'hidden',
      borderRadius: '6px',
      border: '2px solid',
      padding: '1rem',
      paddingRight: '1.5rem',
      boxShadow: '8px 8px 0px rgba(0, 0, 0, 0.8)',
      transition: 'all 0.3s ease',
      clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
      fontWeight: 'bold',
    };

    switch (variant) {
      case 'destructive':
        return {
          ...baseStyles,
          borderColor: '#ef4444',
          backgroundColor: '#ef4444',
          color: 'white',
        };
      case 'success':
        return {
          ...baseStyles,
          borderColor: '#e91e63',
          backgroundColor: '#e91e63',
          color: 'white',
        };
      case 'warning':
        return {
          ...baseStyles,
          borderColor: '#fbbf24',
          backgroundColor: '#fbbf24',
          color: 'black',
        };
      default:
        return {
          ...baseStyles,
          borderColor: '#ff69b4',
          backgroundColor: '#ff69b4',
          color: 'black',
        };
    }
  };

  return (
    <ToastPrimitives.Root
      ref={ref}
      style={getVariantStyles()}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    style={{
      display: 'inline-flex',
      height: '2rem',
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '6px',
      border: '1px solid',
      backgroundColor: 'transparent',
      padding: '0 0.75rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'colors 0.2s',
      cursor: 'pointer',
    }}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    style={{
      position: 'absolute',
      right: '0.25rem',
      top: '0.25rem',
      borderRadius: '6px',
      padding: '0.25rem',
      opacity: 0,
      transition: 'opacity 0.2s',
      cursor: 'pointer',
    }}
    {...props}
  >
    <X style={{ height: '1rem', width: '1rem' }} />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    style={{
      fontSize: '0.875rem',
      fontWeight: '900',
      textTransform: 'uppercase',
    }}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    style={{
      fontSize: '0.875rem',
      fontWeight: 'bold',
      opacity: 0.9,
    }}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastActionElement = React.ReactElement<typeof ToastAction>

function Toaster() {
  return (
    <ToastProvider>
      <ToastViewport />
    </ToastProvider>
  )
}

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  Toaster,
} 