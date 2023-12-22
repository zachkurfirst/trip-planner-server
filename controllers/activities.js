const express = require("express");
const { Trip } = require("../models");
const { all } = require("../routes/activities");
const token = process.env.TRIPADVISOR_TOKEN;
const ROOT_URL = "https://api.content.tripadvisor.com/api/v1/location";

const search = async (req, res) => {
  const q = req.query.q;
  try {
    const detailEndpoint = `${ROOT_URL}/${q}/details?key=${token}&language=en&currency=USD`;
    const detailResponse = await fetch(detailEndpoint, {
      method: "GET",
    });
    const detailData = await detailResponse.json();
    const nearbyEndpoint = `${ROOT_URL}/nearby_search?latLong=${detailData.latitude}%2C%20${detailData.longitude}&key=${token}&category=attractions&radius=15&radiusUnit=mi&language=en`;
    const nearbyResponse = await fetch(nearbyEndpoint, {
      method: "GET",
    });
    const nearbyData = await nearbyResponse.json();
    const allNearbyData = nearbyData.data;
    const nearbyPromises = allNearbyData.map(async (n) => {
      const nearbyImageEndpoint = `${ROOT_URL}/${n.location_id}/photos?key=${token}&language=en`;
      const nearbyImages = await fetch(nearbyImageEndpoint, { method: "GET" });
      const nearbyImagesData = await nearbyImages.json();
      const allNearbyImagesData = nearbyImagesData.data;
      const act = allNearbyImagesData?.[0]?.images?.large;
      if (!act) {
        console.log("EMPTY DATA FOUND", allNearbyImagesData);
      }
      return act;
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
