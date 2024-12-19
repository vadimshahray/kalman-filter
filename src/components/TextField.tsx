import { forwardRef, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, Input, InputProps, Typography } from '@mui/joy'
import { FormField, FormFieldProps } from './FormField'

export type TextFieldProps = FormFieldProps &
  Pick<
    InputProps,
    'type' | 'value' | 'defaultValue' | 'onChange' | 'startDecorator' | 'endDecorator' | 'readOnly'
  >

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, required, helperText, readOnly, ...inputProps },
  ref,
) {
  const initType = inputProps.type

  const [type, setType] = useState<InputProps['type']>(initType)

  const handlePasswordInputTypeToggle = () => {
    setType(type === 'password' ? 'text' : 'password')
  }

  const endDecorator =
    inputProps.endDecorator ??
    (initType === 'password' ? (
      <IconButton onClick={handlePasswordInputTypeToggle}>
        {type === 'password' ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    ) : undefined)

  return (
    <FormField label={label} error={error} helperText={helperText} required={required}>
      {readOnly ? (
        <Typography textColor={inputProps.value ? undefined : 'neutral.400'}>
          {inputProps.value || 'Нет данных'}
        </Typography>
      ) : (
        <Input
          {...inputProps}
          type={type}
          endDecorator={endDecorator}
          slotProps={{
            input: {
              ref,
            },
          }}
        />
      )}
    </FormField>
  )
})
