'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const validateForm = () => {
    const newErrors = {
      username: '',
      password: ''
    };

    if (formData.username.length < 3) {
      newErrors.username = 'Username deve ter pelo menos 3 caracteres';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: Implement login logic
      console.log('Login data:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff'
    }}>
      {/* Background romantic shapes */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 right-20 w-32 h-32 bg-french-rose rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-carnation-pink rounded-3xl animate-bounce"></div>
        <div className="absolute top-1/3 left-10 w-16 h-16 bg-pink rounded-lg rotate-45 animate-pulse"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center transform -rotate-12 bg-carnation-pink rounded-full shadow-xl">
              <span className="text-3xl">💕</span>
            </div>
            
            <h1 className="text-5xl font-black uppercase mb-4 transform rotate-1 text-french-rose drop-shadow-lg">
              💖 BEM-VINDO
            </h1>
            
            <div className="p-4 inline-block transform -rotate-1 font-bold text-black bg-misty-rose rounded-lg shadow-lg">
              ENTRE NA SUA CONTA AGORA!
            </div>
          </div>

          {/* Form Container */}
          <div className="p-8 transform rotate-1 bg-orchid-pink rounded-xl shadow-2xl">
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="username" 
                  className="block text-lg font-black uppercase mb-3 text-black"
                >
                  👤 USERNAME
                </label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="w-full px-6 py-4 bg-black text-white font-bold placeholder-gray-400 focus:outline-none border-4 border-french-rose focus:border-white transition-all duration-300 rounded-lg"
                  placeholder="SEU USERNAME..."
                />
                {errors.username && (
                  <p className="mt-2 text-sm font-bold p-2 text-french-rose bg-french-rose/10 rounded-md">
                    ⚠️ {errors.username}
                  </p>
                )}
              </div>

              <div>
                <label 
                  htmlFor="password" 
                  className="block text-lg font-black uppercase mb-3 text-black"
                >
                  🔐 SENHA
                </label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-6 py-4 bg-black text-white font-bold placeholder-gray-400 focus:outline-none border-4 border-french-rose focus:border-white transition-all duration-300 rounded-lg"
                  placeholder="SUA SENHA..."
                />
                {errors.password && (
                  <p className="mt-2 text-sm font-bold p-2 text-french-rose bg-french-rose/10 rounded-md">
                    ⚠️ {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center text-black font-bold">
                  <input
                    type="checkbox"
                    className="mr-3 w-5 h-5 accent-pink-500"
                  />
                  LEMBRAR-ME
                </label>

                <Link
                  href="/auth/forgot-password"
                  className="font-bold text-french-rose underline hover:no-underline transform hover:scale-105 transition-transform duration-200"
                >
                  ESQUECEU A SENHA?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white font-black text-xl py-6 px-8 transform hover:scale-105 transition-all duration-300 uppercase tracking-wider disabled:opacity-50 bg-french-rose rounded-lg shadow-xl hover:shadow-2xl"
              >
                {isLoading ? '⏳ ENTRANDO...' : '🚀 ENTRAR AGORA'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-1 bg-french-rose"></div>
              </div>
              <div className="relative flex justify-center text-lg font-black px-4 bg-orchid-pink">
                <span className="text-black">💫 OU 💫</span>
              </div>
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="w-full text-black font-black text-lg py-6 px-8 transform hover:scale-105 transition-all duration-300 uppercase tracking-wider bg-misty-rose rounded-lg shadow-xl hover:shadow-2xl"
            >
              🌟 ENTRAR COM GOOGLE
            </button>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-8 space-y-4">
            <div className="p-4 inline-block transform -rotate-1 font-bold text-black bg-carnation-pink rounded-lg shadow-lg">
              NÃO TEM CONTA AINDA?
            </div>
            
            <div className="flex justify-center space-x-6">
              <Link
                href="/auth/signup"
                className="font-black text-xl text-white px-6 py-3 transform hover:scale-110 transition-all duration-300 uppercase bg-french-rose rounded-lg shadow-lg hover:shadow-xl"
              >
                💕 CRIAR CONTA
              </Link>
              
              <Link
                href="/auth/signin"
                className="font-black text-xl text-black px-6 py-3 transform hover:scale-110 transition-all duration-300 uppercase bg-misty-rose rounded-lg shadow-lg hover:shadow-xl"
              >
                ⚡ LOGIN RÁPIDO
              </Link>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="mt-12 text-center space-y-4">
            <div className="w-8 h-8 mx-auto flex items-center justify-center transform rotate-45 bg-cherry-blossom-pink rounded-lg shadow-md">
              <span className="text-sm transform -rotate-45">✨</span>
            </div>
            <div className="w-6 h-6 mx-auto flex items-center justify-center transform -rotate-12 bg-pink rounded-full shadow-md">
              <span className="text-xs">💫</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 