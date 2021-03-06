import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserInfo } from "../../actions/userActions";
import Spinner from "../common/Spinner";
import Groups from "./Groups";
import CreateGroup from "./CreateGroup";

class Dashboard extends Component {
  componentDidMount() {
    // get user
    this.props.getUserInfo(this.props.auth.user.id);
  }

  render() {
    const { userInfo, loading } = this.props.user;
    // const { loading } = this.state;
    let dashboardContent;

    if (loading || !userInfo.groups) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <React.Fragment>
          <Groups groups={userInfo.groups} />
          <CreateGroup />
        </React.Fragment>
      );
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Your Groups</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getUserInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUserInfo }
)(Dashboard);
