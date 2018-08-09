import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import TextFieldGroup from "../common/TextFieldGroup";
import { addMember } from "../../actions/groupActions";

class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      user: "",
      amount: 0,
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
    console.log("submitting");
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { errors, groupMembers } = this.props;
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>
          Add Transaction
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Add A Member to the Group
          </ModalHeader>
          <ModalBody>
            {/* <TextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            /> */}
            <FormGroup>
              <Label for="exampleSelect">Group Member</Label>
              <Input type="select" name="groupMember" id="groupMemberSelect">
                {groupMembers.map(member => (
                  <option key={member._id} value={member.user._id}>
                    {member.user.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
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

export default connect(
  mapStateToProps,
  {}
)(AddTransaction);
