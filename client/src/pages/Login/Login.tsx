import axios from "axios";
import React, {useContext, useState} from "react";
import {Col, Container} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import Auth from "../../Auth/Auth";
import {AdminContext} from "../../context/AdminContext";
import LoginForm from "./LoginForm";
import Logo from '../../imgs/LogoWithApple.png';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const {setAdmin} = useContext(AdminContext);

    // Login function
    const login = async () => {
        const {data} = await axios.get(`http://localhost:3005/login`, {
            params: {email, password},
        });
        if (data.user) {
            Auth.login(() => {
                localStorage.setItem("activeUser", JSON.stringify(data.user));
                if (data.user.role === "admin") setAdmin(data.user);
                history.push("/");
            });
        } else {
            alert(data.message);
        }
    };

    return (
        <>
            <Col className='col-12 d-flex justify-content-center mt-5'>
                <img src={Logo} alt="Logo"/>
            </Col>
            <Container fluid className='d-flex justify-content-center'>
                {/*Login Form*/}
                <LoginForm
                    setEmail={setEmail}
                    setPassword={setPassword}
                    login={login}
                />
            </Container>
        </>
    );
};

export default Login;
