"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
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

      {/* Animated background with broken heart shapes */}
      <div className="absolute inset-0">
        {/* Broken heart pieces */}
        <div 
          className="absolute top-10 right-10 w-32 h-32 animate-bounce"
          style={{ 
            backgroundColor: 'var(--french-rose)',
            clipPath: 'polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%)',
            animationDuration: '2s'
          }}
        ></div>
        <div 
          className="absolute top-16 right-20 w-32 h-32 animate-bounce"
          style={{ 
            backgroundColor: 'var(--carnation-pink)',
            clipPath: 'polygon(50% 0%, 100% 0%, 100% 50%, 50% 50%)',
            animationDuration: '2.5s',
            animationDelay: '0.5s'
          }}
        ></div>
        
        {/* Floating question marks */}
        <div 
          className="absolute top-1/4 left-10 w-16 h-24 transform rotate-12"
          style={{ 
            backgroundColor: 'var(--orchid-pink)',
            clipPath: 'polygon(20% 0%, 80% 0%, 80% 45%, 60% 45%, 60% 70%, 40% 70%, 40% 45%, 20% 45%), polygon(40% 80%, 60% 80%, 60% 100%, 40% 100%)',
            animation: 'float 3s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-1/4 w-12 h-18 transform -rotate-45"
          style={{ 
            backgroundColor: 'var(--pink)',
            clipPath: 'polygon(20% 0%, 80% 0%, 80% 45%, 60% 45%, 60% 70%, 40% 70%, 40% 45%, 20% 45%), polygon(40% 80%, 60% 80%, 60% 100%, 40% 100%)',
            animation: 'float 4s ease-in-out infinite reverse'
          }}
        ></div>
        
        {/* Glitchy error shapes */}
        <div 
          className="absolute top-1/2 left-1/4 w-24 h-8 transform skew-x-12"
          style={{ 
            backgroundColor: 'var(--bakermiller-pink)',
            animation: 'glitch 1s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/2 w-16 h-16 transform rotate-45"
          style={{ 
            backgroundColor: 'var(--tickle-me-pink)',
            clipPath: 'polygon(0 0, 0 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0)',
            animation: 'shake 0.8s ease-in-out infinite'
          }}
        ></div>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(-8deg); }
        }
        
        @keyframes glitch {
          0%, 100% { transform: translateX(0) skew(0deg); }
          20% { transform: translateX(-5px) skew(-5deg); }
          40% { transform: translateX(5px) skew(5deg); }
          60% { transform: translateX(-3px) skew(-3deg); }
          80% { transform: translateX(3px) skew(3deg); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(45deg); }
          25% { transform: translateX(-5px) rotate(40deg); }
          75% { transform: translateX(5px) rotate(50deg); }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .error-glitch {
          animation: glitch 0.5s ease-in-out infinite;
        }
        
        .hover-heartbeat:hover {
          animation: heartbeat 0.6s ease-in-out infinite;
        }
      `}</style>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-4xl">
          {/* 404 Title */}
          <div className="mb-12">
            <h1 className="text-9xl md:text-[12rem] font-black uppercase leading-none mb-4 transform -rotate-3 error-glitch">
              <span 
                className="block"
                style={{
                  color: 'var(--french-rose)',
                  textShadow: '8px 8px 0px #000, 16px 16px 0px rgba(255,255,255,0.1)'
                }}
              >
                404
              </span>
            </h1>
            
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 transform rotate-1">
              <span className="block text-white">PÁGINA</span>
              <span 
                className="block ml-8"
                style={{ color: 'var(--carnation-pink)' }}
              >
                💔 PERDIDA
              </span>
            </h2>
          </div>

          {/* Error message */}
          <div 
            className="p-8 mb-12 transform -rotate-1 font-bold text-2xl text-black max-w-3xl mx-auto"
            style={{
              backgroundColor: 'var(--misty-rose)',
              clipPath: 'polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%)',
              boxShadow: '12px 12px 0px rgba(0,0,0,0.4)'
            }}
          >
            OPS! ESTA PÁGINA SE PERDEU NO CAMINHO DO AMOR... <br/>
            MAS NÃO SE PREOCUPE, TEMOS MUITO CONTEÚDO QUENTE TE ESPERANDO!
          </div>

          {/* Broken elements visual */}
          <div className="mb-12 flex justify-center items-center space-x-8">
            <div 
              className="w-20 h-20 flex items-center justify-center transform -rotate-12 hover-heartbeat"
              style={{
                backgroundColor: 'var(--carnation-pink)',
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
              }}
            >
              <span className="text-3xl">💔</span>
            </div>
            
            <div 
              className="text-6xl font-black"
              style={{ color: 'var(--french-rose)' }}
            >
              +
            </div>
            
            <div 
              className="w-20 h-20 flex items-center justify-center transform rotate-12 hover-heartbeat"
              style={{
                backgroundColor: 'var(--orchid-pink)',
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
              }}
            >
              <span className="text-3xl">🔍</span>
            </div>
            
            <div 
              className="text-6xl font-black"
              style={{ color: 'var(--french-rose)' }}
            >
              =
            </div>
            
            <div 
              className="w-20 h-20 flex items-center justify-center transform -rotate-6 hover-heartbeat"
              style={{
                backgroundColor: 'var(--pink)',
                clipPath: 'polygon(50% 0%, 80% 50%, 50% 100%, 20% 50%)'
              }}
            >
              <span className="text-3xl">😢</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
            <Link 
              href="/"
              className="text-white font-black text-2xl py-6 px-12 transform hover:rotate-1 transition-all duration-300 uppercase tracking-wider hover:scale-105 hover-heartbeat"
              style={{
                backgroundColor: 'var(--french-rose)',
                clipPath: 'polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)',
                boxShadow: '8px 8px 0px rgba(0,0,0,0.3)'
              }}
            >
              🏠 VOLTAR AO INÍCIO
            </Link>
            
            <Link
              href="/app/feed"
              className="bg-transparent text-white font-black text-2xl py-6 px-12 transform hover:-rotate-1 transition-all duration-300 uppercase tracking-wider hover:scale-105"
              style={{
                borderWidth: '4px',
                borderColor: 'var(--carnation-pink)',
                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
              }}
            >
              💕 VER CONTEÚDO
            </Link>
          </div>

          {/* Fun suggestions */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/app/match"
              className="p-6 transform -rotate-1 hover:rotate-0 transition-all duration-300 hover:scale-105 group"
              style={{
                backgroundColor: 'var(--orchid-pink)',
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)',
                boxShadow: '6px 6px 0px rgba(0,0,0,0.3)'
              }}
            >
              <div className="text-4xl mb-3">💕</div>
              <h3 className="font-black text-xl text-black uppercase mb-2">ENCONTRAR ALGUÉM</h3>
              <p className="text-black font-bold">Que tal um match especial?</p>
            </Link>

            <Link
              href="/app/chat"
              className="p-6 transform rotate-1 hover:rotate-0 transition-all duration-300 hover:scale-105 group"
              style={{
                backgroundColor: 'var(--carnation-pink)',
                clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px)',
                boxShadow: '6px 6px 0px rgba(0,0,0,0.3)'
              }}
            >
              <div className="text-4xl mb-3">💬</div>
              <h3 className="font-black text-xl text-black uppercase mb-2">CONVERSAR</h3>
              <p className="text-black font-bold">Bate-papo quente te espera</p>
            </Link>

            <Link
              href="/app/random"
              className="p-6 transform -rotate-1 hover:rotate-0 transition-all duration-300 hover:scale-105 group"
              style={{
                backgroundColor: 'var(--pink)',
                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)',
                boxShadow: '6px 6px 0px rgba(0,0,0,0.3)'
              }}
            >
              <div className="text-4xl mb-3">🎲</div>
              <h3 className="font-black text-xl text-black uppercase mb-2">SURPRESA</h3>
              <p className="text-black font-bold">Chat aleatório emocionante</p>
            </Link>
          </div>

          {/* Footer message */}
          <div className="mt-12">
            <p 
              className="text-lg font-bold"
              style={{ color: 'var(--misty-rose)' }}
            >
              💖 Não se preocupe, o amor sempre encontra um jeito! 💖
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 