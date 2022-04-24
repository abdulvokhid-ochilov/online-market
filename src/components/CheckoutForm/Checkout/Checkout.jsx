import React, { useState } from "react";
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

const steps = ["Shipping", "Payment"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);

  const Form = () => (activeStep === 0 ? <AddressForm /> : <PaymentForm />);

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
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </Container>
  );
};

export default Checkout;
