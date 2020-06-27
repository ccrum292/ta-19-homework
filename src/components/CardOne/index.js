import React from "react";
import Card from "react-bootstrap/Card";

function CardOne(props){
  
  return(
    <Card bg={props.variant} text={props.variantText}>
      <Card.Header bg={props.variant} as={props.header}>{props.titleText}</Card.Header>
      <Card.Body>
        {props.children}
      </Card.Body>
    </Card>
  );
};

export default CardOne;