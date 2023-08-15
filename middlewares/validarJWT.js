const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    const usuario = await Usuario.findById(uid);
    if(!usuario.estado){
      return res.status(401).json({ msg: "Inactive user" });
    }
    req.usuario = usuario;
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }

  next();
};

module.exports = {validarJWT};
