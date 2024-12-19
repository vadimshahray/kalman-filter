import { ITERATIONS_default, KALMAN_defaults, MSD, MSD_defaults, UAV } from '@constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { generateMsdData } from '@utils'

type Experiments = typeof MSD | typeof UAV

type State = {
  experiment: Experiments
  experimentsInput: Record<Experiments, MassSpringDamperInput>

  iterations: number
  KalmanInput: KalmanFilterInput
  calculations: MsdCalculations
}

export const appSlice = createSlice({
  name: 'app',

  initialState: {
    experiment: MSD,
    experimentsInput: {
      MSD: { ...MSD_defaults },
      UAV: { ...MSD_defaults },
    },

    KalmanInput: KALMAN_defaults,

    iterations: ITERATIONS_default,

    calculations: generateMsdData(ITERATIONS_default, KALMAN_defaults, MSD_defaults),
  } satisfies State as State,

  reducers: {
    setState(state, { payload }: PayloadAction<Partial<State>>) {
      return { ...state, ...payload }
    },

    setCount(state, { payload }: PayloadAction<number | null>) {
      state.iterations = payload ?? 0

      if (state.iterations >= 0) {
        state.calculations = generateMsdData(
          state.iterations,
          state.KalmanInput,
          state.experimentsInput['MSD'],
        )
      }
    },

    setInput(state, { payload }: PayloadAction<Partial<State['KalmanInput']>>) {
      state.KalmanInput = { ...state.KalmanInput, ...payload }

      if (state.iterations >= 0) {
        state.calculations = generateMsdData(
          state.iterations,
          state.KalmanInput,
          state.experimentsInput['MSD'],
        )
      }
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

      if (state.iterations >= 0) {
        state.calculations = generateMsdData(
          state.iterations,
          state.KalmanInput,
          state.experimentsInput['MSD'],
        )
      }
    },
  },
  selectors: {
    selectExperiment: (state) => state.experiment,
    selectMsdInput: (state) => state.experimentsInput['MSD'],
    selectCount: (state) => state.iterations,
    selectInput: (state) => state.KalmanInput,
    selectCalculations: (state) => state.calculations,
  },
})

export const { setState, setCount, setInput, setExperimentInput } = appSlice.actions

export const { selectExperiment, selectCount, selectMsdInput, selectInput, selectCalculations } =
  appSlice.getSelectors((s: RootState) => s.app)
