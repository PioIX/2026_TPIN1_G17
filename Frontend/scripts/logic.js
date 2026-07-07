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
      localStorage.setItem("usuario_logueado", resultado.usuario.usuario);
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





// --- LÓGICA DEL JUEGO CON INTEGRACIÓN DE NOMBRE, FOTO Y PARTIDOS ---

let listaJugadores = [];
let nombresJugados = [];
let jugadorIzquierda = null;
let jugadorDerecha = null;
let puntajeActual = 0;

async function iniciarJuego() {
  try {
    const response = await fetch("http://localhost:4000/jugadores"); //
    listaJugadores = await response.json();

    reiniciarPartida();
  } catch (error) {
    console.error("Error al iniciar el juego:", error);
  }
}

function reiniciarPartida() {
  juegoTerminado = false; 
  document.getElementById("btn-mas-partidos").disabled = false;
  document.getElementById("btn-menos-partidos").disabled = false;

  puntajeActual = 0;
  actualizarPuntajePantalla();
  nombresJugados = [];

  let indice = Math.floor(Math.random() * listaJugadores.length);
  jugadorIzquierda = listaJugadores[indice];
  nombresJugados.push(jugadorIzquierda.nombre_completo);

  seleccionarSiguienteRetador();
}

function seleccionarSiguienteRetador() {
  if (nombresJugados.length === listaJugadores.length) {
    alert("¡Felicidades! Completaste todos los jugadores del mazo.");
    reiniciarPartida();
    return;
  }

  let encontrado = false;
  while (encontrado === false) {
    let indiceAleatorio = Math.floor(Math.random() * listaJugadores.length);
    let candidato = listaJugadores[indiceAleatorio];

    if (nombresJugados.includes(candidato.nombre_completo) === false) {
      jugadorDerecha = candidato;
      nombresJugados.push(jugadorDerecha.nombre_completo); 
      encontrado = true; 
    }
  }


  mostrarJugadorEnPantalla(jugadorIzquierda, "img-izquierda", "nombre-izquierda", true); //
  mostrarJugadorEnPantalla(jugadorDerecha, "img-derecha", "nombre-derecha", false); //
}



async function guardarPuntajeEnServidor(puntaje) {
  const usuario = localStorage.getItem("usuario_logueado");

  if (!usuario) {
    console.warn("No hay usuario logueado, no se guarda el puntaje.");
    return;
  }

  try {
    const response = await fetch("http://localhost:4000/actualizarRecord", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, puntaje }),
    });
    const resultado = await response.json();
    console.log(resultado);

    if (resultado.nuevoRecord) {
      alert("¡Nuevo récord personal! ");
    }
  } catch (error) {
    console.error("Error al guardar el puntaje:", error);
  }
}


function jugar(eleccion) {
  let juegoTerminado = false;
  if (juegoTerminado) return; 

  const partidosIzquierda = parseInt(jugadorIzquierda.partidos_totales);
  const partidosDerecha = parseInt(jugadorDerecha.partidos_totales);

  let gano = false;

  if (eleccion === 'mayor') {
    gano = (partidosDerecha >= partidosIzquierda);
  } else if (eleccion === 'menor') {
    gano = (partidosDerecha <= partidosIzquierda);
  }

  if (gano) {
    puntajeActual++;
    actualizarPuntajePantalla();
    jugadorIzquierda = jugadorDerecha;
    seleccionarSiguienteRetador();
  } else {
    juegoTerminado = true;
    document.getElementById("btn-mas-partidos").disabled = true;
    document.getElementById("btn-menos-partidos").disabled = true;

    alert(`¡Perdiste! ${jugadorDerecha.nombre_completo} tenía ${partidosDerecha} partidos y ${jugadorIzquierda.nombre_completo} tenía ${partidosIzquierda}.`);

    guardarPuntajeEnServidor(puntajeActual);
    reiniciarPartida()
  }
}




function actualizarPuntajePantalla() {
  document.getElementById("valor-puntaje-actual").textContent = puntajeActual; //
}

if (document.getElementById("contenedor-juego")) { //
  iniciarJuego();
}