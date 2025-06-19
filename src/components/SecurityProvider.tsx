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
        document.body.classList.add('blur-sm');
      } else {
        document.body.classList.remove('blur-sm');
      }
    };

    // Add watermark for screenshot protection
    const addWatermark = () => {
      const watermark = document.createElement('div');
      watermark.id = 'security-watermark';
      watermark.className = 'fixed inset-0 pointer-events-none z-[9999] bg-gradient-to-br from-french-rose/5 via-carnation-pink/5 to-orchid-pink/5';
      
      // Add text watermarks
      const textWatermark = document.createElement('div');
      textWatermark.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 text-6xl font-black text-french-rose/10 uppercase tracking-[2rem] font-sans no-select';
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
      document.body.classList.remove('blur-sm');
    };
  }, []);

  const showSecurityWarning = () => {
    // Create warning overlay
    const warningOverlay = document.createElement('div');
    warningOverlay.className = 'fixed inset-0 bg-black/95 z-[999999] flex items-center justify-center text-french-rose font-sans text-center';
    
    warningOverlay.innerHTML = `
      <div class="p-8 max-w-lg">
        <div class="text-6xl mb-4">🚫</div>
        <h2 class="text-2xl font-black mb-4 uppercase">
          AÇÃO NÃO PERMITIDA
        </h2>
        <p class="text-xl font-bold mb-8">
          Este conteúdo é protegido. Screenshots, ferramentas de desenvolvedor e outras ações não são permitidas.
        </p>
        <button onclick="this.parentElement.parentElement.remove()" 
          class="bg-french-rose text-white border-none px-8 py-4 text-lg font-bold uppercase cursor-pointer hover:bg-french-rose/80 transition-colors duration-300 clip-diamond">
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
      <div className="fixed inset-0 pointer-events-none z-[9998] bg-gradient-to-br from-french-rose/2 via-transparent to-carnation-pink/2 bg-[length:100px_100px] animate-gradient" />
      
      {/* Security indicator */}
      <div className="fixed top-2 right-2 bg-french-rose/90 text-white px-3 py-1 rounded text-xs font-bold pointer-events-none z-[10000]">
        ⚠️ CONTEÚDO PROTEGIDO
      </div>
    </>
  );
} 