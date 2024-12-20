export const MSD = 'MSD'
export const UAV = 'UAV'

export const delta_t = 0.1

export const MSD_defaults = {
  m: 1,
  k: 0.5,
  c: 0.1,
  initP: 10,
  initV: 0,
  deltaT: delta_t,
} as const satisfies MassSpringDamperInput

export const ITERATIONS_default = 400
