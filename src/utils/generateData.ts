import { randomNormal } from '@tensorflow/tfjs'
import { MassSpringDamper } from './MassSpringDamper'
import { KalmanFilter } from './KalmanFilter'

export function generateMsdData(
  count: number,
  input: KalmanFilterInput,
  msdInput: MassSpringDamperInput,
) {
  const data: MsdCalculations = {
    posIdeal: [],
    posNoised: [],
    posFiltered: [],

    velIdeal: [],
    velNoised: [],
    velFiltered: [],

    noise: [],
  }

  const system = new MassSpringDamper(msdInput)
  data.noise = Array.from(randomNormal([count]).dataSync())

  const filter = new KalmanFilter(input)
  filter.initialize(msdInput.initP, 1)

  for (let k = 0; k < count; k++) {
    system.update()

    const noiseK = data.noise[k]

    const { position } = system.getState()
    const posNoised = position + noiseK

    const { x: posFiltered } = filter.filter(posNoised)

    data.posIdeal.push(position)
    data.posNoised.push(posNoised)
    data.posFiltered.push(posFiltered)
  }

  return data
}
