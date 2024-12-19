import { NumberField } from '@components'
import { useAppDispatch } from '@hooks'
import { selectInput, setInput } from '@slices/appSlice'
import { useSelector } from 'react-redux'

export function RField() {
  const dispatch = useAppDispatch()

  const { R } = useSelector(selectInput)

  const handleChange = (value: number | null) => {
    dispatch(setInput({ R: value ?? undefined }))
  }

  return (
    <NumberField label="Ковариционная матрица шума датчиков R" value={R} onChange={handleChange} />
  )
}
