const { Schema, model } = require("mongoose");

const mascotasSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    especie: {
        type: String,
        required: [true, 'La raza es obligatoria']
    },
    edad: {
        type: String,
        required: [true, 'La edad es obligatoria']
    },
    img: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Mascota', mascotasSchema);