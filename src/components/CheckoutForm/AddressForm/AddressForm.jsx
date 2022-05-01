import React, { useState, useEffect } from "react";
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
import { commerce } from "../../../lib/commerce";
import SelectField from "../SelectField";
import { Link } from "react-router-dom";

const AddressForm = ({ checkoutToken, handleNext }) => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState("");
  const methods = useForm();

  const getCountries = async (id) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      id
    );

    setCountries(
      Object.entries(countries).map(([key, value]) => ({
        id: key,
        label: value,
      }))
    );
    setCountry(Object.keys(countries)[0]);
  };

  const getStates = async (country) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      country
    );

    setStates(
      Object.entries(subdivisions).map(([key, value]) => ({
        id: key,
        label: value,
      }))
    );
    setState(Object.keys(subdivisions)[0]);
  };

  const getOptions = async (id, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(id, {
      country,
      region,
    });

    setOptions(
      options.map(({ id, price, description }) => ({
        id,
        label: `${description} - (${price.formatted_with_symbol})`,
      }))
    );
    setOption(options[0].id);
  };

  useEffect(() => {
    getCountries(checkoutToken.id);
  }, [checkoutToken]);

  useEffect(() => {
    if (country) getStates(country);
  }, [country]);

  useEffect(() => {
    if (state) getOptions(checkoutToken.id, country, state);
  }, [state]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            handleNext({ ...data, country, state, option });
          })}
        >
          <Grid container spacing={3}>
            <InputField name="firstName" label="First Name" />
            <InputField name="lastName" label="Last Name" />
            <InputField name="address1" label="Address" />
            <InputField name="email" label="Email" />
            <InputField name="city" label="City" />
            <InputField name="zip" label="ZIP/Postal code" />
            <SelectField
              options={countries}
              label="Shipping Country"
              value={country}
              changeHandler={(e) => {
                setCountry(e.target.value);
              }}
            />
            <SelectField
              options={states}
              label="Shipping Subdivision"
              value={state}
              changeHandler={(e) => setState(e.target.value)}
            />
            <SelectField
              options={options}
              label="Shipping Option"
              value={option}
              changeHandler={(e) => setOption(e.target.value)}
            />
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
