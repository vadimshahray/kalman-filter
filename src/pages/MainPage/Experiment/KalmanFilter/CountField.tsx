import { SliderTextField } from '@components'
import { useAppDispatch } from '@hooks'
import { selectCount, setCount } from '@slices/appSlice'
import { useSelector } from 'react-redux'

export function CountField() {
  const dispatch = useAppDispatch()

  const count = useSelector(selectCount)

  const handleChange = (value: number | null) => {
    dispatch(setCount(value))
  }

  return (
    <SliderTextField
      label="Количество измерений"
      value={count}
      onChange={handleChange}
      min={5}
      max={2000}
      step={10}
      adornment="I"
      maxWidth={400}
    />
  )
}
