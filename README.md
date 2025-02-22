Endpoints

Autenticación
Registrar Usuario
POST http://localhost:3000/gestorOp/v1/auth/register
Body (JSON):
json
Copiar
Editar
{
  "name": "Juan",
  "surname": "Pérez",
  "username": "juanito",
  "email": "juan@example.com",
  "password": "Password123!",
  "phone": "12345678",
  "role": "CLIENT"
}
Iniciar Sesión
POST http://localhost:3000/gestorOp/v1/auth/login
Body (JSON):
json
Copiar
Editar
{
  "username": "juanito",
  "password": "Password123!"
}
o
json
Copiar
Editar
{
  "email": "juan@example.com",
  "password": "Password123!"
}
Usuarios
Requiere token (Authorization: Bearer <token>) en los endpoints protegidos.

Obtener todos los usuarios (Solo ADMIN)
GET http://localhost:3000/gestorOp/v1/user

Obtener un usuario por ID (Solo ADMIN)
GET http://localhost:3000/gestorOp/v1/user/findUser/:uid

Actualizar un usuario (ADMIN actualiza a otros)
PUT http://localhost:3000/gestorOp/v1/user/admin/updateUser/:uid

Actualizar el perfil del usuario autenticado
PUT http://localhost:3000/gestorOp/v1/user/updateUser
(La ruta exacta puede variar según tu definición en el router)

Posts
Todas las rutas de posts se registran en:
http://localhost:3000/gestorOp/v1/posts

Crear un Post (Usuario autenticado)
POST /
Headers: Authorization: Bearer <token>
Body (JSON):

json
Copiar
Editar
{
  "title": "Mi Post",
  "category": "Tecnología",
  "content": "Contenido interesante"
}
Obtener todos los Posts (Público)
GET /

Obtener un Post por ID (Público)
GET /:postId

Actualizar un Post (Solo autor)
PUT /updatePost/:postId
Headers: Authorization: Bearer <token>
Body (JSON):

json
Copiar
Editar
{
  "title": "Título Editado",
  "category": "Nueva Categoría",
  "content": "Contenido actualizado"
}
Eliminar un Post (Solo autor)
DELETE /delete/:postId
Headers: Authorization: Bearer <token>

Comentarios
Registrados en:
http://localhost:3000/gestorOp/v1/comments

Crear un Comentario (Solo autenticado)
POST /
Headers: Authorization: Bearer <token>
Body (JSON):

json
Copiar
Editar
{
  "postId": "ID_DEL_POST",
  "text": "Comentario interesante"
}
Obtener Comentarios por Post (Público)
GET /post/:postId

Actualizar un Comentario (Solo autor)
PUT /:commentId
Headers: Authorization: Bearer <token>
Body (JSON):

json
Copiar
Editar
{
  "text": "Comentario editado"
}
Eliminar un Comentario (Solo autor)
DELETE /:commentId
Headers: Authorization: Bearer <token>

Categorías
La administración de categorías es solo para ADMIN.
Rutas registradas en:
http://localhost:3000/gestorOp/v1/category

Crear Categoría (ADMIN)
POST /
Headers: Authorization: Bearer <token>
Body (JSON):

json
Copiar
Editar
{
  "name": "Deportes",
  "description": "Publicaciones deportivas"
}
Obtener todas las Categorías (Público)
GET /

Eliminar una Categoría (ADMIN)
DELETE /:categoryId
Headers: Authorization: Bearer <token>

Cómo Probar con Postman
Importa este proyecto en Postman o crea manualmente los requests.
Registra un usuario con el endpoint de Auth/Register.
Inicia sesión con el endpoint de Auth/Login y copia el token.
Agrega en cada request protegido un header:
makefile
Copiar
Editar
Authorization: Bearer <tu-token>
Prueba crear, editar, eliminar posts y comentarios.
Verifica que solo el autor pueda editar o eliminar lo suyo y que ADMIN controle ciertas operaciones.
Contribuciones
¡Si deseas contribuir, eres bienvenido! Haz un fork del repositorio, crea tu rama (git checkout -b feature/nueva-funcionalidad), haz tus cambios y envía un Pull Request.

Licencia
Este proyecto está bajo la MIT License. Siéntete libre de usarlo y modificarlo según tus necesidades.