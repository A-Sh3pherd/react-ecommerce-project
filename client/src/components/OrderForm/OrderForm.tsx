import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import "./OrderForm.css";
import {cities} from "../../pages/Order/cities";

const OrderForm = ({placeOrder}) => {
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [delivery_date, setDelivery_date] = useState("");
    const [credit_card, setCreditCard] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("activeUser"));
        setCity(user.city);
        setStreet(user.street);
    }, []);

    return (
        <Form id="order-form">
            <Form.Group>
                <Form.Label> City </Form.Label>
                <Form.Control
                    onChange={(e) => setCity(e.target.value)}
                    as='select'
                >
                    <option value={city && city}> {city} </option>
                    {cities.map(c => (
                        c !== city && <option value={c}> {c} </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label> Street </Form.Label>
                <Form.Control
                    onChange={(e) => setStreet(e.target.value)}
                    value={street && street}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label> Shipping Date </Form.Label>
                <Form.Control
                    type="date"
                    onChange={(e) => setDelivery_date(e.target.value)}
                />
            </Form.Group>
            <br/>

            <h3>Payment</h3>
            <hr/>
            <Form.Group>
                <Form.Label> Credit Cart </Form.Label>
                <Form.Control
                    onChange={(e) => setCreditCard(e.target.value)}
                    type="password"
                />
            </Form.Group>
            <br/>

            <Button
                type="button"
                className="text-center"
                onClick={() => placeOrder(city, street, credit_card, delivery_date)}
            >
                {" "}
                Order{" "}
            </Button>
        </Form>
    );
};

export default OrderForm;
