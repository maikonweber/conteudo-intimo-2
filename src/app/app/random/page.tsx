'use client';

import { useState, useRef, useEffect } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mic, Image, Send, Phone, PhoneOff, Heart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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
    <div className="min-h-screen bg-black text-white">
      {/* Custom CSS variables for the pink palette */}
      <style jsx global>{`
        :root {
          --misty-rose: #fadde1;
          --orchid-pink: #ffc4d6;
          --carnation-pink: #ffa6c1;
          --tickle-me-pink: #ff87ab;
          --french-rose: #ff5d8f;
          --bakermiller-pink: #ff97b7;
          --carnation-pink-2: #ffacc5;
          --pink: #ffcad4;
          --cherry-blossom-pink: #f4acb7;
        }
      `}</style>

      {/* Background romantic shapes */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-0 left-0 w-64 h-64 animate-pulse"
          style={{ 
            backgroundColor: 'var(--french-rose)',
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
          }}
        ></div>
        <div 
          className="absolute bottom-0 right-0 w-48 h-48"
          style={{ 
            backgroundColor: 'var(--carnation-pink)',
            borderRadius: '50% 60% 70% 40% / 60% 40% 50% 80%',
            animation: 'float 6s ease-in-out infinite'
          }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .hover-shake:hover {
          animation: shake 0.5s ease-in-out;
        }
        
        .searching-animation {
          animation: heartbeat 1s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10 h-screen flex flex-col">
        {!isConnected && !isSearching ? (
          // Initial State - Brutal Style
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-2xl">
              <div 
                className="w-32 h-32 mx-auto mb-8 flex items-center justify-center transform -rotate-12"
                style={{
                  backgroundColor: 'var(--carnation-pink)',
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
                }}
              >
                <span className="text-6xl">🎲</span>
              </div>
              
              <h1 
                className="text-6xl font-black uppercase mb-6 transform rotate-1"
                style={{ 
                  color: 'var(--french-rose)',
                  textShadow: '4px 4px 0px #000'
                }}
              >
                💫 CHAT ALEATÓRIO
              </h1>
              
              <div 
                className="p-6 mb-8 transform -rotate-1 font-bold text-xl text-black"
                style={{
                  backgroundColor: 'var(--misty-rose)',
                  clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                }}
              >
                CONECTE-SE COM PESSOAS INCRÍVEIS DE FORMA TOTALMENTE ALEATÓRIA!
              </div>
              
              <button
                onClick={startRandomSearch}
                className="text-white font-black text-2xl py-6 px-12 transform hover:rotate-1 transition-all duration-300 uppercase tracking-wider hover:scale-105 hover-shake"
                style={{
                  backgroundColor: 'var(--french-rose)',
                  clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                  boxShadow: '8px 8px 0px rgba(0,0,0,0.3)'
                }}
              >
                🎯 COMEÇAR BUSCA
              </button>
            </div>
          </div>
        ) : isSearching ? (
          // Searching State - Brutal Style
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <div 
                className="w-32 h-32 mx-auto mb-8 flex items-center justify-center searching-animation"
                style={{
                  backgroundColor: 'var(--carnation-pink)',
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                }}
              >
                <span className="text-6xl">💕</span>
              </div>
              
              <h2 
                className="text-4xl font-black uppercase mb-4"
                style={{ 
                  color: 'var(--french-rose)',
                  textShadow: '2px 2px 0px #000'
                }}
              >
                🔍 PROCURANDO...
              </h2>
              
              <div 
                className="p-4 inline-block transform rotate-1 font-bold text-black"
                style={{
                  backgroundColor: 'var(--orchid-pink)',
                  clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px)'
                }}
              >
                ENCONTRANDO ALGUÉM ESPECIAL PARA VOCÊ...
              </div>
            </div>
          </div>
        ) : (
          // Chat State - Brutal Style
          <>
            {/* Header */}
            <div 
              className="p-4 flex items-center justify-between border-b-8"
              style={{ 
                backgroundColor: 'var(--orchid-pink)',
                borderBottomColor: 'var(--french-rose)',
                color: '#000'
              }}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 flex items-center justify-center font-black text-2xl transform -rotate-12"
                  style={{
                    backgroundColor: 'var(--misty-rose)',
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)'
                  }}
                >
                  🎭
                </div>
                <div>
                  <h2 className="font-black text-xl uppercase">{currentPartner}</h2>
                  <p className="text-sm font-bold opacity-80">💚 CONECTADO</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={toggleAudio}
                  className={`w-12 h-12 flex items-center justify-center font-bold transform hover:scale-110 transition-transform duration-200 ${
                    isAudioEnabled ? 'text-white' : 'text-black'
                  }`}
                  style={{ 
                    backgroundColor: isAudioEnabled ? 'var(--french-rose)' : 'var(--misty-rose)',
                    clipPath: 'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)'
                  }}
                >
                  {isAudioEnabled ? <PhoneOff className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
                </button>
                
                <button
                  onClick={endConnection}
                  className="w-12 h-12 flex items-center justify-center text-white font-bold transform hover:scale-110 transition-transform duration-200"
                  style={{ 
                    backgroundColor: 'var(--french-rose)',
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                  }}
                >
                  💔
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : message.sender === 'system' ? 'justify-center' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 font-bold transform hover:scale-105 transition-transform duration-200 ${
                      message.sender === 'system' 
                        ? 'text-white text-center' 
                        : 'text-black'
                    }`}
                    style={{
                      backgroundColor: message.sender === 'me' 
                        ? 'var(--carnation-pink)' 
                        : message.sender === 'system'
                          ? 'var(--french-rose)'
                          : 'var(--misty-rose)',
                      clipPath: message.sender === 'me' 
                        ? 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)'
                        : message.sender === 'system'
                          ? 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))'
                          : 'polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px)',
                      boxShadow: '4px 4px 0px rgba(0,0,0,0.3)'
                    }}
                  >
                    {message.type === 'text' && <p>{message.content}</p>}
                    {message.type === 'audio' && (
                      <audio controls src={message.content} className="w-full" />
                    )}
                    {message.type === 'image' && (
                      <img
                        src={message.content}
                        alt="Shared image"
                        className="max-w-full rounded-lg"
                      />
                    )}
                    <div className="text-xs opacity-70 mt-1">
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
            <div 
              className="p-4 border-t-8"
              style={{ 
                backgroundColor: 'var(--orchid-pink)',
                borderTopColor: 'var(--french-rose)'
              }}
            >
              <div className="flex space-x-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-12 h-12 flex items-center justify-center text-white font-bold transform hover:scale-110 transition-transform duration-200"
                  style={{ 
                    backgroundColor: 'var(--french-rose)',
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                  }}
                >
                  <Image className="w-6 h-6" />
                </button>
                
                <input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Digite uma mensagem misteriosa..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-3 bg-black text-white border-4 focus:outline-none font-bold placeholder-gray-400"
                  style={{ 
                    borderColor: 'var(--french-rose)',
                    clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)'
                  }}
                />
                
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="w-12 h-12 flex items-center justify-center text-white font-bold transform hover:scale-110 transition-transform duration-200 disabled:opacity-50"
                  style={{ 
                    backgroundColor: 'var(--french-rose)',
                    clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%)'
                  }}
                >
                  <Send className="w-6 h-6" />
                </button>
                
                <button
                  className="w-12 h-12 flex items-center justify-center text-white font-bold transform hover:scale-110 transition-transform duration-200"
                  style={{ 
                    backgroundColor: 'var(--french-rose)',
                    clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                  }}
                >
                  <Heart className="w-6 h-6" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 