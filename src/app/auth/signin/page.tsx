'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      window.location.href = '/api/auth/google';
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .hover-heartbeat:hover {
          animation: heartbeat 1s ease-in-out infinite;
        }
      `}</style>
      
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        color: '#ffffff',
        position: 'relative',
        padding: '1.5rem',
        fontFamily: "'Inter', sans-serif"
      }}>
        {/* Background shapes */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.15,
          zIndex: 1
        }}>
          <div style={{
            position: 'absolute',
            top: '2.5rem',
            right: '2.5rem',
            width: '9rem',
            height: '9rem',
            backgroundColor: '#ff5d8f',
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            animation: 'float 9s ease-in-out infinite'
          }} />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ width: '100%', maxWidth: '28rem' }}>
            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{
                width: '5rem',
                height: '5rem',
                margin: '0 auto 1.5rem auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-12deg)',
                backgroundColor: '#ffa6c1',
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
              }}>
                <span style={{ fontSize: '1.875rem' }}>💝</span>
              </div>
              
              <h1 style={{
                fontSize: '3rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                margin: '0 0 1rem 0',
                transform: 'rotate(1deg)',
                color: '#ff5d8f',
                textShadow: '4px 4px 0px #000',
                lineHeight: 1
              }}>
                🚪 ACESSO RÁPIDO
              </h1>
              
              <div style={{
                padding: '1rem',
                display: 'inline-block',
                transform: 'rotate(-1deg)',
                fontWeight: 700,
                color: '#000000',
                backgroundColor: '#fadde1',
                clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)'
              }}>
                ENTRE COM GOOGLE EM SEGUNDOS!
              </div>
            </div>

            {/* Main Container */}
            <div style={{
              padding: '2rem',
              backgroundColor: '#ffc4d6',
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
              boxShadow: '12px 12px 0px rgba(0,0,0,0.3)'
            }}>
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="hover-heartbeat"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  color: '#000000',
                  fontWeight: 900,
                  fontSize: '1.25rem',
                  padding: '2rem',
                  textTransform: 'uppercase',
                  backgroundColor: '#fadde1',
                  clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                  boxShadow: '10px 10px 0px rgba(0,0,0,0.4)',
                  border: 'none',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.5 : 1
                }}
              >
                <span style={{ fontSize: '2rem' }}>🌟</span>
                {isLoading ? '⏳ CONECTANDO...' : '🔗 ENTRAR COM GOOGLE'}
              </button>

              <div style={{ marginTop: '2rem' }}>
                <div style={{
                  padding: '0.75rem',
                  textAlign: 'center',
                  fontWeight: 700,
                  color: '#000000',
                  backgroundColor: '#ffa6c1',
                  clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))',
                  marginBottom: '1rem'
                }}>
                  ⚡ ACESSO INSTANTÂNEO
                </div>
                
                <div style={{
                  padding: '0.75rem',
                  textAlign: 'center',
                  fontWeight: 700,
                  color: '#000000',
                  backgroundColor: '#ffa6c1',
                  clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))',
                  marginBottom: '1rem'
                }}>
                  🔒 100% SEGURO
                </div>
                
                <div style={{
                  padding: '0.75rem',
                  textAlign: 'center',
                  fontWeight: 700,
                  color: '#000000',
                  backgroundColor: '#ffa6c1',
                  clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))'
                }}>
                  💕 SEM COMPLICAÇÕES
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <div style={{
                padding: '1rem',
                display: 'inline-block',
                fontWeight: 700,
                color: '#000000',
                backgroundColor: '#ffa6c1',
                clipPath: 'polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%)',
                marginBottom: '1rem'
              }}>
                PRIMEIRA VEZ AQUI?
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '1.5rem', 
                flexWrap: 'wrap'
              }}>
                <Link
                  href="/auth/login"
                  style={{
                    fontWeight: 900,
                    fontSize: '1.125rem',
                    color: '#ffffff',
                    padding: '0.75rem 1.5rem',
                    textTransform: 'uppercase',
                    backgroundColor: '#ff5d8f',
                    clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                    boxShadow: '4px 4px 0px rgba(0,0,0,0.3)',
                    textShadow: '2px 2px 0px #000',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}
                >
                  💖 LOGIN COMPLETO
                </Link>
                
                <Link
                  href="/auth/signup"
                  style={{
                    fontWeight: 900,
                    fontSize: '1.125rem',
                    color: '#000000',
                    padding: '0.75rem 1.5rem',
                    textTransform: 'uppercase',
                    backgroundColor: '#fadde1',
                    clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                    boxShadow: '4px 4px 0px rgba(0,0,0,0.3)',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}
                >
                  ✨ CRIAR CONTA
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 