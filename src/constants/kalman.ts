const stdev = 0.5

export const KALMAN_defaults: KalmanFilterInput = {
  P: [
    [1, 0],
    [0, 1],
  ],
  H: [
    [1, 0],
    [0, 1],
  ],
  Q: [
    [0.1, 0],
    [0, 0.1],
  ],
  R: [
    [stdev, 0],
    [0, stdev],
  ],
}

export const KALMAN_defaults_simple: KalmanFilterInput = {
  P: [[1]],
  H: [[1]],
  Q: [[0.1]],
  R: [[stdev]],
}
