import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../actions/userActions";
import Spinner from "../common/Spinner";
import Groups from "./Groups";

class Dashboard extends Component {
  componentDidMount() {
    // get user
    this.props.getUserInfo(this.props.auth.user.id);
  }

  render() {
    const { userInfo, loading } = this.props.user;
    let dashboardContent;

    if (loading || !userInfo.groups) {
      dashboardContent = <Spinner />;
    } else {
      {
        console.log(userInfo.groups);
      }
      dashboardContent = <Groups groups={userInfo.groups} />;
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
