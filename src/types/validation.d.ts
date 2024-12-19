type BaseRuleOptions = {
  typeError: string
}

type MinMaxRuleOptions = {
  min: number
  max: number
  minError: string
  maxError: string
} & BaseRuleOptions
