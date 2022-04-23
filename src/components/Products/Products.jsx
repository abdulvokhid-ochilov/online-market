import React from "react";
import { Grid } from "@mui/material";
import Product from "./Product/Product";
import styles from "./Products.module.css";

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "Product 1 description",
    price: "$1",
    image: "https://source.unsplash.com/random",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Product 2 description",
    price: "$2",
    image: "https://source.unsplash.com/random",
  },
  {
    id: 3,
    name: "Product 3",
    description: "Product 3 description",
    price: "$3",
    image: "https://source.unsplash.com/random",
  },
  {
    id: 4,
    name: "Product 4",
    description: "Product 4 description",
    price: "$4",
    image: "https://source.unsplash.com/random",
  },
];

const Products = () => {
  return (
    <div>
      <Grid
        container
        justifyContent="center"
        spacing={4}
        className={styles.products}
      >
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
