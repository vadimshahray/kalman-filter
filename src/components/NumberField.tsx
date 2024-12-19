import { TextField, TextFieldProps } from '@components'
import { useRef } from 'react'

type Props = Omit<TextFieldProps, 'value' | 'onChange'> & {
  value?: number | null
  onChange: (value: number | null) => void
}

export function NumberField({ value, onChange, ...props }: Props) {
  const ref = useRef<HTMLInputElement | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    const parsed = Number.parseFloat(e.target.value)

    if (value && isNaN(parsed)) return

    onChange(!value ? null : parsed)
  }

  return (
    <TextField
      ref={ref}
      type="number"
      defaultValue={value ?? undefined}
      {...props}
      onChange={handleChange}
    />
  )
}
