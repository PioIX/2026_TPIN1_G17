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


/*




async function envioUsuario(datos) {
    const nombre = document.getElementById("name").value; 

    const response = await fetch('http://localhost:4000/login', {
        method: "POST", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos) //JSON.stringify convierte de objeto a JSON
    })


    console.log(response)
    //Desarma el json y lo arma como un objeto
    let result = await response.json()
    console.log(result)
}




//3


//4 
let datos = {
  id: document.getElementById("selectUsuarios").value,
  puntaje: document.getElementById("inputPuntaje").value
};

app.put('/usuariosActualizar', async function (req, res) {
  console.log(req.body);
  await MySQL.realizarQuery(`
    UPDATE Usuarios
    SET puntaje='${req.body.puntaje}'
    WHERE id='${req.body.id}'
  `);
  res.send({ res: "Usuario actualizado" });
});


//5
async function llamadoAlDelete() {
  let datos = {
    nombre: document.getElementsByName("selectUsuarios")[0].value  // ← [0] obligatorio
  };

  const response = await fetch("http://localhost:4000/usuariosBorrar", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  let result = await response.json();
  console.log(result);
}



//6
app.delete('/usuariosBorrar', async function (req, res) {
  console.log(req.body);
  await realizarQuery(`
    DELETE FROM Usuarios WHERE nombre='${req.body.nombre}';
  `);
  res.send({ res: "Usuario eliminado" });
});



*/
