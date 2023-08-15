const { Router } = require("express");
const { check } = require("express-validator");
const login = require("../controllers/auth.controller");
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

module.exports = router;
