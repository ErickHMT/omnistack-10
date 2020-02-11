const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      console.log(response);
      //   const { name, avatar_url, bio } = response.data;
      const { name = login, avatar_url, bio } = response.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return res.json(dev);
  },

  async update(req, res) {
    // não deve atualizar github_username
  },

  async destroy(req, res) {
    const { id } = req.params;

    Dev.findByIdAndDelete(id);
    Dev.deleteOne;
    // res.status(500).json({ message: "Deletado com sucesso" });
    res.json({ message: "Deletado com sucesso" });
  }
};
