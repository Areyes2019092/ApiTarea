const { Schema, model } = require("mongoose");

const MascotaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de la mascota es obligatorio"],
  },
  raza: {
    type: String,
    required: [true, "La raza es obligatoria"],
  },
  img: {
    type: String,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("Mascota", MascotaSchema);
