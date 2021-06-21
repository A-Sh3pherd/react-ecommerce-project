import {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {Category} from "../../../../server/db/entity/Category";
import {useHistory} from "react-router-dom";

import Loader from 'react-loader-spinner';


function UpdateProductModal({show, setShow}) {
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [name, setName] = useState("");
    const [image_url, setImage_url] = useState("");
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState<Category[]>();
    const [chosenCategory, setChosenCategory] = useState({})
    const [photoInput, setPhotoInput] = useState('');
    const [loaderVisible, setVisible] = useState(false)
    // useHistory
    const history = useHistory();


    async function getCategories() {
        const {data} = await axios.get("http://localhost:3005/category");
        return data;
    }

    async function addProduct() {
        setVisible(true)
        // Validations
        if (!name || !photoInput || !price || !chosenCategory) return alert('You must fill all parts of the form')
        //
        const image = await uploadImage()
        const {data} = await axios.post("http://localhost:3005/products", {
            name,
            image_url: image,
            price,
            category: chosenCategory
        });
        setVisible(false)
        alert(data.message)
        handleClose()
        history.push('/')

    }

    // Handling image
    const handleFileInput = (e) => {
        setPhotoInput(e.target.files)
    }
    // Uploading Image
    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('file', photoInput[0]);
        formData.append('upload_preset', 'ecommerce-project');
        console.log('Starting to upload');
        const {data} = await axios.post("https://api.cloudinary.com/v1_1/bananalotty/image/upload", formData);
        console.log('Finished uploading')
        setImage_url(data.url)
        return data.url
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
                        <Modal.Title> Add Product </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label> Name </Form.Label>
                            <Form.Control
                                onChange={(e) => setName(e.target.value)}
                                // placeholder={changedProduct && changedProduct.name}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Image </Form.Label>
                            <br/>
                            <Form.Control
                                onChange={e => handleFileInput(e)}
                                type="file"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Price </Form.Label>
                            <Form.Control
                                onChange={(e) => setPrice(e.target.value)}
                                // placeholder={changedProduct && changedProduct.price}
                            />
                        </Form.Group>
                        {/*  Categories  */}
                        <Form.Group>
                            <Form.Label> Category </Form.Label>
                            <Form.Control as="select" onChange={e => setChosenCategory(e.target.value)}>
                                <option value="-">
                                    -
                                </option>
                                {categories && categories.map(item => (
                                    <option value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    {/*  Buttons  */}
                    <Modal.Footer className='d-flex justify-content-center'>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={addProduct}
                        >
                            Add Product
                        </Button>
                    </Modal.Footer>
                </Modal>
        </div>
    );
}

export default UpdateProductModal;
