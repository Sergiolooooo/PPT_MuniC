const express = require("express");
const cors = require("cors");
const database = require("../database/mysql");
require("../../env/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Rutas
    this.pathUsuarios = "/api/usuarios";
    this.pathComercios = "/api/comercios";
    this.categoria = "/api/categoriascomercios";
    this.pathRol = "/api/rol";
    this.pathProductos = "/api/productos";
    this.pathRedesSociales = "/api/redesSociales";
    this.pathAlbumComercio = "/api/albumComercio";
    this.pathNoticias = "/api/noticias";

    this.middleware();
    this.routes();
  }

  routes() {
    this.app.use(this.pathUsuarios, require("../routes/usuarios"));
    this.app.use(this.pathComercios, require("../routes/comercios"));
    this.app.use(this.categoria, require("../routes/categorias_comercios"));
    this.app.use(this.pathRol, require("../routes/rol"));
    this.app.use(this.pathProductos, require("../routes/productos"));
    this.app.use(this.pathRedesSociales, require("../routes/redes_sociales"));
    this.app.use(this.pathAlbumComercio, require("../routes/album_imagenes"));
    this.app.use(this.pathNoticias, require("../routes/noticias"));

  }

  middleware() {
    this.app.use(express.static("public"));
    this.app.use(cors({
      origin: ['http://127.0.0.1:5500','null'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`El servidor esta corriendo en el puerto ${this.port}`);
    });
  }

  async conectar() {
    database.connect((err) => {
      if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
      }
      console.log("Base de datos conectada");
    });
  }
}

module.exports = Server;
