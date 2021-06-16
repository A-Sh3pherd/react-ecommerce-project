import axios from "axios";
import {useEffect, useState} from "react";
import {Nav} from "react-bootstrap";

interface ICategory {
    id: number;
    name: string;
    created_at: Date;
}

const CategoryNavbar = ({pickCategory, setPickedCategory}) => {
    const [categories, setCategories] = useState([]);

    async function getCategories() {
        const {data} = await axios.get("http://localhost:3005/category");
        return data;
    }

    // Onload- Get all categories
    useEffect(() => {
        getCategories()
            .then((r) => {
                setCategories(r.allCategories);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <Nav fill variant="tabs" defaultActiveKey="All">
            <Nav.Item>
                <Nav.Link eventKey="0" onClick={async () => await pickCategory(0)}>
                    All
                </Nav.Link>
            </Nav.Item>
            {categories &&
            categories.map((category: ICategory) => (
                <Nav.Item key={category.id}>
                    <Nav.Link
                        eventKey={category.id}
                        style={{color: 'black', fontSize: '0.90rem', fontWeight: 'bolder'}}
                        onClick={async () => {
                            await pickCategory(category.id);
                        }}
                    >
                        {category.name}
                    </Nav.Link>
                </Nav.Item>
            ))}
        </Nav>
    );
};

export default CategoryNavbar;

