var express = require("express"); //Tipo de servidor: Express
var bodyParser = require("body-parser"); //Convierte los JSON
var cors = require("cors");
const { realizarQuery } = require("./modulos/mysql");

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 4000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Pongo el servidor a escuchar
app.listen(port, function () {
  console.log(`Server running in http://localhost:${port}`);
});

app.get("/", function (req, res) {
  res.status(200).send({
    message: "GET Home route working fine!",
  });
});

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 */

// 2
const MySQL = require("./modulos/mysql.js");

app.get("/jugadores", async function (req, res) {
  try {
    let jugadores = await realizarQuery(`SELECT * FROM Players`);
    res.send(jugadores);
  } catch (error) {
    console.error(error);
    res.status(500).send({ res: "Error del servidor" });
  }
});


app.get("/usuarios", async function (req, res) {
  try {
    let usuarios = await realizarQuery(`SELECT usuario FROM Users`);
    res.send(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).send({ res: "Error del servidor" });
  }
});



app.post('/register', async function (req, res) {
  try {
  console.log(req.body)
  let usuarioExistente = await realizarQuery(`SELECT usuario FROM Users WHERE usuario='${req.body.usuario}' `);
  console.log(req.body)
  if (usuarioExistente.length > 0) {
    res.send({res:"Ya existe este usuario"});
  }
  else {
    realizarQuery(`
      INSERT INTO Users (usuario,contrasena,record_maximo,es_admin) VALUES
      ("${req.body.usuario}","${req.body.contrasena}","${req.body.record_maximo ?? 0}","${req.body.es_admin ?? 0}");`)
    res.send({res:"Usuario agregado"})
  }
  
  } catch (error) {
    console.error("Error al borrar:", error);
    res.status(500).send({ 
      res: "Error del servidor" 
    });
  }
})



app.post('/login', async function (req, res) {
  try {
    if (!req.body.usuario || !req.body.contrasena){
    return res.send({ res: "No pueden haber campos vacíos" });
    }
    let usuario = await realizarQuery(`SELECT * FROM Users WHERE usuario='${req.body.usuario}' AND contrasena='${req.body.contrasena}'`);
    if (usuario.length > 0) {
      res.send({ res: "Login correcto", usuario: usuario[0] });
    } else {
      res.status(401).send({ res: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ res: "Error del servidor" });
  }
});


app.post("/adddata", async function (req, res) {
  try {
    if (
      !req.body.nombre_completo ||
      !req.body.partidos_totales ||
      !req.body.posicion_en_la_cancha
    ) {
      return res.send({ res: "No pueden haber campos vacíos" });
    }
    const posicionesValidas = [
      "Delantero",
      "Defensor",
      "Arquero",
      "Mediocampista",
    ];
    if (!posicionesValidas.includes(req.body.posicion_en_la_cancha)) {
      return res.send({ res: "Posición en la cancha inválida" });
    }

    console.log(req.body);

    let jugadorExistente = await realizarQuery(
      `SELECT nombre_completo FROM Players WHERE nombre_completo='${req.body.nombre_completo}'`
    );

    if (jugadorExistente.length > 0) {
      res.send({ res: "Ya existe este jugador" });
    } else {
      realizarQuery(`
        INSERT INTO Players (nombre_completo, partidos_totales, posicion_en_la_cancha) VALUES
        ("${req.body.nombre_completo}", "${req.body.partidos_totales}", "${req.body.posicion_en_la_cancha}");
      `);
      res.send({ res: "Jugador agregado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ res: "Error del servidor" });
  }
});




app.delete("/jugadoresBorrar", async function (req, res) {
  try {
    console.log("TEST:", req.body.nombre_completo);
    if (req.body.nombre_completo != "") {
      await realizarQuery(
        `DELETE FROM Players WHERE nombre_completo='${req.body.nombre_completo}';`
      );
      res.send({ res: "Jugador eliminado" });
    } else {
      res.status(400).send({ res: "Falta el nombre del jugador" });
    }
  } catch (error) {
    console.error("Error al borrar:", error);
    res.status(500).send({
      res: "Error del servidor",
    });
  }
});
  

app.delete("/usuariosBorrar", async function (req, res) {
  try {
    console.log("TEST:", req.body.usuario);
    if (req.body.usuario != "") {
      await realizarQuery(
        `DELETE FROM Users WHERE usuario='${req.body.usuario}';`
      );
      res.send({ res: "Usuario eliminado" });
    } else {
      res.status(400).send({ res: "Falta el nombre del usuario" });
    }
  } catch (error) {
    console.error("Error al borrar:", error);
    res.status(500).send({
      res: "Error del servidor",
    });
  }
});


