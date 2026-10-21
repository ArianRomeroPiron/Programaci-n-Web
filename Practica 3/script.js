"use strict";

// Seleccionamos los elementos existentes en el HTML.
const botonTema = document.querySelector("#boton-tema");
const botonMeGusta = document.querySelector("#boton-me-gusta");
const contadorMeGusta = document.querySelector("#contador-me-gusta");
const botonLeer = document.querySelector("#boton-leer");
const textoSobreMi = document.querySelector("#texto-sobre-mi");

// El contador pertenece a esta visita: vuelve a cero al recargar.
let cantidadMeGusta = 0;
let textoExpandido = false;
// Conservamos el texto original de la Práctica 2 antes de recortarlo.
const textoCompleto = textoSobreMi.textContent.trim().replace(/\s+/g, " ");
const textoCorto = textoCompleto.slice(0, 100).trimEnd() + "…";
textoSobreMi.textContent = textoCorto;

// Alterna la clase del body y actualiza el texto con if/else.
function alternarTema() {
  document.body.classList.toggle("modo-oscuro");
  if (document.body.classList.contains("modo-oscuro")) {
    botonTema.textContent = "Modo claro";
    botonTema.setAttribute("aria-pressed", "true");
  } else {
    botonTema.textContent = "Modo oscuro";
    botonTema.setAttribute("aria-pressed", "false");
  }
}

// Cada clic aumenta la variable y muestra su valor en el DOM.
function agregarMeGusta() {
  cantidadMeGusta += 1;
  contadorMeGusta.textContent = cantidadMeGusta + " me gusta";
}

// Alterna entre la descripción completa y su versión recortada.
function alternarLectura() {
  textoExpandido = !textoExpandido;
  if (textoExpandido) {
    textoSobreMi.textContent = textoCompleto;
    botonLeer.textContent = "Leer menos";
  } else {
    textoSobreMi.textContent = textoCorto;
    botonLeer.textContent = "Leer más";
  }
  botonLeer.setAttribute("aria-expanded", String(textoExpandido));
}

// El script se carga al final del body: los elementos ya existen.
botonTema.addEventListener("click", alternarTema);
botonMeGusta.addEventListener("click", agregarMeGusta);
botonLeer.addEventListener("click", alternarLectura);
