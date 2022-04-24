import React from "react";
import { Grid, InputLabel, Select, MenuItem } from "@mui/material";

const SelectField = ({ options, changeHandler, label, value }) => {
  return (
    <Grid item xs={12} sm={6}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} fullWidth onChange={changeHandler}>
        {options.map((option) => (
          <MenuItem key={option} value={option.value}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
};

export default SelectField;
