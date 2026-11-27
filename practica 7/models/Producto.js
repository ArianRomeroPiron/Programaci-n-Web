// Modelo Producto: define la estructura y las validaciones de la coleccion "productos"
const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    // El precio es obligatorio y no puede ser negativo
    precio: { type: Number, required: true, min: 0 },
    // Reto opcional: fecha de creacion
    creadoEn: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Producto', productoSchema)
