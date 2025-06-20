'use client';

import { useState } from 'react';
import Link from 'next/link';

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
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      position: 'relative',
      overflow: 'hidden'
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
        {/* Floating shapes */}
        <div style={{
          position: 'absolute',
          top: '2.5rem',
          right: '2.5rem',
          width: '6rem',
          height: '6rem',
          backgroundColor: 'var(--french-rose)',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'heartbeat 2s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '2.5rem',
          width: '5rem',
          height: '5rem',
          backgroundColor: 'var(--orchid-pink)',
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)',
          animation: 'float 3s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '10%',
          width: '4rem',
          height: '4rem',
          backgroundColor: 'var(--carnation-pink)',
          borderRadius: '50%',
          animation: 'pulse 2s ease-in-out infinite'
        }} />
      </div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '32rem'
        }}>
          {/* Title Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <div style={{
              width: '6rem',
              height: '6rem',
              margin: '0 auto 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(12deg)',
              backgroundColor: 'var(--french-rose)',
              borderRadius: '50%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              animation: 'heartbeat 2s ease-in-out infinite'
            }}>
              <span style={{ fontSize: '2.5rem' }}>💘</span>
            </div>
            
            <h1 style={{
              fontSize: '4rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              marginBottom: '1rem',
              transform: 'rotate(-1deg)',
              color: 'var(--french-rose)',
              textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)',
              animation: 'float 3s ease-in-out infinite'
            }}>
              🌟 REGISTRAR
            </h1>
            
            <div style={{
              padding: '1rem',
              display: 'inline-block',
              transform: 'rotate(1deg)',
              fontWeight: 700,
              color: '#000000',
              backgroundColor: 'var(--misty-rose)',
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              CRIE SUA CONTA E EXPLORE!
            </div>
          </div>

          {/* Form Container */}
          <div style={{
            padding: '2rem',
            transform: 'rotate(-1deg)',
            backgroundColor: 'var(--misty-rose)',
            borderRadius: '0.75rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 8px 8px 0px rgba(0,0,0,0.3)',
            border: '4px solid #000000',
            color: '#000000'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                animation: 'shake 0.5s ease-in-out infinite'
              }}>
                💎 ESCOLHA SEU PERFIL
              </h2>
            </div>

            {/* User Type Selection */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: '1.5rem',
                  textAlign: 'center',
                  borderRadius: '0.5rem',
                  backgroundColor: userType === 'creator' ? 'var(--french-rose)' : 'var(--pink)',
                  border: userType === 'creator' ? '4px solid var(--misty-rose)' : '2px solid transparent',
                  color: userType === 'creator' ? '#ffffff' : '#000000',
                  transform: userType === 'creator' ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => setUserType('creator')}
              >
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  margin: '0 auto 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  backgroundColor: 'var(--french-rose)',
                  borderRadius: '50%',
                  animation: 'float 3s ease-in-out infinite'
                }}>
                  👑
                </div>
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem'
                }}>
                  CRIADOR
                </h4>
                <p style={{
                  fontSize: '0.875rem',
                  fontWeight: 700
                }}>
                  COMPARTILHE CONTEÚDO E GANHE DINHEIRO
                </p>
              </div>

              <div
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: '1.5rem',
                  textAlign: 'center',
                  borderRadius: '0.5rem',
                  backgroundColor: userType === 'viewer' ? 'var(--french-rose)' : 'var(--pink)',
                  border: userType === 'viewer' ? '4px solid var(--misty-rose)' : '2px solid transparent',
                  color: userType === 'viewer' ? '#ffffff' : '#000000',
                  transform: userType === 'viewer' ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => setUserType('viewer')}
              >
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  margin: '0 auto 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  backgroundColor: 'var(--carnation-pink)',
                  borderRadius: '50%',
                  animation: 'float 3s ease-in-out infinite'
                }}>
                  💖
                </div>
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem'
                }}>
                  ESPECTADOR
                </h4>
                <p style={{
                  fontSize: '0.875rem',
                  fontWeight: 700
                }}>
                  ACESSE CONTEÚDO EXCLUSIVO
                </p>
              </div>
            </div>

            {/* Google Sign Up Button */}
            <button
              onClick={handleGoogleSignUp}
              disabled={isLoading || !userType}
              style={{
                width: '100%',
                height: '4rem',
                backgroundColor: userType ? 'var(--french-rose)' : '#6b7280',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '1.25rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                cursor: userType ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                boxShadow: '8px 8px 0px rgba(0,0,0,0.3)',
                clipPath: 'polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)',
                opacity: userType ? 1 : 0.5,
                animation: userType ? 'heartbeat 2s ease-in-out infinite' : 'none',
                marginBottom: '1rem'
              }}
            >
              <span style={{ 
                fontSize: '1.5rem', 
                marginRight: '1rem',
                animation: 'heartbeat 1s ease-in-out infinite'
              }}>🌟</span>
              {isLoading ? '⏳ CRIANDO...' : '🚀 CONTINUAR COM GOOGLE'}
            </button>

            {/* Warning for user type */}
            {!userType && (
              <div style={{
                padding: '1rem',
                textAlign: 'center',
                backgroundColor: 'var(--pink)',
                borderRadius: '0.5rem',
                transform: 'rotate(1deg)',
                animation: 'shake 2s ease-in-out infinite'
              }}>
                <p style={{
                  fontWeight: 700,
                  color: '#000000'
                }}>
                  ⚠️ SELECIONE UM TIPO DE USUÁRIO PRIMEIRO!
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            marginTop: '2rem'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '1rem',
              backgroundColor: 'var(--pink)',
              borderRadius: '0.5rem',
              transform: 'rotate(1deg)',
              transition: 'transform 0.3s ease',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <p style={{
                fontWeight: 700,
                color: '#000000'
              }}>
                JÁ TEM UMA CONTA?{' '}
                <Link
                  href="/auth/signin"
                  style={{
                    textDecoration: 'underline',
                    color: 'var(--french-rose)',
                    transition: 'all 0.3s ease',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = 'none';
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.animation = 'shake 0.5s ease-in-out infinite';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = 'underline';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.animation = 'none';
                  }}
                >
                  ENTRAR AGORA! 💕
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 