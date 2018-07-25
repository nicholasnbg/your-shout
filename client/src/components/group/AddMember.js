import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import TextFieldGroup from "../common/TextFieldGroup";

class AddMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: ""
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    // const {errors} = this.props;
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
              // error={errors.email}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
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
export default AddMember;
