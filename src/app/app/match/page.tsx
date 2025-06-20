'use client';

import { useState, useRef } from 'react';
import { VideoPlayer } from '@/components/VideoPlayer';
import useUserMedia from '@/hooks/userUserMedia';
import { HiMicrophone, HiVideoCamera, HiHeart } from 'react-icons/hi2';
import { BiMicrophoneOff, BiVideoOff } from 'react-icons/bi';
import './match.css';

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
    <div className="match-container">
      {/* Background romantic shapes */}
      <div className="match-background-shapes">
        <div className="match-bg-shape-1"></div>
        <div className="match-bg-shape-2"></div>
      </div>

      <div className="match-content">
        <div className="match-content-wrapper">
          {!isMatching && !isMatched ? (
            // Initial State - Brutal Style
            <div className="match-initial-state">
              <div className="match-initial-icon">
                <span>💕</span>
              </div>
              
              <h1 className="match-initial-title">
                💫 MATCH ROMÂNTICO
              </h1>
              
              <div className="match-initial-description">
                ENCONTRE ALGUÉM ESPECIAL PARA UMA VIDEOCHAMADA ÍNTIMA E CONECTE-SE DE VERDADE!
              </div>
              
              <button
                onClick={startMatching}
                className="match-start-button"
              >
                🎯 COMEÇAR BUSCA
              </button>
            </div>
          ) : isMatching ? (
            // Matching State - Brutal Style
            <div className="match-searching-state">
              <div className="match-searching-icon">
                <span>💖</span>
              </div>
              
              <h2 className="match-searching-title">
                🔍 PROCURANDO AMOR...
              </h2>
              
              <div className="match-searching-description">
                ENCONTRANDO ALGUÉM PERFEITO PARA VOCÊ EM {matchCountdown} SEGUNDOS...
              </div>
            </div>
          ) : (
            // Matched State - Brutal Style
            <div className="match-active-state">
              {/* Header */}
              <div className="match-header">
                <div className="match-header-info">
                  <div className="match-header-icon">
                    💑
                  </div>
                  <div className="match-header-text">
                    <h2>CONEXÃO ATIVA</h2>
                    <p>
                      💚 CONECTADO COM ALGUÉM ESPECIAL
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={endCall}
                  className="match-end-button"
                >
                  ❌
                </button>
              </div>

              <div className="match-video-container">
                {/* Local Video Preview */}
                <div className="match-local-video">
                  <div className="match-local-video-content">
                    <div className="match-local-video-text">
                      <div>📹</div>
                      <p>SUA CÂMERA</p>
                    </div>
                  </div>
                </div>

                {/* Remote Video */}
                <div className="match-remote-video">
                  <div className="match-remote-video-content">
                    <div>💖</div>
                    <h3>
                      PESSOA ESPECIAL
                    </h3>
                    <p>
                      Vocês estão conectados!
                    </p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="match-controls">
                <button
                  onClick={toggleMute}
                  className={`match-control-button ${muted ? 'muted' : 'unmuted'}`}
                >
                  {muted ? <BiMicrophoneOff style={{ width: '2rem', height: '2rem' }} /> : <HiMicrophone style={{ width: '2rem', height: '2rem' }} />}
                </button>

                <button
                  onClick={toggleVideo}
                  className={`match-control-button ${videoOff ? 'video-off' : 'video-on'}`}
                >
                  {videoOff ? <BiVideoOff style={{ width: '2rem', height: '2rem' }} /> : <HiVideoCamera style={{ width: '2rem', height: '2rem' }} />}
                </button>

                <button className="match-heart-button">
                  <HiHeart style={{ width: '2.5rem', height: '2.5rem' }} />
                </button>

                <button
                  onClick={endCall}
                  className="match-call-end-button"
                >
                  <span>📞</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 