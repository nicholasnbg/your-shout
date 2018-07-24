import React from "react";
import { Link } from "react-router-dom";

const Groups = ({ groups }) => {
  return (
    <ul className="list-group">
      {groups.map(group => (
        <Link
          key={group._id}
          to={{
            pathname: `/group`,
            state: { groupId: group.group._id }
          }}
        >
          <li className="list-group-item list-group-item-action">
            {group.name}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Groups;
