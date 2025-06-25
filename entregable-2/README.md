# API REST - Pet Posts

## Autenticación

### Registro de usuario
- **POST** `/api/auth/register`
- **Body (JSON):**
```json
{
  "name": "Juan",
  "email": "juan@ejemplo.com",
  "password": "123456"
}
```
- **Respuesta:** Usuario creado

### Login
- **POST** `/api/auth/login`
- **Body (JSON):**
```json
{
  "email": "juan@ejemplo.com",
  "password": "123456"
}
```
- **Respuesta:**
```json
{
  "token": "<JWT_TOKEN>"
}
```

---

## Usuarios

### Obtener todos los usuarios
- **GET** `/api/users`
- **Respuesta:** Lista de usuarios

---

## Posts

### Obtener todos los posts
- **GET** `/api/posts`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Respuesta:** Lista de posts

### Crear un post
- **POST** `/api/posts`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body (JSON):**
```json
{
  "title": "Título del post",
  "description": "Descripción",
  "userId": 1
}
```
- **Respuesta:** Post creado

---

## Notas
- Usa el token JWT recibido en el login para acceder a los endpoints protegidos.
- Cambia los valores de ejemplo por los datos reales de tu aplicación.
