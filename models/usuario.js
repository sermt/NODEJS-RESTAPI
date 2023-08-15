const { Schema, model } = require("mongoose");
const Rol = ["ADMIN_ROLE", "USER_ROLE", "VENTAS_ROLE"];
const UsuarioSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: [true, "Rol is required"],
    enum: Rol,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// Remove version and password from usuario in JSON format
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  
  return {uid:_id,...user};
};
module.exports = model("Usuario", UsuarioSchema);
