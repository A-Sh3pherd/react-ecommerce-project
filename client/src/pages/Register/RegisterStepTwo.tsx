import React, {useState} from "react";
import {Form} from "react-bootstrap";

function RegisterStepTwo({setFname, setLname, setStreet, setCity}) {
  return (
    <Form>
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" onChange={(e) => setFname(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setLname(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control type="text" onChange={(e) => setCity(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Street</Form.Label>
        <Form.Control type="text" onChange={(e) => setStreet(e.target.value)} />
      </Form.Group>
        
    </Form>
  );
}

export default RegisterStepTwo;
