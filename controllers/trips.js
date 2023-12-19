// DEPENDENCIES
const express = require("express");
const { Trip } = require("../models");
const token = process.env.TRIPADVISOR_TOKEN;
const ROOT_URL = "https://api.content.tripadvisor.com/api/v1/location";

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

async function search(req, res) {
  try {
    let endpoint = `${ROOT_URL}/search?key=${token}`;
    console.log("endpoint: ", endpoint);
    console.log("token: ", token);
    const findSearchResponse = await fetch(endpoint, {
      method: "GET",
    });
    console.log(findSearchResponse);
    const data = await findSearchResponse.json();
    res.json('api response: ', data);
  } catch (err) {
    console.log(err);
    res.json({ message: "error", error: res.statusText });
  }
}

// export controller actions
module.exports = {
  index,
  create,
  show,
  delete: destroy,
  search,
};