import {useEffect, useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import IProduct from "../Products/Products.model";
import "./CheckoutCart.css";

const CheckoutCart = ({cart, itemsPrice, tax, shipping, totalPrice, orderPlaced}) => {
    const [searchValue, setSearchValue] = useState("");
    const [marker, setMarker] = useState([]);

    // Runs everytime searchValue changed
    useEffect(() => {
        let markered = [];

        // If input is cleared, clear the markers
        if (searchValue.length === 0) return setMarker([]);
        // check if name of the product include the searchTerm
        const searchTerm = searchValue.toLocaleLowerCase();
        cart.products.forEach(
            (product) =>
                product.name.toLowerCase().includes(searchTerm) &&
                markered.push(product)
        );
        // Making sure we won't mark everything when search input is cleared
        setMarker(markered);
    }, [searchValue]);

    return (
        <div className="template">
            <>
                {/*   Title   */}
                {orderPlaced
                    ? <h1>Receipt</h1>
                    : <h1 className={'text-center'}>Cart Products</h1>
                }
                <hr/>
                {/*     Search    */}
                {!orderPlaced && (
                    <div>
                        <Form.Control
                            type="search"
                            placeholder="Search..."
                            onChange={(e) => setSearchValue(e.target.value)}
                            style={{
                                borderRadius: "25px",
                            }}
                        />
                        <hr/>
                    </div>
                )}
                {/*     Mapping Cart     */}
                {cart &&
                cart.products.map((item) => (
                    <Row key={item.id} className="mb-2">
                        <Col className="col-4 mt-4">
                            {" "}
                            {marker.includes(item) ? (
                                <span className="markered"> {item.name} </span>
                            ) : (
                                <span> {item.name} </span>
                            )}{" "}
                        </Col>{" "}
                        {/*{product.name}*/}
                        <Col className="col-4 image-col">
                            <img
                                src={item.image_url}
                                alt={item.id}
                                className="cart-images"
                            />
                        </Col>
                        <Col className="col-4 text-end mt-4">
                            {item.amount} X ${item.price}
                        </Col>
                    </Row>
                ))}
            </>
            <hr/>
            <div className="prices-area">
                <Row>
                    <Col className="col-6 text-break"> Items Price </Col>
                    <Col className="col-6 text-end"> ${itemsPrice} </Col>
                </Row>
                <Row>
                    <Col className="col-6 text-break"> Tax Price </Col>
                    <Col className="col-6 text-end"> ${tax.toFixed(2)} </Col>
                </Row>
                <Row>
                    <Col className="col-6 text-break"> Shipping Price </Col>
                    <Col className="col-6 text-end"> ${shipping} </Col>
                </Row>
                <Row>
                    <Col className="col-6 text-break">
                        {" "}
                        <strong> Total Price </strong>{" "}
                    </Col>
                    <Col className="col-6 text-end">
                        {" "}
                        <strong> ${totalPrice} </strong>{" "}
                    </Col>
                </Row>
                <hr/>
            </div>
        </div>
    );
};

export default CheckoutCart;
