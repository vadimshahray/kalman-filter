export class KalmanFilter {
  private readonly F: Kt
  private readonly H: Kt
  private readonly Q: Kt
  private readonly R: Kt

  private x_p: Kt = 0
  private P_p: Kt = 0

  private Kg = 0

  constructor({ F, H, Q, R }: KalmanFilterInput) {
    this.F = F
    this.H = H
    this.Q = Q
    this.R = R
  }

  initialize(x: Kt, P: Kt) {
    this.x_p = x
    this.P_p = P
  }

  private predict() {
    this.x_p = this.F * this.x_p
    this.P_p = this.F * this.P_p * this.F + this.Q
  }

  private update(z: Kt) {
    this.Kg = (this.P_p * this.H) / (this.H * this.P_p * this.H + this.R)

    this.x_p = this.x_p + this.Kg * (z - this.H * this.x_p)
    this.P_p = (1 - this.Kg * this.H) * this.P_p
  }

  getX() {
    return this.x_p
  }

  filter(z: number) {
    this.predict()
    this.update(z)

    return { x: this.x_p, Kg: this.Kg }
  }
}
