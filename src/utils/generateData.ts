import { randomNormal } from '@tensorflow/tfjs'
import { MassSpringDamper } from './MassSpringDamper'
import { KalmanFilter, KalmanFilter1D } from './KalmanFilter'
import { delta_t } from '@constants'

export function generateMsdData(
  count: number,
  input: KalmanFilterInput,
  msdInput: MassSpringDamperInput,
) {
  console.log(input, msdInput)
  const data: MsdCalculations = {
    posIdeal: [],
    posNoised: [],
    posFiltered: [],

    velIdeal: [],
    velNoised: [],
    velFiltered: [],

    noise: Array.from(randomNormal([count]).dataSync()),
  }

  const system = new MassSpringDamper(msdInput)

  // Матрицы для фильтра Калмана
  const F = [
    [1, delta_t],
    [(-msdInput.k / msdInput.m) * delta_t, (1 - msdInput.c / msdInput.m) * delta_t],
  ] // матрица перехода состояний

  const filter = new KalmanFilter(
    [msdInput.initP, msdInput.initV], // начальная оценка [позиция, скорость]
    input.P, // начальная ковариация
    input.Q, // шум процесса
    input.R, // шум измерения
    F,
    input.H,
  )

  for (let k = 0; k < count; k++) {
    const { position, velocity } = system.update2()

    const noiseK = data.noise[k]

    const posNoised = position + noiseK
    const velNoised = velocity + noiseK

    const [posFiltered, velFiltered] = filter.update([posNoised, velNoised])

    data.posIdeal.push(position)
    data.posNoised.push(posNoised)
    data.posFiltered.push(posFiltered)

    data.velIdeal.push(velocity)
    data.velNoised.push(velNoised)
    data.velFiltered.push(velFiltered)
  }

  return data
}

export function generateSimpleData(count: number, input: KalmanFilterInput) {
  console.log(input)
  const data: SimpleCalculations = {
    ideal: [],
    noised: [],
    filtered: [],

    noise: Array.from(randomNormal([count]).dataSync()),
  }

  const func = (x: number) => 0.3 * x

  // Матрицы для фильтра Калмана
  const F = [[1]] // матрица перехода состояний

  const filter = new KalmanFilter1D(
    0, // начальная оценка [позиция, скорость]
    input.P[0][0], // начальная ковариация
    input.Q[0][0], // шум процесса
    input.R[0][0], // шум измерения
    F[0][0],
    input.H[0][0],
  )

  for (let k = 0; k < count; k++) {
    const x = func(k)

    const noiseK = data.noise[k]
    const xNoised = x + noiseK

    const xFiltered = filter.update(xNoised)

    data.ideal.push(x)
    data.noised.push(xNoised)
    data.filtered.push(xFiltered)
  }

  return data
}
