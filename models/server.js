require("dotenv").config();
const cors = require("cors");
const express = require("express");
const usuariosPath = "/api/usuarios";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.middlewares();
    this.routes();
    this.listen();
  }

  routes() {
    this.app.use(usuariosPath, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(process.env.PORT);
  }

  middlewares() {
    //Public directorie
    this.app.use(express.static("public"));

    // Lectura y parseo del body
    this.app.use(express.json());

    // CORS
    this.app.use(cors());
  }
}
module.exports = Server;