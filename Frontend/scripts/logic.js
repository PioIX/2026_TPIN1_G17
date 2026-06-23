async function login(usuario, contraseña) {
  try {
    const resp = await fetch(`${'http://localhost:4000/'}?usuario=${usuario}&contraseña=${contraseña}`);
    const resultado = await resp.json();

    if (resultado.length > 0) {
      console.log("Login exitoso Bienvenido", resultado[0].nombreCompleto);
      return { exitoso: true, usuario: resultado[0] };
    } else {
      console.log("Usuario o contraseña incorrectos.");
      return { exitoso: false, mensaje: "Datos incorrectos" };
    }

  } catch (error) {
    console.error("Error en el login:", error);
    return { exitoso: false, mensaje: "Error de conexión" };
  }
}