import React from "react";
import { Typography, Button, Divider } from "@mui/material";
import { CardElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import Review from "../Review/Review";

const PaymentForm = ({ checkoutToken, prevStep }) => {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>

      <form>
        <CardElement id="card" style={{ width: "100%" }} />
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={prevStep}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!stripe || !elements}
          >
            Pay {checkoutToken.live.subtotal.formatted_with_symbol}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
