import React, {useContext, useEffect, useState} from "react";
import MainNav from "../../components/MainNav/MainNav";
import CategoryNavbar from "../../components/CategoryNavbar/CategoryNavbar";
import Products from "../../components/Products/Products";
import axios from "axios";
import IProduct from "../../components/Products/Products.model";
import Cart from "../../components/Cart/Cart";
import {Col, Container, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {AdminContext} from "../../context/AdminContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [pickedCategory, setPickedCategory] = useState(Number);
  const [cartProducts, setCartProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const {admin, setAdmin} = useContext(AdminContext);

  const history = useHistory();

  // Toggle show cart
  const showCartHandler = () => setShowCart(!showCart);

  // When user picks a category
  async function pickCategory(id: number) {
    if (id === 0) {
      const products: IProduct[] = await getProducts();
      setProducts(products);
    } else {
      const {data} = await axios.get(
        `http://localhost:3005/products/category/${id}`
      );
      setPickedCategory(data.products);
    }
  }

  // Get all products from db
  async function getProducts(): Promise<IProduct[]> {
    const {data} = await axios.get("http://localhost:3005/products");
    return data.allProducts;
  }

  // Get cart onLoad
  async function getCart() {
    const user = JSON.parse(localStorage.getItem("activeUser"));
    if (user.role === "admin") {
      return setAdmin(user);
    } else {
      const {data} = await axios.get(`http://localhost:3005/cart/${user.id}`);
      data.oldCart.cartProducts > 0 && alert("You have an open cart!");
      setCartProducts(
        data.oldCart.cartProducts.map((cartProduct) => ({
          ...cartProduct.product,
          amount: cartProduct.amount,
        }))
      );
    }
  }

  // Update cart on db- whenever user add/remove product
  async function updateCartOnDb() {
    if (admin) return;
    console.log("Updating cart");
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));

    await axios.put(`http://localhost:3005/cart/update`, {
      products: cartProducts,
      user: activeUser.id,
    });
  }

  // When adding to cart
  const onAddToCart = async (product) => {
    const exist = cartProducts.find((x) => x.id === product.id);
    if (exist) {
      setCartProducts(
        cartProducts.map((prod) =>
          prod.id === product.id
            ? {
                ...exist,
                amount: exist.amount + 1,
              }
            : prod
        )
      );
    } else {
      setCartProducts([...cartProducts, {...product, amount: 1}]);
    }
    // If cart is not empty, show it to the client.
  };

  // When removing from cart
  const onRemoveFromCart = async (product) => {
    const exist = cartProducts.find((prod) => prod.id === product.id);

    if (exist.amount === 1) {
      setCartProducts(cartProducts.filter((prod) => prod.id !== product.id));
      await emptyCart(product.id);
    } else {
      setCartProducts(
        cartProducts.map((prod) =>
          prod.id === product.id
            ? {
                ...exist,
                amount: exist.amount - 1,
              }
            : prod
        )
      );
    }
  };

  // When emptying cart
  async function emptyCart(productId: number) {
    const userId = JSON.parse(localStorage.getItem("activeUser"));
    await axios.delete(`http://localhost:3005/cart/${userId.id}`, {
      params: {productId: productId},
    });
  }

  // When user Checkout
  async function checkout() {
    history.push("/order");
  }

  // Everytime cartProducts changes
  useEffect(() => {
    updateCartOnDb().catch((e) => console.log(e));
    cartProducts.length ? setShowCart(true) : setShowCart(false);
  }, [cartProducts]);

  // Get Cart onload
  useEffect(() => {
    getCart().catch((e) => console.log(e));
  }, []);

  return (
    <>
      <>
        <MainNav
          cartAmount={cartProducts.length}
          showCartHandler={showCartHandler}
        />

        <CategoryNavbar
          pickCategory={pickCategory}
          setPickedCategory={setPickedCategory}
        />
      </>

      <Container fluid className="d-flex" style={{width: "80%"}}>
        <Row>
          <Col className="col-auto">
            <Products
              products={products}
              setProducts={setProducts}
              pickedCategory={pickedCategory}
              getProducts={getProducts}
              onAddToCart={onAddToCart}
            />
          </Col>
        </Row>

        {!admin && (
          <Col className="col-auto">
            {showCart && (
              <Cart
                cartProducts={cartProducts}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
                checkout={checkout}
              />
            )}
          </Col>
        )}
      </Container>
    </>
  );
};

export default Home;
