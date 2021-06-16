import axios from "axios";
import React, {useContext, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import Auth from "../../Auth/Auth";
import {AdminContext} from "../../context/AdminContext";
import LoginForm from "./LoginForm";
import StoreStats from "../../components/StoreStats/StoreStats";
import StoreImage from "./styles/StoreImage";
import Logo from '../../imgs/LogoWithApple.png';
import StorePhoto from '../../imgs/Group 2.png';

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

            <Container fluid>
                {/*Login Form*/}
                <Row>
                    <Col className='col-4 d-flex justify-content-center'>
                        <LoginForm
                            setEmail={setEmail}
                            setPassword={setPassword}
                            login={login}
                        />
                    </Col>

                    <Col className='col-4 d-flex justify-content-center'>
                        <StoreImage src={StorePhoto} alt='StorePic'/>
                    </Col>

                    <Col className='col-4 d-flex justify-content-center'>
                        <StoreStats/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;
