import React, { Component, Fragment } from "react";
import { connect } from "../../../node_modules/react-redux";
import { withRouter } from "react-router-dom";
import {
  getGroupInfo,
  removeMember,
  deleteGroup
} from "../../actions/groupActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import GroupMembers from "./GroupMembers";
import AddMember from "./AddMember";

class Group extends Component {
  componentDidMount() {
    this.props.getGroupInfo(this.props.location.state.groupId);
  }

  removeMember = user => {
    this.props.removeMember(user, this.props.group.group._id);
  };

  groupDelete = () => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      this.props.deleteGroup(this.props.group.group._id, this.props.history);
    }
  };

  render() {
    const { loading, group } = this.props.group;
    let groupContent;

    if (loading || !group) {
      groupContent = <Spinner />;
    } else {
      if (group.members) {
        const isAdmin = group.members.filter(member => member.admin).length > 0;
        groupContent = (
          <div>
            {group.members && (
              <GroupMembers
                members={group.members}
                removeMember={this.removeMember}
                isAdmin={isAdmin}
              />
            )}
            {isAdmin ? (
              <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title text-center">Admin Panel</h5>
                  <span className="card-text d-flex justify-content-between">
                    <AddMember currentGroup={this.props.group.group._id} />

                    <button
                      onClick={() => this.groupDelete()}
                      className="btn btn-danger"
                    >
                      Delete Group
                    </button>
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        );
      }
    }

    return (
      <div className="groupContainer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Group {group.name}</h1>
              {groupContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Group.proptypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getGroupInfo: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  group: state.group
});

export default connect(
  mapStateToProps,
  { getGroupInfo, removeMember, deleteGroup }
)(withRouter(Group));
