const generateJWT = require("../helpers/generateJWT");
const googleVerify = require("../helpers/google-verify");
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

const googleLogin = async (req, res) => {
  const { id_token } = req.body;
  try {
    const { name, img, email } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      const data = {
        name,
        email,
        password: "123123",
        img,
        rol: "USER_ROLE",
        google:true
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return res.status(401).json({ msg: "Inactive user" });
    }

    const token = await generateJWT(usuario.id);

    res.status(200).json({ usuario, token });
  } catch (error) {
    res.status(400).json({ msg: "El token no se pudo verificar" });
  }
};

module.exports = { login, googleLogin };
