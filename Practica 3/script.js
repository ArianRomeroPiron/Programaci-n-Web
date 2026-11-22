"use strict";


const botonTema = document.querySelector("#boton-tema");
const botonMeGusta = document.querySelector("#boton-me-gusta");
const contadorMeGusta = document.querySelector("#contador-me-gusta");
const botonLeer = document.querySelector("#boton-leer");
const textoSobreMi = document.querySelector("#texto-sobre-mi");


let cantidadMeGusta = 0;
let textoExpandido = false;

const textoCompleto = textoSobreMi.textContent.trim().replace(/\s+/g, " ");
const textoCorto = textoCompleto.slice(0, 100).trimEnd() + "…";
textoSobreMi.textContent = textoCorto;


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


function agregarMeGusta() {
  cantidadMeGusta += 1;
  contadorMeGusta.textContent = cantidadMeGusta + " me gusta";
}


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


botonTema.addEventListener("click", alternarTema);
botonMeGusta.addEventListener("click", agregarMeGusta);
botonLeer.addEventListener("click", alternarLectura);
