import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import TextFieldGroup from "../common/TextFieldGroup";
import { createGroup } from "../../actions/groupActions";
import { withRouter } from "../../../node_modules/react-router-dom";
import { connect } from "react-redux";

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      groupName: "",
      errors: {}
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("submitted create group");
    const newGroup = {
      name: this.state.groupName
    };
    this.props.createGroup(newGroup, this.props.auth.user.id);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Button color="primary" className="mt-4" onClick={this.toggle}>
          Create Group
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Create a new group</ModalHeader>
          <ModalBody>
            <TextFieldGroup
              placeholder="Group Name"
              name="groupName"
              type="text"
              value={this.state.groupName}
              onChange={this.onChange}
              error={errors.groupName}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onSubmit}>
              Create Group
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createGroup }
)(withRouter(CreateGroup));
