import { useEffect, useRef, useState, useCallback } from 'react';

type WebSocketHookProps = {
  onMessage?: (message: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
};

type ConnectionStatus = 'Connecting' | 'Connected' | 'Disconnected';

export function useWebSocket({
  onMessage,
  onOpen,
  onClose,
  onError,
}: WebSocketHookProps = {}) {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('Disconnected');
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    setConnectionStatus('Connecting');
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001');
    wsRef.current = ws;

    ws.onopen = () => {
      setConnectionStatus('Connected');
      onOpen?.();
    };

    ws.onclose = () => {
      setConnectionStatus('Disconnected');
      onClose?.();
    };

    ws.onerror = (error) => {
      setConnectionStatus('Disconnected');
      onError?.(error);
    };

    ws.onmessage = (event) => {
      setLastMessage(event.data);
      onMessage?.(event.data);
    };
  }, [onMessage, onOpen, onClose, onError]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setConnectionStatus('Disconnected');
    }
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    connectionStatus,
    lastMessage,
    sendMessage,
    connect,
    disconnect,
  };
} 