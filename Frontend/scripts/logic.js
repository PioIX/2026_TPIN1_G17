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
