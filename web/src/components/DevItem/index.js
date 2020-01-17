import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

import "./styles.css";

export default function DevItem({ dev, onDelete, onUpdate }) {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs}</span>
        </div>
        <div className="user-delete">
          <button type="button" onClick={() => onUpdate(dev)}>
            <FaEdit />
          </button>
          <button type="button" onClick={() => onDelete(dev._id)}>
            <FaTrash />
          </button>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`http://github.com/${dev.github_username}`}>Acessar perfil</a>
    </li>
  );
}
