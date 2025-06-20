'use client';

import { useState, useRef, useEffect } from 'react';
import './feed.css';

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
    <div className="feed-container">
      {videos.length > 0 ? (
        <div className="feed-video-container">
          {/* Video Player */}
          <div className="feed-video-background">
            <div className="feed-video-content">
              <div className="feed-video-icon">
                <span>📹</span>
              </div>
              <h2 className="feed-video-title">
                CONTEÚDO EXCLUSIVO
              </h2>
              <p className="feed-video-creator">
                @{videos[currentVideoIndex].creator.username}
              </p>
            </div>
          </div>

          {/* Video Info Overlay */}
          <div className="feed-overlay">
            <div className="feed-overlay-content">
              {/* Creator Info */}
              <div className="feed-creator-info">
                <div className="feed-creator-header">
                  <div className="feed-creator-avatar">
                    {videos[currentVideoIndex].creator.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="feed-creator-details">
                    <h3>@{videos[currentVideoIndex].creator.username}</h3>
                    <div className="feed-creator-status">
                      <div className="feed-status-dot"></div>
                      <span className="feed-status-text">AO VIVO</span>
                    </div>
                  </div>
                </div>
                
                <div className="feed-description">
                  {videos[currentVideoIndex].description}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="feed-actions">
                <button
                  onClick={() => handleLike(videos[currentVideoIndex].id)}
                  className="feed-action-button"
                >
                  <div className={`feed-action-icon like ${videos[currentVideoIndex].isLiked ? 'liked' : 'not-liked'}`}>
                    <span>{videos[currentVideoIndex].isLiked ? '❤️' : '🤍'}</span>
                  </div>
                  <span className="feed-action-count">
                    {videos[currentVideoIndex].likes.toLocaleString()}
                  </span>
                </button>

                <button
                  onClick={() => handleComment(videos[currentVideoIndex].id)}
                  className="feed-action-button shake"
                >
                  <div className="feed-action-icon comment">
                    <span>💬</span>
                  </div>
                  <span className="feed-action-count">
                    {videos[currentVideoIndex].comments}
                  </span>
                </button>

                <button
                  onClick={() => handleShare(videos[currentVideoIndex].id)}
                  className="feed-action-button shake"
                >
                  <div className="feed-action-icon share">
                    <span>📤</span>
                  </div>
                  <span className="feed-action-count">
                    {videos[currentVideoIndex].shares}
                  </span>
                </button>

                {/* Next Video Button */}
                <button
                  onClick={handleVideoEnd}
                  className="feed-action-button"
                >
                  <div className="feed-action-icon next">
                    <span>▶</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Video Progress Indicator */}
            <div className="feed-progress">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`feed-progress-dot ${index === currentVideoIndex ? 'active' : 'inactive'}`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="feed-loading">
          <div className="feed-loading-content">
            <div className="feed-loading-icon">
              <span>💕</span>
            </div>
            <h2 className="feed-loading-title">
              CARREGANDO CONTEÚDO...
            </h2>
            <p className="feed-loading-subtitle">
              Preparando algo especial para você!
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 