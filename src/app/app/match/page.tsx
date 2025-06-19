'use client';

import { useState, useRef } from 'react';
import { VideoPlayer } from '@/components/VideoPlayer';
import useUserMedia from '@/hooks/userUserMedia';
import { HiMicrophone, HiVideoCamera, HiHeart } from 'react-icons/hi2';
import { BiMicrophoneOff, BiVideoOff } from 'react-icons/bi';

export default function Match() {
  const [isMatching, setIsMatching] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [matchCountdown, setMatchCountdown] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);

  const {
    audioDevices,
    videoDevices,
    outputDevices,
    activeStream,
    selectedAudioDevice,
    selectedVideoDevice,
    selectedOutputDevice,
    switchInput,
    videoOff,
    muted,
    toggleMute,
    toggleVideo,
    switchAudioOutput,
  } = useUserMedia({ preferEnvironmentCamera: true });

  const startMatching = () => {
    setIsMatching(true);
    // TODO: Implement WebSocket connection for matching
    // Mock matching process
    setMatchCountdown(5);
    const interval = setInterval(() => {
      setMatchCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsMatched(true);
          setIsMatching(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endCall = () => {
    setIsMatched(false);
    // TODO: Implement call ending logic
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
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        .hover-heartbeat:hover {
          animation: heartbeat 1s ease-in-out infinite;
        }
        
        .hover-shake:hover {
          animation: shake 0.3s ease-in-out;
        }
        
        .searching-pulse {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Background romantic shapes */}
      <div className="absolute inset-0 opacity-15">
        <div 
          className="absolute top-10 right-10 w-32 h-32"
          style={{ 
            backgroundColor: 'var(--french-rose)',
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            animation: 'float 8s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute bottom-10 left-10 w-24 h-24"
          style={{ 
            backgroundColor: 'var(--carnation-pink)',
            borderRadius: '50% 60% 70% 40% / 60% 40% 50% 80%',
            animation: 'float 6s ease-in-out infinite reverse'
          }}
        ></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          {!isMatching && !isMatched ? (
            // Initial State - Brutal Style
            <div className="h-[calc(100vh-12rem)] flex flex-col items-center justify-center text-center">
              <div 
                className="w-40 h-40 mx-auto mb-8 flex items-center justify-center transform -rotate-12"
                style={{
                  backgroundColor: 'var(--carnation-pink)',
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                }}
              >
                <span className="text-8xl">💕</span>
              </div>
              
              <h1 
                className="text-6xl font-black uppercase mb-6 transform rotate-1"
                style={{ 
                  color: 'var(--french-rose)',
                  textShadow: '4px 4px 0px #000'
                }}
              >
                💫 MATCH ROMÂNTICO
              </h1>
              
              <div 
                className="p-6 mb-8 transform -rotate-1 font-bold text-xl text-black max-w-2xl"
                style={{
                  backgroundColor: 'var(--misty-rose)',
                  clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                }}
              >
                ENCONTRE ALGUÉM ESPECIAL PARA UMA VIDEOCHAMADA ÍNTIMA E CONECTE-SE DE VERDADE!
              </div>
              
              <button
                onClick={startMatching}
                className="text-white font-black text-3xl py-8 px-16 transform hover:rotate-1 transition-all duration-300 uppercase tracking-wider hover:scale-105 hover-shake"
                style={{
                  backgroundColor: 'var(--french-rose)',
                  clipPath: 'polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)',
                  boxShadow: '12px 12px 0px rgba(0,0,0,0.3)'
                }}
              >
                🎯 COMEÇAR BUSCA
              </button>
            </div>
          ) : isMatching ? (
            // Matching State - Brutal Style
            <div className="h-[calc(100vh-12rem)] flex flex-col items-center justify-center text-center">
              <div 
                className="w-40 h-40 mx-auto mb-8 flex items-center justify-center searching-pulse"
                style={{
                  backgroundColor: 'var(--french-rose)',
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                }}
              >
                <span className="text-8xl">💖</span>
              </div>
              
              <h2 
                className="text-5xl font-black uppercase mb-6"
                style={{ 
                  color: 'var(--french-rose)',
                  textShadow: '3px 3px 0px #000'
                }}
              >
                🔍 PROCURANDO AMOR...
              </h2>
              
              <div 
                className="p-6 inline-block transform rotate-1 font-bold text-black"
                style={{
                  backgroundColor: 'var(--orchid-pink)',
                  clipPath: 'polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%)'
                }}
              >
                ENCONTRANDO ALGUÉM PERFEITO PARA VOCÊ EM {matchCountdown} SEGUNDOS...
              </div>
            </div>
          ) : (
            // Matched State - Brutal Style
            <div className="h-[calc(100vh-12rem)] flex flex-col">
              {/* Header */}
              <div 
                className="p-6 mb-6 flex items-center justify-between"
                style={{ 
                  backgroundColor: 'var(--orchid-pink)',
                  clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)',
                  color: '#000'
                }}
              >
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-16 h-16 flex items-center justify-center font-black text-2xl transform -rotate-12"
                    style={{
                      backgroundColor: 'var(--misty-rose)',
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                    }}
                  >
                    💑
                  </div>
                  <div>
                    <h2 className="font-black text-2xl uppercase">CONEXÃO ATIVA</h2>
                    <p className="text-lg font-bold opacity-80">
                      💚 CONECTADO COM ALGUÉM ESPECIAL
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={endCall}
                  className="w-16 h-16 flex items-center justify-center text-white font-bold transform hover:scale-110 transition-transform duration-200"
                  style={{ 
                    backgroundColor: 'var(--french-rose)',
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                  }}
                >
                  ❌
                </button>
              </div>

              <div className="flex-1 relative">
                {/* Local Video Preview */}
                <div 
                  className="absolute bottom-6 right-6 w-48 h-64 z-10 border-4"
                  style={{ 
                    borderColor: 'var(--french-rose)',
                    clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)'
                  }}
                >
                  <div 
                    className="w-full h-full flex items-center justify-center text-white font-black text-lg"
                    style={{ backgroundColor: 'var(--carnation-pink)' }}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">📹</div>
                      <p>SUA CÂMERA</p>
                    </div>
                  </div>
                </div>

                {/* Remote Video */}
                <div 
                  className="w-full h-full border-8 flex items-center justify-center"
                  style={{ 
                    borderColor: 'var(--french-rose)',
                    backgroundColor: 'var(--orchid-pink)'
                  }}
                >
                  <div className="text-center text-black">
                    <div className="text-8xl mb-4">💖</div>
                    <h3 className="text-4xl font-black uppercase">
                      PESSOA ESPECIAL
                    </h3>
                    <p className="text-xl font-bold mt-2">
                      Vocês estão conectados!
                    </p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center space-x-6 py-8">
                <button
                  onClick={toggleMute}
                  className={`w-16 h-16 flex items-center justify-center font-bold transform hover:scale-110 transition-all duration-200 hover-heartbeat ${
                    muted ? 'text-white' : 'text-black'
                  }`}
                  style={{
                    backgroundColor: muted ? 'var(--french-rose)' : 'var(--carnation-pink)',
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                  }}
                >
                  {muted ? <BiMicrophoneOff className="w-8 h-8" /> : <HiMicrophone className="w-8 h-8" />}
                </button>

                <button
                  onClick={toggleVideo}
                  className={`w-16 h-16 flex items-center justify-center font-bold transform hover:scale-110 transition-all duration-200 hover-heartbeat ${
                    videoOff ? 'text-white' : 'text-black'
                  }`}
                  style={{
                    backgroundColor: videoOff ? 'var(--french-rose)' : 'var(--carnation-pink)',
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                  }}
                >
                  {videoOff ? <BiVideoOff className="w-8 h-8" /> : <HiVideoCamera className="w-8 h-8" />}
                </button>

                <button
                  className="w-20 h-20 flex items-center justify-center text-white font-bold transform hover:scale-110 transition-all duration-200 hover-heartbeat"
                  style={{ 
                    backgroundColor: 'var(--french-rose)',
                    clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                  }}
                >
                  <HiHeart className="w-10 h-10" />
                </button>

                <button
                  onClick={endCall}
                  className="w-16 h-16 flex items-center justify-center text-white font-bold transform hover:scale-110 transition-all duration-200 hover-shake"
                  style={{ 
                    backgroundColor: 'var(--french-rose)',
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                  }}
                >
                  <span className="text-2xl">📞</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 