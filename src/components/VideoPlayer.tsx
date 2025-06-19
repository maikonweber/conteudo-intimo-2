'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

interface VideoPlayerProps {
  client?: boolean;
  service?: boolean;
  remote?: boolean;
  audioDevices?: MediaDeviceInfo[];
  videoDevices?: MediaDeviceInfo[];
  outputDevices?: MediaDeviceInfo[];
  setActiveAudioDevice?: (id: string) => void;
  setActiveVideoDevice?: (id: string) => void;
  setActiveOutputDevice?: (id: string) => void;
  activeAudioDevice?: string;
  activeVideoDevice?: string;
  activeOutputDevice?: string;
  muted?: boolean;
  onMute?: () => void;
  videoOff?: boolean;
  onVideoOff?: () => void;
  stream?: MediaStream;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(({
  client = false,
  service = false,
  remote = false,
  audioDevices = [],
  videoDevices = [],
  outputDevices = [],
  setActiveAudioDevice,
  setActiveVideoDevice,
  setActiveOutputDevice,
  activeAudioDevice,
  activeVideoDevice,
  activeOutputDevice,
  muted = false,
  onMute,
  videoOff = false,
  onVideoOff,
  stream,
}, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
        className={`w-full h-full object-cover ${videoOff ? 'hidden' : ''}`}
      />
      {videoOff && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export { VideoPlayer }; 