import { SliderTextField } from '@components'
import { useAppDispatch } from '@hooks'
import { selectMsdInput, setExperimentInput } from '@slices/appSlice'
import { useSelector } from 'react-redux'

export function CField() {
  const dispatch = useAppDispatch()

  const { c } = useSelector(selectMsdInput)

  const handleChange = (value: number | null) => {
    dispatch(setExperimentInput({ experiment: 'MSD', input: { c: value ?? undefined } }))
  }

  return (
    <SliderTextField
      label="Коэффициент демпфирования"
      value={c}
      onChange={handleChange}
      min={0.1}
      max={5}
      step={0.1}
      adornment="с"
    />
  )
}
