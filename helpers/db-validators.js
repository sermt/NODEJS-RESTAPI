const Role = require("../models/rol");
const Usuario = require("../models/usuario");
const isRoleValid = async (rol = "") => {
  const rolExists = await Role.findOne({ rol });
  if (!rolExists) {
    throw new Error("This role is not a valid one");
  }
};

const checkEmailDuplicate = async (email = "") => {
  const emailExists = await Usuario.findOne({ email });
  if (emailExists) {
    throw new Error("This email is already in use");
  }
};
const checkUserExistsById = async (id) => {
    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
};

module.exports = { isRoleValid, checkEmailDuplicate, checkUserExistsById };
