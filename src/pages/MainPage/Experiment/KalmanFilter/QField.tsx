import { MatrixFields, SliderTextField } from '@components'
import { MATRIX_FIELD_WIDTH } from '@constants'
import { useAppDispatch } from '@hooks'
import { selectExperiment, selectInput, setInput } from '@slices/appSlice'
import { useSelector } from 'react-redux'

const min = 0
const max = 10
const step = 1

export function QField() {
  const dispatch = useAppDispatch()

  const { Q } = useSelector(selectInput)
  const experiment = useSelector(selectExperiment)

  return (
    <MatrixFields label="Q">
      {renderField(Q, 0, 0, dispatch)}

      {experiment !== 'UAV' && renderField(Q, 0, 1, dispatch)}
      {experiment !== 'UAV' && renderField(Q, 1, 0, dispatch)}
      {experiment !== 'UAV' && renderField(Q, 1, 1, dispatch)}
    </MatrixFields>
  )
}

function renderField(Q: number[][], i: number, j: number, dispatch: AppDispatch) {
  return (
    <SliderTextField
      value={Q[i][j]}
      onChange={(value) => dispatch(setInput({ name: 'Q', value: value ?? 0, i, j }))}
      min={min}
      max={max}
      step={step}
      maxWidth={MATRIX_FIELD_WIDTH}
      noSlide
    />
  )
}
