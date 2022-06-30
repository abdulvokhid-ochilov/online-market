import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Container,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";
import styles from "./Checkout.module.css";
import AddressForm from "../AddressForm/AddressForm";
import PaymentForm from "../PaymentForm/PaymentForm";
import Confirmation from "../Confirmation/Confirmation";
import { commerce } from "../../../lib/commerce";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const steps = ["Shipping", "Payment"];

const STRIPE_PK = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  const [pk, setPk] = useState();
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    if (pk && !stripePromise) {
      console.log("loadStripe");

      setStripePromise(loadStripe(pk));
    }
  }, [pk, stripePromise]);

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} handleNext={handleNext} />
    ) : (
      <Elements stripe={stripePromise}>
        <PaymentForm
          checkoutToken={checkoutToken}
          prevStep={prevStep}
          shippingData={shippingData}
        />
      </Elements>
    );

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };
  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = (data) => {
    console.log(data);
    setShippingData(data);
    nextStep();
    setPk(STRIPE_PK);
  };

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {
        console.log(error);
      }
    };
    generateToken();
  }, [cart]);

  return (
    <Container className={styles.checkout} maxWidth="sm">
      <main className={styles.layout}>
        <Paper className={styles.paper}>
          <Typography variant="h4" align="center" gutterBottom>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={styles.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </Container>
  );
};

export default Checkout;
