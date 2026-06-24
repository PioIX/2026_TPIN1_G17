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

/*
async function administrador() {
    const response = await fetch("http://localhost:4000/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ es_admin }),
  });
  const resultado = await response.json();
  console.log(resultado);

  if (resultado.res === "1") {
    alert(`Bienvenido ${resultado.usuario.usuario}`);
    window.location.href = "admin.html";
  } else {
    alert(resultado.res);
  }
}

*/