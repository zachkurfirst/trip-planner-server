const express = require("express");
const { Trip } = require("../models");
const token = process.env.TRIPADVISOR_TOKEN;
const ROOT_URL = "https://api.content.tripadvisor.com/api/v1/location";

const search = async () => {
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