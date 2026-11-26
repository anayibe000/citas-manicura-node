# Andi Cárdenas – Sistema de agendamiento de citas de manicura

Sistema web para que las clientas del emprendimiento Andi Cárdenas agenden sus citas de manicura, y para que la administradora gestione las citas y los servicios.

Proyecto productivo – Técnico en Programación de Software, SENA (ficha 3236085).

## Tecnologías

- **Backend:** Node.js, Express, MySQL (mysql2), bcryptjs, jsonwebtoken
- **Frontend:** React (Create React App)
- **Base de datos:** MySQL (XAMPP)
- **Pruebas de la API:** Postman

## Funciones

**Clientas**
- Ver los servicios con su precio y tiempo
- Clienta nueva: agendar una cita registrando nombre, apellido y teléfono
- Clienta recurrente: ingresar con su teléfono y agendar
- Escoger un retiro si lo necesita (se suma al tiempo y al valor)
- Validaciones: teléfono de 10 dígitos, no agendar en fechas pasadas y **no permitir cruces de horario** según la duración del servicio

**Administradora**
- Ingreso con usuario y contraseña (contraseña cifrada y token JWT)
- Ver todas las citas, cambiar su estado (pendiente, confirmada, cancelada) y eliminarlas
- Cambiar el precio y el tiempo de cada servicio

## Cómo ejecutarlo

### 1. Base de datos
1. Encender MySQL en XAMPP.
2. En MySQL Workbench, ejecutar `base_datos/01_estructura.sql` y luego `base_datos/02_servicios.sql`.

### 2. Backend (puerto 3000)
```
cd backend
npm install
node crear_admin.js usuario contraseña
node index.js
```
El comando `crear_admin.js` se ejecuta una sola vez para crear la cuenta de la administradora.

### 3. Frontend (puerto 3001)
```
cd frontend
npm install
npm start
```
Abrir `http://localhost:3001` en el navegador.

## Rutas de la API

| Método | Ruta | Descripción | Token |
|---|---|---|---|
| GET | /api/servicios | Lista de servicios | No |
| PUT | /api/servicios/:id | Cambiar precio y tiempo | Sí |
| POST | /api/citas | Agendar una cita | No |
| GET | /api/citas | Lista de citas | Sí |
| PUT | /api/citas/:id | Cambiar estado | Sí |
| DELETE | /api/citas/:id | Eliminar cita | Sí |
| POST | /api/clientes/login | Ingreso de clienta recurrente | No |
| POST | /api/admin/login | Ingreso de la administradora | No |

## Autora

Anayibe Cárdenas González
