import { minMaxRule } from '@utils'
import { ValidatedTextField } from './ValidatedTextField'
import { Stack, Slider, Container } from '@mui/joy'
import { useEffect, useMemo, useState } from 'react'

export type SliderTextFieldProps = {
  min: number
  max: number
  step: number
  label: string
  adornment?: string
  endIconTooltip?: string
  EndIcon?: Icon
  value: number
  onChange: (value: number) => void
}

export const SliderTextField = ({
  label,
  adornment,
  value,
  onChange,
  EndIcon,
  endIconTooltip,
  min,
  max,
  step,
}: SliderTextFieldProps) => {
  const [fieldValue, setFieldValue] = useState(value.toString())
  const [sliderValue, setSliderValue] = useState(value)

  const onSliderChange = (_: any, sliderValue: number | number[]) => {
    setFieldValue(sliderValue.toString())
    setSliderValue(sliderValue as number)
  }

  const onSliderChangeCommitted = (_: any, sliderValue: number | number[]) => {
    const newValue = sliderValue as number

    setFieldValue(newValue.toString())
    setSliderValue(newValue)

    onChange(newValue)
  }

  const onTextFieldValid = (textFieldValue: number) => {
    setFieldValue(textFieldValue.toString())
    setSliderValue(textFieldValue)

    if (textFieldValue !== value) {
      onChange(textFieldValue)
    }
  }

  useEffect(() => {
    setFieldValue(value.toString())
    setSliderValue(value)
  }, [value])

  const validationRule = useMemo(
    () =>
      minMaxRule({
        min,
        max,
        typeError: 'Не число',
        minError: `Число меньше минимального (${min})`,
        maxError: `Число больше минимального (${max})`,
      }),
    [min, max],
  )

  return (
    <Stack>
      <ValidatedTextField
        label={label}
        adornment={adornment}
        value={fieldValue}
        rule={validationRule}
        EndIcon={EndIcon}
        endIconTooltip={endIconTooltip}
        onValid={onTextFieldValid}
      />

      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingY: 0,
        }}
      >
        <Slider
          size="sm"
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={onSliderChange}
          onChangeCommitted={onSliderChangeCommitted}
        />
      </Container>
    </Stack>
  )
}
