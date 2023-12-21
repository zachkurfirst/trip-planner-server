const express = require("express");
const { Trip } = require("../models");
const token = process.env.TRIPADVISOR_TOKEN;
const ROOT_URL = "https://api.content.tripadvisor.com/api/v1/location";

const search = async (req, res) => {
  const q = req.query.q;
  // console.log("search q: ", q);
  try {
    let endpoint = `${ROOT_URL}/search?key=${token}&searchQuery=${q}&language=en`;
    let detailEndpoint = `${ROOT_URL}/${q}/details?key=${token}&language=en&currency=USD`;
    // let nearbyEndpoint = `${ROOT_URL}/nearby_search?latLong=${latitude}%2C%20${longitude}&key=${token}&category=attractions&radius=15&radiusUnit=mi&language=en`;
    // console.log("endpoint: ", endpoint);
    const detailResponse = await fetch(detailEndpoint, {
      method: "GET",
    });

    const detailData = await detailResponse.json();
    // console.log("LAT", detailData.latitude);
    // console.log("LONG", detailData.longitude);

    res.json({
      latitude: detailData.latitude,
      longitude: detailData.longitude,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "error", error: res.statusText });
  }
};

module.exports = {
  search,
};
