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
let jugadorActual = null;   // el de la izquierda, ya "revelado"
let jugadorSiguiente = null; // el de la derecha, el que hay que adivinar
let listaJugadores = [];
let indiceSiguiente = 0;
let puntaje = 0;

async function iniciarJuego() {
  const response = await fetch("http://localhost:4000/jugadores");
  listaJugadores = await response.json();
  // mezclamos
  listaJugadores.sort(() => Math.random() - 0.5);

  jugadorActual = listaJugadores[0];
  jugadorSiguiente = listaJugadores[1];
  indiceSiguiente = 2;

  mostrarJugador(jugadorActual, "img-izquierda", "nombre-izquierda");
  mostrarJugador(jugadorSiguiente, "img-derecha", "nombre-derecha");
}

async function jugar(respuesta) {
  if (!jugadorActual || !jugadorSiguiente) {
    console.warn("Todavía no hay jugadores cargados");
    return;
  }
  // ... resto igual
  const response = await fetch("http://localhost:4000/jugarComparar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  const resultado = await response.json();

  if (resultado.correcto) {
    puntaje++;
    document.getElementById("valor-puntaje-actual").textContent = puntaje;

    // el de la derecha pasa a ser el nuevo "actual", y sacamos otro jugador nuevo
    jugadorActual = jugadorSiguiente;
    mostrarJugador(jugadorActual, "img-izquierda", "nombre-izquierda");

    if (indiceSiguiente >= listaJugadores.length) {
      // se acabaron los jugadores, reiniciamos la lista mezclada
      listaJugadores.sort(() => Math.random() - 0.5);
      indiceSiguiente = 0;
    }
    jugadorSiguiente = listaJugadores[indiceSiguiente];
    indiceSiguiente++;
    mostrarJugador(jugadorSiguiente, "img-derecha", "nombre-derecha");
  } else {
    alert(`Perdiste! Tu puntaje final fue ${puntaje}`);
    puntaje = 0;
    document.getElementById("valor-puntaje-actual").textContent = puntaje;
    iniciarJuego();
  }
}

if (document.getElementById("img-izquierda")) {
  iniciarJuego();
}




*/


/*
vector_images = ["public/AcuñaMarcos","public/AgueroSergio","public/AlarioLucas",""];
*/