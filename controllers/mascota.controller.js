const { response, json, query } = require("express");
const bcryptjs = require("bcryptjs");
const Mascota = require("../models/mascota");

const mascotaGet = async (req, res = response) => {
  const { limite, desde } = req.query;
  const query = { estado: true };
  const [total, mascotas] = await Promise.all([
    Mascota.countDocuments(query),
    Mascota.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);
  res.status(200).json({
    total,
    mascotas,
  });
};

const getMascotaById = async (req, res) => {
  const { id } = req.params;
  const mascota = await Mascota.findOne({ _id: id });

  res.status(200).json({
    mascota,
  });
};

const mascotasPost = async (req, res) => {
  const { nombre, especie, edad } = req.body;
  const mascota = new Mascota({ nombre, especie, edad });

  const salt = bcryptjs.genSalt();
  //

  await mascota.save();
  res.status(200).json({
    mascota,
  });
};

const mascotasPut = async (req, res) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  await Mascota.findByIdAndUpdate(id, resto);
  const mascota = await Mascota.findOne({ _id: id });

  res.status(200).json({
    msg: "Mascota actualizada exitosamente",
    mascota,
  });
};

const mascotasDelete = async (req, res) => {
  const { id } = req.params;
  await Mascota.findByIdAndUpdate(id, { estado: false });

  const mascota = await Mascota.findOne({ _id: id });

  res.status(200).json({
    msg: "Mascota eliminada exitosamente",
    mascota,
  });
};

module.exports = {
  mascotaGet,
  getMascotaById,
  mascotasPost,
  mascotasPut,
  mascotasDelete,
};
