import { SliderTextField } from '@components'
import { useAppDispatch } from '@hooks'
import { selectMsdInput, setExperimentInput } from '@slices/appSlice'
import { useSelector } from 'react-redux'

export function InitPosField() {
  const dispatch = useAppDispatch()

  const { initP } = useSelector(selectMsdInput)

  const handleChange = (value: number | null) => {
    dispatch(setExperimentInput({ experiment: 'MSD', input: { initP: value ?? undefined } }))
  }

  return (
    <SliderTextField
      label="Начальная позиция"
      value={initP}
      onChange={handleChange}
      min={1}
      max={20}
      step={0.5}
      adornment="P"
    />
  )
}
