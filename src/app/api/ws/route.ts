import { WebSocketServer } from 'ws';
import { NextResponse } from 'next/server';

const wss = new WebSocketServer({ port: 3001 });

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

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString()) as ChatMessage;
      
      // Broadcast the message to all connected clients except the sender
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

export async function GET() {
  return new NextResponse('WebSocket server is running');
} 