# 🚀 Script para iniciar el proyecto en modo desarrollo (Windows PowerShell)
# Uso: .\scripts\start-dev.ps1

Write-Host "🏃‍♂️ Iniciando RetoAGBS en modo desarrollo..." -ForegroundColor Green

# Verificar que estamos en el directorio raíz del proyecto
if (-not (Test-Path "README.md")) {
    Write-Host "❌ Error: Debes ejecutar este script desde el directorio raíz del proyecto" -ForegroundColor Red
    exit 1
}

# Función para limpiar procesos al salir
function Cleanup {
    Write-Host "🛑 Deteniendo servicios..." -ForegroundColor Yellow
    if ($BackendProcess) { Stop-Process -Id $BackendProcess.Id -Force -ErrorAction SilentlyContinue }
    if ($FrontendProcess) { Stop-Process -Id $FrontendProcess.Id -Force -ErrorAction SilentlyContinue }
    exit 0
}

# Capturar Ctrl+C
$null = Register-EngineEvent PowerShell.Exiting -Action { Cleanup }

Write-Host "📦 Verificando dependencias..." -ForegroundColor Blue

# Verificar Python
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python encontrado: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Python no está instalado" -ForegroundColor Red
    exit 1
}

# Verificar Node.js
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Node.js no está instalado" -ForegroundColor Red
    exit 1
}

# Verificar npm
try {
    $npmVersion = npm --version 2>&1
    Write-Host "✅ npm encontrado: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: npm no está instalado" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependencias verificadas" -ForegroundColor Green

# Iniciar Backend
Write-Host "🔧 Iniciando Backend..." -ForegroundColor Blue
Set-Location backend

# Verificar si existe el entorno virtual
if (-not (Test-Path "venv")) {
    Write-Host "📦 Creando entorno virtual..." -ForegroundColor Yellow
    python -m venv venv
}

# Activar entorno virtual
Write-Host "🔌 Activando entorno virtual..." -ForegroundColor Yellow
& ".\venv\Scripts\Activate.ps1"

# Instalar dependencias si no están instaladas
if (-not (Test-Path "venv\Lib\site-packages\fastapi")) {
    Write-Host "📦 Instalando dependencias del backend..." -ForegroundColor Yellow
    pip install -r requirements.txt
}

# Verificar archivo .env
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  Advertencia: No se encontró archivo .env en backend/" -ForegroundColor Yellow
    Write-Host "   Crea un archivo .env con: DATABASE_URL=postgresql://usuario:password@localhost:5432/retoagbs" -ForegroundColor Yellow
}

# Iniciar servidor backend
Write-Host "🚀 Iniciando servidor backend en puerto 8000..." -ForegroundColor Green
$BackendProcess = Start-Process -FilePath "uvicorn" -ArgumentList "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000" -PassThru -WindowStyle Hidden

# Esperar un momento para que el backend inicie
Start-Sleep -Seconds 3

# Verificar que el backend esté corriendo
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/docs" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ Backend iniciado correctamente en http://localhost:8000" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: El backend no se inició correctamente" -ForegroundColor Red
    exit 1
}

# Iniciar Frontend
Write-Host "🎨 Iniciando Frontend..." -ForegroundColor Blue
Set-Location ../frontend

# Instalar dependencias si no están instaladas
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias del frontend..." -ForegroundColor Yellow
    npm install
}

# Verificar archivo .env
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  Advertencia: No se encontró archivo .env en frontend/" -ForegroundColor Yellow
    Write-Host "   Crea un archivo .env con: VITE_CLERK_PUBLISHABLE_KEY=tu_clerk_key" -ForegroundColor Yellow
}

# Iniciar servidor frontend
Write-Host "🚀 Iniciando servidor frontend en puerto 5173..." -ForegroundColor Green
$FrontendProcess = Start-Process -FilePath "npm" -ArgumentList "run", "dev" -PassThru -WindowStyle Hidden

# Esperar un momento para que el frontend inicie
Start-Sleep -Seconds 5

# Verificar que el frontend esté corriendo
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ Frontend iniciado correctamente en http://localhost:5173" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: El frontend no se inició correctamente" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 ¡RetoAGBS está corriendo!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔧 Backend:  http://localhost:8000" -ForegroundColor Cyan
Write-Host "📚 API Docs: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "🛑 Presiona Ctrl+C para detener los servicios" -ForegroundColor Yellow
Write-Host ""

# Mantener el script corriendo
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} catch {
    Cleanup
} 