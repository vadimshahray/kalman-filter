import { SliderTextField } from '@components'
import { useAppDispatch } from '@hooks'
import { selectMsdInput, setExperimentInput } from '@slices/appSlice'
import { useSelector } from 'react-redux'

export function MassField() {
  const dispatch = useAppDispatch()

  const { m } = useSelector(selectMsdInput)

  const handleChange = (value: number) => {
    dispatch(setExperimentInput({ experiment: 'MSD', input: { m: value ?? undefined } }))
  }

  return (
    <SliderTextField
      label="Масса"
      value={m}
      onChange={handleChange}
      min={1}
      max={10}
      step={0.5}
      adornment="m"
    />
  )
}
