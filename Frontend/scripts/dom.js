function getNombreCompleto() {
    return document.getElementById("ingresoJugadorNuevo").value
}

function getPartidosTotales() {
    return document.getElementById("ingresoCantidadDePartidos").value
}

function getPosicionEnLaCancha() {
    return document.getElementById("ingresoPosicionEnLaCancha").value
}

function nombreAImagen(nombreCompleto) {
    let sinEspacios = nombreCompleto.replace(/\s+/g, "");
    return `public/${sinEspacios}.jpg`;
}

function mostrarJugador(jugador, ladoImg, ladoNombre) {
    document.getElementById(ladoImg).src = nombreAImagen(jugador.nombre_completo);
    document.getElementById(ladoNombre).textContent = jugador.nombre_completo;
}