import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./CartItem.module.css";

const CartItem = ({ item, removeFromCart, updateCart }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        image={item.image.url}
        className={styles.media}
      />
      <CardContent className={styles.cardContent}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="h7">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={styles.cartActions}>
        <div className={styles.buttons}>
          <Button
            type="button"
            size="small"
            variant="outlined"
            color="secondary"
            onClick={updateCart.bind(this, item.id, item.quantity - 1)}
          >
            —
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="button"
            size="small"
            variant="outlined"
            color="secondary"
            onClick={updateCart.bind(this, item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          size="small"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={removeFromCart.bind(this, item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
