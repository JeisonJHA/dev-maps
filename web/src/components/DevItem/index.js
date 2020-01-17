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
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <div className="user-delete">
        <a href={`http://github.com/${dev.github_username}`}>Go to profile</a>
        <button type="button" title="Edit" onClick={() => onUpdate(dev)}>
          <FaEdit />
        </button>
        <button type="button" title="Delete" onClick={() => onDelete(dev._id)}>
          <FaTrash />
        </button>
      </div>
    </li>
  );
}
