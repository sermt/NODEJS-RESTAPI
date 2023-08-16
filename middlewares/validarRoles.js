const { response, request } = require("express");

const esAdmin = (req = request, res = response, next) => {
  if (!req.usuario) {
    res.status(500).json({
      msg: "Token not validated",
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador`,
    });
  }

  next();
};

const tienePermisos = (req = request, res = response, next) => {
  if (!req.usuario) {
    res.status(500).json({
      msg: "Token not validated",
    });
  }

  const { id } = req.params;
  const { rol, name, id: usuarioId } = req.usuario;

  //Permitir que el usuario del id pueda eliminar su cuenta
  /*   if (rol === "USER_ROLE" && usuarioId !== id) {
    return res.status(401).json({
      msg: `${name} no tiene permisos.`,
    });
  } */

  if (rol !== "ADMIN_ROLE" || rol !== "VENTAS_ROLE") {
    return res.status(401).json({
      msg: `${name} no tiene permisos.`,
    });
  }

  next();
};

module.exports = { tienePermisos, esAdmin };
