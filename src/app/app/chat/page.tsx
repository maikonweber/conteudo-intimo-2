'use client';

import { useState, useRef, useEffect } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mic, Image, Send, Heart, Video, Phone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  type: 'text' | 'audio' | 'image' | 'system';
  content: string;
  sender: string;
  senderName: string;
  timestamp: number;
  isMe: boolean;
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastMessage?: string;
  unreadCount: number;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Mock data
  useEffect(() => {
    const mockUsers: ChatUser[] = [
      {
        id: '1',
        name: 'Luna Sensual',
        avatar: '/avatars/luna.jpg',
        isOnline: true,
        lastMessage: 'Oi amor, como você está? 💕',
        unreadCount: 3
      },
      {
        id: '2',
        name: 'Carlos Charmoso',
        avatar: '/avatars/carlos.jpg',
        isOnline: true,
        lastMessage: 'Que tal um encontro hoje?',
        unreadCount: 1
      },
      {
        id: '3',
        name: 'Bella Sedutora',
        avatar: '/avatars/bella.jpg',
        isOnline: false,
        lastMessage: 'Obrigada pelo presente! 😘',
        unreadCount: 0
      }
    ];
    
    setUsers(mockUsers);
    setSelectedUser(mockUsers[0]);

    // Mock messages
    const mockMessages: Message[] = [
      {
        id: '1',
        type: 'text',
        content: 'Oi! Como você está hoje? 💕',
        sender: '1',
        senderName: 'Luna Sensual',
        timestamp: Date.now() - 3600000,
        isMe: false
      },
      {
        id: '2',
        type: 'text',
        content: 'Oi Luna! Estava pensando em você 😍',
        sender: 'me',
        senderName: 'Você',
        timestamp: Date.now() - 3500000,
        isMe: true
      },
      {
        id: '3',
        type: 'text',
        content: 'Que doce! Quer fazer uma videochamada especial? 💖',
        sender: '1',
        senderName: 'Luna Sensual',
        timestamp: Date.now() - 3000000,
        isMe: false
      }
    ];
    
    setMessages(mockMessages);
  }, []);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedUser) return;

    const message: Message = {
      id: Date.now().toString(),
      type: 'text',
      content: inputMessage,
      sender: 'me',
      senderName: 'Você',
      timestamp: Date.now(),
      isMe: true,
    };

    setMessages((prev) => [...prev, message]);
    setInputMessage('');

    // Mock response after 2 seconds
    setTimeout(() => {
      const responses = [
        'Adorei sua mensagem! 💘',
        'Você me deixa sem palavras... 😍',
        'Quando nos vemos pessoalmente? 💕',
        'Estou com saudades suas! 💖',
        'Que tal uma surpresa especial? 😘'
      ];
      
      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: 'text',
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: selectedUser.id,
        senderName: selectedUser.name,
        timestamp: Date.now(),
        isMe: false,
      };
      
      setMessages((prev) => [...prev, response]);
    }, 2000);
  };

  const handleUserSelect = (user: ChatUser) => {
    setSelectedUser(user);
    // Update unread count
    setUsers(prev => prev.map(u => 
      u.id === user.id ? { ...u, unreadCount: 0 } : u
    ));
  };

  const startVideoCall = () => {
    toast({
      title: '💕 Videochamada iniciando...',
      description: 'Preparando sua conexão especial!',
    });
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
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute top-0 right-0 w-64 h-64 animate-pulse"
          style={{ 
            backgroundColor: 'var(--french-rose)',
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-48 h-48"
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
      `}</style>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar com lista de usuários */}
        <div className="w-80 border-r-4" style={{ borderColor: 'var(--french-rose)' }}>
          <div 
            className="p-6 font-black text-2xl uppercase"
            style={{ backgroundColor: 'var(--carnation-pink)', color: '#000' }}
          >
            💬 CONVERSAS ÍNTIMAS
          </div>
          
          <div className="overflow-y-auto h-full">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className={`p-4 cursor-pointer border-b-2 border-gray-800 hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 ${
                  selectedUser?.id === user.id ? 'bg-gray-800' : ''
                }`}
                style={{
                  borderBottomColor: selectedUser?.id === user.id ? 'var(--french-rose)' : undefined
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-black"
                      style={{ backgroundColor: 'var(--misty-rose)' }}
                    >
                      {user.name.slice(0, 2).toUpperCase()}
                    </div>
                    {user.isOnline && (
                      <div 
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black"
                        style={{ backgroundColor: 'var(--french-rose)' }}
                      ></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white truncate">{user.name}</h3>
                      {user.unreadCount > 0 && (
                        <span 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-black"
                          style={{ backgroundColor: 'var(--french-rose)' }}
                        >
                          {user.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 truncate">{user.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Área principal do chat */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              {/* Header do chat */}
              <div 
                className="p-4 border-b-4 flex items-center justify-between"
                style={{ 
                  backgroundColor: 'var(--orchid-pink)', 
                  borderBottomColor: 'var(--french-rose)',
                  color: '#000'
                }}
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                    style={{ backgroundColor: 'var(--misty-rose)' }}
                  >
                    {selectedUser.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="font-black text-lg uppercase">{selectedUser.name}</h2>
                    <p className="text-sm opacity-80">
                      {selectedUser.isOnline ? '💚 Online' : '⚫ Offline'}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={startVideoCall}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transform hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: 'var(--french-rose)' }}
                  >
                    <Video className="w-5 h-5" />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transform hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: 'var(--french-rose)' }}
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Mensagens */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 font-bold transform hover:scale-105 transition-transform duration-200 ${
                        message.isMe 
                          ? 'text-black' 
                          : 'text-black'
                      }`}
                      style={{
                        backgroundColor: message.isMe ? 'var(--carnation-pink)' : 'var(--misty-rose)',
                        clipPath: message.isMe 
                          ? 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)'
                          : 'polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px)',
                        boxShadow: '4px 4px 0px rgba(0,0,0,0.3)'
                      }}
                    >
                      {message.type === 'text' && <p>{message.content}</p>}
                      <div className="text-xs opacity-70 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input de mensagem */}
              <div 
                className="p-4 border-t-4"
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
                  />
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transform hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: 'var(--french-rose)' }}
                  >
                    <Image className="w-5 h-5" />
                  </button>
                  
                  <input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Digite sua mensagem sensual..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-4 py-2 bg-black text-white rounded-full border-2 focus:outline-none font-bold placeholder-gray-400"
                    style={{ borderColor: 'var(--french-rose)' }}
                  />
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transform hover:scale-110 transition-transform duration-200 disabled:opacity-50"
                    style={{ backgroundColor: 'var(--french-rose)' }}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                  
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transform hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: 'var(--french-rose)' }}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div 
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: 'var(--carnation-pink)' }}
                >
                  <Heart className="w-12 h-12 text-black" />
                </div>
                <h2 className="text-2xl font-black mb-2 uppercase" style={{ color: 'var(--carnation-pink)' }}>
                  💕 Selecione uma conversa
                </h2>
                <p className="text-gray-400">Escolha alguém especial para conversar</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 