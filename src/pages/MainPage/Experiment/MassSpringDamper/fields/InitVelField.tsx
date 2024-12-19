import { SliderTextField } from '@components'
import { useAppDispatch } from '@hooks'
import { selectMsdInput, setExperimentInput } from '@slices/appSlice'
import { useSelector } from 'react-redux'

export function InitVelField() {
  const dispatch = useAppDispatch()

  const { initV } = useSelector(selectMsdInput)

  const handleChange = (value: number | null) => {
    dispatch(setExperimentInput({ experiment: 'MSD', input: { initV: value ?? undefined } }))
  }

  return (
    <SliderTextField
      label="Начальная скорость"
      value={initV}
      onChange={handleChange}
      min={0}
      max={20}
      step={0.5}
      adornment="V"
    />
  )
}
