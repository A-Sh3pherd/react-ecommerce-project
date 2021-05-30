import React, {useEffect, useState} from "react";
import MainNav from "../../components/MainNav/MainNav";
import CategoryNavbar from "../../components/CategoryNavbar/CategoryNavbar";
import Products from "../../components/Products/Products";
import axios from "axios";
import IProduct from "../../components/Products/Products.model";
import Cart from "../../components/Cart/Cart";
import {Col, Container, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [pickedCategory, setPickedCategory] = useState(Number);
  const [cartProducts, setCartProducts] = useState([]);
  const [showCart, setShowCart] = useState(true);

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

    const {data} = await axios.get(`http://localhost:3005/cart/${user.id}`);
    return data;
  }

  // Update cart on db- whenever user add/remove product
  async function updateCartOnDb() {
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
  };

  // When removing from cart
  const onRemoveFromCart = async (product) => {
    const exist = cartProducts.find((prod) => prod.id === product.id);

    if (exist.amount === 1) {
      setCartProducts(cartProducts.filter((prod) => prod.id !== product.id));
      console.log("removing from cart: ");
      console.log(product);
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
    const {data} = await axios.delete(
      `http://localhost:3005/cart/${userId.id}`,
      {
        params: {productId: productId},
      }
    );

    console.log(data);
  }

  // When user Checkout
  async function checkout() {
    history.push("/order");
  }

  // Get Cart onload
  useEffect(() => {
    getCart()
      .then((r) => {
        console.log(r);
        
        setCartProducts(
          r.oldCart.cartProducts.map((cartProduct) => ({
            ...cartProduct.product,
            amount: cartProduct.amount,
          }))
        );
      })
      .catch((e) => console.log(e));
  }, []);

  // Everytime cartProducts changes
  useEffect(() => {
    updateCartOnDb()
    .catch((e) => console.log(e));
  }, [cartProducts]);

  return (
    <>
      <>
        <MainNav
          cartAmount={cartProducts.length}
          showCartHandler={showCartHandler}
        />
        <br />
        <CategoryNavbar
          pickCategory={pickCategory}
          setPickedCategory={setPickedCategory}
        />
      </>

      <Container fluid className="d-flex" style={{width: "80%"}}>
        <Row>
          {/*<h1>Hello home page!</h1>*/}
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

        {showCart && (
          <Col className="col-auto">
            <Cart
              cartProducts={cartProducts}
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
              checkout={checkout}
            />
          </Col>
        )}
      </Container>
    </>
  );
};

export default Home;
