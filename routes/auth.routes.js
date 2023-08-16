const { Router } = require("express");
const { check } = require("express-validator");
const {login, googleLogin} = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

router.post(
  "/login",
  [
    check("email", "must be a valid email").isEmail(),
    check("password", "can not be empty").not().isEmpty(),
    validarCampos,
  ],
  login
);
router.post(
  "/google",
  [
    check("id_token", "id_token is required").not().isEmpty(),
    validarCampos,
  ],
  googleLogin
);

module.exports = router;
