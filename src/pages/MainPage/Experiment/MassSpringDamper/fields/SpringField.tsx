import { SliderTextField } from '@components'
import { useAppDispatch } from '@hooks'
import { selectMsdInput, setExperimentInput } from '@slices/appSlice'
import { useSelector } from 'react-redux'

export function SpringField() {
  const dispatch = useAppDispatch()

  const { k } = useSelector(selectMsdInput)

  const handleChange = (value: number | null) => {
    dispatch(setExperimentInput({ experiment: 'MSD', input: { k: value ?? undefined } }))
  }

  return (
    <SliderTextField
      label="Жесткость пружины"
      value={k}
      onChange={handleChange}
      min={0.1}
      max={10}
      step={0.2}
      adornment="k"
    />
  )
}
