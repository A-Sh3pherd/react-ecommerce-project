import axios from 'axios';
import React, {useState} from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import Auth from '../../Auth/Auth';
import './Register.css';

const Register = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const history = useHistory();

    async function register() {
        if (!Auth.validateEmail(email)) return;

        const {data} = await axios.post('http://localhost:3005/register', {
            fname, lname, email, password, city, street
        })
        if (!data.user) return alert(data.message)
        alert('User was successfully created!')
        history.push('/login')
    }

    return (
        <Form>
            <Container id='register-form'>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type='text' onChange={e => setFname(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type='text' onChange={e => setLname(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='text' onChange={e => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='text' onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' onChange={e => setCity(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Street</Form.Label>
                    <Form.Control type='text' onChange={e => setStreet(e.target.value)}/>
                </Form.Group>
                <Button type='button' id='register-button' onClick={register}> Register </Button>
            </Container>

        </Form>
    );
};

export default Register;
