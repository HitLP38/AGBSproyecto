# 🏃‍♂️ RetoAGBS - Sistema de Evaluación Física

Sistema completo para la evaluación y seguimiento de pruebas físicas militares, con cálculo automático de notas y visualización de resultados.

## 📋 Tabla de Contenidos

- [🎯 Descripción del Proyecto](#-descripción-del-proyecto)
- [🚀 Características](#-características)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [📦 Prerrequisitos](#-prerrequisitos)
- [⚙️ Instalación](#️-instalación)
- [🔧 Configuración](#-configuración)
- [🏃‍♂️ Ejecución](#️-ejecución)
- [📊 Estructura del Proyecto](#-estructura-del-proyecto)
- [🎮 Uso del Sistema](#-uso-del-sistema)
- [🔍 API Endpoints](#-api-endpoints)
- [🐛 Solución de Problemas](#-solución-de-problemas)
- [📝 Contribución](#-contribución)
- [📄 Licencia](#-licencia)

## 🎯 Descripción del Proyecto

RetoAGBS es una aplicación web completa para la gestión de evaluaciones físicas militares. Permite a los usuarios:

- **Registrar resultados** de 6 ejercicios específicos
- **Calcular notas automáticamente** basadas en puntajes
- **Visualizar progreso** con gráficos y tablas
- **Gestionar historial** de evaluaciones
- **Filtrar y buscar** resultados por diferentes criterios

### 🎯 Ejercicios Evaluados

1. **Salto Vertical** - Altura de salto en cm
2. **Extensiones de Brazo** - Número de repeticiones
3. **50m Lisos** - Tiempo en segundos
4. **1000m** - Tiempo en segundos
5. **Natación 50m** - Tiempo en segundos
6. **6 KM** - Tiempo en segundos

## 🚀 Características

### ✨ Frontend (React + TypeScript)
- **Interfaz moderna y responsive** con Material-UI
- **Navegación SPA** con múltiples vistas
- **Tablas interactivas** con filtros y selección múltiple
- **Gráficos dinámicos** para visualización de datos
- **Cálculo de notas** con modal de confirmación
- **Gestión de favoritos** y historial
- **Autenticación** con Clerk

### 🔧 Backend (FastAPI + PostgreSQL)
- **API RESTful** completa
- **Base de datos relacional** con SQLAlchemy
- **Cálculo automático** de puntajes y notas
- **Validación de datos** con Pydantic
- **Migraciones** con Alembic
- **CORS configurado** para desarrollo

### 📊 Funcionalidades Principales
- ✅ **Registro de resultados** por ejercicio
- ✅ **Cálculo automático** de puntajes
- ✅ **Nota final** basada en 6 ejercicios
- ✅ **Dashboard** con estadísticas
- ✅ **Historial** de evaluaciones
- ✅ **Filtros avanzados** por fecha, ejercicio, sexo, grado
- ✅ **Eliminación** de registros individuales y múltiples
- ✅ **Exportación** de datos
- ✅ **Responsive design** para móviles

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Material-UI (MUI)** - Componentes de UI
- **Vite** - Build tool y dev server
- **Axios** - Cliente HTTP
- **Zustand** - Gestión de estado
- **React Router** - Navegación
- **Chart.js** - Gráficos
- **Clerk** - Autenticación

### Backend
- **FastAPI** - Framework web
- **PostgreSQL** - Base de datos
- **SQLAlchemy** - ORM
- **Pydantic** - Validación de datos
- **Alembic** - Migraciones
- **Uvicorn** - Servidor ASGI
- **Python 3.11+** - Lenguaje base

## 📦 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

### 🔧 Software Requerido

1. **Node.js** (versión 18 o superior)
   ```bash
   # Verificar versión
   node --version
   npm --version
   ```

2. **Python** (versión 3.11 o superior)
   ```bash
   # Verificar versión
   python --version
   pip --version
   ```

3. **PostgreSQL** (versión 12 o superior)
   ```bash
   # En Windows (con Chocolatey)
   choco install postgresql
   
   # En macOS (con Homebrew)
   brew install postgresql
   
   # En Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   ```

4. **Git** (para clonar el repositorio)
   ```bash
   # Verificar instalación
   git --version
   ```

### 🌐 Variables de Entorno

Necesitarás configurar las siguientes variables:

- **Clerk API Keys** (para autenticación)
- **PostgreSQL** (base de datos)
- **Variables de entorno** del proyecto

## ⚙️ Instalación

### 1️⃣ Clonar el Repositorio

#### Paso 1: Crear carpeta del proyecto
1. Ve a tu **Escritorio** (Desktop)
2. Crea una nueva carpeta llamada `ProyectoAGBS`
3. Abre esa carpeta

#### Paso 2: Descargar el proyecto
**Opción A: Usando Git (Recomendado)**
1. Abre la terminal en la carpeta que creaste
2. Copia y pega este comando:
   ```bash
   git clone https://github.com/HitLP38/AGBSproyecto.git
   ```
3. Presiona **Enter**
4. Espera a que termine la descarga

**Opción B: Descarga directa**
1. Ve a [https://github.com/HitLP38/AGBSproyecto/](https://github.com/HitLP38/AGBSproyecto/)
2. Haz clic en el botón verde **"Code"**
3. Selecciona **"Download ZIP"**
4. Extrae el archivo ZIP en tu carpeta `ProyectoAGBS`

#### Paso 3: Verificar la descarga
1. Dentro de la carpeta `ProyectoAGBS` deberías ver:
   - Carpeta `backend`
   - Carpeta `frontend`
   - Archivo `README.md`
   - Otros archivos

### 2️⃣ Configurar Base de Datos

#### Paso 1: Verificar que PostgreSQL esté instalado
1. Abre la terminal
2. Escribe: `psql --version`
3. Si aparece algo como "psql (PostgreSQL) 15.0", **ya lo tienes** ✅
4. Si aparece "No se reconoce como comando", **necesitas instalarlo** ❌

#### Paso 2: Instalar PostgreSQL (si no lo tienes)

**Windows:**
1. Ve a [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Haz clic en **"Download the installer"**
3. Descarga la versión más reciente
4. Ejecuta el archivo `.exe`
5. **IMPORTANTE**: Anota la contraseña que pongas para el usuario `postgres`
6. Completa la instalación

**macOS:**
1. Ve a [https://www.postgresql.org/download/macosx/](https://www.postgresql.org/download/macosx/)
2. Descarga **PostgreSQL.app**
3. Arrastra la aplicación a tu carpeta de aplicaciones
4. Abre PostgreSQL.app
5. Anota la contraseña que se genera

**Linux (Ubuntu/Debian):**
1. Abre la terminal
2. Copia y pega estos comandos:
   ```bash
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   ```

#### Paso 3: Iniciar PostgreSQL

**Windows:**
1. Busca **"Servicios"** en el menú de Windows
2. Busca **"postgresql-x64-15"** (o similar)
3. Si no está corriendo, haz clic derecho y selecciona **"Iniciar"**

**macOS:**
1. Abre **PostgreSQL.app**
2. Si no está corriendo, haz clic en **"Start"**

**Linux:**
1. En la terminal, escribe:
   ```bash
   sudo systemctl start postgresql
   ```

#### Paso 4: Crear la base de datos

**Windows:**
1. Abre **pgAdmin** (se instaló con PostgreSQL)
2. Conecta al servidor local
3. Haz clic derecho en **"Databases"**
4. Selecciona **"Create" > "Database"**
5. Nombre: `retoagbs`
6. Haz clic en **"Save"**

**O usando terminal:**
1. Abre CMD como administrador
2. Escribe:
   ```cmd
   psql -U postgres
   ```
3. Ingresa la contraseña que pusiste durante la instalación
4. Copia y pega estos comandos:
   ```sql
   CREATE DATABASE retoagbs;
   CREATE USER retoagbs_user WITH PASSWORD 'tu_password_seguro';
   GRANT ALL PRIVILEGES ON DATABASE retoagbs TO retoagbs_user;
   \q
   ```

**macOS/Linux:**
1. Abre la terminal
2. Escribe:
   ```bash
   sudo -u postgres psql
   ```
3. Copia y pega estos comandos:
   ```sql
   CREATE DATABASE retoagbs;
   CREATE USER retoagbs_user WITH PASSWORD 'tu_password_seguro';
   GRANT ALL PRIVILEGES ON DATABASE retoagbs TO retoagbs_user;
   \q
   ```

#### Paso 5: Verificar la base de datos
1. En la terminal, escribe:
   ```bash
   psql -U retoagbs_user -d retoagbs -h localhost
   ```
2. Si te pide contraseña, ingresa la que pusiste
3. Deberías ver algo como `retoagbs=#`
4. Escribe `\q` para salir

### 3️⃣ Configurar Backend

#### Paso 1: Navegar al directorio del backend
1. Abre la terminal
2. Navega a la carpeta del proyecto:
   ```bash
   cd ProyectoAGBS/backend
   ```

#### Paso 2: Crear entorno virtual
1. En la terminal, escribe:
   ```bash
   python -m venv venv
   ```

#### Paso 3: Activar el entorno virtual

**Windows:**
```cmd
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

**Deberías ver `(venv)` al inicio de la línea de comandos**

#### Paso 4: Instalar dependencias
1. Con el entorno virtual activado, escribe:
   ```bash
   pip install -r requirements.txt
   ```
2. Espera a que termine la instalación (puede tomar varios minutos)

#### Paso 5: Crear archivo de configuración
1. En la carpeta `backend`, crea un archivo llamado `.env`
2. Abre el archivo con cualquier editor de texto
3. Agrega esta línea (esta es la estructura por defecto, solo cambia la contraseña):
   ```
   DATABASE_URL=postgresql://retoagbs_user:tu_password_seguro@localhost:5432/retoagbs
   ```
4. **IMPORTANTE**: Reemplaza `tu_password_seguro` con la contraseña que pusiste cuando creaste el usuario en PostgreSQL
5. **Ejemplo**: Si tu contraseña es `mipassword123`, quedaría así:
   ```
   DATABASE_URL=postgresql://retoagbs_user:mipassword123@localhost:5432/retoagbs
   ```
6. Guarda el archivo

#### Paso 6: Crear las tablas
1. En la terminal (con el entorno virtual activado), escribe:
   ```bash
   python create_db.py
   ```
2. Deberías ver: "Creando tablas..." y luego "¡Listo!"

#### Paso 7: Ejecutar migraciones (si existen)
1. En la terminal, escribe:
   ```bash
   alembic upgrade head
   ```
2. Si aparece algún error, no te preocupes, puede que no haya migraciones

#### Paso 8: Verificar el backend
1. En la terminal, escribe:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
2. Deberías ver algo como:
   ```
   INFO:     Uvicorn running on http://127.0.0.1:8000
   ```
3. Abre tu navegador y ve a: `http://localhost:8000/docs`
4. Deberías ver la documentación de la API
5. Presiona **Ctrl+C** en la terminal para detener el servidor

### 4️⃣ Configurar Frontend

#### Paso 1: Navegar al directorio del frontend
1. Abre una **nueva** terminal
2. Navega a la carpeta del proyecto:
   ```bash
   cd ProyectoAGBS/frontend
   ```

#### Paso 2: Instalar dependencias
1. En la terminal, escribe:
   ```bash
   npm install
   ```
2. Espera a que termine la instalación (puede tomar varios minutos)

#### Paso 3: Crear archivo de configuración
1. En la carpeta `frontend`, crea un archivo llamado `.env`
2. Abre el archivo con cualquier editor de texto
3. Agrega esta línea (por ahora déjala vacía, la configurarás después):
   ```
   VITE_CLERK_PUBLISHABLE_KEY=
   ```
4. Guarda el archivo

#### Paso 4: Verificar el frontend
1. En la terminal, escribe:
   ```bash
   npm run dev
   ```
2. Deberías ver algo como:
   ```
   Local:   http://localhost:5173/
   ```
3. Abre tu navegador y ve a: `http://localhost:5173`
4. Deberías ver la página de bienvenida
5. Presiona **Ctrl+C** en la terminal para detener el servidor

### 5️⃣ Configurar Clerk (Autenticación)

#### Paso 1: Crear cuenta en Clerk
1. Ve a [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
2. Haz clic en **"Sign up"** (Registrarse)
3. Crea una cuenta con tu email
4. Verifica tu email

#### Paso 2: Crear una nueva aplicación
1. Una vez dentro del dashboard, haz clic en **"Add application"**
2. Nombre: `RetoAGBS`
3. Selecciona **"Next.js"** como framework
4. Haz clic en **"Create application"**

#### Paso 3: Obtener las claves
1. En el dashboard, ve a **"API Keys"**
2. Copia la **"Publishable key"** (empieza con `pk_test_`)

#### Paso 4: Configurar dominios permitidos
1. Ve a **"Domains"**
2. Agrega: `http://localhost:5173`
3. Haz clic en **"Save"**

#### Paso 5: Actualizar el archivo .env
1. Ve a la carpeta `frontend`
2. Abre el archivo `.env`
3. Reemplaza la línea vacía con tu clave:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_tu_clave_aqui
   ```
4. Guarda el archivo

## 🔧 Configuración

### 📁 Archivos de Configuración

#### Backend (.env)
**Ubicación**: `ProyectoAGBS/backend/.env`

**Contenido**:
```env
DATABASE_URL=postgresql://retoagbs_user:tu_password_seguro@localhost:5432/retoagbs
```

**Explicación de la URL**:
```
postgresql://usuario:contraseña@servidor:puerto/base_de_datos
         ↑         ↑           ↑         ↑      ↑
         protocolo usuario   contraseña localhost puerto  nombre_BD
```

**IMPORTANTE**: 
- Reemplaza `tu_password_seguro` con la contraseña que pusiste en PostgreSQL
- El resto de la URL se mantiene igual por defecto

#### Frontend (.env)
**Ubicación**: `ProyectoAGBS/frontend/.env`

**Contenido**:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_tu_clave_publica_de_clerk
```

**IMPORTANTE**:
- Reemplaza `pk_test_tu_clave_publica_de_clerk` con tu clave real de Clerk
- La clave debe empezar con `pk_test_`

### 🔐 Configuración de Clerk

#### ¿Qué es Clerk?
Clerk es el servicio que maneja el registro e inicio de sesión de usuarios en tu aplicación.

#### Configuración en el Dashboard:

1. **Crear aplicación**:
   - Ve a [Clerk Dashboard](https://dashboard.clerk.com/)
   - Haz clic en **"Add application"**
   - Nombre: `RetoAGBS`
   - Framework: **"Next.js"**

2. **Obtener claves**:
   - Ve a **"API Keys"** en el menú lateral
   - Copia la **"Publishable key"** (empieza con `pk_test_`)

3. **Configurar dominios**:
   - Ve a **"Domains"** en el menú lateral
   - Agrega: `http://localhost:5173`
   - Haz clic en **"Save"**

4. **Configurar autenticación**:
   - Ve a **"User & Authentication"**
   - Habilita **"Email address"** para registro
   - Configura verificación de email si lo deseas

#### Variables de entorno necesarias:

- **`VITE_CLERK_PUBLISHABLE_KEY`**: Clave pública para el frontend (obligatoria)
- **`CLERK_SECRET_KEY`**: Clave privada para el backend (opcional, no la necesitamos por ahora)

#### Ubicación de configuraciones en Clerk:
```
Dashboard de Clerk
├── Tu Aplicación (RetoAGBS)
    ├── API Keys ← Aquí están las claves
    ├── Domains ← Aquí configuras dominios
    ├── User & Authentication ← Configuración de usuarios
    ├── Appearance ← Personalización
    └── Paths ← Rutas de redirección
```

## 🏃‍♂️ Ejecución

### 🚀 Iniciar el Proyecto

#### Opción 1: Ejecutar manualmente (Recomendado para principiantes)

**Terminal 1 - Backend:**
1. Abre una terminal
2. Navega al backend:
   ```bash
   cd ProyectoAGBS/backend
   ```
3. Activa el entorno virtual:
   ```bash
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```
4. Inicia el servidor:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
5. Deberías ver:
   ```
   INFO:     Uvicorn running on http://127.0.0.1:8000
   INFO:     Application startup complete.
   ```

**Terminal 2 - Frontend:**
1. Abre **otra** terminal (nueva ventana)
2. Navega al frontend:
   ```bash
   cd ProyectoAGBS/frontend
   ```
3. Inicia el servidor:
   ```bash
   npm run dev
   ```
4. Deberías ver:
   ```
   Local:   http://localhost:5173/
   Network: http://192.168.x.x:5173/
   ```

#### Opción 2: Scripts automatizados (Para usuarios avanzados)

**Windows (PowerShell):**
1. Abre PowerShell como administrador
2. Navega al proyecto:
   ```powershell
   cd ProyectoAGBS
   ```
3. Ejecuta el script:
   ```powershell
   .\scripts\start-dev.ps1
   ```

**macOS/Linux:**
1. Abre la terminal
2. Navega al proyecto:
   ```bash
   cd ProyectoAGBS
   ```
3. Ejecuta el script:
   ```bash
   chmod +x scripts/start-dev.sh
   ./scripts/start-dev.sh
   ```

### 🌐 Acceso a la Aplicación

Una vez que ambos servidores estén corriendo:

#### URLs principales:
- **Frontend (Aplicación)**: http://localhost:5173
- **Backend (API)**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs

#### ¿Qué verás en cada URL?

**Frontend (http://localhost:5173):**
- Página de bienvenida de RetoAGBS
- Botones de "Iniciar sesión" y "Registrarse"
- Interfaz principal de la aplicación

**Backend (http://localhost:8000):**
- Mensaje de bienvenida de FastAPI
- Enlaces a la documentación

**Documentación API (http://localhost:8000/docs):**
- Interfaz interactiva de Swagger
- Lista de todos los endpoints disponibles
- Posibilidad de probar las APIs directamente

### 📊 Verificar que todo funciona correctamente

#### 1. Verificar Frontend:
1. Ve a http://localhost:5173
2. Deberías ver la página de bienvenida
3. Haz clic en **"Iniciar sesión"**
4. Deberías ver la interfaz de Clerk

#### 2. Verificar Backend:
1. Ve a http://localhost:8000/docs
2. Deberías ver la documentación de Swagger
3. Verifica que aparezcan endpoints como:
   - `/results/`
   - `/api/score/`
   - `/api/v1/grades/`

#### 3. Verificar Base de Datos:
1. En la terminal del backend, deberías ver mensajes de conexión exitosa
2. No deberías ver errores de conexión a la base de datos

#### 4. Verificar Autenticación:
1. En el frontend, intenta crear una cuenta de prueba
2. Deberías poder registrarte sin errores
3. Deberías poder iniciar sesión

### 🛑 Detener los servidores

#### Para detener manualmente:
1. En cada terminal, presiona **Ctrl+C**
2. Confirma que quieres detener el proceso

#### Para detener con scripts:
- Los scripts se detienen automáticamente con **Ctrl+C**

### ⚠️ Consejos importantes:

1. **Mantén ambas terminales abiertas** mientras uses la aplicación
2. **No cierres las terminales** si quieres seguir usando la app
3. **Si cambias archivos**, los servidores se reiniciarán automáticamente
4. **Si hay errores**, revisa los mensajes en las terminales
5. **Para reiniciar**, detén con Ctrl+C y vuelve a ejecutar los comandos

## 📊 Estructura del Proyecto

```
ProyectoAGBS/
├── 📁 backend/                    # Servidor FastAPI
│   ├── 📁 app/
│   │   ├── 📁 api/               # Endpoints de la API
│   │   ├── 📁 core/              # Configuración
│   │   ├── 📁 db/                # Base de datos
│   │   ├── 📁 models/            # Modelos SQLAlchemy
│   │   ├── 📁 schemas/           # Esquemas Pydantic
│   │   └── 📁 services/          # Lógica de negocio
│   ├── 📁 alembic/               # Migraciones
│   ├── requirements.txt          # Dependencias Python
│   └── main.py                   # Punto de entrada
├── 📁 frontend/                   # Cliente React
│   ├── 📁 src/
│   │   ├── 📁 features/          # Características principales
│   │   ├── 📁 shared/            # Componentes compartidos
│   │   ├── 📁 store/             # Estado global
│   │   └── 📁 utils/             # Utilidades
│   ├── package.json              # Dependencias Node.js
│   └── vite.config.ts            # Configuración Vite
└── 📁 docs/                       # Documentación
```

## 🎮 Uso del Sistema

### 👤 Primeros Pasos

1. **Registro/Login**:
   - Accede a http://localhost:5173
   - Regístrate o inicia sesión con Clerk

2. **Navegación**:
   - **Home**: Página principal
   - **Ejercicios**: Registrar nuevos resultados
   - **Dashboard**: Ver estadísticas y tabla de notas
   - **Historial**: Ver evaluaciones anteriores

### 📝 Registrar Resultados

1. Ve a **"Ejercicios"**
2. Selecciona los ejercicios que vas a evaluar
3. Ingresa los valores para cada ejercicio
4. Revisa la previsualización
5. Guarda los resultados

### 📊 Calcular Nota Final

1. Ve al **Dashboard**
2. Selecciona **exactamente 6 ejercicios**:
   - Salto Vertical
   - Extensiones de Brazo
   - 50m Lisos
   - 1000m
   - Natación 50m
   - 6 KM
3. Todos deben ser del **mismo sexo y grado**
4. Haz clic en **"Calcular Nota"**
5. Confirma en el modal
6. Ve el resultado con animación

### 🗑️ Gestionar Datos

- **Eliminar individual**: Usa el ícono de basura en cada fila
- **Eliminar múltiple**: Selecciona filas y usa "Eliminar Seleccionados"
- **Filtrar**: Usa los filtros en el dashboard

## 🔍 API Endpoints

### 📊 Resultados
- `GET /results/` - Obtener todos los resultados
- `POST /results/` - Crear nuevo resultado
- `DELETE /results/{id}` - Eliminar resultado
- `GET /results/user/{user_id}` - Resultados por usuario

### 🎯 Puntajes
- `POST /api/score/` - Calcular puntaje de ejercicio
- `GET /api/score/` - Obtener puntajes de referencia

### 📈 Notas
- `POST /api/v1/grades/` - Calcular nota final
- `GET /api/v1/grades/` - Obtener notas calculadas

### 📋 Documentación Completa
Visita: http://localhost:8000/docs

## 🐛 Solución de Problemas

### ❌ Errores Comunes

#### 1. Error de Conexión a Base de Datos
```bash
# Verificar que PostgreSQL esté corriendo
# Windows
net start postgresql-x64-15

# macOS
brew services list | grep postgresql

# Verificar conexión
psql -U retoagbs_user -d retoagbs -h localhost
```

#### 2. Error de Dependencias Frontend
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### 3. Error de Dependencias Backend
```bash
cd backend
# Desactivar y reactivar entorno virtual
deactivate
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
```

#### 4. Error de CORS
```bash
# Verificar que el backend esté corriendo en puerto 8000
# Verificar que el frontend esté corriendo en puerto 5173
```

#### 5. Error de Clerk
```bash
# Verificar variables de entorno
echo $VITE_CLERK_PUBLISHABLE_KEY

# Verificar configuración en Clerk Dashboard
```

### 🔧 Comandos de Diagnóstico

```bash
# Verificar puertos en uso
netstat -an | grep :8000
netstat -an | grep :5173

# Verificar logs del backend
tail -f backend/logs/app.log

# Verificar logs del frontend
npm run dev -- --debug
```

### 📞 Soporte

Si encuentras problemas:

1. **Revisa los logs** en la consola del navegador
2. **Verifica la documentación** de la API
3. **Comprueba las variables** de entorno
4. **Revisa la conectividad** de la base de datos

## 📝 Contribución

### 🤝 Cómo Contribuir

1. **Fork** el repositorio
2. **Crea una rama** para tu feature
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. **Haz tus cambios** y commitea
   ```bash
   git add .
   git commit -m "Agregar nueva funcionalidad"
   ```
4. **Push** a tu rama
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. **Crea un Pull Request**

### 📋 Estándares de Código

- **Python**: PEP 8
- **TypeScript**: ESLint configurado
- **Commits**: Conventional Commits
- **Documentación**: Docstrings en funciones

### 🧪 Testing

```bash
# Backend tests
cd backend
python -m pytest

# Frontend tests
cd frontend
npm test
```


## 📄 Licencia

### Licencia MIT

Este proyecto está bajo la **Licencia MIT**. Esto significa que puedes:

#### ✅ **Lo que puedes hacer:**
- **Usar** el software para cualquier propósito
- **Modificar** el código fuente
- **Distribuir** copias del software
- **Usar** el software comercialmente
- **Sublicenciar** el software

#### ❌ **Lo que debes hacer:**
- **Incluir** el aviso de copyright original
- **Incluir** el texto completo de la licencia MIT

### 📋 Texto Completo de la Licencia

```
MIT License

Copyright (c) 2024 [Tu Nombre]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### 🔧 Cómo Aplicar la Licencia

#### Para usar este proyecto:
1. **Copia** el texto de la licencia MIT
2. **Crea** un archivo llamado `LICENSE` en la raíz de tu proyecto
3. **Pega** el texto completo de la licencia
4. **Reemplaza** `[Tu Nombre]` con tu nombre real

#### Para contribuir:
1. **Mantén** la licencia MIT existente
2. **No cambies** los términos de la licencia sin autorización
3. **Respetar** los derechos de autor originales

### 📞 Información Legal

- **Tipo de Licencia**: MIT License
- **Año**: 2024
- **Autor**: [Tu Nombre]
- **Versión**: 1.0

### 🌐 Recursos Adicionales

- [Licencia MIT en GitHub](https://choosealicense.com/licenses/mit/)
- [Explicación de la Licencia MIT](https://opensource.org/licenses/MIT)
- [Guía de Licencias de Software Libre](https://www.gnu.org/licenses/license-list.html)

---

## 🙏 Agradecimientos

- **Material-UI** por los componentes de UI
- **FastAPI** por el framework web
- **Clerk** por la autenticación
- **PostgreSQL** por la base de datos

---

**¡Gracias por usar RetoAGBS! 🏃‍♂️💪** 