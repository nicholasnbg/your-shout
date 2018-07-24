import React from "react";

const GroupMembers = ({ members }) => {
  return (
    <ul className="list-group">
      {members.map(member => (
        <li className="list-group-item">{member.user.name}</li>
      ))}
    </ul>
  );
};

export const GroupMember = member => {
  return (
    <div>
      <p>I am a member</p>
    </div>
  );
};

export default GroupMembers;
