import { NextResponse } from 'next/server';

interface ChatMessage {
  type: 'chat';
  message: {
    id: string;
    type: 'text' | 'audio' | 'image';
    content: string;
    sender: string;
    timestamp: number;
  };
}

// WebSocket server will be initialized only when needed in runtime
let wss: any = null;

function initWebSocketServer() {
  if (typeof window === 'undefined' && !wss && process.env.NODE_ENV !== 'production') {
    try {
      const { WebSocketServer } = require('ws');
      const port = process.env.WS_PORT || 3001;
      
      wss = new WebSocketServer({ 
        port: port,
        host: '0.0.0.0'
      });

      wss.on('connection', (ws: any) => {
        console.log('Client connected to WebSocket');

        ws.on('message', (message: any) => {
          try {
            const data = JSON.parse(message.toString()) as ChatMessage;
            
            // Broadcast the message to all connected clients except the sender
            wss.clients.forEach((client: any) => {
              if (client !== ws && client.readyState === 1) { // WebSocket.OPEN = 1
                client.send(JSON.stringify(data));
              }
            });
          } catch (error) {
            console.error('Error processing WebSocket message:', error);
          }
        });

        ws.on('close', () => {
          console.log('Client disconnected from WebSocket');
        });

        ws.on('error', (error: any) => {
          console.error('WebSocket error:', error);
        });
      });

      wss.on('error', (error: any) => {
        console.error('WebSocket Server error:', error);
      });

      console.log(`WebSocket server started on port ${port}`);
    } catch (error) {
      console.error('Failed to initialize WebSocket server:', error);
    }
  }
}

export async function GET() {
  // Only initialize WebSocket in development or when explicitly needed
  if (process.env.NODE_ENV === 'development') {
    initWebSocketServer();
  }
  
  return NextResponse.json({ 
    status: 'WebSocket endpoint available',
    message: 'Use WebSocket client to connect',
    port: process.env.WS_PORT || 3001
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Handle WebSocket-related POST requests if needed
    if (body.action === 'init' && process.env.NODE_ENV === 'development') {
      initWebSocketServer();
      return NextResponse.json({ success: true, message: 'WebSocket server initialized' });
    }
    
    return NextResponse.json({ success: false, message: 'Unknown action' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
} 