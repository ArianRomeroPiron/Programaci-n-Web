# Práctica 6 - API REST de productos

Arian Romero Piron - 2025-0896. Proyecto completado a partir de la base del profesor.

## Cómo ejecutar

```bash
npm install
npm start
```

El servidor corre en http://localhost:3000

## Endpoints

| Método | Ruta              | Estado        |
|--------|-------------------|---------------|
| GET    | /productos        | Implementado  |
| GET    | /productos/:id    | Implementado  |
| POST   | /productos        | Implementado |
| PUT    | /productos/:id    | Implementado |
| DELETE | /productos/:id    | Implementado |

Los productos están en memoria: se reinician al detener el servidor. Se validan campos obligatorios y precios numéricos mayores que cero. El contador de identificadores evita reutilizar IDs después de borrar un producto.

## Verificación

Ejecutar `node pruebas.cjs`. Se verifican los siete casos del profesor y seis comprobaciones adicionales: actualización incompleta, precio inválido, precio negativo, cuerpo nulo, ID posterior a un borrado y JSON malformado. El resultado se guarda en `resultados-pruebas.json`.

## Prueba para el video

Importar `Practica_6.postman_collection.json` en Postman, arrancar el servidor con `npm start` y ejecutar las siete peticiones en el orden indicado. Reiniciar el servidor antes de grabar para recuperar los tres productos originales. La colección contiene solamente peticiones locales a `http://localhost:3000`.

## Guion breve

1. Presentación: «Soy Arian Romero Piron, matrícula 2025-0896. Esta es la práctica 6: una API REST de productos con Node.js y Express».
2. Mostrar app.js: arreglo inicial, express.json(), validación compartida, contador de IDs, POST, PUT, DELETE y respuestas JSON.
3. Crear los audífonos: explicar los campos y la respuesta 201 con ID 4.
4. Enviar un producto sin precio: mostrar el error 400.
5. Actualizar el mouse con ID 2: mostrar 200 y el nuevo precio 850.
6. Intentar actualizar el ID 999: mostrar 404.
7. Eliminar el monitor con ID 3: mostrar 200 y el producto eliminado.
8. Intentar eliminar el ID 999: mostrar 404.
9. Listar los productos: deben quedar los IDs 1, 2 y 4. Explicar que los datos se pierden al reiniciar porque se usa un arreglo en memoria.

## Entrega pendiente

Grabar y subir el video a YouTube. Luego agregar su enlace al archivo de texto de entrega. No subir node_modules al repositorio.
