const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { esNoNumerico } = require("../helpers/common-validators");

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

const getUsuarios = async (req = request, res = response) => {
  const { page = 0, limit = 5 } = req.query;
  const areNotNumbers = [page, limit].some(esNoNumerico);

  if (areNotNumbers) {
    return res.status(400).json({ msg: "Page or limit are not numbers" });
  }

  const [total, usuarios] = await Promise.all([
    Usuario.find({ estado: true }).skip(Number(page)).limit(Number(limit)),
    Usuario.countDocuments({ estado: true }),
  ]);
  res.json({ total, usuarios });
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

const deleteUser = async (req, res = response) => {
  const { id } = req.params;

  //delete a user from the db
  //const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({ usuario });
};

module.exports = { getUsuarios, agregarUsuario, deleteUser, updateUser };
