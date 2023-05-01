import React from 'react'
import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';

const FormInputField = ({name, control, label}) => {
  return (
    <Controller
    name={name}
    control={control}
    defaultValue=""
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        required
        fullWidth
        value={value}
        onChange={onChange}
        id="firstName"
        label={label}
        error={!!error}
        helperText={error ? error.message : null}
        autoFocus={name==="firstName"}
        autoComplete={name}
        color="success"
      />
    )}
    rules={{ required: 'First name required' }}
    />
  )
}

export default FormInputField