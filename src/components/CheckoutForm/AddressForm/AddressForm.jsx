import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
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

  const { control, handleSubmit } = useForm();

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
  }, []);

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

      <form
        onSubmit={handleSubmit((data) =>
          handleNext({ ...data, country, state, option })
        )}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  label="First Name"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: `First Name is required` }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  label="Last Name"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: `Last Name is required` }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="address1"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  label="Address"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: `Address is required` }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  label="Email"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  type="email"
                />
              )}
              rules={{ required: `Email is required` }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  label="City"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: `City is required` }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="zip"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  label="ZIP/Postal code"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: `ZIP/Postal code is required` }}
            />
          </Grid>

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
    </>
  );
};

export default AddressForm;
