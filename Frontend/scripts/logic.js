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
vector_images = ["public/AcuñaMarcos","public/AgueroSergio","public/AlarioLucas",""];
*/


// Variables globales para recordar en qué jugador estamos parados
let jugadorIzquierdaActual = {};
let jugadorDerechaActual = {};

async function avanzarSiguienteRonda() {
    try {
        // 1. Buscamos los elementos del DOM (las tarjetas de los jugadores)
        let tarjetaIzq = document.getElementById("tarjetaJugadorIzq");
        let tarjetaDer = document.getElementById("tarjetaJugadorDer");

        // 2. Activamos la animación de CSS: el de la derecha se mueve a la izquierda
        tarjetaDer.classList.add("desplazar-izquierda");

        // 3. Esperamos 500ms (0.5s) a que termine el movimiento físico antes de cambiar los datos
        await new Promise(function(resolve) {
            setTimeout(resolve, 500);
        });

        // 4. El jugador que estaba a la derecha pasa a ser el de la izquierda
        jugadorIzquierdaActual = jugadorDerechaActual;

        // 5. Hacemos el pedido Fetch al Backend para traer un nuevo jugador al azar
        const response = await fetch('http://localhost:4000/juego/nuevo-rival');
        const datos = await response.json(); // Abrimos el paquete traducido
        
        jugadorDerechaActual = datos.nuevoJugador;

        document.getElementById("nombreJugadorIzq").innerText = jugadorIzquierdaActual.nombre;
        document.getElementById("fotoJugadorIzq").src = jugadorIzquierdaActual.foto;
        document.getElementById("datoJugadorIzq").innerText = jugadorIzquierdaActual.partidos; // El dato que ya se conoce

                document.getElementById("nombreJugadorDer").innerText = jugadorDerechaActual.nombre;
        document.getElementById("fotoJugadorDer").src = jugadorDerechaActual.foto;
        
        
        tarjetaDer.classList.remove("desplazar_izquierda");
        tarjetaDer.classList.add("aparecer_suave");

        
        setTimeout(function() {
            tarjetaDer.classList.remove("aparecer-suave");
        }, 500);

    } catch (error) {
        
        console.error(error);
    }
}