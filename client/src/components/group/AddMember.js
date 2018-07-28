import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import TextFieldGroup from "../common/TextFieldGroup";
import { addMember } from "../../actions/groupActions";

class AddMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: "",
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
    this.props.addMember(
      this.state.email,
      this.props.currentGroup,
      this.props.history
    );
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    const { errors } = this.props;
    return (
      <div>
        <Button color="success" onClick={this.toggle}>
          Add Member +
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Add A Member to the Group
          </ModalHeader>
          <ModalBody>
            <TextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onSubmit}>
              Add member
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
  errors: state.errors
});

AddMember.propTypes = {
  errors: PropTypes.object.isRequired,
  currentGroup: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  { addMember }
)(AddMember);
