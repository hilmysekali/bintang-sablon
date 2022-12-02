import { matchIsValidColor, MuiColorInput } from 'mui-color-input'
import { Controller } from 'react-hook-form'

const ColorInput = ({ name, control, defaultValue }) => {
  return (
    <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    rules={{ validate: matchIsValidColor }}
    render={({ field, fieldState }) => (
      <MuiColorInput
        {...field}
        format="hex"
        helperText={fieldState.error ? "Color is invalid" : ""}
        error={fieldState.error}
      />
    )}
  />
  )
}

export default ColorInput;