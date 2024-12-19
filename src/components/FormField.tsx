import { PropsWithChildren } from 'react'
import { FormControl, FormHelperText, FormLabel } from '@mui/joy'

export type FormFieldProps = {
  label: string | number
  error?: boolean
  helperText?: string
  required?: boolean
  readOnly?: boolean
}

type Props = PropsWithChildren<FormFieldProps>

export function FormField({ label, error, helperText, required, children }: Props) {
  return (
    <FormControl error={error} required={required}>
      <FormLabel>{label}</FormLabel>

      {children}

      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
