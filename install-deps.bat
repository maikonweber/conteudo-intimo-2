@echo off
echo Instalando dependencias do projeto...

echo Limpando cache e arquivos antigos...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist .next rmdir /s /q .next

echo Verificando se Node.js esta instalado...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao esta instalado!
    echo Por favor, instale o Node.js de https://nodejs.org/
    pause
    exit /b 1
)

echo Verificando se npm esta disponivel...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: npm nao esta disponivel!
    echo Tente executar: npm install -g npm
    pause
    exit /b 1
)

echo Instalando dependencias...
npm install --force --verbose

echo Verificando se tailwindcss esta instalado...
npm list tailwindcss >nul 2>&1
if %errorlevel% neq 0 (
    echo Instalando Tailwind CSS separadamente...
    npm install tailwindcss postcss autoprefixer --save-dev --force
)

echo Verificando se framer-motion esta instalado...
npm list framer-motion >nul 2>&1
if %errorlevel% neq 0 (
    echo Instalando Framer Motion separadamente...
    npm install framer-motion --save --force
)

echo Instalacao concluida!
echo Agora voce pode executar: npm run dev
pause 