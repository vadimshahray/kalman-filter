import * as yup from 'yup'

export const minMaxRule = ({ min, max, typeError, minError, maxError }: MinMaxRuleOptions) => {
  return yup
    .number()
    .transform(commaToDot)
    .typeError(typeError)
    .min(min, minError)
    .max(max, maxError)
    .required('Значение обязательно')
}

const commaToDot = (v: any, ov: any) => {
  return typeof ov === 'string' ? Number(ov.replace(',', '.')) : v
}
