import React, { useState } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../InputField";

const AddressForm = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState("");
  const methods = useForm();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form>
          <Grid container spacing={3}>
            <InputField required name="firstName" label="First Name" />
            <InputField required name="lastName" label="Last Name" />
            <InputField required name="address1" label="Address" />
            <InputField required name="email" label="Email" />
            <InputField required name="city" label="City" />
            <InputField required name="zip" label="ZIP/Postal code" />
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
