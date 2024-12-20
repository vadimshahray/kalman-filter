import {
  ITERATIONS_default,
  KALMAN_defaults,
  KALMAN_defaults_simple,
  MSD,
  MSD_defaults,
  UAV,
} from '@constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { generateMsdData, generateSimpleData } from '@utils'

type Experiments = typeof MSD | typeof UAV

type State = {
  experiment: Experiments
  experimentsInput: Record<Experiments, MassSpringDamperInput>

  iterations: number
  KalmanInput: Record<Experiments, KalmanFilterInput>
  calculations: MsdCalculations | SimpleCalculations
}

export const appSlice = createSlice({
  name: 'app',

  initialState: {
    experiment: MSD,
    experimentsInput: {
      MSD: { ...MSD_defaults },
      UAV: { ...MSD_defaults },
    },

    KalmanInput: {
      MSD: KALMAN_defaults,
      UAV: KALMAN_defaults_simple,
    },

    iterations: ITERATIONS_default,

    calculations: generateMsdData(ITERATIONS_default, KALMAN_defaults, MSD_defaults),
  } satisfies State as State,

  reducers: {
    setExperiment(state, { payload }: PayloadAction<Experiments>) {
      console.log(payload)
      state.experiment = payload

      state.calculations = getGeneratedData(state)
    },

    setCount(state, { payload }: PayloadAction<number | null>) {
      state.iterations = payload ?? 0

      state.calculations = getGeneratedData(state)
    },

    setInput(
      state,
      {
        payload,
      }: PayloadAction<{ name: keyof KalmanFilterInput; value: number; i: number; j: number }>,
    ) {
      state.KalmanInput[state.experiment][payload.name][payload.i][payload.j] = payload.value

      state.calculations = getGeneratedData(state)
    },

    setExperimentInput<E extends Experiments>(
      state: State,
      {
        payload: { experiment, input },
      }: PayloadAction<{
        experiment: E
        input: Partial<State['experimentsInput'][E]>
      }>,
    ) {
      state.experimentsInput[experiment] = { ...state.experimentsInput[experiment], ...input }

      state.calculations = getGeneratedData(state)
    },
  },
  selectors: {
    selectExperiment: (state) => state.experiment,
    selectMsdInput: (state) => state.experimentsInput['MSD'],
    selectSimpleInput: (state) => state.experimentsInput['UAV'],
    selectCount: (state) => state.iterations,
    selectInput: (state) => state.KalmanInput[state.experiment],
    selectCalculations: (state) => state.calculations,
  },
})

export const { setExperiment, setCount, setInput, setExperimentInput } = appSlice.actions

export const {
  selectExperiment,
  selectCount,
  selectMsdInput,
  selectSimpleInput,
  selectInput,
  selectCalculations,
} = appSlice.getSelectors((s: RootState) => s.app)

function getGeneratedData(state: State) {
  console.log(state.experiment)

  if (state.experiment === 'UAV') {
    return generateSimpleData(state.iterations, { ...state.KalmanInput[state.experiment] })
  }

  return generateMsdData(
    state.iterations,
    { ...state.KalmanInput[state.experiment] },
    { ...state.experimentsInput[state.experiment] },
  )
}
