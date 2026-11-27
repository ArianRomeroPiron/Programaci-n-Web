# Práctica 7 — API de productos con MongoDB

API REST de productos (Node.js + Express + Mongoose). Continúa la Práctica 6, pero los datos viven en MongoDB (base `tienda`, colección `productos`) y sobreviven a reinicios del servidor.

## Requisitos
- Node.js 18+
- Una base MongoDB: **MongoDB Atlas** (gratis) o **MongoDB Community** local (puerto 27017), o con Docker: `docker run -d -p 27017:27017 --name mongo mongo:7`

## Ejecución
```powershell
npm install
copy .env.example .env     # y edita MONGODB_URI si usas Atlas
npm start
```
Debe mostrar `Servidor corriendo en http://localhost:3000` y `Conectado a MongoDB`.

`.env` (no se sube a GitHub):
```
MONGODB_URI=mongodb://127.0.0.1:27017/tienda
PORT=3000
```

## Endpoints
| Método | Ruta | Respuestas |
|---|---|---|
| GET | /productos | 200 lista (más recientes primero) |
| GET | /productos/:id | 200 / 404 no existe / 400 id inválido |
| POST | /productos | 201 creado / 400 faltan campos |
| PUT | /productos/:id | 200 / 404 no existe / 400 faltan campos o id inválido |
| DELETE | /productos/:id | 200 `{mensaje, producto}` / 404 / 400 id inválido |

Producto: `{ nombre, descripcion, precio }` (todos obligatorios, `precio >= 0`). MongoDB agrega `_id`, `__v` y `creadoEn` (reto opcional).

## Estructura
```
app.js               rutas + conexión
models/Producto.js   schema de Mongoose
.env.example         plantilla (el .env real está en .gitignore)
GUION_VIDEO.md       guion para grabar el video
```
