import React from "react";
import Form from "react-bootstrap/Form";

function SeachBar(props){
  return(
    <Form>
      <Form.Group>
        <Form.Control onChange={(e) => {props.state.setSearch(e.target.value)}} type="text" placeholder={props.placeholder}/>
      </Form.Group>
    </Form>
  )
}

export default SeachBar;