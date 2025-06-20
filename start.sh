#!/bin/bash

echo "🔧 Instalando dependências..."
npm install

echo "🎨 Compilando Tailwind CSS..."
npx tailwindcss -i ./src/app/globals.css -o ./dist/output.css --watch &

echo "🚀 Iniciando servidor de desenvolvimento..."
npm run dev 