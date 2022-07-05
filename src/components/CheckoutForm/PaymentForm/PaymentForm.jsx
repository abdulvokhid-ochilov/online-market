import React from "react";
import { Typography, Button, Divider } from "@mui/material";
import { CardElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import Review from "../Review/Review";

const PaymentForm = ({
  checkoutToken,
  prevStep,
  shippingData,
  onCaptureCheckout,
  nextStep,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  console.log(shippingData);

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe or elements are not loaded yet");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.state,
          postal_zip_code: shippingData.zip,
          country: shippingData.country,
        },
        fulfillment: {
          shipping_method: shippingData.option,
        },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>

      <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
        <CardElement id="card" style={{ width: "100%" }} />
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={prevStep}>
            Back
          </Button>
          <Button
            type="submit"
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
