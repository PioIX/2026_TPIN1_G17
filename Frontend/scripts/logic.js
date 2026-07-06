// REGISTER
async function registrarUsuario() {
  const usuario = document.getElementById("inputUsuario").value;
  const contrasena = document.getElementById("inputContrasena").value;

  const response = await fetch("http://localhost:4000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, contrasena }),
  });
  const resultado = await response.json();
  console.log(resultado);

  if (resultado.res === "Usuario agregado") {
    alert("Usuario registrado con éxito");
    window.location.href = "login.html";
  } else {
    alert(resultado.res);
  }
}

// LOGIN
async function loginUsuario() {
  const usuario = document.getElementById("inputUsuario").value;
  const contrasena = document.getElementById("inputContrasena").value;

  const response = await fetch("http://localhost:4000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, contrasena }),
  });
  const resultado = await response.json();
  console.log(resultado);

  if (resultado.res === "Login correcto" ) {
    alert(`Bienvenido ${resultado.usuario.usuario}`);
    localStorage.setItem("es_admin", resultado.usuario.es_admin);
    window.location.href = "mainmenu.html";
  } else {
    alert(resultado.res);
  }
}



// FUNCION PARA AGREGAR JUGADORES
function tomarDatos() {
  let datos = {
    nombre_completo: getNombreCompleto(),
    partidos_totales: getPartidosTotales(),
    posicion_en_la_cancha: getPosicionEnLaCancha(),
  };
  
  llamadoAlPost(datos);
}

async function llamadoAlPost(datos) {
  //Mando los datos al BACKEND
  const response = await fetch("http://localhost:4000/adddata", {
    method: "POST", //GET, POST, PUT o DELETE
    headers: {
      //Va siempre igual, le aclaro que la informacion va a viajar como JSON
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos), //JSON.stringify convierte de objeto a JSON
  });
  // --Me quedo esperando--

  //En response tengo la respuesta del BACKEND
  console.log(response); //Imprimo el json
  let result = await response.json();
  console.log(result);
}

// FUNCION PARA ELIMINAR JUGADORES
async function cargarJugadores(selectId = "selectJugadores") {
    const response = await fetch("http://localhost:4000/jugadores");
    const jugadores = await response.json();
    let contenido = "";
    jugadores.forEach(function (jugador) {
      contenido += `<option value="${jugador.nombre_completo}">${jugador.nombre_completo}</option>`;
    });
    document.getElementById(selectId).innerHTML = contenido;
}
if (document.getElementById("selectJugadores")) cargarJugadores();
if (document.getElementById("selectJugadoresPosicion")) cargarJugadores("selectJugadoresPosicion");
 


async function llamadoAlDeleteJugadores() {
  //Mando los datos al BACKEND
  //   let nombre = document.getElementById("selectEquipos").value;

  let datos = {
    nombre_completo: document.getElementById("selectJugadores").value,
  };

  console.log("Datos: ", datos);
  const response = await fetch("http://localhost:4000/jugadoresBorrar", {
    method: "DELETE", //GET, POST, PUT o DELETE
    headers: {
      //Va siempre igual, le aclaro que la informacion va a viajar como JSON
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos), //JSON.stringify convierte de objeto a JSON
  });
    // --Me quedo esperando--
  
    //En response tengo la respuesta del BACKEND
    let result = await response.json();
    console.log(result)
  cargarJugadores();
}


// FUNCION PARA ELIMINAR USUARIOS
async function cargarUsuarios() {
    const response = await fetch("http://localhost:4000/usuarios");
    const usuarios = await response.json();
    console.log(usuarios);

    let contenido = "";

    usuarios.forEach(function (usuario) {
      contenido += `<option id="${usuario.usuario}" value="${usuario.usuario}">${usuario.usuario}</option>`;
    });
    document.getElementById("selectUsuarios").innerHTML = contenido;
}
if (document.getElementById("selectUsuarios")) {
  cargarUsuarios();
}




async function llamadoAlDeleteUsuarios() {
  //Mando los datos al BACKEND
  //   let nombre = document.getElementById("selectEquipos").value;

  let datos = {
    usuario: document.getElementById("selectUsuarios").value,
  };

  console.log("Datos: ", datos);
  const response = await fetch("http://localhost:4000/usuariosBorrar", {
    method: "DELETE", //GET, POST, PUT o DELETE
    headers: {
      //Va siempre igual, le aclaro que la informacion va a viajar como JSON
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos), //JSON.stringify convierte de objeto a JSON
  });
    // --Me quedo esperando--
  
    //En response tengo la respuesta del BACKEND
    let result = await response.json();
    console.log(result)
  cargarUsuarios();
}


