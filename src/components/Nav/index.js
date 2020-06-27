import React from "react";
import Navbar from "react-bootstrap/Navbar";

function Nav(props) {
  return(
    <Navbar sticky="top" bg="dark" variant="dark">
      <Navbar.Brand>React Employee Directory</Navbar.Brand>
    </Navbar>
  );
};

export default Nav;