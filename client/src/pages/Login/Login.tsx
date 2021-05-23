import React, {useState} from 'react';
import './Login.css';
import {Form, Container, Button} from "react-bootstrap";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Auth from '../../Auth/Auth';
import './Login.css'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();

    const login = async () => {
        const {data} = await axios.get(`http://localhost:3005/login`, {params: {email, password}})
        if (data.user) {
            Auth.login(() => {
                localStorage.setItem('activeUser', JSON.stringify(data.user));
                console.log(data.user)
                history.push('/')
            })
        } else {
            alert(data.message)
        }
    }

    return (
        <Form>
            <Container id='login-form'>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={e => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button type='button' id='login-button' onClick={login}> Login </Button>
            </Container>
        </Form>
    );
};

export default Login;
