const axios = require("axios");

const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { name = login, avatar_url, bio } = response.data;
      const techsArray = parseStringAsArray(techs);
      const location = { type: "Point", coordinates: [latitude, longitude] };
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      const sendSocketMenssageTo = findConnections(
        { latitude, longitude },
        techsArray
      );
      sendMessage(sendSocketMenssageTo, "new-dev", dev);
    }
    return res.json(dev);
  },

  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },

  async destroy(req, res) {
    const dev = await Dev.findById(req.params.id);
    dev.remove();
    const sendSocketMenssageTo = findConnections(
      {
        latitude: dev.location.coordinates[0],
        longitude: dev.location.coordinates[1]
      },
      dev.techs
    );
    sendMessage(sendSocketMenssageTo, "remove-dev", dev);
    return res.json(dev);
  },

  async update(req, res) {
    const dev = await Dev.findById(req.params.id);
    const { name, techs, latitude, longitude } = req.body;
    const location = { type: "Point", coordinates: [latitude, longitude] };
    const techsArray = parseStringAsArray(techs);
    const [oldLatitude, oldLongitude] = dev.location.coordinates;
    await dev.updateOne({ name, techs: techsArray, location });
    dev.name = name;
    dev.techs = techs;
    dev.location = location;
    const sendSocketMenssageTo = findConnections(
      {
        latitude,
        longitude
      },
      techs
    );
    let sendSocketMenssageToOld = findConnections(
      {
        latitude: oldLatitude,
        longitude: oldLongitude
      },
      techs
    );
    sendSocketMenssageToOld = sendSocketMenssageToOld.filter(destination => {
      if (sendSocketMenssageTo.find(dest => dest.id === destination.id)) {
        return false;
      }
      return true;
    });
    sendMessage(sendSocketMenssageTo, "update-dev", dev);
    if (sendSocketMenssageToOld.length > 0) {
      sendMessage(sendSocketMenssageToOld, "update-dev", dev);
    }
    return res.json(dev);
  }
};
