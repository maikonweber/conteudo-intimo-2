'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FloatingShapes, AnimatedShape } from '@/components/ui/animated-shapes';

type UserType = 'creator' | 'viewer';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserType | null>(null);

  const handleGoogleSignUp = async () => {
    if (!userType) {
      alert('Por favor, selecione o tipo de usuário');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement Google OAuth with user type
      window.location.href = `/api/auth/google?type=${userType}`;
    } catch (error) {
      console.error('Error signing up with Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white no-select">
      {/* Background shapes usando componente reutilizável */}
      <FloatingShapes density="high" opacity={0.15} />
      
      {/* Formas extras customizadas */}
      <AnimatedShape 
        variant="star" 
        size="xl" 
        color="french-rose" 
        animation="heartbeat"
        className="top-10 left-10"
      />
      <AnimatedShape 
        variant="hexagon" 
        size="lg" 
        color="orchid-pink" 
        animation="morph"
        className="bottom-10 right-10"
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center transform rotate-12 bg-french-rose rounded-full shadow-xl animate-heartbeat">
              <span className="text-4xl">💘</span>
            </div>
            
            <h1 className="text-6xl font-black uppercase mb-4 transform -rotate-1 text-french-rose drop-shadow-lg animate-float">
              🌟 REGISTRAR
            </h1>
            
            <div className="p-4 inline-block transform rotate-1 font-bold text-black bg-misty-rose rounded-lg shadow-lg animate-pulse">
              CRIE SUA CONTA E EXPLORE!
            </div>
          </div>

          {/* Form Container usando Card component */}
          <Card variant="brutalist" animation="hover" className="transform -rotate-1">
            <CardHeader>
              <CardTitle className="text-2xl text-center animate-shake">
                💎 ESCOLHA SEU PERFIL
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* User Type Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card 
                  variant={userType === 'creator' ? 'gradient' : 'pink'}
                  animation="hover"
                  className={`cursor-pointer transition-all duration-300 ${
                    userType === 'creator' ? 'ring-4 ring-misty-rose' : ''
                  }`}
                  onClick={() => setUserType('creator')}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center text-4xl bg-french-rose rounded-full animate-float">
                      👑
                    </div>
                    <h4 className="text-xl font-black uppercase mb-2">
                      CRIADOR
                    </h4>
                    <p className="text-sm font-bold">
                      COMPARTILHE CONTEÚDO E GANHE DINHEIRO
                    </p>
                  </CardContent>
                </Card>

                <Card 
                  variant={userType === 'viewer' ? 'gradient' : 'pink'}
                  animation="hover"
                  className={`cursor-pointer transition-all duration-300 ${
                    userType === 'viewer' ? 'ring-4 ring-misty-rose' : ''
                  }`}
                  onClick={() => setUserType('viewer')}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center text-4xl bg-carnation-pink rounded-full animate-float">
                      💖
                    </div>
                    <h4 className="text-xl font-black uppercase mb-2">
                      ESPECTADOR
                    </h4>
                    <p className="text-sm font-bold">
                      ACESSE CONTEÚDO EXCLUSIVO
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Google Sign Up Button usando Button component */}
              <Button
                onClick={handleGoogleSignUp}
                disabled={isLoading || !userType}
                variant="brutalist"
                size="xl"
                animation="heartbeat"
                className={`w-full ${
                  userType ? 'hover:animate-pulse' : ''
                }`}
              >
                <span className="text-2xl mr-4 animate-heartbeat">🌟</span>
                {isLoading ? '⏳ CRIANDO...' : '🚀 CONTINUAR COM GOOGLE'}
              </Button>

              {/* Warning for user type */}
              {!userType && (
                <Card variant="pink" animation="shake" className="transform rotate-1">
                  <CardContent className="p-4 text-center">
                    <p className="font-bold text-black">
                      ⚠️ SELECIONE UM TIPO DE USUÁRIO PRIMEIRO!
                    </p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8">
            <Card variant="pink" animation="hover" className="transform rotate-1 inline-block">
              <CardContent className="p-4">
                <p className="font-bold text-black">
                  JÁ TEM UMA CONTA?{' '}
                  <Link
                    href="/auth/signin"
                    className="underline hover:no-underline transform hover:scale-105 transition-transform duration-200 inline-block text-french-rose hover:animate-shake"
                  >
                    ENTRAR AGORA! 💕
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 