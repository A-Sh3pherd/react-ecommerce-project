import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {Category} from "../../../../../server/db/entity/Category";

function UpdateProductModal({show, setShow, changedProduct}) {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState("");
    const [image_url, setImage_url] = useState("");
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState<Category[]>();
    const [chosenCategory, setChosenCategory] = useState({})


    async function getCategories() {
        const {data} = await axios.get("http://localhost:3005/category");
        return data;
    }

    async function updateProduct() {
        const {data} = await axios.post("http://localhost:3005/products/update", {
            id: changedProduct.id,
            name: name ? name : changedProduct.name,
            image_url: image_url ? image_url : changedProduct.image_url,
            price: price ? price : changedProduct.price,
            category: chosenCategory ? chosenCategory : changedProduct.category,
        });
        alert(data.message);
    }

    useEffect(() => {
        getCategories()
            .then(categories => {
                setCategories(categories.allCategories)
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Update Product </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label> Name </Form.Label>
                        <Form.Control
                            onChange={(e) => setName(e.target.value)}
                            placeholder={changedProduct && changedProduct.name}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Image </Form.Label>
                        <Form.Control
                            onChange={(e) => setImage_url(e.target.value)}
                            placeholder={changedProduct && changedProduct.image_url}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Price </Form.Label>
                        <Form.Control
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder={changedProduct && changedProduct.price}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Category </Form.Label>
                        <Form.Control as="select" onChange={e => setChosenCategory(e.target.value)}>
                            {categories && categories.map(item => (
                                <option value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            updateProduct().then(() => {
                                handleClose();
                            })
                                .catch(e => console.log(e))
                        }}
                    >
                        Update Product
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UpdateProductModal;
