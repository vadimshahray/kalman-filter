import { CField, InitPosField, InitVelField, MassField, SpringField } from './fields'
import { Stack } from '@mui/joy'

export function MassSpringDamper() {
  return (
    <Stack direction="row" gap={2} flexWrap="wrap">
      <MassField />

      <SpringField />

      <CField />

      <InitPosField />

      <InitVelField />
    </Stack>
  )
}
