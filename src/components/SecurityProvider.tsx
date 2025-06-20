'use client';

import { useEffect, ReactNode } from 'react';

interface SecurityProviderProps {
  children: ReactNode;
}

export default function SecurityProvider({ children }: SecurityProviderProps) {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable certain keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U') ||
        // Disable Ctrl+S (save)
        (e.ctrlKey && e.key === 's') ||
        // Disable Ctrl+A (select all)
        (e.ctrlKey && e.key === 'a') ||
        // Disable Ctrl+P (print)
        (e.ctrlKey && e.key === 'p') ||
        // Disable PrintScreen
        e.key === 'PrintScreen'
      ) {
        e.preventDefault();
        e.stopPropagation();
        
        // Show warning message
        showSecurityWarning();
        return false;
      }
    };

    // Detect DevTools
    let devtools = {
      open: false,
      orientation: null as string | null
    };
    
    const threshold = 160;
    
    setInterval(() => {
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        if (!devtools.open) {
          devtools.open = true;
          handleDevToolsOpen();
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    // Another DevTools detection method
    const detectDevTools = () => {
      const start = Date.now();
      console.clear();
      const end = Date.now();
      
      if (end - start > 100) {
        handleDevToolsOpen();
      }
    };

    const detectDevToolsInterval = setInterval(detectDevTools, 1000);

    // Disable screenshot capabilities (limited in browsers)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Blur content when tab is not visible
        document.body.style.filter = 'blur(4px)';
      } else {
        document.body.style.filter = 'none';
      }
    };

    // Add watermark for screenshot protection
    const addWatermark = () => {
      const watermark = document.createElement('div');
      watermark.id = 'security-watermark';
      watermark.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 9999;
        background: linear-gradient(135deg, rgba(255, 93, 143, 0.05), rgba(255, 164, 193, 0.05), rgba(255, 196, 214, 0.05));
      `;
      
      // Add text watermarks
      const textWatermark = document.createElement('div');
      textWatermark.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 3.75rem;
        font-weight: 900;
        color: rgba(255, 93, 143, 0.1);
        text-transform: uppercase;
        letter-spacing: 2rem;
        font-family: sans-serif;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      `;
      textWatermark.textContent = 'CONTEÚDO PROTEGIDO';
      
      watermark.appendChild(textWatermark);
      document.body.appendChild(watermark);
    };

    // Event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initialize security features
    addWatermark();

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      clearInterval(detectDevToolsInterval);
      
      // Remove security elements
      const watermark = document.getElementById('security-watermark');
      if (watermark) watermark.remove();
      
      // Reset body filter
      document.body.style.filter = 'none';
    };
  }, []);

  const showSecurityWarning = () => {
    // Create warning overlay
    const warningOverlay = document.createElement('div');
    warningOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.95);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--french-rose);
      font-family: sans-serif;
      text-align: center;
    `;
    
    warningOverlay.innerHTML = `
      <div style="padding: 2rem; max-width: 32rem;">
        <div style="font-size: 3.75rem; margin-bottom: 1rem;">🚫</div>
        <h2 style="font-size: 1.5rem; font-weight: 900; margin-bottom: 1rem; text-transform: uppercase;">
          AÇÃO NÃO PERMITIDA
        </h2>
        <p style="font-size: 1.25rem; font-weight: 700; margin-bottom: 2rem;">
          Este conteúdo é protegido. Screenshots, ferramentas de desenvolvedor e outras ações não são permitidas.
        </p>
        <button onclick="this.parentElement.parentElement.remove()" 
          style="background: var(--french-rose); color: white; border: none; padding: 1rem 2rem; font-size: 1.125rem; font-weight: 700; text-transform: uppercase; cursor: pointer; transition: background-color 0.3s ease; clip-path: polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%);">
          ENTENDIDO
        </button>
      </div>
    `;
    
    document.body.appendChild(warningOverlay);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (warningOverlay.parentElement) {
        warningOverlay.remove();
      }
    }, 5000);
  };

  const handleDevToolsOpen = () => {
    showSecurityWarning();
    
    // Optional: Redirect to a warning page or log the attempt
    console.clear();
    console.log('%c🚫 ACESSO NEGADO', 'color: #ff5d8f; font-size: 3rem; font-weight: bold;');
    console.log('%cEste conteúdo é protegido. O acesso às ferramentas de desenvolvedor não é permitido.', 'color: #ff5d8f; font-size: 1.2rem;');
  };

  return (
    <>
      {children}
      
      {/* Security overlay with watermark pattern */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 9998,
        background: 'linear-gradient(135deg, rgba(255, 93, 143, 0.02), transparent, rgba(255, 164, 193, 0.02))',
        backgroundSize: '100px 100px',
        animation: 'gradient 15s ease infinite'
      }} />
      
      {/* Security indicator */}
      <div style={{
        position: 'fixed',
        top: '0.5rem',
        right: '0.5rem',
        background: 'rgba(255, 93, 143, 0.9)',
        color: 'white',
        padding: '0.25rem 0.75rem',
        borderRadius: '0.25rem',
        fontSize: '0.75rem',
        fontWeight: 700,
        pointerEvents: 'none',
        zIndex: 10000
      }}>
        ⚠️ CONTEÚDO PROTEGIDO
      </div>
    </>
  );
} 