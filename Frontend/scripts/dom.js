function getNombreCompleto() {
    return document.getElementById("ingresoJugadorNuevo").value
}

function getPartidosTotales() {
    return document.getElementById("ingresoCantidadDePartidos").value
}

function getPosicionEnLaCancha() {
    return document.getElementById("ingresoPosicionEnLaCancha").value
}
/*
function nombreAImagen(nombreCompleto) {
  let sinEspacios = nombreCompleto.replace(/\s+/g, "");
  return `public/${sinEspacios}.jpg`;
}

function mostrarJugador(jugador, ladoImg, ladoNombre) {
  const img = document.getElementById(ladoImg);
  img.src = nombreAImagen(jugador.nombre_completo);
  img.alt = jugador.nombre_completo;
  img.onerror = function () {
    console.warn(
      "No se encontró la imagen para:",
      jugador.nombre_completo,
      "->",
      img.src
    );
  };
  document.getElementById(ladoNombre).textContent = jugador.nombre_completo;
}
 */