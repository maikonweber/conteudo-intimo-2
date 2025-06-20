'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MessageCircle, Video, Phone } from 'lucide-react';
import './chat.css';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  type: 'text' | 'video' | 'audio';
}

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Ana Silva',
      avatar: '/avatars/ana.jpg',
      lastMessage: 'Oi! Como você está?',
      timestamp: '14:30',
      unreadCount: 2,
      isOnline: true,
      type: 'text',
    },
    {
      id: '2',
      name: 'Carlos Mendes',
      avatar: '/avatars/carlos.jpg',
      lastMessage: 'Vamos conversar por vídeo?',
      timestamp: '13:45',
      unreadCount: 0,
      isOnline: false,
      type: 'video',
    },
    {
      id: '3',
      name: 'Marina Costa',
      avatar: '/avatars/marina.jpg',
      lastMessage: 'Obrigada pela conversa!',
      timestamp: 'Ontem',
      unreadCount: 1,
      isOnline: true,
      type: 'audio',
    },
  ]);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="chat-type-icon" />;
      case 'audio':
        return <Phone className="chat-type-icon" />;
      default:
        return <MessageCircle className="chat-type-icon" />;
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <h1 className="chat-title">Conversas</h1>
        
        {/* Search */}
        <div className="chat-search-container">
          <Search className="chat-search-icon" />
          <input
            type="text"
            placeholder="Buscar conversas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="chat-search-input"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="chat-quick-actions">
        <div className="chat-quick-actions-grid">
          <Link
            href="/chat/random"
            className="chat-quick-action"
          >
            <MessageCircle className="chat-quick-action-icon" />
            <span className="chat-quick-action-label">Chat Aleatório</span>
          </Link>
          
          <Link
            href="/app/match"
            className="chat-quick-action pink"
          >
            <Video className="chat-quick-action-icon" />
            <span className="chat-quick-action-label">Vídeo Aleatório</span>
          </Link>
        </div>
      </div>

      {/* Chat List */}
      <div className="chat-list-container">
        {filteredChats.length === 0 ? (
          <div className="chat-list-empty">
            <MessageCircle className="chat-list-empty-icon" />
            <p>Nenhuma conversa encontrada</p>
            <p className="secondary">Comece uma nova conversa!</p>
          </div>
        ) : (
          <div className="chat-list">
            {filteredChats.map((chat) => (
              <Link
                key={chat.id}
                href={`/app/chat/${chat.id}`}
                className="chat-item"
              >
                <div className="chat-item-content">
                  <div className="chat-avatar-container">
                    <div className="chat-avatar">
                      <span className="chat-avatar-initial">
                        {chat.name.charAt(0)}
                      </span>
                    </div>
                    {chat.isOnline && (
                      <div className="chat-online-indicator"></div>
                    )}
                  </div>
                  
                  <div className="chat-item-details">
                    <div className="chat-item-header">
                      <h3 className="chat-item-name">{chat.name}</h3>
                      <div className="chat-item-meta">
                        <span className="chat-item-time">{chat.timestamp}</span>
                        {getTypeIcon(chat.type)}
                      </div>
                    </div>
                    <p className="chat-item-message">{chat.lastMessage}</p>
                  </div>
                  
                  {chat.unreadCount > 0 && (
                    <div className="chat-unread-badge">
                      <span className="chat-unread-count">{chat.unreadCount}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 