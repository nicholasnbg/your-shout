import React from "react";

const GroupMembers = props => {
  const { members, isAdmin } = props;

  const styles = {
    li_span: {
      flexGrow: 1,
      width: "33%"
    }
  };
  return (
    <ul className="list-group">
      {members.map(member => (
        <li
          key={member._id}
          className="list-group-item d-flex justify-content-between"
        >
          <span className="d-flex" style={styles.li_span}>
            <h6 className="mb-0">{member.user.name}</h6>
            {member.admin ? <small className="ml-3 mt-1">Admin</small> : null}
          </span>
          <span style={styles.li_span}> {`$${member.balance}`}</span>
          <span className="d-flex justify-content-end" style={styles.li_span}>
            {isAdmin && !member.admin ? (
              <button
                onClick={() => props.removeMember(member.user._id)}
                className="btn btn-danger"
              >
                Remove
              </button>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default GroupMembers;
