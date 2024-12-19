// Взято от сюда https://stackoverflow.com/a/36481059
// export function gaussianRandom(mean = 0, stdev = 1) {
//   const u = 1 - Math.random()
//   const v = Math.random()

//   const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)

//   return z * stdev + mean
// }

function boxMullerTransform() {
  const u1 = Math.random()
  const u2 = Math.random()

  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2)
  // const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);

  return z0
}

export function gaussianRandom(mean = 0, stddev = 1) {
  const z0 = boxMullerTransform()

  return z0 * stddev + mean
}
