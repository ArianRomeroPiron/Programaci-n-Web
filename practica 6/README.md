# Práctica 6 - API REST de productos

Arian Romero Piron - 2025-0896. API REST con Node.js y Express; los productos se guardan en un arreglo en memoria.

## Ejecución

```bash
npm install
npm start
```

El servidor inicia en http://localhost:3000.

## Endpoints

| Método | Ruta | Acción |
|---|---|---|
| GET | `/productos` | Lista productos |
| GET | `/productos/:id` | Busca un producto |
| POST | `/productos` | Crea con ID único y responde 201 |
| PUT | `/productos/:id` | Valida y actualiza; responde 404 si no existe |
| DELETE | `/productos/:id` | Elimina y devuelve el producto; responde 404 si no existe |

POST y PUT requieren nombre, descripción y precio. Se rechazan campos vacíos y precios no numéricos o menores o iguales a cero. Las respuestas usan JSON y códigos HTTP apropiados.

## Pruebas

Ejecuta `npm test` para comprobar los siete casos de la consigna y seis comprobaciones adicionales. Los resultados se guardan en `resultados-pruebas.json`. La colección `Practica_6.postman_collection.json` incluye las siete peticiones que se muestran en el video.

## Entrega

El TXT solicitado por el profesor está en `Practica_6_Arian_Romero.txt`. Falta grabar el video en Postman, subirlo a YouTube y agregar su URL al TXT antes de entregarlo en Moodle. `node_modules` está excluido del repositorio.
