import React from "react";
import {Button, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {
    StyledButton,
    StyledLoginForm,
    StyledRegisterParagraph,
} from "./styles/login-form";
import Logo from '../../imgs/Login.png';


function LoginForm({setEmail, setPassword, login}) {
    return (
        <StyledLoginForm>
            <h2 className="text-center">
                <img src={Logo} alt="loginLogo" style={{width: '40%'}}/>
            </h2>
            <br/>
            <Form>
                <Container id="login-form">
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <StyledButton>
                        <Row>
                            <Button type="button" onClick={login} size="sm">
                                {" "}
                                Login{" "}
                            </Button>
                        </Row>
                    </StyledButton>
                </Container>
            </Form>
            <StyledRegisterParagraph>
                <p className="register">
                    Don't have an account? Register <Link to="/register">here</Link>
                </p>
            </StyledRegisterParagraph>
        </StyledLoginForm>
    );
}

export default LoginForm;
