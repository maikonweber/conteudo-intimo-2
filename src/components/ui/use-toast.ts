import { useState, useCallback } from 'react';

type ToastVariant = 'default' | 'destructive' | 'success' | 'warning';

type ToastType = {
  id?: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

export function useToast() {
  const [toasts, setToasts] = useState<(ToastType & { id: string })[]>([]);

  const toast = useCallback((toastData: ToastType) => {
    const id = toastData.id || Math.random().toString(36).substr(2, 9);
    const duration = toastData.duration || 3000;
    
    const newToast = {
      ...toastData,
      id,
    };

    // Adiciona toast ao array
    setToasts(prev => [...prev, newToast]);
    
    // Remove toast após a duração especificada
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);

    // Retorna função para remoção manual
    return () => {
      setToasts(prev => prev.filter(t => t.id !== id));
    };
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toast,
    toasts,
    dismiss,
    dismissAll,
  };
} 