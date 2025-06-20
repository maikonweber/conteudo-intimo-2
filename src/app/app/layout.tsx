'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import '../globals.css';
import './app-layout.css';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/app', label: 'Home', emoji: '🏠' },
    { href: '/app/feed', label: 'Feed', emoji: '📹' },
    { href: '/app/match', label: 'Match', emoji: '💕' },
    { href: '/app/chat', label: 'Chat', emoji: '💬' },
    { href: '/app/random', label: 'Random', emoji: '🎲' },
    { href: '/app/profile', label: 'Perfil', emoji: '👤' },
  ];

  return (
    <div className="app-layout">
      {/* Background floating shapes */}
      <div className="app-background-shapes">
        <div className="bg-shape-1"></div>
        <div className="bg-shape-2"></div>
        <div className="bg-shape-3"></div>
      </div>

      <div className="app-flex-container">
        {/* Sidebar Navigation */}
        <nav className="app-sidebar">
          {/* Logo/Title */}
          <div className="app-logo-section">
            <div className="app-logo-circle">
              <span>💖</span>
            </div>
            <h1 className="app-logo-title">
              Conteúdo<br/>Íntimo
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="app-nav-links">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`app-nav-link ${isActive ? 'active' : 'inactive'}`}
                >
                  <span className="app-nav-link-emoji">{item.emoji}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Decorative Elements */}
          <div className="app-decorative-elements">
            <div className="app-decorative-1">
              <span>✨</span>
            </div>
            <div className="app-decorative-2">
              <span>💫</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="app-main-content">
          {children}
        </main>
      </div>
    </div>
  );
} 