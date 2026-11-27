// Carga las variables de entorno (.env) antes de cualquier otra cosa
require('dotenv').config({ quiet: true })

const express = require('express')
const mongoose = require('mongoose')
const Producto = require('./models/Producto')

const app = express()
app.use(express.json())

// ---------------------------------------------------------------
// Conexion a MongoDB (la URI vive en .env, nunca en el codigo)
// ---------------------------------------------------------------
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(error => console.error('Error al conectar a MongoDB:', error.message))

// Devuelve true si el error es de validacion del schema (faltan campos, precio negativo, tipo invalido)
const esErrorDeValidacion = error => error.name === 'ValidationError'

// GET - Listar todos los productos (reto: mas reciente primero)
app.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.find().sort({ creadoEn: -1 })
        res.json(productos)
    } catch (error) {
        res.status(500).json({ mensaje: 'No se pudo obtener la lista de productos' })
    }
})

// GET - Obtener un producto por id
app.get('/productos/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id)
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' })
        }
        res.json(producto)
    } catch (error) {
        // CastError: el id no tiene formato de ObjectId
        res.status(400).json({ mensaje: 'Id no valido' })
    }
})

// POST - Crear un producto (201 si se crea, 400 si faltan campos)
app.post('/productos', async (req, res) => {
    try {
        const { nombre, descripcion, precio } = req.body
        const producto = await Producto.create({ nombre, descripcion, precio })
        res.status(201).json(producto)
    } catch (error) {
        if (esErrorDeValidacion(error)) {
            return res.status(400).json({ mensaje: 'Los campos nombre, descripcion y precio son obligatorios y el precio no puede ser negativo' })
        }
        res.status(500).json({ mensaje: 'No se pudo crear el producto' })
    }
})

// PUT - Actualizar un producto (200, 404 si no existe, 400 si faltan campos o id invalido)
app.put('/productos/:id', async (req, res) => {
    try {
        const { nombre, descripcion, precio } = req.body
        // PUT reemplaza el producto: se exigen los tres campos
        if (nombre === undefined || descripcion === undefined || precio === undefined) {
            return res.status(400).json({ mensaje: 'Los campos nombre, descripcion y precio son obligatorios' })
        }
        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, precio },
            { new: true, runValidators: true }
        )
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' })
        }
        res.status(200).json(producto)
    } catch (error) {
        if (esErrorDeValidacion(error)) {
            return res.status(400).json({ mensaje: 'Datos no validos: revisa nombre, descripcion y precio (no negativo)' })
        }
        if (error.name === 'CastError' && error.path === '_id') {
            return res.status(400).json({ mensaje: 'Id no valido' })
        }
        res.status(400).json({ mensaje: 'Datos no validos' })
    }
})

// DELETE - Eliminar un producto (200 con mensaje y datos, 404 si no existe)
app.delete('/productos/:id', async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id)
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' })
        }
        res.status(200).json({ mensaje: 'Producto eliminado', producto })
    } catch (error) {
        res.status(400).json({ mensaje: 'Id no valido' })
    }
})

// Rutas inexistentes y JSON mal formado (sin ensuciar la terminal)
app.use((req, res) => res.status(404).json({ mensaje: 'Ruta no encontrada' }))
app.use((error, req, res, next) => {
    res.status(400).json({ mensaje: 'El cuerpo debe contener JSON valido' })
})

const PORT = process.env.PORT || 3000
if (require.main === module) {
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))
}

module.exports = app
