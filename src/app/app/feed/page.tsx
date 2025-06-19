'use client';

import { useState, useRef, useEffect } from 'react';

interface Video {
  id: string;
  url: string;
  creator: {
    id: string;
    username: string;
    avatar: string;
  };
  description: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
}

export default function Feed() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mock data - replace with actual API call
  useEffect(() => {
    setVideos([
      {
        id: '1',
        url: '/videos/sample1.mp4',
        creator: {
          id: '1',
          username: 'bella_sensual',
          avatar: '/avatars/1.jpg',
        },
        description: 'Conteúdo exclusivo só para vocês! 💕 #sensual #exclusivo',
        likes: 2847,
        comments: 234,
        shares: 89,
        isLiked: false,
      },
      {
        id: '2',
        url: '/videos/sample2.mp4',
        creator: {
          id: '2',
          username: 'carlos_charmoso',
          avatar: '/avatars/2.jpg',
        },
        description: 'Momento especial para compartilhar... 😍 #romantic #special',
        likes: 1923,
        comments: 156,
        shares: 67,
        isLiked: true,
      },
      {
        id: '3',
        url: '/videos/sample3.mp4',
        creator: {
          id: '3',
          username: 'luna_seductora',
          avatar: '/avatars/3.jpg',
        },
        description: 'Vocês pediram, aqui está! 🔥 #requested #hot',
        likes: 3456,
        comments: 389,
        shares: 145,
        isLiked: false,
      }
    ]);
  }, []);

  const handleVideoEnd = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    } else {
      setCurrentVideoIndex(0); // Loop back to first video
    }
  };

  const handleLike = (videoId: string) => {
    setVideos(prev => prev.map(video => {
      if (video.id === videoId) {
        return {
          ...video,
          likes: video.isLiked ? video.likes - 1 : video.likes + 1,
          isLiked: !video.isLiked,
        };
      }
      return video;
    }));
  };

  const handleShare = (videoId: string) => {
    // TODO: Implement share functionality
    console.log('Share video:', videoId);
  };

  const handleComment = (videoId: string) => {
    // TODO: Implement comment functionality
    console.log('Comment on video:', videoId);
  };

  return (
    <div className="h-screen bg-black">
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
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .hover-heartbeat:hover {
          animation: heartbeat 1s ease-in-out infinite;
        }
        
        .hover-shake:hover {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>

      {videos.length > 0 && (
        <div className="relative h-full">
          {/* Video Player */}
          <div className="w-full h-full bg-gradient-to-b from-purple-900/30 to-black/80">
            {/* Mock video background */}
            <div 
              className="w-full h-full flex items-center justify-center text-white"
              style={{
                background: `linear-gradient(135deg, var(--french-rose), var(--carnation-pink), var(--orchid-pink))`,
                backgroundSize: '400% 400%',
                animation: 'gradient 15s ease infinite'
              }}
            >
              <div className="text-center">
                <div 
                  className="w-32 h-32 mx-auto mb-6 flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                  }}
                >
                  <span className="text-6xl">📹</span>
                </div>
                <h2 className="text-4xl font-black uppercase">
                  CONTEÚDO EXCLUSIVO
                </h2>
                <p className="text-xl font-bold mt-2">
                  @{videos[currentVideoIndex].creator.username}
                </p>
              </div>
            </div>
          </div>

          {/* Video Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
            <div className="flex items-start space-x-6">
              {/* Creator Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <div 
                    className="w-14 h-14 flex items-center justify-center font-black text-lg text-black"
                    style={{
                      backgroundColor: 'var(--misty-rose)',
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                    }}
                  >
                    {videos[currentVideoIndex].creator.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-white font-black text-xl">
                      @{videos[currentVideoIndex].creator.username}
                    </span>
                    <div className="flex items-center mt-1">
                      <div 
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: 'var(--french-rose)' }}
                      ></div>
                      <span className="text-sm font-bold" style={{ color: 'var(--carnation-pink)' }}>
                        AO VIVO
                      </span>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="p-4 font-bold text-black inline-block"
                  style={{
                    backgroundColor: 'var(--orchid-pink)',
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
                    maxWidth: '80%'
                  }}
                >
                  {videos[currentVideoIndex].description}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-center space-y-6">
                <button
                  onClick={() => handleLike(videos[currentVideoIndex].id)}
                  className="flex flex-col items-center hover-heartbeat"
                >
                  <div 
                    className="w-16 h-16 flex items-center justify-center mb-2"
                    style={{
                      backgroundColor: videos[currentVideoIndex].isLiked ? 'var(--french-rose)' : 'var(--carnation-pink)',
                      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                      boxShadow: '4px 4px 0px rgba(0,0,0,0.3)'
                    }}
                  >
                    <span className={`text-2xl ${videos[currentVideoIndex].isLiked ? 'text-white' : 'text-black'}`}>
                      {videos[currentVideoIndex].isLiked ? '❤️' : '🤍'}
                    </span>
                  </div>
                  <span 
                    className="text-white text-sm font-black"
                    style={{ textShadow: '2px 2px 0px #000' }}
                  >
                    {videos[currentVideoIndex].likes.toLocaleString()}
                  </span>
                </button>

                <button
                  onClick={() => handleComment(videos[currentVideoIndex].id)}
                  className="flex flex-col items-center hover-shake"
                >
                  <div 
                    className="w-16 h-16 flex items-center justify-center mb-2"
                    style={{
                      backgroundColor: 'var(--carnation-pink)',
                      clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)',
                      boxShadow: '4px 4px 0px rgba(0,0,0,0.3)'
                    }}
                  >
                    <span className="text-2xl text-black">💬</span>
                  </div>
                  <span 
                    className="text-white text-sm font-black"
                    style={{ textShadow: '2px 2px 0px #000' }}
                  >
                    {videos[currentVideoIndex].comments}
                  </span>
                </button>

                <button
                  onClick={() => handleShare(videos[currentVideoIndex].id)}
                  className="flex flex-col items-center hover-shake"
                >
                  <div 
                    className="w-16 h-16 flex items-center justify-center mb-2"
                    style={{
                      backgroundColor: 'var(--carnation-pink)',
                      clipPath: 'polygon(50% 0%, 80% 50%, 50% 100%, 20% 50%)',
                      boxShadow: '4px 4px 0px rgba(0,0,0,0.3)'
                    }}
                  >
                    <span className="text-2xl text-black">📤</span>
                  </div>
                  <span 
                    className="text-white text-sm font-black"
                    style={{ textShadow: '2px 2px 0px #000' }}
                  >
                    {videos[currentVideoIndex].shares}
                  </span>
                </button>

                {/* Next Video Button */}
                <button
                  onClick={handleVideoEnd}
                  className="w-16 h-16 flex items-center justify-center hover-heartbeat"
                  style={{
                    backgroundColor: 'var(--french-rose)',
                    clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%)',
                    boxShadow: '4px 4px 0px rgba(0,0,0,0.3)'
                  }}
                >
                  <span className="text-white text-2xl font-black">▶</span>
                </button>
              </div>
            </div>

            {/* Video Progress Indicator */}
            <div className="mt-6 flex items-center justify-center space-x-2">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`w-3 h-3 transition-all duration-300 ${
                    index === currentVideoIndex ? 'scale-125' : 'hover:scale-110'
                  }`}
                  style={{
                    backgroundColor: index === currentVideoIndex ? 'var(--french-rose)' : 'var(--carnation-pink)',
                    clipPath: index === currentVideoIndex 
                      ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                      : 'circle(50%)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {videos.length === 0 && (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div 
              className="w-24 h-24 mx-auto mb-6 flex items-center justify-center"
              style={{
                backgroundColor: 'var(--carnation-pink)',
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                animation: 'heartbeat 2s ease-in-out infinite'
              }}
            >
              <span className="text-4xl">💕</span>
            </div>
            <h2 
              className="text-3xl font-black uppercase mb-2"
              style={{ color: 'var(--french-rose)' }}
            >
              CARREGANDO CONTEÚDO...
            </h2>
            <p className="text-gray-400 font-bold">
              Preparando algo especial para você!
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 