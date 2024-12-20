import { MatrixFields, SliderTextField } from '@components'
import { MATRIX_FIELD_WIDTH } from '@constants'
import { useAppDispatch } from '@hooks'
import { selectExperiment, selectInput, setInput } from '@slices/appSlice'
import { useSelector } from 'react-redux'

const min = 0
const max = 10
const step = 1

export function PField() {
  const dispatch = useAppDispatch()

  const { P } = useSelector(selectInput)
  const experiment = useSelector(selectExperiment)

  return (
    <MatrixFields label="P, ковариционная матрица состояния">
      {renderField(P, 0, 0, dispatch)}

      {experiment !== 'UAV' && renderField(P, 0, 1, dispatch)}
      {experiment !== 'UAV' && renderField(P, 1, 0, dispatch)}
      {experiment !== 'UAV' && renderField(P, 1, 1, dispatch)}
    </MatrixFields>
  )
}

function renderField(P: number[][], i: number, j: number, dispatch: AppDispatch) {
  return (
    <SliderTextField
      value={P[i][j]}
      onChange={(value) => dispatch(setInput({ name: 'P', value: value ?? 0, i, j }))}
      min={min}
      max={max}
      step={step}
      maxWidth={MATRIX_FIELD_WIDTH}
      noSlide
    />
  )
}
