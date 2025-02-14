# API REST - Gestión de Paquetes Turísticos y Reservas

Este proyecto es una API REST desarrollada en **NestJS** para gestionar **paquetes turísticos** y **reservas**.

## 📌 Características Principales

- **CRUD de Paquetes Turísticos** con búsqueda, paginación y validación de nombres únicos.
- **CRUD de Reservas** con notificación por correo electrónico.
- **Autenticación JWT** con roles (`ADMIN` y `USER`).
- **Paginación** en listados de paquetes y reservas.
- **Logs de errores con Winston**.
- **Base de datos MySQL** con TypeORM.
- **Pruebas unitarias con Jest**.

---

## 🚀 Instalación y Configuración

1. Clonar el repositorio.

```bash
 git clone <repositorio>
 cd <directorio>
```

2. Instalar dependencias.

```bash
 npm install
```

3. Configurar las variables de entorno.

Renombrar el archivo `.env.example` a `.env` y establecer las credenciales necesarias.

```bash
 mv .env.example .env
```

4. Levantar el servidor.

```bash
 npm run start:dev
```

---

## 🔐 Autenticación

Se implementó autenticación con **JWT** y creación de usuario.

- **Roles:** `ADMIN` y `USER` (solo `USER` es necesario para acceder a los endpoints protegidos).
- **Duración del Token:** 24 horas.

### **Endpoints de Autenticación**

- **Registrar Usuario:** `POST /users`
- **Iniciar Sesión:** `POST /auth`

Al iniciar sesión, se obtiene un token de acceso que debe enviarse en los endpoints protegidos en el **header Authorization**:

```bash
Authorization: Bearer <TOKEN>
```

---

## 💃 Base de Datos

Se utiliza **TypeORM** con **MySQL**. Al iniciar el servidor, las tablas se crean automáticamente gracias a la configuración:

📝 `src/config/typeorm.config.ts` → `synchronize: true`

---

## 📌 Endpoints Disponibles

### **Paquetes Turísticos** (`/tourist-packages`)

- **Crear Paquete:** `POST /tourist-packages`
- **Listar Paquetes:** `GET /tourist-packages?page=1&limit=2` (paginación incluida)
- **Buscar Paquete:** `GET /tourist-packages/search/machu`  
  📌 _Dado que esta es una búsqueda básica, se implementó con una ruta directa. Para búsquedas con más parámetros, se recomienda usar query params._
- **Obtener Paquete por ID:** `GET /tourist-packages/:id`
- **Actualizar Paquete:** `PATCH /tourist-packages/:id`
- **Eliminar Paquete:** `DELETE /tourist-packages/:id`

📌 **Validación**: Se creó un decorador `@IsUnique()` para evitar nombres duplicados en paquetes turísticos.

📌 **Interceptor para Actualización**: Se implementó un **interceptor** que asigna el `id` del paquete al cuerpo de la solicitud en las actualizaciones (`PATCH`), permitiendo que `@IsUnique()` detecte si un nombre ya existe y evite valores duplicados.

### **Reservas** (`/reservations`)

- **Crear Reserva:** `POST /reservations`
- **Listar Reservas:** `GET /reservations?page=1&limit=2`
- **Buscar Reserva:** `GET /reservations/search/peter`  
  📌 _Esta búsqueda es básica, por lo que se usa en la ruta directa. Si se requieren más parámetros, se deben utilizar query params._
- **Obtener Reserva por ID:** `GET /reservations/:id`
- **Actualizar Reserva:** `PATCH /reservations/:id`
- **Eliminar Reserva:** `DELETE /reservations/:id`

📌 **Notificación por Email:** Cuando se crea una reserva, se envía un email de confirmación utilizando **Nodemailer**.

📧 **Configuración de Email:** Se ha preconfigurado una cuenta de ejemplo con credenciales en las variables de entorno.

---

## 📊 Logs de Errores

Se instaló **Winston** para registrar errores en la carpeta `/logs` en la raíz del proyecto.

---

## 🧩 Pruebas Unitarias

Se realizaron pruebas unitarias con Jest para garantizar el correcto funcionamiento de la API.

📌 Cobertura de pruebas:

Controlador de Reservas (reservations)
Controlador de Paquetes Turísticos (tourist-packages)

Ejecutar pruebas:

```bash
 npm run test
```

---

## 📂 Estructura del Proyecto

```
📛 src
📦 src
 ┣ 📂 common  # Utilidades compartidas
 ┃ ┣ 📂 decorators  # Decoradores personalizados
 ┃ ┣ 📂 enums  # Enumeraciones utilizadas en el sistema
 ┃ ┣ 📂 interceptors  # Interceptores para manipular requests/responses
 ┃ ┣ 📂 interfaces  # Definiciones de interfaces comunes
 ┃ ┣ 📂 pipes  # Pipes personalizados
 ┃ ┣ 📂 utils  # Funciones auxiliares
 ┃ ┣ 📂 validator  # Validadores personalizados
 ┃ ┗ 📂 winston  # Configuración de logs con Winston
 ┣ 📂 config  # Configuraciones del sistema
 ┃ ┣ 📜 env.config.ts  # Configuración de variables de entorno
 ┃ ┣ 📜 jwt.config.ts  # Configuración de autenticación JWT
 ┃ ┗ 📜 typeorm.config.ts  # Configuración de TypeORM
 ┣ 📂 modules  # Módulos principales
 ┃ ┣ 📂 auth  # Módulo de autenticación
 ┃ ┣ 📂 mail  # Módulo de envío de correos
 ┃ ┣ 📂 reservation  # Módulo de reservas
 ┃ ┣ 📂 tourist-package  # Módulo de paquetes turísticos
 ┃ ┗ 📂 user  # Módulo de usuarios
 ┣ 📜 app.controller.ts  # Controlador global de la aplicación
 ┣ 📜 app.module.ts  # Módulo raíz de la aplicación
 ┗ 📜 main.ts  # Punto de entrada de la aplicación

```

---

## 📝 Notas Finales

✅ **Recuerda renombrar `.env.example` a `.env` antes de ejecutar el proyecto.**

✅ **Se implementó búsqueda en ambas entidades (paquetes y reservas).**

✅ **Los listados incluyen paginación con parámetros:** `?page=1&limit=2` (Ejemplo).

✅ **Decorador `@IsUnique()` en paquetes turísticos para evitar nombres duplicados.**

✅ **Se implementó un interceptor para ayudar a `@IsUnique()` en las actualizaciones.**

✅ **Errores registrados con Winston en `/logs`.**

✅ **Se envía un email de confirmación al crear una reserva.**

✅ **Base de datos con TypeORM en MySQL, genera las tablas automáticamente.**
