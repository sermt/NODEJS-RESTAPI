const generateJWT = require("../helpers/generateJWT");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email: email });
    //check email
    if (!usuario) res.status(400).json({ message: "Email/password not valid" });

    //check password
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword)
      res.status(400).json({ message: "Email/password not valid" });

    //check user state
    if (!usuario.estado) res.status(400).json({ message: "User not found" });

    const token = await generateJWT(usuario.id);
    res.json({ usuario, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = login;
