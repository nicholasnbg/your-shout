import React from "react";

const GroupMembers = ({ members }) => {
  return (
    <ul className="list-group">
      {members.map(member => (
        <li
          key={member._id}
          className="list-group-item d-flex justify-content-between"
        >
          <span className="d-flex">
            <h6 className="mb-0">{member.user.name}</h6>
            {member.admin ? <small className="ml-3 mt-1">Admin</small> : null}
          </span>
          <span> {`$${member.balance}`}</span>
        </li>
      ))}
    </ul>
  );
};

export default GroupMembers;
