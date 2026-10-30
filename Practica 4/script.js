const formulario = document.querySelector("#formulario");
const campoProducto = document.querySelector("#producto");
const lista = document.querySelector("#lista");
const botonOrdenar = document.querySelector("#ordenar");
const error = document.querySelector("#error");
const resumen = document.querySelector("#resumen");
const mensajeVacio = document.querySelector("#vacio");

let productos = [];
let ordenAscendente = true;

function renderLista() {
  lista.replaceChildren();

  productos.forEach((producto, indice) => {
    const fila = document.createElement("li");
    fila.classList.toggle("completado", producto.completado);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `producto-${indice}`;
    checkbox.checked = producto.completado;

    const nombre = document.createElement("label");
    nombre.htmlFor = checkbox.id;
    // textContent muestra lo escrito como texto y evita interpretarlo como HTML.
    nombre.textContent = producto.nombre;

    const eliminar = document.createElement("button");
    eliminar.type = "button";
    eliminar.className = "eliminar";
    eliminar.textContent = "Eliminar";
    eliminar.setAttribute("aria-label", `Eliminar ${producto.nombre}`);

    checkbox.addEventListener("change", () => {
      producto.completado = checkbox.checked;
      renderLista();
      document.getElementById(`producto-${indice}`).focus();
    });

    eliminar.addEventListener("click", () => {
      // Se compara el objeto para eliminar solo esa fila, aunque haya nombres iguales.
      productos = productos.filter(item => item !== producto);
      renderLista();
      const siguiente = lista.children[Math.min(indice, productos.length - 1)];
      if (siguiente) {
        siguiente.querySelector("button").focus();
      } else {
        campoProducto.focus();
      }
    });

    fila.append(checkbox, nombre, eliminar);
    lista.append(fila);
  });

  mensajeVacio.hidden = productos.length > 0;
  const comprados = productos.filter(producto => producto.completado).length;
  resumen.textContent = `Productos: ${productos.length} · Comprados: ${comprados}`;
}

formulario.addEventListener("submit", evento => {
  evento.preventDefault();
  const nombre = campoProducto.value.trim();

  if (nombre === "") {
    error.textContent = "Escribe el nombre de un producto.";
    campoProducto.setAttribute("aria-invalid", "true");
    campoProducto.focus();
    return;
  }

  productos.push({ nombre, completado: false });
  campoProducto.value = "";
  error.textContent = "";
  campoProducto.removeAttribute("aria-invalid");
  renderLista();
  campoProducto.focus();
});

botonOrdenar.addEventListener("click", () => {
  const direccion = ordenAscendente ? 1 : -1;
  productos.sort((a, b) => direccion * a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" }));
  ordenAscendente = !ordenAscendente;
  botonOrdenar.textContent = ordenAscendente ? "Ordenar A-Z" : "Ordenar Z-A";
  renderLista();
});

renderLista();
