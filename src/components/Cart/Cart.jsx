import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import EmptyCart from "./EmptyCart";
import styles from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({ cart, removeFromCart, clearCart, updateCart }) => {
  return (
    <Container className={styles.cart}>
      <Typography variant="h3" gutterBottom>
        Your shopping cart
      </Typography>
      {cart.total_items > 0 ? (
        <>
          <Grid container spacing={3}>
            {cart.line_items.map((item) => (
              <Grid item xs={12} sm={4} key={item.id}>
                <CartItem
                  item={item}
                  removeFromCart={removeFromCart}
                  updateCart={updateCart}
                />
              </Grid>
            ))}
          </Grid>
          <div className={styles.cardDetails}>
            <Typography variant="h4">
              Total: {cart.subtotal.formatted_with_symbol}
            </Typography>
            <div className={styles.cardButtons}>
              <Button
                className={styles.button}
                size="large"
                type="button"
                variant="contained"
                color="secondary"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Button
                className={styles.button}
                size="large"
                type="button"
                variant="contained"
                color="primary"
                component={Link}
                to="/checkout"
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </Container>
  );
};

export default Cart;
