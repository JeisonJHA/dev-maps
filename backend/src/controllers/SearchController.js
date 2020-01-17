const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;
    const filter = {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [latitude, longitude]
          },
          $maxDistance: 10000
        }
      }
    };
    if (techs) {
      const techsArray = parseStringAsArray(techs);
      filter.techs = {
        $in: techsArray
      };
    }
    const devs = await Dev.find(filter);
    return res.json({ devs });
  }
};
