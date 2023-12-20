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
  const q = req.query.q;
  // console.log("search q: ", q);
  try {
    let endpoint = `${ROOT_URL}/search?key=${token}&searchQuery=${q}&language=en`;
    // console.log("endpoint: ", endpoint);
    const findSearchResponse = await fetch(endpoint, {
      method: "GET",
    });
    const data = await findSearchResponse.json();
    const allData = data.data;
    // console.log({ allData });
    // console.log(allData[0].location_id);
    // res.json(allData);

    const imagePromises = allData.map(async (e) => {
      let imageEndpoint = `${ROOT_URL}/${e.location_id}/photos?key=${token}&language=en`;
      // console.log({imageEndpoint});
      // console.log("LOCATION_ID", e.location_id);
      const images = await fetch(imageEndpoint, { method: "GET" });
      const imagesData = await images.json();
      const allImagesData = imagesData.data;
      console.log({ allImagesData });
      return allImagesData[0].images.large;
    });

    const imageData = await Promise.all(imagePromises);
    res.json({ allData, imageData });
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
