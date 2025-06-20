'use client';

import { useState } from 'react';
import { Camera, Edit, Settings, Heart, Star, Crown, Coins, Shield, LogOut } from 'lucide-react';
import './profile.css';

interface UserProfile {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  isVerified: boolean;
  isPremium: boolean;
  coins: number;
  followers: number;
  following: number;
  likes: number;
  joinDate: string;
}

export default function ProfilePage() {
  const [profile] = useState<UserProfile>({
    id: '1',
    name: 'Usuário Premium',
    username: '@usuario_premium',
    bio: 'Criador de conteúdo exclusivo 💕 Aqui você encontra o melhor entretenimento adulto!',
    avatar: '/avatars/user.jpg',
    isVerified: true,
    isPremium: true,
    coins: 1250,
    followers: 2340,
    following: 156,
    likes: 12500,
    joinDate: 'Janeiro 2024',
  });

  const [isEditing, setIsEditing] = useState(false);

  const menuItems = [
    {
      icon: Settings,
      label: 'Configurações',
      description: 'Privacidade e conta',
      action: () => console.log('Settings'),
    },
    {
      icon: Coins,
      label: 'Carteira',
      description: `${profile.coins} moedas disponíveis`,
      action: () => console.log('Wallet'),
    },
    {
      icon: Crown,
      label: 'Premium',
      description: 'Recursos exclusivos',
      action: () => console.log('Premium'),
    },
    {
      icon: Shield,
      label: 'Segurança',
      description: 'Autenticação e privacidade',
      action: () => console.log('Security'),
    },
    {
      icon: LogOut,
      label: 'Sair',
      description: 'Desconectar da conta',
      action: () => console.log('Logout'),
      isDestructive: true,
    },
  ];

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        {/* Cover Image */}
        <div className="profile-cover">
          <div className="profile-cover-overlay"></div>
          <button className="profile-cover-button">
            <Camera style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="profile-info">
          {/* Avatar */}
          <div className="profile-avatar-container">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">
                <span className="profile-avatar-initial">
                  {profile.name.charAt(0)}
                </span>
              </div>
              <button className="profile-avatar-button">
                <Camera style={{ width: '1rem', height: '1rem' }} />
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="profile-details">
            <div className="profile-header-row">
              <div className="profile-name-section">
                <h1 className="profile-name">{profile.name}</h1>
                {profile.isVerified && (
                  <div className="profile-verified">
                    <span>✓</span>
                  </div>
                )}
                {profile.isPremium && (
                  <Crown className="profile-premium-icon" />
                )}
              </div>
              
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="profile-edit-button"
              >
                <Edit style={{ width: '1rem', height: '1rem' }} />
                <span>Editar</span>
              </button>
            </div>

            <p className="profile-username">{profile.username}</p>
            <p className="profile-bio">{profile.bio}</p>

            {/* Stats */}
            <div className="profile-stats">
              <div className="profile-stat">
                <div className="profile-stat-value purple">{profile.followers.toLocaleString()}</div>
                <div className="profile-stat-label">Seguidores</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-value pink">{profile.following}</div>
                <div className="profile-stat-label">Seguindo</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-value red">{profile.likes.toLocaleString()}</div>
                <div className="profile-stat-label">Curtidas</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-value yellow">{profile.coins}</div>
                <div className="profile-stat-label">Moedas</div>
              </div>
            </div>

            <div className="profile-join-date">
              Membro desde {profile.joinDate}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="profile-menu">
        <div className="profile-menu-list">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`profile-menu-item ${item.isDestructive ? 'destructive' : ''}`}
            >
              <div className="profile-menu-item-content">
                <div className={`profile-menu-icon-wrapper ${item.isDestructive ? 'destructive' : ''}`}>
                  <item.icon className={`profile-menu-icon ${item.isDestructive ? 'destructive' : ''}`} />
                </div>
                <div className="profile-menu-text">
                  <h3 className="profile-menu-label">{item.label}</h3>
                  <p className="profile-menu-description">{item.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Premium Banner */}
        {!profile.isPremium && (
          <div className="profile-premium-banner">
            <div className="profile-premium-header">
              <Crown className="profile-premium-icon" />
              <div>
                <h3 className="profile-premium-title">Torne-se Premium</h3>
                <p className="profile-premium-subtitle">Desbloqueie recursos exclusivos</p>
              </div>
            </div>
            <div className="profile-premium-features">
              <div>• Mensagens ilimitadas</div>
              <div>• Videochamadas em HD</div>
              <div>• Perfil em destaque</div>
              <div>• Sem anúncios</div>
            </div>
            <button className="profile-premium-button">
              Assinar Premium
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 