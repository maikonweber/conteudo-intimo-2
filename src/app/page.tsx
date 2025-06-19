"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated background with romantic shapes */}
      <div className="absolute inset-0">
        {/* Heart shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 transform rotate-45 translate-x-32 -translate-y-32 animate-pulse bg-french-rose"></div>
        
        {/* Cupid arrow shape */}
        <div className="absolute top-1/4 left-0 w-72 h-24 transform -rotate-12 -translate-x-24 animate-bounce bg-tickle-me-pink"></div>
        
        {/* Heart shape */}
        <div className="absolute bottom-0 right-1/4 w-80 h-80 transform rotate-12 translate-y-24 bg-carnation-pink animate-bounce"></div>
        
        {/* Kiss lips shape */}
        <div className="absolute top-1/2 right-1/3 w-48 h-32 transform -rotate-45 bg-bakermiller-pink animate-spin"></div>
        
        {/* Diamond ring shape */}
        <div className="absolute top-3/4 left-1/4 w-32 h-32 transform rotate-12 bg-orchid-pink animate-pulse"></div>
      </div>

      {/* Animated fluid romantic shapes */}
      <div className="absolute inset-0">
        {/* Love bubble */}
        <div className="absolute top-20 left-1/4 w-64 h-64 opacity-80 bg-gradient-to-br from-orchid-pink to-carnation-pink rounded-full animate-pulse"></div>
        
        {/* Romantic cloud */}
        <div className="absolute bottom-32 left-1/2 w-72 h-72 opacity-70 bg-gradient-to-br from-pink to-cherry-blossom-pink rounded-full animate-bounce"></div>
        
        {/* Infinity symbol */}
        <div className="absolute top-32 right-12 w-40 h-20 opacity-60 bg-misty-rose animate-spin"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo Section */}
          <div className="mb-12 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="w-32 h-32 mx-auto mb-6 bg-french-rose rounded-full flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300 hover:scale-110 shadow-2xl">
              <span className="text-6xl">💖</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="mb-16 space-y-6">
            <h1 className="text-6xl md:text-8xl font-black uppercase text-french-rose transform -rotate-1 hover:rotate-1 transition-transform duration-500 drop-shadow-lg">
              💘 CONTEÚDO ÍNTIMO
            </h1>
            
            <div className="bg-orchid-pink text-black px-8 py-4 inline-block transform rotate-1 hover:-rotate-1 transition-transform duration-300 font-black text-xl uppercase shadow-lg">
              ✨ PLATAFORMA EXCLUSIVA PARA ADULTOS ✨
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Feature 1 */}
            <div className="bg-carnation-pink text-black p-6 transform -rotate-2 hover:rotate-0 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="font-black uppercase text-lg mb-2">PERFIL SEDUTOR</h3>
              <p className="font-bold text-sm">CONTEÚDO EXCLUSIVO</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-tickle-me-pink text-black p-6 transform rotate-2 hover:rotate-0 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="text-4xl mb-4">💕</div>
              <h3 className="font-black uppercase text-lg mb-2">ADMIRADORES</h3>
              <p className="font-bold text-sm">ENCONTROS ESPECIAIS</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-cherry-blossom-pink text-black p-6 transform -rotate-1 hover:rotate-0 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-black uppercase text-lg mb-2">CHAT PRIVADO</h3>
              <p className="font-bold text-sm">CONVERSAS ÍNTIMAS</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-misty-rose text-black p-6 transform rotate-1 hover:rotate-0 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-black uppercase text-lg mb-2">SEGURANÇA</h3>
              <p className="font-bold text-sm">PRIVACIDADE MÁXIMA</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-8">
            <div className="bg-pink text-black px-8 py-4 inline-block transform rotate-2 hover:-rotate-2 transition-transform duration-300 font-black text-xl uppercase shadow-lg">
              🌟 SUA CONEXÃO ESPECIAL TE ESPERA 🌟
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/auth/signin"
                className="bg-french-rose text-white px-8 py-4 font-black text-xl uppercase transform -rotate-1 hover:rotate-0 transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl"
              >
                💖 REGISTRAR GRÁTIS
              </Link>
              
              <Link
                href="/auth/login"
                className="bg-orchid-pink text-black px-8 py-4 font-black text-xl uppercase transform rotate-1 hover:rotate-0 transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl"
              >
                🔑 JÁ SOU MEMBRO
              </Link>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-16 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-bakermiller-pink text-black p-4 transform -rotate-1 font-bold">
                <div className="text-2xl mb-2">🎯</div>
                <p className="uppercase">DISCRIÇÃO TOTAL</p>
              </div>
              
              <div className="bg-carnation-pink-2 text-black p-4 transform rotate-1 font-bold">
                <div className="text-2xl mb-2">💎</div>
                <p className="uppercase">CONTEÚDO PROTEGIDO</p>
              </div>
              
              <div className="bg-pink text-black p-4 transform -rotate-1 font-bold">
                <div className="text-2xl mb-2">🌟</div>
                <p className="uppercase">AMBIENTE SEGURO</p>
              </div>
            </div>
            
            <div className="bg-black/50 p-6 backdrop-blur-sm border border-french-rose">
              <p className="text-french-rose font-bold text-lg mb-2">💕 TERMOS PRIVACIDADE CONTATO</p>
              <p className="text-sm text-gray-300">© 2024 CONTEÚDO ÍNTIMO - TODOS OS DIREITOS RESERVADOS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
