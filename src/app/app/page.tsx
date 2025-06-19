'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AppHome() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and authentication check
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-carnation-pink rounded-full animate-bounce">
            <span className="text-4xl">💕</span>
          </div>
          <h2 className="text-3xl font-black uppercase text-french-rose">
            CARREGANDO...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background romantic shapes */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 right-20 w-40 h-40 bg-french-rose rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-carnation-pink rounded-3xl animate-bounce"></div>
        <div className="absolute top-1/3 left-10 w-24 h-24 bg-pink rounded-lg rotate-45 animate-pulse"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-4xl">
          {/* Welcome Section */}
          <div className="mb-16">
            <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center bg-carnation-pink rounded-full transform -rotate-12 hover:rotate-0 transition-transform duration-500">
              <span className="text-6xl">🏠</span>
            </div>
            
            <h1 className="text-7xl font-black uppercase mb-6 transform rotate-1 text-french-rose drop-shadow-lg">
              💖 BEM-VINDO AO APP
            </h1>
            
            <div className="p-6 inline-block transform -rotate-1 font-bold text-xl text-black max-w-2xl bg-misty-rose rounded-lg shadow-xl">
              SUA JORNADA ÍNTIMA COMEÇA AQUI! EXPLORE TODAS AS FUNCIONALIDADES INCRÍVEIS!
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Feed */}
            <Link href="/app/feed">
              <div className="p-8 text-black font-bold transform hover:scale-105 transition-all duration-300 cursor-pointer bg-orchid-pink rounded-xl shadow-xl hover:shadow-2xl border-4 border-french-rose">
                <div className="text-5xl mb-4">📹</div>
                <h3 className="text-2xl font-black uppercase mb-3">FEED</h3>
                <p className="text-lg">
                  VÍDEOS EXCLUSIVOS E CONTEÚDO SENSUAL
                </p>
              </div>
            </Link>

            {/* Match */}
            <Link href="/app/match">
              <div className="p-8 text-black font-bold transform hover:scale-105 transition-all duration-300 cursor-pointer bg-carnation-pink rounded-xl shadow-xl hover:shadow-2xl border-4 border-french-rose">
                <div className="text-5xl mb-4">💕</div>
                <h3 className="text-2xl font-black uppercase mb-3">MATCH</h3>
                <p className="text-lg">
                  VIDEOCHAMADAS ROMÂNTICAS
                </p>
              </div>
            </Link>

            {/* Chat */}
            <Link href="/app/chat">
              <div className="p-8 text-black font-bold transform hover:scale-105 transition-all duration-300 cursor-pointer bg-pink rounded-xl shadow-xl hover:shadow-2xl border-4 border-french-rose">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="text-2xl font-black uppercase mb-3">CHAT</h3>
                <p className="text-lg">
                  CONVERSAS ÍNTIMAS E PRIVADAS
                </p>
              </div>
            </Link>

            {/* Random */}
            <Link href="/app/random">
              <div className="p-8 text-black font-bold transform hover:scale-105 transition-all duration-300 cursor-pointer bg-cherry-blossom-pink rounded-xl shadow-xl hover:shadow-2xl border-4 border-french-rose">
                <div className="text-5xl mb-4">🎲</div>
                <h3 className="text-2xl font-black uppercase mb-3">RANDOM</h3>
                <p className="text-lg">
                  ENCONTROS ALEATÓRIOS EMOCIONANTES
                </p>
              </div>
            </Link>

            {/* Profile */}
            <Link href="/app/profile">
              <div className="p-8 text-black font-bold transform hover:scale-105 transition-all duration-300 cursor-pointer bg-tickle-me-pink rounded-xl shadow-xl hover:shadow-2xl border-4 border-french-rose">
                <div className="text-5xl mb-4">👤</div>
                <h3 className="text-2xl font-black uppercase mb-3">PERFIL</h3>
                <p className="text-lg">
                  CONFIGURE SUA CONTA
                </p>
              </div>
            </Link>

            {/* Settings */}
            <div className="p-8 text-black font-bold transform hover:scale-105 transition-all duration-300 cursor-pointer bg-bakermiller-pink rounded-xl shadow-xl hover:shadow-2xl border-4 border-french-rose">
              <div className="text-5xl mb-4">⚙️</div>
              <h3 className="text-2xl font-black uppercase mb-3">CONFIGURAÇÕES</h3>
              <p className="text-lg">
                PERSONALIZE SUA EXPERIÊNCIA
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="p-8 inline-block transform rotate-1 font-bold text-black bg-french-rose rounded-xl shadow-2xl">
            <h2 className="text-3xl font-black uppercase mb-4 text-white">
              🌟 PRONTO PARA EXPLORAR?
            </h2>
            <p className="text-xl text-white">
              ESCOLHA UMA OPÇÃO ACIMA E COMECE SUA AVENTURA!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 