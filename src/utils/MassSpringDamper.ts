export class MassSpringDamper {
  private m: number // масса
  private k: number // жесткость пружины
  private с: number // коэффициент демпфирования
  private x: number // позиция
  private v: number // скорость
  private dt: number // шаг по времени
  private time: number // текущее время

  constructor({ m, k, c, initP, initV, deltaT }: MassSpringDamperInput) {
    this.m = m
    this.k = k
    this.с = c
    this.x = initP
    this.v = initV
    this.dt = deltaT

    this.time = 0
  }

  update2(): { position: number; velocity: number } {
    const a = (-this.с * this.v - this.k * this.x) / this.m

    this.v += a * this.dt
    this.x += this.v * this.dt

    return { position: this.x, velocity: this.v }
  }

  // Функция для получения текущего состояния системы
  getState() {
    return {
      time: this.time,
      position: this.x,
      velocity: this.v,
    }
  }
}
