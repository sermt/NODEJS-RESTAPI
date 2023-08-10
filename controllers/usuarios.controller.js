const { response, request } = require("express");

const agregarUsuario = (req, res = response) => {
  const { body } = req;
  res.json({ msg: "Hello world! " });
};

const getUsuarios = (req = request, res = response) => {
  const { q, nombre, apikey, page, limit } = req.query;
  res.json({ msg: "Hello world! " });
};

const updateUser = (req, res = response) => {
  const { id } = req.params;
  res.json({ id });
};

const deleteUser = (req, res = response) => {
  const { id } = req.params;
  res.json({ id });
};

module.exports = { getUsuarios, agregarUsuario, deleteUser, updateUser };
