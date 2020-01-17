import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";
import DevUpdate from "./components/DevUpdate";

function App() {
  const [devs, setDevs] = useState([]);
  const [devUpdate, setDevUpdate] = useState(null);

  useEffect(() => {
    async function loadDevs() {
      const res = await api.get("/devs");
      setDevs(res.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const res = await api.post("/devs", data);

    setDevs([...devs, res.data]);
  }

  async function handleDevDelete(id) {
    await api.delete(`/devs/${id}`);
    const filteredDevs = devs.filter(d => d._id !== id);
    setDevs([...filteredDevs]);
  }

  function handleSetDevUpdate(dev) {
    setDevUpdate(dev);
  }

  async function handleUpdate(dev) {
    const { name, techs, latitude, longitude } = dev;
    await api.put(`/devs/${dev._id}`, {
      name,
      techs: techs,
      latitude,
      longitude
    });
    const updatedDevs = devs.map(d => {
      if (d._id !== dev._id) {
        return d;
      }
      d.name = name;
      d.techs = techs.split(",").map(t => t.trim());
      d.location.coordinates[0] = latitude;
      d.location.coordinates[1] = longitude;
      return d;
    });
    setDevs([...updatedDevs]);
    setDevUpdate(null);
  }

  return (
    <div id="app">
      <aside className="aside-register">
        <strong>Register</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem
              key={dev._id}
              dev={dev}
              onDelete={handleDevDelete}
              onUpdate={handleSetDevUpdate}
            />
          ))}
        </ul>
      </main>

      <DevUpdate dev={devUpdate} onUpdate={handleUpdate} />
    </div>
  );
}

export default App;
