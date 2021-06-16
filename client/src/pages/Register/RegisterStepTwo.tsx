import {Form} from "react-bootstrap";

function RegisterStepTwo({setFname, setLname, setStreet, setCity}) {
    return (
        <Form>
            <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    onChange={(e) => setFname(e.target.value)}/>
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
                <Form.Control
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    as='select'
                >
                    <option value=""> - </option>
                    <option value="Tel-Aviv"> Tel-Aviv</option>
                    <option value="Haifa"> Haifa</option>
                    <option value="Beer-Sheva"> Beer-Sheva</option>
                    <option value="Karmiel"> Karmiel</option>
                    <option value="Jerusalem"> Jerusalem</option>
                    <option value="Eilat"> Eilat</option>
                    <option value="Herzliya"> Herzliya</option>
                    <option value="Ramat-Gan"> Ramat-Gan</option>
                    <option value="Rishon-Leziyon"> Rishon-Leziyon</option>
                    <option value="Petah-Tikva"> Petah-Tikva</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Street</Form.Label>
                <Form.Control
                    type="text"
                    onChange={(e) => setStreet(e.target.value)}/>
            </Form.Group>

        </Form>
    );
}

export default RegisterStepTwo;
