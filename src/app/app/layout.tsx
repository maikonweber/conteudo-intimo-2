'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

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
    <div className="min-h-screen bg-black">
      {/* Background floating shapes */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-24 h-24 bg-french-rose rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-carnation-pink rounded-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-pink rounded-lg rotate-45 animate-pulse"></div>
      </div>

      <div className="flex relative z-10">
        {/* Sidebar Navigation */}
        <nav className="w-64 min-h-screen p-6 bg-orchid-pink shadow-2xl border-r-4 border-french-rose">
          {/* Logo/Title */}
          <div className="mb-12">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center transform -rotate-12 bg-french-rose rounded-full shadow-lg">
              <span className="text-2xl">💖</span>
            </div>
            <h1 className="text-xl font-black uppercase text-center text-black transform rotate-1 drop-shadow-md">
              Conteúdo<br/>Íntimo
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block w-full text-left p-4 font-black text-lg uppercase transition-all duration-300 transform hover:scale-105 rounded-lg shadow-lg hover:shadow-xl ${
                    isActive 
                      ? 'text-white bg-french-rose shadow-xl scale-105' 
                      : 'text-black bg-carnation-pink hover:bg-tickle-me-pink'
                  }`}
                >
                  <span className="text-2xl mr-3">{item.emoji}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 space-y-4">
            <div className="w-12 h-12 mx-auto flex items-center justify-center transform rotate-45 bg-misty-rose rounded-lg shadow-md">
              <span className="text-lg transform -rotate-45">✨</span>
            </div>
            <div className="w-8 h-8 mx-auto flex items-center justify-center transform -rotate-12 bg-cherry-blossom-pink rounded-full shadow-md">
              <span className="text-sm">💫</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
} 