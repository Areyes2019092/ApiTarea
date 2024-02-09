const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { existeMascotaById } = require("../helpers/db-validators");

const {
  mascotasGet,
  getMascotasByid,
  mascotasPut,
  mascotasDelete,
  mascotasPost,
  getMascotaByid,
} = require("../controllers/mascota.controller");

const routerMascota = Router();

routerMascota.get("/", mascotasGet);

routerMascota.get(
  "/:id",
  [
    check("id", "El id no es un formato valido de MongoDB").isMongoId(),
    check("id").custom(existeMascotaById),
    validarCampos
  ],
  getMascotaByid);

routerMascota.put("/:id", [
  check("id", "El id no es un formato valido de MongoDB").isMongoId(),
  check("id").custom(existeMascotaById),
  validarCampos,
], mascotasPut);

routerMascota.delete(
  "/:id",
  [
    check("id", "El id no es un formato válido de MongoDB").isMongoId(),
    check("id").custom(existeMascotaById),
    validarCampos,
  ],
  mascotasDelete
);

routerMascota.post(
  "/",
  [check("nombre", "El nombre es obligatorio").not().isEmpty(), validarCampos],
  mascotasPost
);

module.exports = routerMascota;
