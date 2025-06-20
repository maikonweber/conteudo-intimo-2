'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Video, Users, Star, TrendingUp, Clock, Gift } from 'lucide-react';
import './home.css';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  href: string;
  color: string;
  bgColor: string;
}

interface Activity {
  id: string;
  type: 'like' | 'message' | 'follow' | 'gift';
  user: string;
  content: string;
  timestamp: string;
  avatar: string;
}

export default function HomePage() {
  const [user] = useState({
    name: 'Usuário Premium',
    coins: 1250,
    level: 'Premium',
    avatar: '/avatars/user.jpg',
  });

  const [quickActions] = useState<QuickAction[]>([
    {
      id: '1',
      title: 'Feed',
      description: 'Veja conteúdo exclusivo',
      icon: Heart,
      href: '/app/feed',
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
    },
    {
      id: '2',
      title: 'Chat',
      description: 'Conversas íntimas',
      icon: MessageCircle,
      href: '/app/chat',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
    },
    {
      id: '3',
      title: 'Vídeo Match',
      description: 'Encontros aleatórios',
      icon: Video,
      href: '/app/match',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/20',
    },
    {
      id: '4',
      title: 'Perfil',
      description: 'Configurar conta',
      icon: Users,
      href: '/app/profile',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
  ]);

  const [recentActivity] = useState<Activity[]>([
    {
      id: '1',
      type: 'like',
      user: 'Ana Silva',
      content: 'curtiu seu perfil',
      timestamp: '2 min',
      avatar: '/avatars/ana.jpg',
    },
    {
      id: '2',
      type: 'message',
      user: 'Carlos Mendes',
      content: 'enviou uma mensagem',
      timestamp: '5 min',
      avatar: '/avatars/carlos.jpg',
    },
    {
      id: '3',
      type: 'gift',
      user: 'Marina Costa',
      content: 'enviou um presente',
      timestamp: '10 min',
      avatar: '/avatars/marina.jpg',
    },
    {
      id: '4',
      type: 'follow',
      user: 'João Santos',
      content: 'começou a te seguir',
      timestamp: '15 min',
      avatar: '/avatars/joao.jpg',
    },
  ]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="home-activity-icon" style={{ color: '#f87171' }} />;
      case 'message':
        return <MessageCircle className="home-activity-icon" style={{ color: '#a78bfa' }} />;
      case 'gift':
        return <Gift className="home-activity-icon" style={{ color: '#fbbf24' }} />;
      case 'follow':
        return <Users className="home-activity-icon" style={{ color: '#60a5fa' }} />;
      default:
        return <Star className="home-activity-icon" style={{ color: '#9ca3af' }} />;
    }
  };

  const getActionIconColor = (id: string) => {
    switch (id) {
      case '1': return 'red';
      case '2': return 'purple';
      case '3': return 'pink';
      case '4': return 'blue';
      default: return 'red';
    }
  };

  return (
    <div className="home-container">
      {/* Header */}
      <div className="home-header">
        <div className="home-header-content">
          <div className="home-greeting">
            <h1>Olá, {user.name}! 👋</h1>
            <p>Bem-vindo de volta</p>
          </div>
          <div className="home-user-info">
            <div className="home-user-avatar-section">
              <div className="home-user-avatar">
                <span>
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="home-user-details">
                <div className="home-user-level">{user.level}</div>
                <div className="home-user-coins">{user.coins} moedas</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="home-content">
        <h2 className="home-section-title">
          <TrendingUp className="home-section-icon" />
          Ações Rápidas
        </h2>
        
        <div className="home-quick-actions">
          {quickActions.map((action) => (
            <Link
              key={action.id}
              href={action.href}
              className="home-quick-action"
            >
              <div className="home-quick-action-content">
                <div className={`home-quick-action-icon ${getActionIconColor(action.id)}`}>
                  <action.icon style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="home-stats">
          <div className="home-stat-card">
            <Heart className="home-stat-icon red" />
            <div className="home-stat-value red">24</div>
            <div className="home-stat-label">Curtidas</div>
          </div>
          
          <div className="home-stat-card">
            <MessageCircle className="home-stat-icon purple" />
            <div className="home-stat-value purple">12</div>
            <div className="home-stat-label">Mensagens</div>
          </div>
          
          <div className="home-stat-card">
            <Users className="home-stat-icon blue" />
            <div className="home-stat-value blue">156</div>
            <div className="home-stat-label">Seguidores</div>
          </div>
        </div>

        {/* Recent Activity */}
        <h2 className="home-section-title">
          <Clock className="home-section-icon" />
          Atividade Recente
        </h2>
        
        <div className="home-activity-list">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="home-activity-item">
              <div className="home-activity-content">
                <div className="home-activity-avatar">
                  <span>
                    {activity.user.charAt(0)}
                  </span>
                </div>
                
                <div className="home-activity-details">
                  <div className="home-activity-text">
                    <span className="home-activity-user">{activity.user}</span>
                    <span className="home-activity-action">{activity.content}</span>
                  </div>
                  <div className="home-activity-meta">
                    {getActivityIcon(activity.type)}
                    <span className="home-activity-time">{activity.timestamp} atrás</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="home-view-all">
            <Link href="/app/profile">
              Ver todas as atividades →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 