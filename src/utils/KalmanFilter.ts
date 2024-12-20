export class KalmanFilter {
  private x: number[] // состояние [позиция, скорость]
  private p: number[][] // ковариация ошибки
  private q: number[][] // процессное шумовое значение
  private r: number[][] // шумовое значение измерения
  private f: number[][] // матрица перехода состояний
  private h: number[][] // матрица измерений

  constructor(
    initialEstimate: number[],
    initialErrorCovariance: number[][],
    processNoise: number[][],
    measurementNoise: number[][],
    stateTransitionMatrix: number[][],
    measurementMatrix: number[][],
  ) {
    this.x = initialEstimate
    this.p = initialErrorCovariance
    this.q = processNoise
    this.r = measurementNoise
    this.f = stateTransitionMatrix
    this.h = measurementMatrix
  }

  public update(z: number[]): number[] {
    // Прогнозирование
    const xPredicted = this.multiplyMatrixVector(this.f, this.x)
    const pPredicted = this.addMatrices(this.multiplyMatrices(this.f, this.p), this.q)

    // Вычисление Калмановского коэффициента
    const k = this.calculateKalmanGain(pPredicted)

    // Обновление состояния
    const y = this.subtractVectors(z, this.multiplyMatrixVector(this.h, xPredicted))
    this.x = this.addVectors(xPredicted, this.multiplyMatrixVector(k, y))

    // Обновление ковариации
    const identity = [
      [1, 0],
      [0, 1],
    ]
    this.p = this.multiplyMatrices(
      this.subtractMatrices(identity, this.multiplyMatrices(k, this.h)),
      pPredicted,
    )
    // this.p = this.subtractMatrices(pPredicted, this.multiplyMatrices(k, this.h))

    return this.x
  }

  private calculateKalmanGain(pPredicted: number[][]): number[][] {
    const PpHt = this.multiplyMatrices(pPredicted, this.transposeMatrix(this.h))

    const s = this.addMatrices(this.multiplyMatrices(this.h, PpHt), this.r)
    const k = this.multiplyMatrices(PpHt, this.inverseMatrix(s))

    return k
  }

  private addMatrices(a: number[][], b: number[][]): number[][] {
    return a.map((row, i) => row.map((val, j) => val + b[i][j]))
  }

  private subtractMatrices(a: number[][], b: number[][]): number[][] {
    return a.map((row, i) => row.map((val, j) => val - b[i][j]))
  }

  private multiplyMatrices(a: number[][], b: number[][]): number[][] {
    const result = Array.from({ length: a.length }, () => Array(b[0].length).fill(0))
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        for (let k = 0; k < a[0].length; k++) {
          result[i][j] += a[i][k] * b[k][j]
        }
      }
    }
    return result
  }

  private multiplyMatrixVector(matrix: number[][], vector: number[]): number[] {
    return matrix.map((row) => row.reduce((sum, val, j) => sum + val * vector[j], 0))
  }

  private inverseMatrix(matrix: number[][]): number[][] {
    const determinant = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
    if (determinant === 0) throw new Error('Matrix is not invertible')

    return [
      [matrix[1][1] / determinant, -matrix[0][1] / determinant],
      [-matrix[1][0] / determinant, matrix[0][0] / determinant],
    ]
  }

  private addVectors(a: number[], b: number[]): number[] {
    return a.map((val, i) => val + b[i])
  }

  private subtractVectors(a: number[], b: number[]): number[] {
    return a.map((val, i) => val - b[i])
  }

  private transposeMatrix(matrix: number[][]): number[][] {
    return [
      [matrix[0][0], matrix[1][0]],
      [matrix[0][1], matrix[1][1]],
    ]
  }
}

export class KalmanFilter1D {
  private x: number // состояние [позиция, скорость]
  private p: number // ковариация ошибки
  private q: number // процессное шумовое значение
  private r: number // шумовое значение измерения
  private f: number // матрица перехода состояний
  private h: number // матрица измерений

  constructor(
    initialEstimate: number,
    initialErrorCovariance: number,
    processNoise: number,
    measurementNoise: number,
    stateTransitionMatrix: number,
    measurementMatrix: number,
  ) {
    this.x = initialEstimate
    this.p = initialErrorCovariance
    this.q = processNoise
    this.r = measurementNoise
    this.f = stateTransitionMatrix
    this.h = measurementMatrix
  }

  public update(z: number): number {
    // Прогнозирование
    const xPredicted = this.f * this.x
    const pPredicted = this.f * this.p + this.q

    // Вычисление Калмановского коэффициента
    const k = this.calculateKalmanGain(pPredicted)

    // Обновление состояния
    const y = z - this.h * xPredicted
    this.x = xPredicted + k * y

    this.p = (1 - k * this.h) * pPredicted

    return this.x
  }

  private calculateKalmanGain(pPredicted: number): number {
    const PpHt = pPredicted * this.h

    const s = this.h * PpHt + this.r
    const k = PpHt / s

    return k
  }
}
