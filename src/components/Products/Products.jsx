import React from "react";
import { Grid } from "@mui/material";
import Product from "./Product/Product";
import styles from "./Products.module.css";

const Products = ({ products, addToCart }) => {
  return (
    <div className={styles.products}>
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
