import React, { useState, useEffect } from "react";

import "./styles.css";

export default function DevUpdate({ dev, onUpdate }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [name, setName] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    if (dev) {
      setName(dev.name);
      setTechs(dev.techs.join(", "));
      setLatitude(dev.location.coordinates[0]);
      setLongitude(dev.location.coordinates[1]);
    }
  }, [dev]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate({ _id: dev._id, name, techs, latitude, longitude });
  }

  if (!dev) {
    return null;
  }

  return (
    <aside>
      <strong>Update</strong>
      <form className="update-form" onSubmit={handleSubmit}>
        <div className="input-avatar">
          <img src={dev.avatar_url} alt={dev.name} />
        </div>
        <div className="input-block">
          <label htmlFor="username">User Name</label>
          <input
            name="username"
            id="username"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="techs">Technologies</label>
          <input
            name="techs"
            id="techs"
            required
            value={techs}
            onChange={e => setTechs(e.target.value)}
          />
        </div>
        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="number"
              name="latitude"
              id="latitude"
              required
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="number"
              name="longitude"
              id="longitude"
              required
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Update</button>
      </form>
    </aside>
  );
}
