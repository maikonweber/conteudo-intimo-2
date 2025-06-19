# 💖 Conteúdo Íntimo - Plataforma de Conexões Especiais

Uma plataforma moderna de conteúdo íntimo com design brutalist e recursos avançados de segurança.

## 🌟 Funcionalidades Principais

### 📱 Páginas Implementadas
- **Página Principal**: Landing page com design brutalist e paleta rosa
- **Autenticação**: Login, Signup e Signin com estilo consistente
- **Feed**: Visualização de conteúdo com interações
- **Chat**: Sistema de mensagens em tempo real
- **Match**: Videochamadas românticas
- **Random**: Chat aleatório com pessoas
- **Perfil**: Gerenciamento de conta do usuário
- **404**: Página de erro personalizada

### 🎨 Design e Estilo
- **Estilo Brutalist**: Design agressivo com formas geométricas
- **Paleta Rosa**: 9 tons de rosa consistentes em toda aplicação
- **Formas Temáticas**: Corações, cupidos, anéis, símbolos do infinito
- **Animações**: Heartbeat, shake, float, pulse e mais
- **Responsivo**: Adaptável para desktop e mobile

### 🔒 Recursos de Segurança Implementados

#### Proteção de Conteúdo
- **Anti-Screenshot**: Proteção limitada contra capturas de tela
- **Watermark**: Marca d'água invisível para proteção
- **Bloqueio de Seleção**: Prevenção de seleção de texto
- **Proteção de Imagens**: Desabilitação de drag & drop

#### Bloqueios de Sistema
- **DevTools Detection**: Detecção de ferramentas de desenvolvedor
- **Keyboard Shortcuts**: Bloqueio de F12, Ctrl+U, Ctrl+S, etc.
- **Context Menu**: Desabilitação do menu de contexto (botão direito)
- **Print Screen**: Bloqueio da tecla Print Screen

#### Headers de Segurança
- **X-Frame-Options**: DENY - Previne embedding
- **X-Content-Type-Options**: nosniff - Previne MIME sniffing
- **X-XSS-Protection**: Proteção contra XSS
- **Referrer-Policy**: no-referrer - Privacidade de referência
- **robots.txt**: noindex, nofollow - Não indexação

#### Proteções Adicionais
- **Viewport Lock**: Desabilitação de zoom manual
- **Visibility API**: Blur do conteúdo quando aba não está ativa
- **Console Warnings**: Mensagens de aviso no console
- **Auto-removal**: Remoção automática de overlays de aviso

### 🚀 Tecnologias Utilizadas

- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Styling utility-first
- **Styled JSX**: CSS-in-JS para componentes específicos
- **Lucide React**: Ícones modernos
- **Radix UI**: Componentes acessíveis
- **WebSocket**: Comunicação em tempo real (hooks preparados)

### 🎯 Paleta de Cores Rosa

```css
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
```

### 🛡️ Como a Segurança Funciona

#### 1. SecurityProvider
Componente global que envolve toda a aplicação e implementa:
- Event listeners para keyboard e mouse
- Detecção de DevTools
- Watermarks automáticos
- Estilos de proteção

#### 2. Proteção Automática
- Ativação automática ao carregar qualquer página
- Alertas visuais para tentativas de violação
- Logging de tentativas de acesso não autorizado
- Auto-limpeza ao sair da aplicação

#### 3. Limitações
⚠️ **Importante**: As proteções de frontend são limitadas e podem ser contornadas por usuários técnicos. Para segurança real, implemente:
- Proteção no backend
- DRM (Digital Rights Management)
- Streaming protegido
- Autenticação robusta

### 📋 Instruções de Uso

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

### 🔧 Configuração Adicional Recomendada

Para máxima segurança em produção:

1. **Servidor Web**:
   ```nginx
   add_header X-Frame-Options "DENY";
   add_header X-Content-Type-Options "nosniff";
   add_header X-XSS-Protection "1; mode=block";
   add_header Referrer-Policy "no-referrer";
   ```

2. **Content Security Policy**:
   ```
   Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
   ```

3. **HTTPS Obrigatório**:
   ```
   Strict-Transport-Security: max-age=31536000; includeSubDomains
   ```

### 🎨 Animações Disponíveis

- `heartbeat`: Pulsação sutil
- `shake`: Tremulação horizontal
- `float`: Flutuação suave
- `pulse`: Pulsação de opacidade
- `glitch`: Efeito de interferência
- `morph`: Transformação de formas

### 📱 Componentes Brutalist

Todos os componentes seguem o padrão brutalist:
- Clip-path para formas geométricas
- Box-shadow para profundidade
- Transforms para rotações
- Font-weight: 900 (black)
- Cores contrastantes

### 🤝 Contribuição

Este projeto implementa um design único e funcionalidades de segurança específicas para plataformas de conteúdo íntimo. Todas as proteções são implementadas respeitando as limitações do browser.

### 📄 Licença

Projeto desenvolvido para fins educacionais e demonstração de conceitos de segurança frontend.

---

**⚠️ Aviso Legal**: As funcionalidades de segurança implementadas são para demonstração. Para aplicações reais com conteúdo sensível, consulte especialistas em segurança digital e implemente soluções robustas no backend.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
