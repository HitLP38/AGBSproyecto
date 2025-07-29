#!/bin/bash

# 🚀 Script para iniciar el proyecto en modo desarrollo
# Uso: ./scripts/start-dev.sh

echo "🏃‍♂️ Iniciando RetoAGBS en modo desarrollo..."

# Verificar que estamos en el directorio raíz del proyecto
if [ ! -f "README.md" ]; then
    echo "❌ Error: Debes ejecutar este script desde el directorio raíz del proyecto"
    exit 1
fi

# Función para limpiar procesos al salir
cleanup() {
    echo "🛑 Deteniendo servicios..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT

echo "📦 Verificando dependencias..."

# Verificar Python
if ! command -v python &> /dev/null; then
    echo "❌ Error: Python no está instalado"
    exit 1
fi

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    exit 1
fi

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm no está instalado"
    exit 1
fi

echo "✅ Dependencias verificadas"

# Iniciar Backend
echo "🔧 Iniciando Backend..."
cd backend

# Verificar si existe el entorno virtual
if [ ! -d "venv" ]; then
    echo "📦 Creando entorno virtual..."
    python -m venv venv
fi

# Activar entorno virtual
echo "🔌 Activando entorno virtual..."
source venv/bin/activate

# Instalar dependencias si no están instaladas
if [ ! -d "venv/lib/python*/site-packages/fastapi" ]; then
    echo "📦 Instalando dependencias del backend..."
    pip install -r requirements.txt
fi

# Verificar archivo .env
if [ ! -f ".env" ]; then
    echo "⚠️  Advertencia: No se encontró archivo .env en backend/"
    echo "   Crea un archivo .env con: DATABASE_URL=postgresql://usuario:password@localhost:5432/retoagbs"
fi

# Iniciar servidor backend
echo "🚀 Iniciando servidor backend en puerto 8000..."
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Esperar un momento para que el backend inicie
sleep 3

# Verificar que el backend esté corriendo
if ! curl -s http://localhost:8000/docs > /dev/null; then
    echo "❌ Error: El backend no se inició correctamente"
    exit 1
fi

echo "✅ Backend iniciado correctamente en http://localhost:8000"

# Iniciar Frontend
echo "🎨 Iniciando Frontend..."
cd ../frontend

# Instalar dependencias si no están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias del frontend..."
    npm install
fi

# Verificar archivo .env
if [ ! -f ".env" ]; then
    echo "⚠️  Advertencia: No se encontró archivo .env en frontend/"
    echo "   Crea un archivo .env con: VITE_CLERK_PUBLISHABLE_KEY=tu_clerk_key"
fi

# Iniciar servidor frontend
echo "🚀 Iniciando servidor frontend en puerto 5173..."
npm run dev &
FRONTEND_PID=$!

# Esperar un momento para que el frontend inicie
sleep 5

# Verificar que el frontend esté corriendo
if ! curl -s http://localhost:5173 > /dev/null; then
    echo "❌ Error: El frontend no se inició correctamente"
    exit 1
fi

echo "✅ Frontend iniciado correctamente en http://localhost:5173"

echo ""
echo "🎉 ¡RetoAGBS está corriendo!"
echo ""
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend:  http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "🛑 Presiona Ctrl+C para detener los servicios"
echo ""

# Mantener el script corriendo
wait 