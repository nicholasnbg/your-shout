import React, { Component } from "react";
import { connect } from "../../../node_modules/react-redux";
import { getGroupInfo } from "../../actions/groupActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import GroupMembers from "./GroupMembers";
import AddMember from "./AddMember";

class Group extends Component {
  componentDidMount() {
    this.props.getGroupInfo(this.props.location.state.groupId);
  }

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
            {group.members && <GroupMembers members={group.members} />}
            {isAdmin ? <AddMember /> : null}
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
  getGroupInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  group: state.group
});

export default connect(
  mapStateToProps,
  { getGroupInfo }
)(Group);
