import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import { commerce } from "./lib/commerce";
import { useState, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import { Routes, Route } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const getProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const getCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const addToCart = async (id, quantity) => {
    const { cart } = await commerce.cart.add(id, quantity);
    setCart(cart);
  };

  const removeFromCart = async (id) => {
    const { cart } = await commerce.cart.remove(id);
    setCart(cart);
  };

  const updateCart = async (id, quantity) => {
    const { cart } = await commerce.cart.update(id, { quantity });
    setCart(cart);
  };

  const clearCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  useEffect(() => {
    getProducts();
    getCart();
  }, []);

  return (
    <div className="App">
      <Navbar cart={cart} />
      <Routes>
        <Route
          path="/"
          element={<Products products={products} addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              updateCart={updateCart}
              clearCart={clearCart}
            />
          }
        />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
      </Routes>
    </div>
  );
}

export default App;
