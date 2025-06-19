'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'usuario_especial',
    email: 'usuario@exemplo.com',
    bio: 'Aqui para conexões especiais e momentos únicos! 💕',
    location: 'Brasil',
    interests: ['Romance', 'Conversas Íntimas', 'Videochamadas']
  });
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: '💕 Perfil atualizado!',
      description: 'Suas informações foram salvas com sucesso!',
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        
        .hover-shake:hover {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>

      {/* Background romantic shapes */}
      <div className="absolute inset-0 opacity-15">
        <div 
          className="absolute top-20 right-20 w-32 h-32"
          style={{ 
            backgroundColor: 'var(--french-rose)',
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            animation: 'float 8s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute bottom-20 left-20 w-24 h-24"
          style={{ 
            backgroundColor: 'var(--carnation-pink)',
            borderRadius: '50% 60% 70% 40% / 60% 40% 50% 80%',
            animation: 'float 6s ease-in-out infinite reverse'
          }}
        ></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div 
              className="w-24 h-24 mx-auto mb-6 flex items-center justify-center transform -rotate-12"
              style={{
                backgroundColor: 'var(--carnation-pink)',
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
              }}
            >
              <span className="text-4xl">👤</span>
            </div>
            
            <h1 
              className="text-6xl font-black uppercase mb-4 transform rotate-1"
              style={{ 
                color: 'var(--french-rose)',
                textShadow: '4px 4px 0px #000'
              }}
            >
              💖 MEU PERFIL
            </h1>
            
            <div 
              className="p-4 inline-block transform -rotate-1 font-bold text-black"
              style={{
                backgroundColor: 'var(--misty-rose)',
                clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)'
              }}
            >
              CUSTOMIZE SUA EXPERIÊNCIA ÍNTIMA!
            </div>
          </div>

          {/* Profile Container */}
          <div 
            className="p-8 mb-8"
            style={{
              backgroundColor: 'var(--orchid-pink)',
              clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))',
              boxShadow: '12px 12px 0px rgba(0,0,0,0.3)'
            }}
          >
            {/* Profile Picture */}
            <div className="flex flex-col lg:flex-row gap-8 mb-8">
              <div className="lg:w-1/3">
                <div 
                  className="w-48 h-48 mx-auto flex items-center justify-center text-6xl font-black"
                  style={{
                    backgroundColor: 'var(--misty-rose)',
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)',
                    color: '#000'
                  }}
                >
                  😊
                </div>
                
                <button
                  className="w-full mt-4 text-white font-black text-lg py-3 px-6 transform hover:scale-105 transition-all duration-300 uppercase hover-shake"
                  style={{
                    backgroundColor: 'var(--french-rose)',
                    clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                    boxShadow: '6px 6px 0px rgba(0,0,0,0.3)'
                  }}
                >
                  📸 ALTERAR FOTO
                </button>
              </div>

              {/* Profile Info */}
              <div className="lg:w-2/3 space-y-6">
                <div>
                  <label className="block text-xl font-black uppercase mb-3 text-black">
                    👤 USERNAME
                  </label>
                  {isEditing ? (
                    <input
                      value={profileData.username}
                      onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                      className="w-full px-4 py-3 bg-black text-white font-bold border-4 focus:outline-none"
                      style={{ 
                        borderColor: 'var(--french-rose)',
                        clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)'
                      }}
                    />
                  ) : (
                    <div 
                      className="p-4 font-bold text-black"
                      style={{
                        backgroundColor: 'var(--carnation-pink)',
                        clipPath: 'polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)'
                      }}
                    >
                      @{profileData.username}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xl font-black uppercase mb-3 text-black">
                    📧 EMAIL
                  </label>
                  {isEditing ? (
                    <input
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-black text-white font-bold border-4 focus:outline-none"
                      style={{ 
                        borderColor: 'var(--french-rose)',
                        clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)'
                      }}
                    />
                  ) : (
                    <div 
                      className="p-4 font-bold text-black"
                      style={{
                        backgroundColor: 'var(--carnation-pink)',
                        clipPath: 'polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)'
                      }}
                    >
                      {profileData.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xl font-black uppercase mb-3 text-black">
                    💭 BIO
                  </label>
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 bg-black text-white font-bold border-4 focus:outline-none resize-none"
                      style={{ 
                        borderColor: 'var(--french-rose)',
                        clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)'
                      }}
                    />
                  ) : (
                    <div 
                      className="p-4 font-bold text-black"
                      style={{
                        backgroundColor: 'var(--carnation-pink)',
                        clipPath: 'polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)'
                      }}
                    >
                      {profileData.bio}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="text-white font-black text-xl py-4 px-8 transform hover:scale-105 transition-all duration-300 uppercase hover-shake"
                    style={{
                      backgroundColor: 'var(--french-rose)',
                      clipPath: 'polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)',
                      boxShadow: '8px 8px 0px rgba(0,0,0,0.3)'
                    }}
                  >
                    💾 SALVAR
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-black font-black text-xl py-4 px-8 transform hover:scale-105 transition-all duration-300 uppercase hover-shake"
                    style={{
                      backgroundColor: 'var(--misty-rose)',
                      clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)',
                      boxShadow: '8px 8px 0px rgba(0,0,0,0.3)'
                    }}
                  >
                    ❌ CANCELAR
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-white font-black text-xl py-4 px-8 transform hover:scale-105 transition-all duration-300 uppercase hover-shake"
                  style={{
                    backgroundColor: 'var(--french-rose)',
                    clipPath: 'polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)',
                    boxShadow: '8px 8px 0px rgba(0,0,0,0.3)'
                  }}
                >
                  ✏️ EDITAR PERFIL
                </button>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              className="p-6 text-center font-bold text-black transform hover:scale-105 transition-all duration-300"
              style={{
                backgroundColor: 'var(--carnation-pink)',
                clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))',
                boxShadow: '6px 6px 0px rgba(0,0,0,0.3)'
              }}
            >
              <div className="text-4xl mb-2">💕</div>
              <h3 className="text-2xl font-black uppercase mb-2">CONEXÕES</h3>
              <p className="text-3xl font-black">24</p>
            </div>

            <div 
              className="p-6 text-center font-bold text-black transform hover:scale-105 transition-all duration-300"
              style={{
                backgroundColor: 'var(--pink)',
                clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))',
                boxShadow: '6px 6px 0px rgba(0,0,0,0.3)'
              }}
            >
              <div className="text-4xl mb-2">💬</div>
              <h3 className="text-2xl font-black uppercase mb-2">MENSAGENS</h3>
              <p className="text-3xl font-black">156</p>
            </div>

            <div 
              className="p-6 text-center font-bold text-black transform hover:scale-105 transition-all duration-300"
              style={{
                backgroundColor: 'var(--cherry-blossom-pink)',
                clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))',
                boxShadow: '6px 6px 0px rgba(0,0,0,0.3)'
              }}
            >
              <div className="text-4xl mb-2">📹</div>
              <h3 className="text-2xl font-black uppercase mb-2">CHAMADAS</h3>
              <p className="text-3xl font-black">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 