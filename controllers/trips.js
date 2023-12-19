// DEPENDENCIES
const express = require("express");
const { Trip } = require("../models");

// TRIPS INDEX
const index = async (req, res) => {
  try {
    res.json(await Trip.find());
  } catch (err) {
    res.status(400).json({ err });
  }
};

// TRIPS CREATE
const create = async (req, res) => {
  try {
    res.json(await Trip.create(req.body));
  } catch (err) {
    res.status(400).json({ err });
  }
};

// TRIPS SHOW
const show = async (req, res) => {
  try {
    res.json(await Trip.findById(req.params.id));
  } catch (err) {
    res.status(400).json({ err });
  }
};

async function destroy(req, res, next) {
  try {
    res.status(200).json(await Trip.findByIdAndDelete(req.params.id));
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

// export controller actions
module.exports = {
  index,
  create,
  show,
  delete: destroy,
};
