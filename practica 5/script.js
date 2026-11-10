const api = 'https://rickandmortyapi.com/api/character/';
const formulario = document.querySelector('#busqueda');
const nombre = document.querySelector('#nombre');
const buscar = document.querySelector('#buscar');
const mensaje = document.querySelector('#mensaje');
const personajes = document.querySelector('#personajes');
const anterior = document.querySelector('#anterior');
const siguiente = document.querySelector('#siguiente');
let paginas = { prev: null, next: null };
let cargando = false;

function dibujarPersonajes(lista) {
  personajes.replaceChildren();
  for (const personaje of lista) {
    const tarjeta = document.createElement('article');
    tarjeta.className = 'tarjeta';
    const imagen = document.createElement('img');
    imagen.src = personaje.image;
    imagen.alt = personaje.name;
    imagen.loading = 'lazy';
    const titulo = document.createElement('h2');
    titulo.textContent = personaje.name;
    const estado = document.createElement('p');
    estado.textContent = `Estado: ${personaje.status}`;
    const especie = document.createElement('p');
    especie.textContent = `Especie: ${personaje.species}`;
    tarjeta.append(imagen, titulo, estado, especie);
    personajes.append(tarjeta);
  }
}

async function cargarPersonajes(url) {
  if (cargando || !url) return;
  cargando = true;
  buscar.disabled = anterior.disabled = siguiente.disabled = true;
  personajes.replaceChildren();
  personajes.setAttribute('aria-busy', 'true');
  mensaje.textContent = 'Cargando...';
  paginas = { prev: null, next: null };
  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      if (respuesta.status === 404) {
        mensaje.textContent = 'No se encontraron personajes';
        return;
      }
      throw new Error(`Error HTTP ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    dibujarPersonajes(datos.results);
    paginas = datos.info;
    mensaje.textContent = `${datos.results.length} personajes en esta página. Total: ${datos.info.count}.`;
  } catch {
    personajes.replaceChildren();
    mensaje.textContent = 'No se pudieron cargar los personajes. Comprueba tu conexión e intenta buscar de nuevo.';
  } finally {
    cargando = false;
    buscar.disabled = false;
    anterior.disabled = !paginas.prev;
    siguiente.disabled = !paginas.next;
    personajes.setAttribute('aria-busy', 'false');
  }
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const url = new URL(api);
  if (nombre.value.trim()) url.searchParams.set('name', nombre.value.trim());
  cargarPersonajes(url.href);
});
// La API conserva el filtro de nombre en los enlaces de paginación.
anterior.addEventListener('click', () => cargarPersonajes(paginas.prev));
siguiente.addEventListener('click', () => cargarPersonajes(paginas.next));
cargarPersonajes(api);
