import {Form} from "react-bootstrap";

function RegisterStepOne({setEmail, setPassword, setSecondPassword}) {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} placeholder='Example@gmail.com'/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label> Re-enter password </Form.Label>
                <Form.Control
                    type="password"
                    onChange={(e) => setSecondPassword(e.target.value)}
                />
            </Form.Group>
        </Form>
    );
}

export default RegisterStepOne;
