import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const Input = ({ name, control, label, rules, defaultValue, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          fullWidth
          variant="outlined"
          error={error !== undefined}
          helperText={error ? error.message : ''}
          label={`${label} ${rules['required'] ? '*' : ''}`} 
          />
      )}
    />
  );
};

export default Input;