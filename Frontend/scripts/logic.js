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

  if (resultado.res === "Login correcto") {
    alert(`Bienvenido ${resultado.usuario.usuario}`);
    window.location.href = "mainmenu.html";
  } else {
    alert(resultado.res);
  }
}




// 1
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


// 1. Esta función trae los jugadores del servidor y los mete en el select
async function cargarJugadoresSelect() {
  // Pedimos los jugadores al backend
  const response = await fetch("http://localhost:4000/obtenerJugadores");
  const jugadores = await response.json();

  let contenido = '<option value="">-- Selecciona un jugador --</option>';

  // Recorremos los jugadores y creamos las opciones
  jugadores.forEach(function (jugador) {
    contenido += `<option value="${jugador.nombre_completo}">${jugador.nombre_completo}</option>`;
  });

  // Guardamos las opciones dentro del select
  document.getElementById("selectDatoAEliminar").innerHTML = contenido;
}

// Ejecutamos la función apenas se carga el archivo para que llene el select
cargarJugadoresSelect();


// 2. Esta función se ejecuta al tocar el botón de eliminar
async function llamadoAlDelete() {
  // Tomamos el nombre del jugador seleccionado
  let nombreJugador = document.getElementById("selectDatoAEliminar").value;

  // Si no seleccionó ninguno, le avisamos
  if (nombreJugador === "") {
    alert("Por favor, selecciona un jugador.");
    return;
  }

  let datos = {
    nombre_completo: nombreJugador
  };

  // Enviamos la petición DELETE al servidor
  const response = await fetch("http://localhost:4000/borrarJugador", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  let result = await response.json();
  console.log(result);

  alert("Jugador eliminado con éxito.");
  
  // Volvemos a cargar el select para que ya no aparezca el que borramos
  cargarJugadoresSelect();
}

/*



async function cargarEquipos() {
  const response = await fetch("http://localhost:4000/");
  const equipos = await response.json();
  console.log(equipos);

  let contenido = "";

  equipos.forEach(function (equipo) {
    contenido += `<option id="${equipo.nombre_de_equipo}" value="${equipo.nombre_de_equipo}">${equipo.nombre_de_equipo}</option>`;
  });
  document.getElementById("selectEquipos").innerHTML = contenido;
}
cargarEquipos();

async function llamadoAlDelete() {
  //Mando los datos al BACKEND
  //   let nombre = document.getElementById("selectEquipos").value;

  let datos = {
    nombre_de_equipo: document.getElementById("selectEquipos").value,
  };

  console.log("Datos: ", datos);
  const response = await fetch("http://localhost:4000/equiposBorrar", {
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
  cargarEquipos();
}
*/
