import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = ({ cart }) => {
  return (
    <>
      <AppBar position="fixed" className={styles.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="./"
            variant="h6"
            className={styles.title}
            color="inherit"
          >
            <img
              src="https://www.nicepng.com/png/full/247-2475175_ecommerce-e-commerce-website-logo.png"
              alt="Online Market"
              height="25px"
              className={styles.image}
            />
            Online Market
          </Typography>
          <div className={styles.grow} />
          <div className={styles.button}>
            <IconButton
              component={Link}
              to="./cart"
              color="inherit"
              aria-label="show cart items"
            >
              <Badge badgeContent={cart.total_items} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
