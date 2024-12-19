export class MassSpringDamper {
  private m: number // масса
  private k: number // жесткость пружины
  private b: number // коэффициент демпфирования
  private x: number // позиция
  private v: number // скорость
  private dt: number // шаг по времени
  private time: number // текущее время

  constructor({ m, k, c, initP, initV, deltaT }: MassSpringDamperInput) {
    this.m = m
    this.k = k
    this.b = c
    this.x = initP
    this.v = initV
    this.dt = deltaT

    this.time = 0
  }

  // Функция для обновления состояния системы
  update() {
    // Вычисляем силу по второму закону Ньютона
    const forceSpring = -this.k * this.x // сила пружины
    const forceDamping = -this.b * this.v // сила демпфера
    const acceleration = (forceSpring + forceDamping) / this.m // ускорение

    // Обновляем скорость и позицию с использованием метода Эйлера
    this.v += acceleration * this.dt
    this.x += this.v * this.dt

    // Обновляем время
    this.time += this.dt
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
