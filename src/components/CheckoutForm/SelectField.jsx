import React from "react";
import { Grid, InputLabel, Select, MenuItem } from "@mui/material";

const SelectField = ({ options, changeHandler, label, value }) => {
  return (
    <Grid item xs={12} sm={6}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} fullWidth onChange={changeHandler}>
        {options.map(({ id, label }) => (
          <MenuItem key={id} value={id}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
};

export default SelectField;
