import { SliderTextField } from '@components'
import { useAppDispatch } from '@hooks'
import { selectInput, setInput } from '@slices/appSlice'
import { useSelector } from 'react-redux'

export function QField() {
  const dispatch = useAppDispatch()

  const { Q } = useSelector(selectInput)

  const handleChange = (value: number | null) => {
    dispatch(setInput({ Q: value ?? undefined }))
  }

  return (
    <SliderTextField
      label="Ковариционная матрица шума Q"
      value={Q}
      onChange={handleChange}
      min={1}
      max={100}
      step={1}
      adornment="Q"
    />
  )
}
