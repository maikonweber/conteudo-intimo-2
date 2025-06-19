import { useState, useEffect, useCallback } from 'react';

interface UseUserMediaOptions {
  preferEnvironmentCamera?: boolean;
}

export default function useUserMedia({ preferEnvironmentCamera = false }: UseUserMediaOptions = {}) {
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [outputDevices, setOutputDevices] = useState<MediaDeviceInfo[]>([]);
  const [activeStream, setActiveStream] = useState<MediaStream | null>(null);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>('');
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>('');
  const [selectedOutputDevice, setSelectedOutputDevice] = useState<string>('');
  const [videoOff, setVideoOff] = useState(false);
  const [muted, setMuted] = useState(false);

  const getDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setAudioDevices(devices.filter(device => device.kind === 'audioinput'));
      setVideoDevices(devices.filter(device => device.kind === 'videoinput'));
      setOutputDevices(devices.filter(device => device.kind === 'audiooutput'));
    } catch (error) {
      console.error('Error getting devices:', error);
    }
  }, []);

  const startStream = useCallback(async () => {
    try {
      const constraints: MediaStreamConstraints = {
        audio: true,
        video: {
          facingMode: preferEnvironmentCamera ? 'environment' : 'user',
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setActiveStream(stream);

      // Set initial device selections
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInput = devices.find(device => device.kind === 'audioinput');
      const videoInput = devices.find(device => device.kind === 'videoinput');
      const audioOutput = devices.find(device => device.kind === 'audiooutput');

      if (audioInput) setSelectedAudioDevice(audioInput.deviceId);
      if (videoInput) setSelectedVideoDevice(videoInput.deviceId);
      if (audioOutput) setSelectedOutputDevice(audioOutput.deviceId);
    } catch (error) {
      console.error('Error starting stream:', error);
    }
  }, [preferEnvironmentCamera]);

  const switchInput = useCallback(async (deviceId: string, type: 'audio' | 'video') => {
    if (!activeStream) return;

    try {
      const constraints: MediaStreamConstraints = {
        audio: type === 'audio' ? { deviceId: { exact: deviceId } } : true,
        video: type === 'video' ? { deviceId: { exact: deviceId } } : true,
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      // Stop old tracks
      activeStream.getTracks().forEach(track => track.stop());
      
      setActiveStream(newStream);
      if (type === 'audio') setSelectedAudioDevice(deviceId);
      if (type === 'video') setSelectedVideoDevice(deviceId);
    } catch (error) {
      console.error('Error switching input:', error);
    }
  }, [activeStream]);

  const switchAudioOutput = useCallback(async (deviceId: string) => {
    try {
      const audioElement = document.querySelector('audio, video');
      if (audioElement && 'sinkId' in audioElement) {
        await (audioElement as any).setSinkId(deviceId);
        setSelectedOutputDevice(deviceId);
      }
    } catch (error) {
      console.error('Error switching audio output:', error);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (activeStream) {
      const audioTrack = activeStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMuted(!audioTrack.enabled);
      }
    }
  }, [activeStream]);

  const toggleVideo = useCallback(() => {
    if (activeStream) {
      const videoTrack = activeStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoOff(!videoTrack.enabled);
      }
    }
  }, [activeStream]);

  useEffect(() => {
    getDevices();
    startStream();

    // Listen for device changes
    navigator.mediaDevices.addEventListener('devicechange', getDevices);

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', getDevices);
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [getDevices, startStream]);

  return {
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
  };
} 