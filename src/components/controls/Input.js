import React from 'react';
import { TextField } from '@mui/material';

const Input = (props) => {
  const { name, label, value,error=null, onChange, ...required } = props;
  return (
      <TextField
          variant="outlined"
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          fullWidth={true}
          {...required}
          {...(error && {error:true,helperText:error})}
      />
  )
}

export default Input;