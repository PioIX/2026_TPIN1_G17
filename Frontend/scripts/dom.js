function getNombreCompleto() {
    return document.getElementById("ingresoJugadorNuevo").value
}

function getPartidosTotales() {
    return document.getElementById("ingresoCantidadDePartidos").value
}

function getPosicionEnLaCancha() {
    return document.getElementById("ingresoPosicionEnLaCancha").value
}

function nombreAArchivo(nombreCompleto) {
  return nombreCompleto
    .normalize("NFD")
    .replace(/[\u0300\u0301\u0308]/g, "") // saca acento grave, agudo y diéresis (á é í ó ú ü) - NO toca la ñ
    .normalize("NFC")                     // recompone la ñ (n + virgulilla) en un solo carácter otra vez
    .replace(/\s+/g, "");                 // saca espacios
}




function mostrarJugadorEnPantalla(jugador, ladoImg, ladoNombre, mostrarPartidos = false) {
  const img = document.getElementById(ladoImg);
  const nombreTxt = document.getElementById(ladoNombre);

  let nombreArchivo = nombreAArchivo(jugador.nombre_completo);
  img.src = `public/${nombreArchivo}.jpg`;
  img.alt = jugador.nombre_completo;

  if (mostrarPartidos === true) {
    nombreTxt.textContent = `${jugador.nombre_completo} (${jugador.partidos_totales} partidos)`;
  } else {
    nombreTxt.textContent = jugador.nombre_completo;
  }

  img.onerror = function () {
    img.src = "public/default.jpg";
  };
}


