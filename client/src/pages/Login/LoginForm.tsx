import React from "react";
import {Form, Container, Button} from "react-bootstrap";
import {StyledButton, StyledLoginForm} from "./styles/login-form";

function LoginForm({setEmail, setPassword, login}) {
  return (
    <StyledLoginForm>
      <Form>
        <Container id="login-form">
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password..."
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <StyledButton>
            <Button type="button" onClick={login}>
              {" "}
              Login{" "}
            </Button>
          </StyledButton>
        </Container>
      </Form>
    </StyledLoginForm>
  );
}

export default LoginForm;
