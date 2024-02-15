const { Router } = require("express");
const { check, checkSchema } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const { existeMascotaById } = require("../helpers/db-validators.js");

const {
  mascotasPost,
  mascotaGet,
  getMascotaById,
  mascotasPut,
  mascotasDelete,
} = require("../controllers/mascota.controller");

const routerPet = Router();

routerPet.get("/", mascotaGet);

routerPet.get(
  "/:id",
  [
    check("id", "El id no tiene un formato de MongoDB").isMongoId(),
    check("id").custom(existeMascotaById),
    validarCampos,
  ],
  getMascotaById
);

routerPet.put(
  "/:id",
  [
    check("id", "El id no tiene un formato de MongoDB").isMongoId(),
    check("id").custom(existeMascotaById),
    validarCampos,
  ],
  mascotasPut
);

routerPet.delete(
  "/:id",
  [
    check("id", "El id no tiene un formato de MongoDB").isMongoId(),
    check("id").custom(existeMascotaById),
    validarCampos,
  ],
  mascotasDelete
);

routerPet.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("especie", "La especie es obligatoria").not().isEmpty(),
    check("edad", "La edad debe ser un numero").not().isDecimal(),
  ],
  mascotasPost
);

module.exports = routerPet;
