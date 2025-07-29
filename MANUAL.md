# 📚 Manual Completo - RetoAGBS

## 🎯 Guía Paso a Paso 

Esta guía te llevará desde cero hasta tener tu aplicación RetoAGBS funcionando completamente.

---

## 📋 Índice del Manual

1. [🔧 Verificación de Requisitos](#-verificación-de-requisitos)
2. [📥 Descarga del Proyecto](#-descarga-del-proyecto)
3. [🐍 Instalación de Python](#-instalación-de-python)
4. [📦 Instalación de Node.js](#-instalación-de-nodejs)
5. [🗄️ Instalación de PostgreSQL](#️-instalación-de-postgresql)
6. [🔧 Configuración de Base de Datos](#-configuración-de-base-de-datos)
7. [⚙️ Configuración del Backend](#️-configuración-del-backend)
8. [🎨 Configuración del Frontend](#-configuración-del-frontend)
9. [🔐 Configuración de Autenticación](#-configuración-de-autenticación)
10. [🚀 Ejecución del Proyecto](#-ejecución-del-proyecto)
11. [🐛 Solución de Problemas](#-solución-de-problemas)

---

## 🔧 Verificación de Requisitos

### ¿Qué necesitas tener instalado?

Antes de comenzar, necesitas verificar si tienes estos programas en tu computadora:

#### 1. Python
**¿Cómo verificar si tienes Python?**
1. Abre la **Terminal** (Windows: CMD o PowerShell, Mac: Terminal)
2. Escribe: `python --version`
3. Si aparece algo como "Python 3.11.0", **ya lo tienes** ✅
4. Si aparece "No se reconoce como comando", **necesitas instalarlo** ❌

#### 2. Node.js
**¿Cómo verificar si tienes Node.js?**
1. En la misma terminal, escribe: `node --version`
2. Si aparece algo como "v18.17.0", **ya lo tienes** ✅
3. Si aparece "No se reconoce como comando", **necesitas instalarlo** ❌

#### 3. PostgreSQL
**¿Cómo verificar si tienes PostgreSQL?**
1. En la terminal, escribe: `psql --version`
2. Si aparece algo como "psql (PostgreSQL) 15.0", **ya lo tienes** ✅
3. Si aparece "No se reconoce como comando", **necesitas instalarlo** ❌

#### 4. Git
**¿Cómo verificar si tienes Git?**
1. En la terminal, escribe: `git --version`
2. Si aparece algo como "git version 2.40.0", **ya lo tienes** ✅
3. Si aparece "No se reconoce como comando", **necesitas instalarlo** ❌

---

## 📥 Descarga del Proyecto

### Paso 1: Crear una carpeta para el proyecto

1. Ve a tu **Escritorio** (Desktop)
2. Crea una nueva carpeta llamada `ProyectoAGBS`
3. Abre esa carpeta

### Paso 2: Descargar el proyecto

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

### Paso 3: Verificar la descarga
1. Dentro de la carpeta `ProyectoAGBS` deberías ver:
   - Carpeta `backend`
   - Carpeta `frontend`
   - Archivo `README.md`
   - Otros archivos

---

## 🐍 Instalación de Python

### Si NO tienes Python instalado:

#### Windows:
1. Ve a [https://www.python.org/downloads/](https://www.python.org/downloads/)
2. Haz clic en **"Download Python 3.11.x"** (botón amarillo)
3. Descarga el archivo `.exe`
4. **IMPORTANTE**: Al instalar, marca la casilla **"Add Python to PATH"**
5. Haz clic en **"Install Now"**
6. Espera a que termine la instalación

#### macOS:
1. Ve a [https://www.python.org/downloads/](https://www.python.org/downloads/)
2. Haz clic en **"Download Python 3.11.x"**
3. Descarga el archivo `.pkg`
4. Abre el archivo descargado
5. Sigue las instrucciones del instalador

#### Linux (Ubuntu/Debian):
1. Abre la terminal
2. Copia y pega estos comandos uno por uno:
   ```bash
   sudo apt update
   sudo apt install python3 python3-pip
   ```

### Verificar la instalación:
1. Abre una **nueva** terminal
2. Escribe: `python --version`
3. Debería aparecer algo como "Python 3.11.x"

---

## 📦 Instalación de Node.js

### Si NO tienes Node.js instalado:

#### Windows:
1. Ve a [https://nodejs.org/](https://nodejs.org/)
2. Descarga la versión **"LTS"** (botón verde)
3. Ejecuta el archivo `.msi` descargado
4. Sigue las instrucciones del instalador
5. **IMPORTANTE**: Acepta todas las opciones por defecto

#### macOS:
1. Ve a [https://nodejs.org/](https://nodejs.org/)
2. Descarga la versión **"LTS"**
3. Abre el archivo `.pkg` descargado
4. Sigue las instrucciones del instalador

#### Linux (Ubuntu/Debian):
1. Abre la terminal
2. Copia y pega estos comandos:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

### Verificar la instalación:
1. Abre una **nueva** terminal
2. Escribe: `node --version`
3. Debería aparecer algo como "v18.x.x"
4. Escribe: `npm --version`
5. Debería aparecer algo como "9.x.x"

---

## 🗄️ Instalación de PostgreSQL

### Si NO tienes PostgreSQL instalado:

#### Windows:
1. Ve a [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Haz clic en **"Download the installer"**
3. Descarga la versión más reciente
4. Ejecuta el archivo `.exe`
5. **IMPORTANTE**: Anota la contraseña que pongas para el usuario `postgres`
6. Completa la instalación

#### macOS:
1. Ve a [https://www.postgresql.org/download/macosx/](https://www.postgresql.org/download/macosx/)
2. Descarga **PostgreSQL.app**
3. Arrastra la aplicación a tu carpeta de aplicaciones
4. Abre PostgreSQL.app
5. Anota la contraseña que se genera

#### Linux (Ubuntu/Debian):
1. Abre la terminal
2. Copia y pega estos comandos:
   ```bash
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   ```

### Verificar la instalación:
1. Abre una **nueva** terminal
2. Escribe: `psql --version`
3. Debería aparecer algo como "psql (PostgreSQL) 15.x"

---

## 🔧 Configuración de Base de Datos

### Paso 1: Iniciar PostgreSQL

#### Windows:
1. Busca **"Servicios"** en el menú de Windows
2. Busca **"postgresql-x64-15"** (o similar)
3. Si no está corriendo, haz clic derecho y selecciona **"Iniciar"**

#### macOS:
1. Abre **PostgreSQL.app**
2. Si no está corriendo, haz clic en **"Start"**

#### Linux:
1. En la terminal, escribe:
   ```bash
   sudo systemctl start postgresql
   ```

### Paso 2: Crear la base de datos

#### Windows:
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

#### macOS/Linux:
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

### Paso 3: Verificar la base de datos
1. En la terminal, escribe:
   ```bash
   psql -U retoagbs_user -d retoagbs -h localhost
   ```
2. Si te pide contraseña, ingresa la que pusiste
3. Deberías ver algo como `retoagbs=#`
4. Escribe `\q` para salir

---

## ⚙️ Configuración del Backend

### Paso 1: Navegar al directorio del backend
1. Abre la terminal
2. Navega a la carpeta del proyecto:
   ```bash
   cd ProyectoAGBS/backend
   ```

### Paso 2: Crear entorno virtual
1. En la terminal, escribe:
   ```bash
   python -m venv venv
   ```

### Paso 3: Activar el entorno virtual

#### Windows:
```cmd
venv\Scripts\activate
```

#### macOS/Linux:
```bash
source venv/bin/activate
```

**Deberías ver `(venv)` al inicio de la línea de comandos**

### Paso 4: Instalar dependencias
1. Con el entorno virtual activado, escribe:
   ```bash
   pip install -r requirements.txt
   ```
2. Espera a que termine la instalación (puede tomar varios minutos)

### Paso 5: Crear archivo de configuración
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

### Paso 6: Crear las tablas
1. En la terminal (con el entorno virtual activado), escribe:
   ```bash
   python create_db.py
   ```
2. Deberías ver: "Creando tablas..." y luego "¡Listo!"

### Paso 7: Ejecutar migraciones (si existen)
1. En la terminal, escribe:
   ```bash
   alembic upgrade head
   ```
2. Si aparece algún error, no te preocupes, puede que no haya migraciones

### Paso 8: Verificar el backend
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

---

## 🎨 Configuración del Frontend

### Paso 1: Navegar al directorio del frontend
1. Abre una **nueva** terminal
2. Navega a la carpeta del proyecto:
   ```bash
   cd ProyectoAGBS/frontend
   ```

### Paso 2: Instalar dependencias
1. En la terminal, escribe:
   ```bash
   npm install
   ```
2. Espera a que termine la instalación (puede tomar varios minutos)

### Paso 3: Crear archivo de configuración
1. En la carpeta `frontend`, crea un archivo llamado `.env`
2. Abre el archivo con cualquier editor de texto
3. Agrega esta línea (por ahora déjala vacía, la configurarás después):
   ```
   VITE_CLERK_PUBLISHABLE_KEY=
   ```
4. Guarda el archivo

### Paso 4: Verificar el frontend
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

---

## 🔐 Configuración de Autenticación (Clerk)

### ¿Qué es Clerk?
Clerk es el servicio que maneja el registro e inicio de sesión de usuarios en tu aplicación. Es como el "portero" que controla quién puede entrar.

### Paso 1: Crear cuenta en Clerk

#### 1.1 Ir al sitio web de Clerk
1. Abre tu navegador web
2. Ve a: [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
3. Haz clic en **"Sign up"** (Registrarse)

#### 1.2 Crear tu cuenta
1. **Email**: Ingresa tu dirección de email
2. **Contraseña**: Crea una contraseña segura
3. **Nombre**: Tu nombre completo
4. Haz clic en **"Create account"** (Crear cuenta)

#### 1.3 Verificar tu email
1. Revisa tu bandeja de entrada
2. Busca un email de Clerk
3. Haz clic en el enlace de verificación
4. Tu cuenta estará activa

### Paso 2: Crear una nueva aplicación

#### 2.1 Acceder al dashboard
1. Una vez que hayas iniciado sesión, verás el **Dashboard de Clerk**
2. Haz clic en el botón **"Add application"** (Agregar aplicación)

#### 2.2 Configurar la aplicación
1. **Application name**: Escribe `RetoAGBS`
2. **Framework**: Selecciona **"Next.js"** (aunque usemos React, Next.js es compatible)
3. **Deployment**: Selecciona **"Development"**
4. Haz clic en **"Create application"** (Crear aplicación)

#### 2.3 Esperar la configuración
- Clerk creará automáticamente tu aplicación
- Esto puede tomar unos segundos
- Verás un mensaje de "Application created successfully"

### Paso 3: Obtener las claves API

#### 3.1 Navegar a API Keys
1. En el dashboard de tu aplicación, busca en el menú lateral
2. Haz clic en **"API Keys"** (Claves API)
3. Verás dos secciones: **"Publishable keys"** y **"Secret keys"**

#### 3.2 Copiar la clave pública
1. En la sección **"Publishable keys"**, verás una clave que empieza con `pk_test_`
2. **Ejemplo**: `pk_test_YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo=`
3. Haz clic en el botón **"Copy"** (Copiar) al lado de la clave
4. **Guarda esta clave** en un lugar seguro temporalmente

#### 3.3 Verificar la clave
- La clave debe empezar con `pk_test_`
- Debe tener aproximadamente 50 caracteres
- Es la clave que usaremos en el frontend

### Paso 4: Configurar dominios permitidos

#### 4.1 Ir a la sección Domains
1. En el menú lateral, haz clic en **"Domains"** (Dominios)
2. Verás una lista de dominios permitidos

#### 4.2 Agregar dominio de desarrollo
1. Haz clic en **"Add domain"** (Agregar dominio)
2. En el campo de texto, escribe: `http://localhost:5173`
3. Haz clic en **"Save"** (Guardar)
4. Verás el dominio agregado a la lista

#### 4.3 Verificar la configuración
- El dominio `http://localhost:5173` debe aparecer en la lista
- Debe tener un estado **"Active"** (Activo)
- Si ves algún error, intenta agregarlo nuevamente

### Paso 5: Configurar métodos de autenticación

#### 5.1 Ir a User & Authentication
1. En el menú lateral, haz clic en **"User & Authentication"**
2. Luego haz clic en **"Email, Phone, Username"**

#### 5.2 Configurar métodos de registro
1. **Email address**: Marca la casilla para habilitar registro por email
2. **Username**: Opcional, puedes desmarcarlo si no lo necesitas
3. **Phone number**: Opcional, puedes desmarcarlo si no lo necesitas
4. Haz clic en **"Save changes"** (Guardar cambios)

#### 5.3 Configurar verificación de email
1. Ve a **"Email & SMS"** en el menú lateral
2. **Email verification**: Marca la casilla si quieres que los usuarios verifiquen su email
3. Haz clic en **"Save changes"**

### Paso 6: Actualizar el archivo .env del frontend

#### 6.1 Abrir el archivo .env
1. Ve a la carpeta `ProyectoAGBS/frontend`
2. Abre el archivo `.env` con cualquier editor de texto
3. Si no existe, créalo

#### 6.2 Agregar la clave
1. En el archivo `.env`, agrega esta línea:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_tu_clave_aqui
   ```
2. **Reemplaza** `pk_test_tu_clave_aqui` con la clave que copiaste en el Paso 3
3. **Ejemplo completo**:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo=
   ```

#### 6.3 Guardar el archivo
1. Guarda el archivo `.env`
2. Cierra el editor de texto

### Paso 7: Verificar la configuración

#### 7.1 Reiniciar el servidor frontend
1. Si el servidor frontend está corriendo, deténlo con **Ctrl+C**
2. Inicia el servidor nuevamente:
   ```bash
   npm run dev
   ```

#### 7.2 Probar la autenticación
1. Abre tu navegador
2. Ve a: `http://localhost:5173`
3. Haz clic en **"Iniciar sesión"** o **"Registrarse"**
4. Deberías ver la interfaz de Clerk
5. Intenta crear una cuenta de prueba

### Paso 8: Configuración adicional (Opcional)

#### 8.1 Personalizar la apariencia
1. En el dashboard de Clerk, ve a **"Appearance"**
2. Puedes cambiar colores, logos y textos
3. Haz clic en **"Save changes"**

#### 8.2 Configurar redirección después del login
1. Ve a **"Paths"** en el menú lateral
2. **After sign in**: Escribe `/dashboard`
3. **After sign up**: Escribe `/dashboard`
4. Haz clic en **"Save changes"**

### 🔍 Ubicación de las claves en el dashboard

#### Navegación exacta:
```
Dashboard de Clerk
├── Tu Aplicación (RetoAGBS)
    ├── API Keys ← Aquí están las claves
    ├── Domains ← Aquí configuras dominios
    ├── User & Authentication ← Configuración de usuarios
    ├── Appearance ← Personalización
    └── Paths ← Rutas de redirección
```

#### Información importante:
- **Publishable Key**: Se usa en el frontend (pública)
- **Secret Key**: Se usa en el backend (privada, no la necesitamos por ahora)
- **Dominios**: Solo los dominios listados pueden usar la autenticación
- **Configuración**: Se guarda automáticamente

### ⚠️ Consejos importantes:

1. **Nunca compartas** tu Secret Key
2. **La Publishable Key** es segura de compartir
3. **Siempre agrega** `http://localhost:5173` para desarrollo
4. **Para producción**, agregarás tu dominio real
5. **Guarda una copia** de las claves en un lugar seguro

### 🐛 Si algo no funciona:

#### Error: "Invalid publishable key"
- Verifica que la clave empiece con `pk_test_`
- Verifica que no haya espacios extra
- Reinicia el servidor frontend

#### Error: "Domain not allowed"
- Verifica que `http://localhost:5173` esté en la lista de dominios
- Espera unos minutos después de agregar el dominio
- Verifica que no haya espacios extra en la URL

#### Error: "Clerk not initialized"
- Verifica que el archivo `.env` esté en la carpeta correcta
- Verifica que la variable se llame exactamente `VITE_CLERK_PUBLISHABLE_KEY`
- Reinicia el servidor frontend

---

## 🚀 Ejecución del Proyecto

### Opción 1: Ejecutar manualmente

#### Terminal 1 - Backend:
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

#### Terminal 2 - Frontend:
1. Abre otra terminal
2. Navega al frontend:
   ```bash
   cd ProyectoAGBS/frontend
   ```
3. Inicia el servidor:
   ```bash
   npm run dev
   ```

### Opción 2: Usar scripts automatizados

#### Windows:
1. Abre PowerShell como administrador
2. Navega al proyecto:
   ```powershell
   cd ProyectoAGBS
   ```
3. Ejecuta el script:
   ```powershell
   .\scripts\start-dev.ps1
   ```

#### macOS/Linux:
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

### Verificar que todo funciona:
1. Abre tu navegador
2. Ve a: `http://localhost:5173`
3. Deberías ver la página de bienvenida
4. Haz clic en **"Iniciar sesión"**
5. Deberías poder registrarte o iniciar sesión

---

## 🐛 Solución de Problemas

### Error: "Python no se reconoce como comando"
**Solución:**
1. Reinstala Python
2. **IMPORTANTE**: Marca "Add Python to PATH"
3. Reinicia la terminal

### Error: "Node.js no se reconoce como comando"
**Solución:**
1. Reinstala Node.js
2. Acepta todas las opciones por defecto
3. Reinicia la terminal

### Error: "psql no se reconoce como comando"
**Solución:**
1. Reinstala PostgreSQL
2. Asegúrate de que esté corriendo en Servicios (Windows)

### Error: "No module named 'fastapi'"
**Solución:**
1. Asegúrate de que el entorno virtual esté activado
2. Ejecuta: `pip install -r requirements.txt`

### Error: "Cannot find module 'react'"
**Solución:**
1. Ve a la carpeta `frontend`
2. Ejecuta: `npm install`

### Error: "Connection refused" en la base de datos
**Solución:**
1. Verifica que PostgreSQL esté corriendo
2. Verifica la contraseña en el archivo `.env`
3. Verifica que la base de datos `retoagbs` exista

### Error: "Clerk authentication failed"
**Solución:**
1. Verifica que la clave en `.env` sea correcta
2. Verifica que `http://localhost:5173` esté en los dominios permitidos
3. Reinicia el servidor frontend

### Error: "Port 8000 is already in use"
**Solución:**
1. Busca qué está usando el puerto 8000
2. Detén ese proceso
3. O cambia el puerto en el comando uvicorn

### Error: "Port 5173 is already in use"
**Solución:**
1. Busca qué está usando el puerto 5173
2. Detén ese proceso
3. O el servidor te dará automáticamente otro puerto

---

### Si algo no funciona:

1. **Revisa los logs** en la terminal
2. **Verifica que todos los servicios estén corriendo**
3. **Revisa que los archivos `.env` estén configurados correctamente**
4. **Asegúrate de que las versiones sean compatibles**

### Recursos adicionales:
- [Documentación de Python](https://docs.python.org/)
- [Documentación de Node.js](https://nodejs.org/docs/)
- [Documentación de PostgreSQL](https://www.postgresql.org/docs/)
- [Documentación de Clerk](https://clerk.com/docs)

---

## 🎉 ¡Felicidades!

Si llegaste hasta aquí, tu aplicación RetoAGBS debería estar funcionando completamente. Puedes:

- ✅ **Registrar resultados** de ejercicios
- ✅ **Calcular notas** automáticamente
- ✅ **Ver estadísticas** en el dashboard
- ✅ **Gestionar tu historial** de evaluaciones

**¡Disfruta usando tu aplicación!** 🏃‍♂️💪 