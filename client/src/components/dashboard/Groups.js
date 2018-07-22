import React from "react";
import { Link } from "react-router-dom";

const Groups = ({ groups }) => {
  return (
    <ul className="list-group">
      {groups.map(group => (
        <Link to="/dashboard">
          <li className="list-group-item list-group-item-action">
            {group.name}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Groups;
