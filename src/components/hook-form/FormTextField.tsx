import TextField, { TextFieldProps } from 'components/TextField'
import { Controller, useFormContext } from 'react-hook-form'

export type FormTextFieldProps = {
  name: string
  showLabel?: boolean
} & TextFieldProps

export const FormTextField = ({ name, ...other }: FormTextFieldProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { name, onBlur, onChange, ref, value }, fieldState: { error } }) => (
        <TextField
          error={!!error}
          helperText={error?.message}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
          value={value}
          {...other}
        />
      )}
    />
  )
}
