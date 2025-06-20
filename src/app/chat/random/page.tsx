'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Image as ImageIcon, Phone, PhoneOff } from 'lucide-react';
import './random-chat.css';

interface Message {
  id: string;
  type: 'text' | 'audio' | 'image';
  content: string;
  sender: string;
  timestamp: number;
}

export default function RandomChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      type: 'text',
      content: inputMessage,
      sender: 'me',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, message]);
    setInputMessage('');
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        const message: Message = {
          id: Date.now().toString(),
          type: 'audio',
          content: audioUrl,
          sender: 'me',
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, message]);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const message: Message = {
        id: Date.now().toString(),
        type: 'image',
        content: e.target?.result as string,
        sender: 'me',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, message]);
    };
    reader.readAsDataURL(file);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  return (
    <div className="random-chat-page">
      {/* Header */}
      <div className="random-chat-header">
        <h1 className="random-chat-title">Chat Aleatório</h1>
        <div className="random-chat-controls">
          <button
            onClick={toggleAudio}
            className={`random-audio-button ${
              isAudioEnabled ? 'enabled' : 'disabled'
            }`}
          >
            {isAudioEnabled ? <PhoneOff /> : <Phone />}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="random-messages-area">
        {messages.length === 0 ? (
          <div className="random-empty-state">
            <div className="random-empty-icon">
              <Send />
            </div>
            <p className="random-empty-title">Nenhuma mensagem ainda</p>
            <p className="random-empty-subtitle">Comece uma conversa!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`random-message-wrapper ${message.sender === 'me' ? 'me' : 'other'}`}
            >
              <div className={`random-message ${
                message.sender === 'me' ? 'me' : 'other'
              }`}>
                {message.type === 'text' && (
                  <p>{message.content}</p>
                )}
                {message.type === 'audio' && (
                  <audio controls src={message.content} />
                )}
                {message.type === 'image' && (
                  <img
                    src={message.content}
                    alt="Shared image"
                  />
                )}
                <span className="random-message-time">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="random-input-area">
        <div className="random-input-wrapper">
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Digite uma mensagem..."
            className="random-text-input"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          
          <input
            type="file"
            ref={fileInputRef}
            className="random-file-input"
            accept="image/*"
            onChange={handleImageUpload}
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="random-input-button image"
          >
            <ImageIcon />
          </button>
          
          <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onMouseLeave={stopRecording}
            className={`random-input-button mic ${
              isRecording ? 'recording' : ''
            }`}
          >
            <Mic />
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="random-input-button send"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
} 