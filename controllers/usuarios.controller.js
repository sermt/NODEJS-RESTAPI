const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const agregarUsuario = async (req, res = response) => {
  const { name, password, rol, email } = req.body;
  const usuario = new Usuario({ name, password, rol, email });

  if (email) {
    //encrypt password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
  }
  await usuario.save();
  res.json({ msg: "Hello world! ", usuario });
};

const getUsuarios = (req = request, res = response) => {
  const { q, nombre, apikey, page, limit } = req.query;
  res.json({ msg: "Hello world! " });
};

const updateUser = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;

  if (password) {
    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const deleteUser = (req, res = response) => {
  const { id } = req.params;
  res.json({ id });
};

module.exports = { getUsuarios, agregarUsuario, deleteUser, updateUser };
