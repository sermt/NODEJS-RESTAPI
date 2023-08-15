const { Router } = require("express");
const {
  getUsuarios,
  agregarUsuario,
  updateUser,
  deleteUser,
} = require("../controllers/usuarios.controller");
const { check } = require("express-validator");
const { validarCampos, validarJWT, tienePermisos } = require("../middlewares");
const {
  isRoleValid,
  checkEmailDuplicate,
  checkUserExistsById,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", getUsuarios);
router.put(
  "/:id",
  [
    check("id", "Invalid Id").isMongoId(),
    check("id").custom(checkUserExistsById),
    check("rol").custom(isRoleValid),
    validarCampos,
  ],
  updateUser
);
router.delete(
  "/:id",
  [
    validarJWT,
    tienePermisos,
    check("id", "Invalid Id").isMongoId(),
    check("id").custom(checkUserExistsById),
    validarCampos,
  ],
  deleteUser
);
router.post(
  "/",
  [
    check("name", "Provide a valid name").not().isEmpty(),
    check("email", "Provide a valid email address").isEmail(),
    check("email").custom(checkEmailDuplicate),
    check(
      "password",
      "Provide a valid password with a min of 6 characters"
    ).isLength({ min: 6 }),
    check("rol").custom(isRoleValid),
    validarCampos,
  ],
  agregarUsuario
);

module.exports = router;
