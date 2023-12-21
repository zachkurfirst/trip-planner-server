const express = require("express");
const { Trip } = require("../models");
const { all } = require("../routes/activities");
const token = process.env.TRIPADVISOR_TOKEN;
const ROOT_URL = "https://api.content.tripadvisor.com/api/v1/location";

const search = async (req, res) => {
  console.log("WORKIGNWSGASDFGHH");
  const q = req.query.q;
  console.log("search q: ", q);
  try {
    // let endpoint = `${ROOT_URL}/search?key=${token}&searchQuery=${q}&language=en`;
    let detailEndpoint = `${ROOT_URL}/${q}/details?key=${token}&language=en&currency=USD`;
    // console.log("endpoint: ", endpoint);
    const detailResponse = await fetch(detailEndpoint, {
      method: "GET",
    });
    const detailData = await detailResponse.json();
    let nearbyEndpoint = `${ROOT_URL}/nearby_search?latLong=${detailData.latitude}%2C%20${detailData.longitude}&key=${token}&category=attractions&radius=15&radiusUnit=mi&language=en`;
    const nearbyResponse = await fetch(nearbyEndpoint, {
      method: "GET",
    });
    const nearbyData = await nearbyResponse.json();
    const allNearbyData = nearbyData.data;
    // console.log("LAT", detailData.latitude);
    // console.log("LONG", detailData.longitude);
    // console.log("NEARBYDATA", nearbyData.data);
    // console.log({ detailEndpoint });
    // console.log({ nearbyEndpoint });

    const nearbyPromises = allNearbyData.map(async (n) => {
      let nearbyImageEndpoint = `${ROOT_URL}/${n.location_id}/photos?key=${token}&language=en`;
      const nearbyImages = await fetch(nearbyImageEndpoint, { method: "GET" });
      const nearbyImagesData = await nearbyImages.json();
      const allNearbyImagesData = nearbyImagesData.data;
      // console.log({ nearbyImageEndpoint });
      console.log("IMAGE DATA 0", allNearbyImagesData[0]);
      return allNearbyImagesData[0].images.large;
    });

    const nearbyDataPromises = await Promise.all(nearbyPromises);

    res.json({ allNearbyData, nearbyDataPromises });
  } catch (err) {
    console.log(err);
    res.json({ message: "error", error: res.statusText });
  }
};

module.exports = {
  search,
};
