const { Router } = require("express");
const {
  getUsuarios,
  agregarUsuario,
  updateUser,
  deleteUser
} = require("../controllers/usuarios.controller");

const router = Router();

router.get("/", getUsuarios);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/", agregarUsuario);

module.exports = router;
