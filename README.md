# 📂 Project Management App

Aplicación web completa para la **gestión de proyectos, equipos y tareas** con funcionalidades avanzadas de autenticación, colaboración en tiempo real y administración de recursos.

## 🚀 Características principales

- **Autenticación de usuarios**
  - Registro y login de usuarios.
  - Verificación de cuenta por **OTP** vía correo electrónico.
  - Recuperación de contraseña:
    - Solicitud de OTP de recuperación.
    - Verificación de OTP.
    - Restablecimiento de contraseña.
    
- **Gestión de equipos**
  - Crear equipos.
  - Unirse a equipos mediante **código único**.
  - Enviar solicitudes para unirse a un equipo.
  - El **admin** del equipo puede aceptar o rechazar solicitudes.

- **Gestión de proyectos y tareas**
  - El **admin** puede crear, editar y eliminar proyectos.
  - Creación, edición y eliminación de tareas.
  - Asignación y desasignación de tareas.
  - Gestión de **tags** para organizar tareas.
  - Los usuarios asignados pueden **marcar tareas como completadas** y subir **archivos adjuntos**.

- **Comunicación en tiempo real**
  - **Chat global** para todos los miembros.
  - **Chat privado** entre usuarios.
  - Implementado con **Socket.IO**.

- **Sistema de notificaciones**
  - Notificaciones en tiempo real para:
    - Asignación de tareas.
    - Cambios en proyectos.
    - Solicitudes de equipo.

- **Almacenamiento de archivos**
  - Integración con **Cloudinary** para manejo de imágenes y documentos.
  - Soporte para formatos: `jpg`, `png`, `pdf`, `doc`, `docx`.

## 🛠 Tecnologías utilizadas

**Frontend:**
- React.js
- Tailwind CSS
- Axios
- Socket.IO Client

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT para autenticación
- Nodemailer (envío de OTP)
- Socket.IO para mensajería
- Multer + Cloudinary para subida de archivos

## 📦 Instalación y ejecución

### 1️⃣ Clonar repositorio
```bash
git clone https://github.com/Makfront0123/project_management.git
cd project_management
