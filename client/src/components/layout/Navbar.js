import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";

class Navbar extends Component {
  render() {
    return (
      <div>
        <Menu size="large" fixed={"top"}>
          <Container>
            <Menu.Item as="a">Your Shout</Menu.Item>
            <Menu.Item as="a">About Us</Menu.Item>
            <Menu.Item position={"right"}>
              <Button as="a">Sign Up</Button>
              <Button as="a" style={{ marginLeft: "0.5em" }}>
                Login
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
