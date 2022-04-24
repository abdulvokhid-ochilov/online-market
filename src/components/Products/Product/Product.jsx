import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import styles from "./Product.module.css";

const Product = ({ product, addToCart }) => {
  return (
    <Card>
      <CardMedia
        title={product.name}
        image={product.image.url}
        component="img"
      />
      <CardContent>
        <div className={styles.cardContent}>
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6">
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        />
      </CardContent>
      <CardActions disableSpacing className={styles.cardActions}>
        <IconButton
          aria-label="add to shopping cart"
          onClick={addToCart.bind(this, product.id, 1)}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
