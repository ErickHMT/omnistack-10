const axios = require("axios");
const parseStringAsArray = require("../utils/parseStringAsArray");
const Dev = require("../models/Dev");

module.exports = {
  // buscar devs em um raio de 10km
  // filtrar por tecnologias
  async index(req, res) {
    console.log(req.query);
    const { latitude, longitude, techs } = req.query;
    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000 //Distancia máxima em metros
        }
      }
    });

    return res.json({});
  }
};
