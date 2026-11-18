const assert = require('node:assert/strict')
const app = require('./app')
const server = app.listen(0, '127.0.0.1', async () => {
    const base = `http://127.0.0.1:${server.address().port}`
    const evidencias = []
    async function comprobar(metodo, ruta, datos, estado) {
        const respuesta = await fetch(base + ruta, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            ...(datos === undefined ? {} : { body: JSON.stringify(datos) })
        })
        assert.equal(respuesta.status, estado, `${metodo} ${ruta}`)
        const cuerpo = await respuesta.json()
        evidencias.push({ metodo, ruta, estado: respuesta.status, respuesta: cuerpo })
        return cuerpo
    }
    try {
        const nuevo = await comprobar('POST', '/productos', { nombre: 'Audifonos Bluetooth', descripcion: 'Audifonos inalambricos con microfono', precio: 2200 }, 201)
        assert.equal(nuevo.id, 4)
        await comprobar('POST', '/productos', { nombre: 'Sin precio', descripcion: 'Prueba de validacion' }, 400)
        const actualizado = await comprobar('PUT', '/productos/2', { nombre: 'Mouse inalambrico ergonomico', descripcion: 'Mouse optico inalambrico con 6 botones', precio: '850' }, 200)
        assert.equal(actualizado.id, 2)
        assert.equal(actualizado.precio, 850)
        await comprobar('PUT', '/productos/999', { nombre: 'No existe', descripcion: 'Prueba', precio: 1 }, 404)
        const eliminado = await comprobar('DELETE', '/productos/3', undefined, 200)
        assert.equal(eliminado.producto.id, 3)
        await comprobar('DELETE', '/productos/999', undefined, 404)
        const lista = await comprobar('GET', '/productos', undefined, 200)
        assert.deepEqual(lista.map(p => p.id), [1, 2, 4])
        await comprobar('PUT', '/productos/2', { nombre: 'Falta descripcion', precio: 20 }, 400)
        await comprobar('POST', '/productos', { nombre: 'Invalido', descripcion: 'Prueba', precio: '20pesos' }, 400)
        await comprobar('POST', '/productos', { nombre: 'Invalido', descripcion: 'Prueba', precio: -1 }, 400)
        await comprobar('POST', '/productos', null, 400)
        const siguiente = await comprobar('POST', '/productos', { nombre: 'Producto posterior', descripcion: 'ID sin reutilizar', precio: 10 }, 201)
        assert.equal(siguiente.id, 5)
        const malformado = await fetch(base + '/productos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' })
        assert.equal(malformado.status, 400)
        assert.ok((await malformado.json()).mensaje)
        require('node:fs').writeFileSync(require('node:path').join(__dirname, 'resultados-pruebas.json'), JSON.stringify(evidencias, null, 2))
        console.log('OK: 7 casos del profesor y 6 comprobaciones adicionales superadas.')
    } catch (error) {
        console.error(error)
        process.exitCode = 1
    } finally {
        server.close()
    }
})