//FUNCION PARA ACTUALIZAR A LSO JUGADORES(Partidos)
async function llamadoAlPutJugadoresPartidos() {
  let datos = {
    nombre_completo: document.getElementById("selectJugadores").value,
    partidos_totales: document.getElementById("inputPartidosTotales").value,
  };
  const response = await fetch("http://localhost:4000/jugadoresActualizarPartidos", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  let result = await response.json();
  console.log(result);
  alert(result.res);
  cargarJugadores()
}


//FUNCION PARA ACTUALIZAR A LSO JUGADORES(Posicion)
async function llamadoAlPutJugadoresPosicion() {
  let datos = {
    nombre_completo: document.getElementById("selectJugadoresPosicion").value,
    posicion_en_la_cancha: document.getElementById("selectPosicion").value,
  };
  const response = await fetch("http://localhost:4000/jugadoresActualizarPosicion", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  let result = await response.json();
  console.log(result);
  alert(result.res);
  cargarJugadores()
}


//FUNCION POARA ACTUALIZAR A LOS USUARIOS
async function llamadoAlPutUsuariosAdministrador() {
  let datos = {
    usuario: document.getElementById("selectUsuarios").value,
    es_admin: document.getElementById("inputEsAdmin").value,
  };
  const response = await fetch("http://localhost:4000/usuariosActualizarAdministrador", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  let result = await response.json();
  console.log(result);
  alert(result.res);
  cargarUsuarios()
}
/*
async function nombreJugadores(nombre_completo) {
  let datos = {
    nombre_completo: document.getElementById("selectUsuarios").value,
    
  };
  const response = await fetch("http://localhost:4000/jugadoresCargar", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nombre_completo),
  });
  let result = await response.json();
  console.log(result);
  alert(result.res);
}

*/
/*
vector_images = ["public/AcuñaMarcos","public/AgueroSergio","public/AlarioLucas",""];
*/

/*

let listaJugadores = [];
let jugadorIzquierda = null;
let jugadorDerecha = null;
let puntaje = 0;
 
async function iniciarJuego() {
  try {
    const response = await fetch("http://localhost:4000/jugadores");
    if (!response.ok) {
      console.error("El servidor respondió con error:", response.status);
      return;
    }
    listaJugadores = await response.json();
 
    if (!Array.isArray(listaJugadores) || listaJugadores.length < 2) {
      console.error("No hay suficientes jugadores para jugar:", listaJugadores);
      return;
    }
 
    jugadorIzquierda = elegirJugadorAleatorio();
    jugadorDerecha = elegirJugadorAleatorio(jugadorIzquierda);
 
    mostrarJugador(jugadorIzquierda, "img-izquierda", "nombre-izquierda");
    mostrarJugador(jugadorDerecha, "img-derecha", "nombre-derecha");
 
    puntaje = 0;
    document.getElementById("valor-puntaje-actual").textContent = puntaje;
  } catch (error) {
    console.error("Error al iniciar el juego (¿está corriendo el backend en el puerto 4000?):", error);
  }
}
 
function elegirJugadorAleatorio(jugadorAExcluir = null) {
  let candidatos = listaJugadores;
  if (jugadorAExcluir) {
    candidatos = listaJugadores.filter(function (jugador) {
      return jugador.nombre_completo !== jugadorAExcluir.nombre_completo;
    });
  }
  const indiceAleatorio = Math.floor(Math.random() * candidatos.length);
  return candidatos[indiceAleatorio];
}
 
function jugar(opcion) {
  const partidosIzquierda = Number(jugadorIzquierda.partidos_totales);
  const partidosDerecha = Number(jugadorDerecha.partidos_totales);
 
  let acerto = false;
  if (opcion === "mayor") {
    // Si empatan, cuenta como acierto (sigue la racha)
    acerto = partidosDerecha >= partidosIzquierda;
  } else if (opcion === "menor") {
    // Si empatan, cuenta como error (pierde)
    acerto = partidosDerecha < partidosIzquierda;
  }
 
  if (acerto) {
    puntaje++;
    document.getElementById("valor-puntaje-actual").textContent = puntaje;
 
    // El jugador de la derecha pasa a ocupar el lugar de la izquierda
    jugadorIzquierda = jugadorDerecha;
    mostrarJugador(jugadorIzquierda, "img-izquierda", "nombre-izquierda");
 
    // Entra un jugador nuevo por la derecha
    jugadorDerecha = elegirJugadorAleatorio(jugadorIzquierda);
    mostrarJugador(jugadorDerecha, "img-derecha", "nombre-derecha");
  } else {
    terminarJuego();
  }
}
 
function terminarJuego() {
  alert(`Perdiste. Puntaje final: ${puntaje}`);
  iniciarJuego();
}
 
if (document.getElementById("contenedor-juego")) {
  iniciarJuego();
}
*/