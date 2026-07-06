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



function getNombreCompleto() {
  return document.getElementById("ingresoJugadorNuevo").value; //
}

function getPartidosTotales() {
  return document.getElementById("ingresoCantidadDePartidos").value; //
}

function getPosicionEnLaCancha() {
  return document.getElementById("ingresoPosicionEnLaCancha").value; //
}

// NUEVA FUNCIÓN COMPLETA PARA MOSTRAR JUGADOR, FOTO Y PARTIDOS
function mostrarJugadorEnPantalla(
  jugador,
  ladoImg,
  ladoNombre,
  mostrarPartidos = false
) {
  const img = document.getElementById(ladoImg);
  const nombreTxt = document.getElementById(ladoNombre);

  // Quitamos espacios para armar la ruta de la imagen
  let sinEspacios = jugador.nombre_completo.replace(/\s+/g, "");
  img.src = `public/${sinEspacios}.jpg`;
  img.alt = jugador.nombre_completo;

  // Si mostrarPartidos es true (para el jugador de la izquierda), pegamos los partidos al nombre
  if (mostrarPartidos === true) {
    nombreTxt.textContent = `${jugador.nombre_completo} (${jugador.partidos_totales} partidos)`;
  } else {
    // Para el jugador de la derecha ocultamos los partidos, ya que el usuario los tiene que adivinar
    nombreTxt.textContent = jugador.nombre_completo;
  }

  // Por si llega a faltar alguna foto en tu carpeta public
  img.onerror = function () {
    img.src = "public/default.jpg";
  };
}