'use client';

import { useState, useRef, useEffect } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mic, Image, Send, Phone, PhoneOff, Heart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import './random.css';

interface Message {
  id: string;
  type: 'text' | 'audio' | 'image';
  content: string;
  sender: string;
  timestamp: number;
}

export default function RandomChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [currentPartner, setCurrentPartner] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { sendMessage, lastMessage, connectionStatus } = useWebSocket({
    onMessage: (message) => {
      try {
        const data = JSON.parse(message);
        if (data.type === 'chat') {
          setMessages((prev) => [...prev, data.message]);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    },
  });

  useEffect(() => {
    setIsConnected(connectionStatus === 'Connected');
  }, [connectionStatus]);

  const startRandomSearch = () => {
    setIsSearching(true);
    setMessages([]);
    
    // Mock search process
    setTimeout(() => {
      setIsSearching(false);
      setIsConnected(true);
      setCurrentPartner('Pessoa Misteriosa');
      
      // Welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'text',
        content: 'Olá! Você foi conectado com alguém especial! 💕',
        sender: 'system',
        timestamp: Date.now(),
      };
      
      setMessages([welcomeMessage]);
      
      toast({
        title: '💖 Conexão estabelecida!',
        description: 'Você está conectado com alguém novo!',
      });
    }, 3000);
  };

  const endConnection = () => {
    setIsConnected(false);
    setCurrentPartner(null);
    setMessages([]);
    
    toast({
      title: '💔 Conexão encerrada',
      description: 'Que tal tentar novamente?',
    });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      type: 'text',
      content: inputMessage,
      sender: 'me',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, message]);
    setInputMessage('');

    // Mock response
    setTimeout(() => {
      const responses = [
        'Interessante! Conte-me mais... 😊',
        'Você parece ser muito especial! 💖',
        'Adorei conversar com você! 🥰',
        'Que coincidência incrível! 😍',
        'Estou gostando desta conversa! 💕'
      ];
      
      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: 'text',
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'stranger',
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, response]);
    }, 1500);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const message: Message = {
        id: Date.now().toString(),
        type: 'image',
        content: e.target?.result as string,
        sender: 'me',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, message]);
    };
    reader.readAsDataURL(file);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  return (
    <div className="random-chat-container">
      {/* Background romantic shapes */}
      <div className="random-background-shapes">
        <div className="random-bg-shape-1"></div>
        <div className="random-bg-shape-2"></div>
      </div>

      <div className="random-main-container">
        {!isConnected && !isSearching ? (
          // Initial State - Brutal Style
          <div className="random-initial-state">
            <div className="random-initial-content">
              <div className="random-initial-icon">
                <span>🎲</span>
              </div>
              
              <h1 className="random-initial-title">
                💫 CHAT ALEATÓRIO
              </h1>
              
              <div className="random-initial-description">
                CONECTE-SE COM PESSOAS INCRÍVEIS DE FORMA TOTALMENTE ALEATÓRIA!
              </div>
              
              <button
                onClick={startRandomSearch}
                className="random-start-button"
              >
                🎯 COMEÇAR BUSCA
              </button>
            </div>
          </div>
        ) : isSearching ? (
          // Searching State - Brutal Style
          <div className="random-searching-state">
            <div className="random-searching-content">
              <div className="random-searching-icon">
                <span>💕</span>
              </div>
              
              <h2 className="random-searching-title">
                🔍 PROCURANDO...
              </h2>
              
              <div className="random-searching-description">
                ENCONTRANDO ALGUÉM ESPECIAL PARA VOCÊ...
              </div>
            </div>
          </div>
        ) : (
          // Chat State - Brutal Style
          <>
            {/* Header */}
            <div className="random-chat-header">
              <div className="random-chat-header-info">
                <div className="random-chat-header-icon">
                  🎭
                </div>
                <div className="random-chat-header-text">
                  <h2>{currentPartner}</h2>
                  <p>💚 CONECTADO</p>
                </div>
              </div>
              
              <div className="random-chat-header-controls">
                <button
                  onClick={toggleAudio}
                  className={`random-header-button ${
                    isAudioEnabled ? 'audio-enabled' : 'audio-disabled'
                  }`}
                >
                  {isAudioEnabled ? <PhoneOff style={{ width: '1.5rem', height: '1.5rem' }} /> : <Phone style={{ width: '1.5rem', height: '1.5rem' }} />}
                </button>
                
                <button
                  onClick={endConnection}
                  className="random-header-button end-call"
                >
                  💔
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="random-messages-container">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`random-message-wrapper ${message.sender === 'me' ? 'me' : message.sender === 'system' ? 'system' : 'stranger'}`}
                >
                  <div
                    className={`random-message ${message.sender === 'me' ? 'me' : message.sender === 'system' ? 'system' : 'stranger'}`}
                  >
                    <div className="random-message-content">
                      {message.type === 'text' && <p>{message.content}</p>}
                      {message.type === 'audio' && (
                        <audio controls src={message.content} />
                      )}
                      {message.type === 'image' && (
                        <img
                          src={message.content}
                          alt="Shared image"
                        />
                      )}
                    </div>
                    <div className="random-message-time">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="random-input-container">
              <div className="random-input-wrapper">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="random-file-input"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="random-input-button image"
                >
                  <Image style={{ width: '1.5rem', height: '1.5rem' }} />
                </button>
                
                <input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Digite uma mensagem misteriosa..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="random-text-input"
                />
                
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="random-input-button send"
                >
                  <Send style={{ width: '1.5rem', height: '1.5rem' }} />
                </button>
                
                <button className="random-input-button heart">
                  <Heart style={{ width: '1.5rem', height: '1.5rem' }} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 