"use client";

import './landing.css';

export default function Home() {
  return (
    <div className="landing-container">
      {/* Animated background with romantic shapes */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
        
        {/* Fluid shapes */}
        <div className="fluid-shape-1"></div>
        <div className="fluid-shape-2"></div>
        <div className="fluid-shape-3"></div>
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="content-wrapper">
          {/* Logo Section */}
          <div className="logo-section">
            <div className="logo-circle">
              <span className="logo-icon">💖</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="title-section">
            <h1 className="main-title">
              💘 CONTEÚDO ÍNTIMO
            </h1>
            
            <div className="subtitle">
              ✨ PLATAFORMA EXCLUSIVA PARA ADULTOS ✨
            </div>
          </div>

          {/* Features Grid */}
          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <span className="feature-icon">🔥</span>
              <h3 className="feature-title">PERFIL SEDUTOR</h3>
              <p className="feature-description">CONTEÚDO EXCLUSIVO</p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <span className="feature-icon">💕</span>
              <h3 className="feature-title">ADMIRADORES</h3>
              <p className="feature-description">ENCONTROS ESPECIAIS</p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <span className="feature-icon">💬</span>
              <h3 className="feature-title">CHAT PRIVADO</h3>
              <p className="feature-description">CONVERSAS ÍNTIMAS</p>
            </div>

            {/* Feature 4 */}
            <div className="feature-card">
              <span className="feature-icon">🔒</span>
              <h3 className="feature-title">SEGURANÇA</h3>
              <p className="feature-description">PRIVACIDADE MÁXIMA</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="cta-section">
            <div className="cta-text">
              🌟 SUA CONEXÃO ESPECIAL TE ESPERA 🌟
            </div>
            
            <div className="cta-buttons">
              <a
                href="/auth/signin"
                className="cta-button btn-primary"
              >
                💖 REGISTRAR GRÁTIS
              </a>
              
              <a
                href="/auth/login"
                className="cta-button btn-secondary"
              >
                🔑 JÁ SOU MEMBRO
              </a>
            </div>
          </div>

          {/* Footer Info */}
          <div className="footer-section">
            <div className="footer-grid">
              <div className="footer-card">
                <span className="footer-icon">🎯</span>
                <p className="footer-text">DISCRIÇÃO TOTAL</p>
              </div>
              
              <div className="footer-card">
                <span className="footer-icon">💎</span>
                <p className="footer-text">CONTEÚDO PROTEGIDO</p>
              </div>
              
              <div className="footer-card">
                <span className="footer-icon">🌟</span>
                <p className="footer-text">AMBIENTE SEGURO</p>
              </div>
            </div>
            
            <div className="footer-info">
              <p className="footer-links">💕 TERMOS PRIVACIDADE CONTATO</p>
              <p className="footer-copyright">© 2024 CONTEÚDO ÍNTIMO - TODOS OS DIREITOS RESERVADOS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
